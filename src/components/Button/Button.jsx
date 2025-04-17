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
  loading = false,
  fullWidth = false,
  ...rest
}) {
  const variantClass = variant ? `button-${variant}` : "";
  const buttonClasses = `button ${variantClass} ${className} ${
    loading ? "button-loading" : ""
  } ${fullWidth ? "button-full-width" : ""}`.trim();

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      aria-label={
        ariaLabel || (typeof children === "string" ? children : undefined)
      }
      {...rest}
    >
      {icon && !loading && <span className="button-icon">{icon}</span>}
      {!loading && children}
      {loading && (
        <span className="button-loading-spinner" aria-hidden="true" />
      )}
    </button>
  );
}
