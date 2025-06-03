"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type CountContextType = [number, Dispatch<SetStateAction<number>>];

/**
 * Count1Context
 */
const Count1Context = createContext<CountContextType | null>(null);

const Count1Provider = ({ children }: { children: React.ReactNode }) => (
  <Count1Context.Provider value={useState(0)}>
    {children}
  </Count1Context.Provider>
);

const useCount1 = () => {
  const value = useContext(Count1Context);
  if (value === null) throw new Error("Provider missing");
  return value;
};

/**
 * Count2Context
 */
const Count2Context = createContext<CountContextType | null>(null);

const Count2Provider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  return (
    <Count2Context.Provider value={[count, setCount]}>
      {children}
    </Count2Context.Provider>
  );
};

const useCount2 = () => {
  const value = useContext(Count2Context);
  if (value === null) throw new Error("Provider missing");
  return value;
};

const Counter1 = () => {
  const [count1, setCount1] = useCount1();

  return (
    <div>
      <h1>Count1: {count1}</h1>
      <div>
        <button onClick={() => setCount1((c) => c + 1)}>+1</button>
      </div>
    </div>
  );
};

const Counter2 = () => {
  const [count2, setCount2] = useCount2();

  return (
    <div>
      <h1>Count2: {count2}</h1>
      <div>
        <button onClick={() => setCount2((c) => c + 1)}>+1</button>
      </div>
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

const App = () => {
  return (
    <Count1Provider>
      <Count2Provider>
        <Parent />
      </Count2Provider>
    </Count1Provider>
  );
};

export function CustomHookAndProvider() {
  return <App />;
}
