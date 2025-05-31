"use client";

import { useReducer } from "react";

export function Counter() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "INCREMENT":
        return { ...state, count: state.count + 1 };
      case "DECREMENT":
        return { ...state, count: state.count - 1 };
      case "SET_TEXT":
        return { ...state, text: action.text };
      default:
        throw new Error(`Unknown action: ${action.type}`);
    }
  };

  const [state, dispatch] = useReducer(reducer, { count: 0, text: "hi" });

  return (
    <div>
      <h1>{state.count}</h1>
      <div>
        <button onClick={() => dispatch({ type: "INCREMENT" })}>
          Increment Count
        </button>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>
          Decrement Count
        </button>
      </div>
      <div>
        <input
          value={state.text}
          onChange={(e) => dispatch({ type: "SET_TEXT", text: e.target.value })}
          placeholder="Type something"
        />
      </div>
    </div>
  );
}
