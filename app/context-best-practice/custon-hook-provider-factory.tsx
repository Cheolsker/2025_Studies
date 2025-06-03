import { createStateContext, useNumberState } from "./contexts";

const [Count1Provider, useCount1] = createStateContext(useNumberState);
const [Count2Provider, useCount2] = createStateContext(useNumberState);

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

export function CustomHookProviderFactory() {
  return (
    <main>
      <App />
    </main>
  );
}
