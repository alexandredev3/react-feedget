import type { Colors, Typography } from './typings';

export const typographies: Typography = {
  bubbleLabel: 'Feedback',
  options: {
    title: 'Leave your feedback',
  },
  form: {
    fieldPlaceholder: 'Tell us with details what is happening...',
    buttonLabel: "Send feedback"
  },
  successfully: {
    title: "Thank you!",
    buttonLabel: "I want to send another feedback"
  },
  error: {
    title: "It wasn't possible to send your feedback :(",
    buttonLabel: "I want to try again"
  }
}

export const colors: Colors = {
  brandPrimary: "#8257E5",
  brandHover: "#996DFF",
  brandText: "#FFFFFF",
  primary: "#18181B",
  secondary: "#27272A",
  secondaryHover: "#3F3F46",
  stroke: "#52525B",
  tooltip: "#F4F4F5",
  textPrimary: "#f4f4f5",
  textSecondary: "#A1A1AA"
}