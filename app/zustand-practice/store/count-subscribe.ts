import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface State {
  count: number;
  double: number;
}
interface Actions {
  actions: {
    increase: () => void;
    decrease: () => void;
    increaseDouble: () => void;
  };
}
interface CountState extends State, Actions {}

const initialState: State = {
  count: 0,
  double: 1,
};

export const useCountStore = create(
  subscribeWithSelector(
    immer<CountState>((set, get) => {
      return {
        ...initialState,
        actions: {
          increase: () => {
            set((state) => {
              state.count += 1;
            });
          },
          decrease: () =>
            set((state) => {
              state.count -= 1;
            }),
          increaseDouble: () => {
            set((state) => {
              state.double *= 2;
            });
          },
        },
      };
    })
  )
);

useCountStore.subscribe(
  (state) => state.count,
  (curr, prev) => {
    console.log("Count changed from", prev, "to", curr);

    useCountStore.getState().actions.increaseDouble();
  }
);
