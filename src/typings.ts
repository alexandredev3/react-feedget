export type VariationsPlacement =
  | "end-bottom"
  | "end-top"
  | "start-bottom"
  | "start-top";
export type Steps = "OPTIONS" | "SEND" | "SUCCESSFULLY" | "ERROR";
export type OnSent = (
  values: FormValues,
  changeStep: (step: Steps) => void,
) => Promise<void> | void;
export type Colors = Partial<{
  brandPrimary: string;
  brandHover: string;
  brandText: string;
  primary: string;
  secondary: string;
  secondaryHover: string;
  stroke: string;
  tooltip: string;
  textPrimary: string;
  textSecondary: string;
}>;

export interface Option {
  title: string;
  icon: () => JSX.Element;
}
export interface Options {
  [key: string]: Option;
}
export interface FormValues {
  comment: string;
  screenshot: string | null;
}
export interface Transition {
  enter: {
    animate: string;
    from: string;
    to: string;
  };
  leave: {
    animate: string;
    from: string;
    to: string;
  };
}
export interface Typography {
  bubbleLabel?: string;
  options?: {
    title?: string;
  };
  form?: {
    fieldPlaceholder?: string;
    buttonLabel?: string;
  };
  successfully?: {
    title?: string;
    buttonLabel?: string;
  };
  error?: {
    title?: string;
    buttonLabel?: string;
  };
}
export interface FeedgetProps {
  options: Options;
  typography?: Typography;
  extendTheme?: {
    colors?: Colors;
  };
  placement?: VariationsPlacement;
  transition?: Transition;
  onSent: OnSent;
  Icon?: JSX.Element;
  renderFooter?: () => JSX.Element;
}
