import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
  title: string;
  onClick?: () => void;
  variant?: "primary" | "success" | "danger";
  type?: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>["type"];
}

export const Button = ({ title, onClick, type, variant = "primary" }: ButtonProps) => {
  const baseStyles = {
    color: 'white',
    padding: '0.25rem 1rem', // Equivalente a py-1 px-4
    borderRadius: '0.25rem', // Equivalente a rounded
    cursor: 'pointer',
    border: 'none',
    fontWeight: 'bold',
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'blue',
      ':hover': { // Pseudo-selector para el hover (esto no es estándar en style)
        backgroundColor: 'darkblue',
      },
    },
    success: {
      backgroundColor: 'green',
      ':hover': {
        backgroundColor: 'darkgreen',
      },
    },
    danger: {
      backgroundColor: 'red',
      ':hover': {
        backgroundColor: 'darkred',
      },
    },
  };

  const currentVariantStyle = variantStyles[variant] || variantStyles.primary;

  return (
    <button
      type={type}
      style={{ ...baseStyles, ...currentVariantStyle }}
      onClick={onClick}
    >
      {title}
    </button>
  );
};