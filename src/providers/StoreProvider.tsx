"use client";
import { AppStore, makeStore } from "@/lib/store";
import { useMemo } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useMemo<AppStore>(() => makeStore(), []);
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
