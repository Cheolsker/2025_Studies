import { useState, useCallback } from "react";

type ConfirmOptions = {
  title?: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export function useConfirmModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string>("");
  const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>();
  const [onCancel, setOnCancel] = useState<(() => void) | undefined>();

  const confirm = useCallback(
    ({ title, message, onConfirm, onCancel }: ConfirmOptions) => {
      setTitle(title);
      setMessage(message);
      setOnConfirm(() => onConfirm);
      setOnCancel(() => onCancel);
      setOpen(true);
    },
    []
  );

  const handleConfirm = useCallback(() => {
    setOpen(false);
    if (onConfirm) onConfirm();
    setTitle(undefined);
    setMessage("");
    setOnConfirm(undefined);
    setOnCancel(undefined);
  }, [onConfirm]);

  const handleCancel = useCallback(() => {
    setOpen(false);
    if (onCancel) onCancel();
    setTitle(undefined);
    setMessage("");
    setOnConfirm(undefined);
    setOnCancel(undefined);
  }, [onCancel]);

  return {
    open,
    title,
    message,
    confirm,
    handleConfirm,
    handleCancel,
  };
}