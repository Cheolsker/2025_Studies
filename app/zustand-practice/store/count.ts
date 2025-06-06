import { omit } from "lodash-es";
import { create } from "zustand";

interface State {
  count: number;
  double: number;
  min: number;
  max: number;
}
interface Actions {
  actions: {
    increase: () => void;
    decrease: () => void;
    increaseDouble: () => void;
    resetState: (keys?: Array<keyof State>) => void;
    deleteState: (keys: Array<keyof State>) => void;
  };
}
interface CountState extends State, Actions {}

const initialState: State = {
  count: 0,
  double: 2,
  min: 1,
  max: 99,
};

export const useCountStore = create<CountState>((set, get) => {
  return {
    ...initialState,
    actions: {
      increase: () => {
        get().actions.increaseDouble(); // double 상태 증가

        set((state) => ({ count: state.count + 1 }));
      },
      decrease: () => set((state) => ({ count: state.count - 1 })),
      increaseDouble: () =>
        set((state) => ({
          double: state.double + 1,
        })),
      resetState: (keys) => {
        // 전체 상태 초기화
        if (!keys) {
          set(initialState);
          return;
        }
        // 일부 상태 초기화
        keys.forEach((key) => {
          set({ [key]: initialState[key] });
        });
      },
      deleteState: (keys) => {
        // native JS
        /* set((state) => {
          const newState = { ...state };
          keys.forEach((key) => {
            delete newState[key];
          });
          return newState;

        }, true); */

        set((state) => omit(state, keys), true);
      },
    },
  };
});
