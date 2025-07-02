import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

export default function Button({ label, variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`fancy-btn btn-${variant} ${className}`}
      {...props}
    >
      {label}
    </button>
  );
}
