import "./global.css";

import { useEffect, useState, cloneElement } from "react";
import { Popover, Transition as UITransition } from "@headlessui/react";
import { VariationPlacement } from "@popperjs/core";
import { usePopper } from "react-popper";
import { ChatTeardropDots } from "phosphor-react";
import mergeWith from "lodash.mergewith";

import type { VariationsPlacement, FeedgetProps, Typography } from "./typings";

import { applyColors, extendColors } from "./colors";
import { colors, typographies } from "./constants";

import { FeedgetProvider } from "./feedget-context";
import { Widget } from "./widget";

type Placements = {
  [key in VariationsPlacement]: {
    placement: VariationPlacement;
    contentPlacement: string;
  };
};

const placements: Placements = {
  "end-bottom": {
    placement: "top-start",
    contentPlacement:
      "absolute right-4 bottom-4 md:right-8 md:bottom-8 flex flex-col items-end",
  },
  "end-top": {
    placement: "bottom-start",
    contentPlacement:
      "absolute top-4 right-4 md:top-8 md:right-8 flex flex-col items-end",
  },
  "start-bottom": {
    placement: "bottom-start",
    contentPlacement:
      "absolute left-4 bottom-4 md:left-8 md:bottom-8 flex flex-col items-start",
  },
  "start-top": {
    placement: "top-start",
    contentPlacement:
      "absolute top-4 left-4 md:top-8 md:left-8 flex flex-col items-start",
  },
};

export function Feedget({
  options,
  Icon = <ChatTeardropDots id="feedget-bubble-icon" />,
  renderFooter,
  onSent,
  typography,
  extendTheme,
  placement = "end-bottom",
  transition = {
    enter: {
      animate: "transition duration-140 ease-out",
      from: "transform origin-bottom-right scale-95 opacity-0",
      to: "transform origin-bottom-right scale-100 opacity-100",
    },
    leave: {
      animate: "transition duration-90 ease-out",
      from: "transform origin-bottom-right scale-100 opacity-100",
      to: "transform origin-bottom-right scale-95 opacity-0",
    },
  },
}: FeedgetProps) {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const position = placements[placement];

  const typographiesMerged: Required<Typography> = mergeWith(
    typographies,
    typography
  );

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: position.placement,
    strategy: "fixed",
    modifiers: [{ name: "offset", options: { offset: [0, 12] } }],
  });

  useEffect(() => {
    if (extendTheme?.colors) {
      extendColors(colors, extendTheme.colors);
    } else {
      applyColors(colors);
    }
  }, [extendTheme?.colors]);

  return (
    <FeedgetProvider options={options} typographies={typographiesMerged}>
      <Popover id="feedget-popover-panel" className={position.contentPlacement}>
        <UITransition
          enter={transition.enter.animate}
          enterFrom={transition.enter.from}
          enterTo={transition.enter.to}
          leave={transition.leave.animate}
          leaveFrom={transition.leave.from}
          leaveTo={transition.leave.to}
        >
          <Popover.Panel
            ref={(element: HTMLDivElement) => setPopperElement(element)}
            style={styles.popper}
            {...attributes}
          >
            <Widget onSent={onSent} renderFooter={renderFooter} />
          </Popover.Panel>
        </UITransition>

        <Popover.Button
          ref={(element: HTMLButtonElement) => setReferenceElement(element)}
          className="bg-brand-500 rounded-full px-3 h-12 text-800 flex items-center group"
        >
          {cloneElement(Icon, {
            className: "w-6 h-6 text-brand-100",
          })}
          <span className="text-brand-100 whitespace-nowrap max-w-0 translate-y-5 opacity-0 overflow-hidden group-hover:max-w-xs group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <span className="pl-2" />
            {typographiesMerged.bubbleLabel}
          </span>
        </Popover.Button>
      </Popover>
    </FeedgetProvider>
  );
}
