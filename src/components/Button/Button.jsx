import React from "react";
import "./Button.css";

export default function Button({
  children,
  onClick,
  className = "",
  variant,
  disabled,
  type = "button",
  ariaLabel,
  icon,
  ...rest
}) {
  const variantClass = variant ? `button-${variant}` : "";
  const buttonClasses = `button ${variantClass} ${className}`.trim();

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={
        ariaLabel || (typeof children === "string" ? children : undefined)
      }
      {...rest}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  );
}
