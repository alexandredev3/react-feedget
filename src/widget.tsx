import { useState } from "react";
import { ArrowLeft } from "phosphor-react";

import type { Steps, OnSent } from "./typings";

import { useFeedget } from "./feedget-context";
import { Close } from "./close";
import { Form } from "./form";

interface WidgetProps {
  onSent: OnSent;
  renderScreenshotButton?: boolean;
  renderFooter?: () => JSX.Element | null;
}

const INITIAL_STEP = "OPTIONS";

export function Widget({
  onSent,
  renderScreenshotButton = true,
  renderFooter: Footer = () => null,
}: WidgetProps) {
  const { options, labels } = useFeedget();

  const [optionSelected, setOptionSelected] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<Steps>(INITIAL_STEP);

  const handleChooseOption = (key: string) => {
    setOptionSelected(key);

    setCurrentStep("SEND");
  };

  const handleRestartStep = () => {
    setCurrentStep(INITIAL_STEP);
  };

  const steps = {
    OPTIONS: () => (
      <>
        <header>
          <span className="text-xl text-100 leading-6 flex items-center gap-2">
            {labels.options.heading}
          </span>

          <Close />
        </header>
        <div className="flex py-8 gap-2 w-full">
          {Object.entries(options).map(([key, value]) => {
            const { icon: Icon } = value;

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleChooseOption(key)}
                className="bg-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 hover:transition-colors focus:border-brand-500 focus:outline-none"
              >
                <Icon />
                <span className="text-100">{value.title}</span>
              </button>
            );
          })}
        </div>
      </>
    ),
    SEND: () => {
      if (optionSelected) {
        const { icon: Icon, title } = options[optionSelected];

        return (
          <>
            <header>
              <button
                type="button"
                className="top-5 left-5 absolute text-400 hover:text-light-100"
                onClick={handleRestartStep}
              >
                <ArrowLeft weight="bold" className="w-4 h-4" />
              </button>

              <span className="text-xl text-100 leading-6 flex items-center gap-2">
                <Icon />
                {title}
              </span>

              <Close />
            </header>

            <Form
              onSubmitted={(values) =>
                onSent(values, (next: Steps) => setCurrentStep(next))
              }
              renderScreenshotButton={renderScreenshotButton}
            />
          </>
        );
      } else {
        setCurrentStep(INITIAL_STEP);

        return null;
      }
    },
    SUCCESSFULLY: () => (
      <>
        <header>
          <Close />
        </header>

        <div className="flex flex-col items-center py-10 w-[304px]">
          <svg
            width="41"
            height="40"
            viewBox="0 0 41 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M38.5 34C38.5 36.209 36.709 38 34.5 38H6.5C4.291 38 2.5 36.209 2.5 34V6C2.5 3.791 4.291 2 6.5 2H34.5C36.709 2 38.5 3.791 38.5 6V34Z"
              fill="#77B255"
            />
            <path
              d="M31.78 8.36202C30.624 7.61102 29.076 7.94002 28.322 9.09802L17.436 25.877L12.407 21.227C11.393 20.289 9.81103 20.352 8.87403 21.365C7.93703 22.379 7.99903 23.961 9.01303 24.898L16.222 31.564C16.702 32.009 17.312 32.229 17.918 32.229C18.591 32.229 19.452 31.947 20.017 31.09C20.349 30.584 32.517 11.82 32.517 11.82C33.268 10.661 32.938 9.11302 31.78 8.36202Z"
              fill="white"
            />
          </svg>

          <span className="text-100 text-xl mt-2">
            {labels.successfully.heading}
          </span>

          <button
            onClick={handleRestartStep}
            className="py-2 px-6 mt-6 text-100 bg-800 rounded-md border-transparent text-sm leading-6 hover:bg-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {labels.successfully.button}
          </button>
        </div>
      </>
    ),
    ERROR: () => (
      <>
        <header>
          <Close />
        </header>

        <div className="flex flex-col items-center py-10 w-[304px]">
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.0648 16.5018L32.2998 4.26775C33.2758 3.29175 33.2758 1.70875 32.2998 0.73275C31.3228 -0.24425 29.7407 -0.24425 28.7647 0.73275L16.5297 12.9668L4.29575 0.73275C3.31975 -0.24425 1.73575 -0.24425 0.76075 0.73275C-0.21625 1.70875 -0.21625 3.29175 0.76075 4.26775L12.9948 16.5018L0.73275 28.7647C-0.24425 29.7417 -0.24425 31.3237 0.73275 32.2997C1.22075 32.7877 1.86075 33.0317 2.50075 33.0317C3.14075 33.0317 3.78075 32.7877 4.26875 32.2997L16.5308 20.0368L28.7647 32.2707C29.2527 32.7587 29.8927 33.0027 30.5327 33.0027C31.1727 33.0027 31.8118 32.7587 32.3008 32.2707C33.2768 31.2937 33.2768 29.7118 32.3008 28.7358L20.0648 16.5018Z"
              fill="#DD2E44"
            />
          </svg>

          <span className="text-100 text-xl mt-2">
            {labels.error.heading}
          </span>

          <button
            onClick={handleRestartStep}
            className="py-2 px-6 mt-6 text-100 bg-800 rounded-md border-transparent text-sm leading-6 hover:bg-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {labels.error.button}
          </button>
        </div>
      </>
    ),
  };

  const Stepper = steps[currentStep];

  return (
    <div className="bubble-widget bg-900 p-4 relative rounded-2xl flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      <Stepper />

      <Footer />
    </div>
  );
}
