import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface State {
  user: {
    email: string;
    displayName: string;
    isValid: boolean;
  } | null;
}
interface Actions {
  actions: {
    signIn: () => void;
    setDisplayName: (name: string) => void;
  };
}

const initialState: State = {
  user: null,
};
export const useUserStore = create(
  immer<State & Actions>((set) => ({
    ...initialState,
    actions: {
      signIn: () => {
        set({
          user: {
            email: "2025-studies@gmail.com",
            displayName: "2025 Studies",
            isValid: true,
          },
        });
      },
      setDisplayName: (name) => {
        set((state) => {
          // immer를 사용하지 않는 경우
          /* 
            if (state.user) {
              return {
                user: {
                  ...state.user,
                  displayName: name,
                },
              };
            }
            // 병합할 상태, 상태 변경 없음!
            return {}; 
          */

          // immer를 사용하는 경우
          if (state.user) {
            state.user.displayName = name;
          }
        });
      },
    },
  }))
);
