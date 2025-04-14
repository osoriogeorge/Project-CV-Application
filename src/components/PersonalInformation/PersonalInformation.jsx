import { useId, useState } from "react";
import "./PersonalInformation.css";
import FormField from "../FormField/FormField.jsx";
import Button from "../Button/Button.jsx";

export default function PersonalInfo({ onSave }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    personalWebsite: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generación de IDs únicos para accesibilidad
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const websiteId = useId();
  const collapseButtonId = useId(); // ID for the collapse button

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {};

    // Validación de nombre
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Validación de email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Validación de teléfono
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{8,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (min 8 digits)";
    }

    // Validación de website (opcional)
    if (
      formData.personalWebsite &&
      !/^https?:\/\/.+\..+/.test(formData.personalWebsite)
    ) {
      newErrors.personalWebsite =
        "Please enter a valid URL (include http:// or https://)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    if (validateForm()) {
      try {
        await onSave(formData);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000); // Oculta el mensaje después de 3 segundos
      } catch (error) {
        console.error("Save failed:", error);
        setErrors({ submit: "Failed to save. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  // Manejo de cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validación cuando el campo pierde el foco
  const handleBlur = (e) => {
    const { name } = e.target;
    if (!formData[name] && !errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: `${name} is required` }));
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2 className="personal-info-title">Personal Information</h2>
        <Button
          id={collapseButtonId}
          type="button"
          onClick={toggleCollapse}
          className="collapse-button"
          aria-expanded={!isCollapsed}
          aria-controls="personal-info-section"
        >
          {isCollapsed
            ? "Show Personal Information"
            : "Hide Personal Information"}
        </Button>
      </div>

      {!isCollapsed && (
        <div id="personal-info-section" className="personal-info-section">
          {isSuccess && (
            <div className="success-message">
              Your information has been saved successfully!
            </div>
          )}

          {errors.submit && (
            <div className="error-message">{errors.submit}</div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="personal-info-form"
          >
            <FormField
              id={nameId}
              label="Full Name:"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              required
              placeholder="Your full name"
              autoComplete="name"
            />

            <FormField
              id={emailId}
              label="Email:"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              required
              placeholder="your.email@example.com"
              autoComplete="email"
            />

            <FormField
              id={phoneId}
              label="Phone Number:"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
              required
              placeholder="+33 6 XX XX XX XX"
              autoComplete="tel"
            />

            <FormField
              id={websiteId}
              label="Personal Website:"
              name="personalWebsite"
              type="url"
              value={formData.personalWebsite}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.personalWebsite}
              placeholder="https://your-website.com"
              autoComplete="url"
            />

            <div className="form-actions">
              <Button
                variant="save"
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? (
                  <span className="button-loading">
                    <span className="spinner"></span>
                    Saving...
                  </span>
                ) : (
                  "Save Information"
                )}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
