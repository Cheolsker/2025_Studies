"use client";

import { useState } from "react";
import { useCreatePostMutation } from "./mutation";
import ConfirmModal from "./ConfirmModal";
import { useConfirmModal } from "./useConfirmModal";

export default function PromiseAndAsyncConfirm() {
  const createPostMutation = useCreatePostMutation();
  const confirmModal = useConfirmModal();
  const [data, setData] = useState<any>(null);

  const handleLogin = async () => {
    const result = await new Promise<{ success: boolean; data: any }>(
      (resolve, reject) => {
        createPostMutation.mutate(undefined, {
          onSuccess: (result) => {
            resolve({
              success: true,
              data: result,
            });
          },
          onError: (error) => {
            reject({
              success: false,
              data: error,
            });
          },
        });
      }
    );

    if (!result.success) {
      return;
    }

    const confirmed = await new Promise<boolean>((resolve) => {
      confirmModal.confirm({
        title: "확인",
        message: "API 호출 성공! 결과를 볼까요?",
        onConfirm: () => {
          resolve(true);
        },
        onCancel: () => {
          resolve(false);
        },
      });
    });

    if (!confirmed) {
      return;
    }

    setData(result.data);
  };

  return (
    <>
      <div>
        <h1>Promise and Async/Await + TanStack Query Mutation Example</h1>
        <button onClick={handleLogin}>
          {createPostMutation.isPending ? "Loading..." : "API 호출 및 Confirm"}
        </button>

        {data && (
          <pre style={{ marginTop: 20, background: "#eee", padding: 10 }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>

      {confirmModal.open && (
        <ConfirmModal
          open={confirmModal.open}
          title={confirmModal.title}
          message={confirmModal.message}
          onConfirm={confirmModal.handleConfirm}
          onCancel={confirmModal.handleCancel}
        />
      )}
    </>
  );
}
