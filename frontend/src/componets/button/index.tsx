import React, { FC, ButtonHTMLAttributes } from 'react';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const CustomButton: FC<CustomButtonProps> = ({ 
  children, 
  onClick, 
  className = '', 
  disabled = false, 
  type = "button", 
  ...rest 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 
        disabled:bg-amber-300 disabled:cursor-not-allowed ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default CustomButton;
