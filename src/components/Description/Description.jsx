import { useId, useState } from "react";
import FormField from "../FormField/FormField.jsx";
import Button from "../Button/Button.jsx";

export default function Description({ onSave, onInputChange }) {
  const [formData, setFormData] = useState({
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const descriptionId = useId();

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters";
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

  // Manejo de cambios en el campo
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Llama a la función onInputChange para notificar al padre del cambio
    onInputChange({ ...formData, [name]: value });

    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validación cuando el campo pierde el foco
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim() && !errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: `${name} is required` }));
    } else if (
      name === "description" &&
      value.trim().length < 20 &&
      !errors[name]
    ) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Description must be at least 20 characters",
      }));
    }
  };

  return (
    <div className="form-container">
      <div id="description-section" className="description-section">
        {isSuccess && (
          <div className="success-message">Description saved successfully!</div>
        )}
        {errors.submit && <div className="error-message">{errors.submit}</div>}
        <form onSubmit={handleSubmit} noValidate className="description-form">
          <FormField
            id={descriptionId}
            label="Professional Summary:"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.description}
            required
            placeholder="A brief summary of your professional experience and goals"
          />
          <div className="form-actions">
            <Button
              variant="save"
              type="submit"
              disabled={isSubmitting}
              className="save-button"
            >
              {isSubmitting ? (
                <span className="button-loading">
                  <span className="spinner"></span>
                  Saving...
                </span>
              ) : (
                "Save Description"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
