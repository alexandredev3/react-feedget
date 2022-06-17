import { SubmitHandler, useForm } from "react-hook-form";

import type { FormValues } from "./typings";

import { useFeedget } from "./feedget-context";
import { ScreenshotButton } from "./screenshot-button";
import { Loading } from "./loading";

interface FormProps {
  onSubmitted: (values: FormValues) => Promise<void> | void;
  renderScreenshotButton?: boolean;
}

export function Form({ onSubmitted, renderScreenshotButton }: FormProps) {
  const { typographies } = useFeedget();
  const { register, handleSubmit, setValue, formState } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await onSubmitted(values);
    } catch (err) {
      // throw new Error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="feedback-form-step my-4 w-full"
    >
      <textarea
        id="comment-textarea"
        className={`w-full md:min-w-[304px] m-full min-h-[112px] text-sm placeholder-400 text-100 ${
          formState.errors.comment
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-600 focus:border-brand-500 focus:ring-brand-500"
        } bg-transparent rounded-md focus:ring-1 focus:outline-none resize-none scrollbar-thumb-700 scrollbar-700 scrollbar-track-900 scrollbar-thin`}
        placeholder={typographies.form.fieldPlaceholder}
        {...register("comment", { required: true })}
      />

      <footer className="flex gap-2 mt-2">
        {renderScreenshotButton && (
          <ScreenshotButton
            onScreenshotTook={(base64screenshot) =>
              setValue("screenshot", base64screenshot)
            }
          />
        )}

        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
        >
          {formState.isSubmitting ? (
            <Loading color="900" />
          ) : (
            <span>{typographies.form.buttonLabel}</span>
          )}
        </button>
      </footer>
    </form>
  );
}
