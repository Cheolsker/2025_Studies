"use client";
import React from "react";

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 8,
          minWidth: 300,
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        {title && <h2 style={{ marginTop: 0 }}>{title}</h2>}
        <p>{message}</p>
        <button onClick={onConfirm} style={{ marginRight: 8 }}>
          OK
        </button>
        <button onClick={onCancel}>취소</button>
      </div>
    </div>
  );
}