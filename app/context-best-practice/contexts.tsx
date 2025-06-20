import { createContext, useContext, useState } from "react";

export const createStateContext = <Value, State>(
  useValue: (init?: Value) => State
) => {
  const StateContext = createContext<State | null>(null);
  const StateProvider = ({
    initialValue,
    children,
  }: {
    initialValue?: Value;
    children?: React.ReactNode;
  }) => (
    <StateContext.Provider value={useValue(initialValue)}>
      {children}
    </StateContext.Provider>
  );

  const useContextState = () => {
    const value = useContext(StateContext);
    if (value === null) {
      throw new Error("Provider missing");
    }
    return value;
  };

  return [StateProvider, useContextState] as const;
};

export const useNumberState = (init?: number) => useState(init || 0);
