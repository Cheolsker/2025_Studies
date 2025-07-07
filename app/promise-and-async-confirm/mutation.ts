import { useMutation } from "@tanstack/react-query";

export const useCreatePostMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "foo",
          body: "bar",
          userId: 1,
        }),
      });

      if (!res.ok) throw new Error("API 호출 실패");
      return res.json();
    },
  });
};
