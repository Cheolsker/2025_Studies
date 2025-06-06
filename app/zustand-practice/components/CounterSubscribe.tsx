"use client";

import { useCountStore } from "../store/count-subscribe";

export function CounterSubscribe() {
  const count = useCountStore((state) => state.count);
  const double = useCountStore((state) => state.double);

  const { increase, decrease } = useCountStore((state) => state.actions);

  return (
    <section>
      <section>
        <h2>Count: {count}</h2>
      </section>
      <section>
        <h2>Double: {double}</h2>
      </section>

      <br />

      <section>
        <button onClick={increase}>+1</button>
        <button onClick={decrease}>-1</button>
      </section>
    </section>
  );
}
