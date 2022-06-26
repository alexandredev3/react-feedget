import merge from "just-merge";

import type { Colors } from "./typings";

export const extendColors = (colors: Colors, colorsToExtend: Colors) => {
  const extendedColors = mergeColors(colors, colorsToExtend);

  applyColors(extendedColors);
}

export const applyColors = (colors: Colors) => {
  if (typeof window !== "undefined") {
    const element = window.document.getElementById("feedget-popover-panel");

    Object.entries(colors).forEach(([key, color]) => {
      return element?.style.setProperty("--color-" + key, color as string);
    });
  }
};

export const mergeColors = <TColors, TExtendColors>(
  colors: TColors,
  extendColors: TExtendColors
): Colors => merge(colors as Object, extendColors as Object);
