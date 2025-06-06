"use client";

import { useCountStore } from "../store/count";

export function Counter() {
  const count = useCountStore((state) => state.count);
  const double = useCountStore((state) => state.double);
  const min = useCountStore((state) => state.min);
  const max = useCountStore((state) => state.max);

  const { increase, decrease, resetState, deleteState } = useCountStore(
    (state) => state.actions
  );

  return (
    <section>
      <section>
        <h1>Count: {count}</h1>
        <h2>Double: {double}</h2>

        {min && <h2>Min: {min}</h2>}
        {max && <h2>Max: {max}</h2>}
      </section>
      <br />

      <section>
        <button onClick={increase}>+1</button>
        <button onClick={decrease}>-1</button>
      </section>

      <section>
        <button onClick={() => resetState()}>Reset All!</button>
        <button onClick={() => resetState(["double", "min"])}>
          Reset Double, Min!
        </button>
      </section>

      <section>
        <button onClick={() => deleteState(["min", "max"])}>
          Delete Min, Max!
        </button>
      </section>
    </section>
  );
}
