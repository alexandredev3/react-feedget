import { FormEvent, useRef, useState } from 'react';

import { useFeedget } from './feedget-context';
import { ScreenshotButton } from './screenshot-button';
import { Loading } from './loading';

interface FormProps {
  onSubmitted: (values: {
    message: string;
    screenshot: string | null;
  }) => Promise<void> | void;
  renderScreenshotButton?: boolean;
}

export function Form({ onSubmitted, renderScreenshotButton }: FormProps) {
  const { labels } = useFeedget();

  const messageTextareaRef = useRef<HTMLTextAreaElement>(null);

  const [screenshotValue, setScreenshotValue] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const values = {
      message: messageTextareaRef.current?.value,
      screenshot: screenshotValue,
    };

    const isMessageEmpty = !values.message;

    if (isMessageEmpty) {
      setHasError(true);

      return;
    } else {
      if (hasError) {
        setHasError(false);
      }
    }

    try {
      setIsSubmitting(true);

      await onSubmitted({
        ...values,
        message: values.message ?? '',
      });
    } catch (err) {
      throw new Error(err as any);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="feedback-form-step my-4 w-full">
      <textarea
        ref={messageTextareaRef}
        id="message-textarea"
        name="message"
        className={`w-full md:min-w-[304px] m-full min-h-[112px] text-sm placeholder-400 text-100 ${
          hasError
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-600 focus:border-brand-500 focus:ring-brand-500'
        } bg-transparent rounded-md focus:ring-1 focus:outline-none resize-none scrollbar-thumb-700 scrollbar-700 scrollbar-track-900 scrollbar-thin`}
        placeholder={labels.form.fieldPlaceholder}
        required
      />

      <footer className="flex gap-2 mt-2">
        {renderScreenshotButton && (
          <ScreenshotButton
            preview={screenshotValue}
            onScreenshotTook={base64screenshot =>
              setScreenshotValue(base64screenshot)
            }
          />
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
        >
          {isSubmitting ? (
            <Loading color="900" />
          ) : (
            <span>{labels.form.button}</span>
          )}
        </button>
      </footer>
    </form>
  );
}
