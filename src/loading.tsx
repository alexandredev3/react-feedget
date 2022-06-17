import { CircleNotch } from "phosphor-react";

interface LoadingProps {
  color?: string;
}

export function Loading({ color = "zinc-100" }: LoadingProps) {
  return (
    <div
      className={`text-${color} w-6 h-6 flex items-center justify-center overflow-hidden`}
    >
      <CircleNotch weight="bold" className="w-4 h-4 animate-spin" />
    </div>
  );
}
