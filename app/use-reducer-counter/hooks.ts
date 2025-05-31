import { createContext, Dispatch } from "react";

export type Action = { type: "INC1" } | { type: "INC2" };

export const Count1Context = createContext<number>(0);
export const Count2Context = createContext<number>(0);
export const DispatchContext = createContext<Dispatch<Action>>(() => {});
