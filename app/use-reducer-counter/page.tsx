"use client";

import { useCallback, useContext, useReducer, useState } from "react";
import { Action, Count1Context, Count2Context, DispatchContext } from "./hooks";

const Counter1 = () => {
  const count1 = useContext(Count1Context);
  const dispatch = useContext(DispatchContext);
  return (
    <div>
      <h2>Counter 1: {count1}</h2>
      <button onClick={() => dispatch({ type: "INC1" })}>+1</button>
    </div>
  );
};

const Counter2 = () => {
  const count2 = useContext(Count2Context);
  const dispatch = useContext(DispatchContext);
  return (
    <div>
      <h2>Counter 2: {count2}</h2>
      <button onClick={() => dispatch({ type: "INC2" })}>+2</button>
    </div>
  );
};

const Parent = () => {
  return (
    <div>
      <Counter1 />
      <Counter1 />
      <Counter2 />
      <Counter2 />
    </div>
  );
};

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(
    (prev: { count1: number; count2: number }, action: Action) => {
      if (action.type === "INC1") {
        return { ...prev, count1: prev.count1 + 1 };
      }
      if (action.type === "INC2") {
        return { ...prev, count2: prev.count2 + 2 };
      }
      throw new Error("no matching action");
    },
    {
      count1: 0,
      count2: 0,
    }
  );

  /**
   * useState로도 구현할 수 있다.
   */
  // const [state, setState] = useState({
  //   count1: 0,
  //   count2: 0,
  // });

  // const dispatch = useCallback((action: Action) => {
  //   setState((prev) => {
  //     if (action.type === "INC1") {
  //       return { ...prev, count1: prev.count1 + 1 };
  //     }
  //     if (action.type === "INC2") {
  //       return { ...prev, count2: prev.count2 + 2 };
  //     }
  //     throw new Error("no matching action");
  //   });
  // }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <Count1Context.Provider value={state.count1}>
        <Count2Context.Provider value={state.count2}>
          {children}
        </Count2Context.Provider>
      </Count1Context.Provider>
    </DispatchContext.Provider>
  );
};

export default function UseReducerCounter() {
  return (
    <Provider>
      <Parent />
    </Provider>
  );
}
