import { createContext, ReactNode, useContext } from "react";

import type { Option, Options, Labels } from "./typings";

interface FeedgetProviderProps {
  children: ReactNode;
  options: {
    [key: string]: Option;
  };
  labels: Labels;
}

interface FeedgetContextProps {
  options: Options;
  labels: Labels;
}

const FeedgetContext = createContext<FeedgetContextProps>(
  {} as FeedgetContextProps
);

export function FeedgetProvider({
  children,
  options,
  labels,
}: FeedgetProviderProps) {
  return (
    <FeedgetContext.Provider
      value={{
        options,
        labels,
      }}
    >
      {children}
    </FeedgetContext.Provider>
  );
}

export const useFeedget = () => {
  const context = useContext(FeedgetContext);

  if (context === undefined) {
    throw new Error("useFeedget must be used within a FeedgetProvider");
  }

  return context;
};
