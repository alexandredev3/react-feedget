import { createContext, ReactNode, useContext } from "react";

import type { Option, Options, Typography } from "./typings";

type Typographies = Required<Typography>;

interface FeedgetProviderProps {
  children: ReactNode;
  options: {
    [key: string]: Option;
  };
  typographies: Typographies;
}

interface FeedgetContextProps {
  options: Options;
  typographies: Typographies;
}

export const FeedgetContext = createContext<FeedgetContextProps>(
  {} as FeedgetContextProps
);

export function FeedgetProvider({
  children,
  options,
  typographies,
}: FeedgetProviderProps) {
  return (
    <FeedgetContext.Provider
      value={{
        options,
        typographies,
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
