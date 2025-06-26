import "./Button.css";

function Button({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "medium", 
  disabled = false, 
  type = "button",
  className = "",
  ...props 
}) {
  const buttonClass = `btn btn-${variant} btn-${size} ${className}`.trim();

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;