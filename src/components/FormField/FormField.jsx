import React from "react";
import "./FormField.css";

export default function FormField({
  id,
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required,
  placeholder,
}) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
