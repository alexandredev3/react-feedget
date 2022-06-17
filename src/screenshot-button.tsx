import { useState } from "react";
import { Camera, Trash } from "phosphor-react";
import html2canvas from "html2canvas";

import { Loading } from "./loading";

interface ScreenshotButtonProps {
  onScreenshotTook: (base64screenshot: string | null) => void;
}

export function ScreenshotButton({ onScreenshotTook }: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  async function handleTakeScreenshot() {
    try {
      setIsTakingScreenshot(true);

      const htmlDocument = document.querySelector("html");
      const popoverElement = htmlDocument?.querySelector(
        "#feedbubble-popover-panel"
      );

      const canvas = await html2canvas(htmlDocument!, {
        ignoreElements: (element) => popoverElement === element,
      });
      const base64image = canvas.toDataURL();

      onScreenshotTook(base64image);
      setPreview(base64image);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsTakingScreenshot(false);
    }
  }

  if (preview) {
    return (
      <button
        type="button"
        onClick={() => {
          onScreenshotTook(null);
          setPreview(null);
        }}
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-400 hover:text-100 transition-colors"
        style={{
          backgroundImage: `url(${preview})`,
        }}
      >
        <Trash weight="fill" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      disabled={isTakingScreenshot}
      className="p-2 bg-800 rounded-md border-transparent hover:bg-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-900 focus:ring-brand-500"
    >
      {isTakingScreenshot ? (
        <Loading />
      ) : (
        <Camera className="w-6 h-6 text-100" />
      )}
    </button>
  );
}
