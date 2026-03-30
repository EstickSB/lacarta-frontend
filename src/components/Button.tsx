import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-full font-sans font-medium transition-all duration-300 flex items-center justify-center gap-2 active:scale-95";
  
  const variants = {
    primary: "bg-powerred text-white hover:bg-powerred-dark shadow-lg shadow-powerred/20 border border-transparent",
    secondary: "bg-transparent text-powerred border border-powerred hover:bg-powerred/5",
    ghost: "bg-transparent text-richblack hover:bg-richblack/5 border border-transparent"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
