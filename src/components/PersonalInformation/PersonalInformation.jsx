import { useId, useState } from "react";
import "./PersonalInformation.css";
import FormField from "../FormField/FormField.jsx";
import Button from "../Button/Button.jsx";

export default function PersonalInfo({ onSave, onInputChange }) {
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{8,}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number (min 8 digits)";
    }

    if (
      formData.personalWebsite &&
      !/^www.+\..+/.test(formData.personalWebsite)
    ) {
      newErrors.personalWebsite = "Please enter a valid URL )";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    if (validateForm()) {
      try {
        await onSave(formData);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const cleanedValue = value
        .replace(/[^+\d]/g, "")
        .replace(/^(\+?\d+).*$/, "$1");

      let formattedValue = cleanedValue;
      if (cleanedValue.startsWith("+")) {
        const parts = [];
        let numPart = cleanedValue.substring(1);
        for (let i = 0; i < numPart.length; i += 2) {
          parts.push(numPart.substring(i, i + 2));
        }
        formattedValue = "+" + parts.join(" ");
      } else {
        const parts = [];
        for (let i = 0; i < cleanedValue.length; i += 2) {
          parts.push(cleanedValue.substring(i, i + 2));
        }
        formattedValue = parts.join(" ");
      }
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    onInputChange({ ...formData, [name]: e.target.value });

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    if (name === "phone") {
      const cleanedValue = formData.phone.replace(/\s/g, "");
      if (!cleanedValue.trim()) {
        setErrors((prev) => ({ ...prev, [name]: `${name} is required` }));
      } else if (!/^\+?[\d\s-]{8,}$/.test(cleanedValue)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "Please enter a valid phone number (min 8 digits)",
        }));
      } else if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    } else if (!formData[name] && !errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: `${name} is required` }));
    }
  };

  return (
    <div className="form-container">
      <div id="personal-info-section" className="personal-info-section">
        {isSuccess && (
          <div className="success-message">
            Your information has been saved successfully!
          </div>
        )}

        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <form onSubmit={handleSubmit} noValidate className="personal-info-form">
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
    </div>
  );
}
