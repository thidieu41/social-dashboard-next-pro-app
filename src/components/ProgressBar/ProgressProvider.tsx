"use client";

import { createContext, useContext, useState } from "react";

type ContextProps = {
  start: () => void;
  done: () => void;
  loading: boolean;
};

const ProgressBarContext = createContext<ContextProps | undefined>(undefined);

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setIsLoading] = useState(false);

  const start = () => {
    setIsLoading(true)
  };
  
  const done = () => {
    setIsLoading(false)
  };
  return (
    <ProgressBarContext.Provider value={{ start, done, loading }}>
      {children}
    </ProgressBarContext.Provider>
  );
};

export default ProgressBarProvider;

export const useProgressBar = () => {
  const ctx = useContext(ProgressBarContext);
  if (!ctx) throw new Error("sub component within ProgressBar Context");
  return ctx;
};
