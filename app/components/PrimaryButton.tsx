import React from "react";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`
        bg-blue-600 
        text-white 
        px-4 
        py-2 
        rounded-lg 
        font-medium 
        transition-colors 
        duration-200 
        hover:bg-blue-700 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500 
        focus:ring-offset-2 
        disabled:opacity-50 
        disabled:cursor-not-allowed
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </button>
  );
};
