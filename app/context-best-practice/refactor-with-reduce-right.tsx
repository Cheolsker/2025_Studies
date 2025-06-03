"use client";

import { createElement } from "react";
import { createStateContext, useNumberState } from "./contexts";

const Parent = () => {
  return <div></div>;
};

const App = () => {
  const [Count1Provider] = createStateContext(useNumberState);
  const [Count2Provider] = createStateContext(useNumberState);
  const [Count3Provider] = createStateContext(useNumberState);
  const [Count4Provider] = createStateContext(useNumberState);
  const [Count5Provider] = createStateContext(useNumberState);

  const providers = [
    [Count1Provider, { initialValue: 10 }],
    [Count2Provider, { initialValue: 20 }],
    [Count3Provider, { initialValue: 30 }],
    [Count4Provider, { initialValue: 40 }],
    [Count5Provider, { initialValue: 50 }],
  ] as const;

  return providers.reduceRight(
    (children, [Component, props]) => createElement(Component, props, children),
    <Parent />
  );
};

export function RefactorWithReduceRight() {
  return (
    <main>
      <App />
    </main>
  );
}
