import { useId } from "react";
import "./PersonalInformation.css";
import { useState } from "react";

export default function PersonalInfo({ onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    age: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission status

  const ids = {
    name: useId(),
    email: useId(),
    phone: useId(),
    linkedin: useId(),
    age: useId(),
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Nombre requerido";
    else if (formData.name.length < 2) newErrors.name = "Mínimo 2 caracteres";

    if (!formData.email) newErrors.email = "Email requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.phone) newErrors.phone = "Teléfono requerido";
    else if (!/^\d{9,15}$/.test(formData.phone)) {
      newErrors.phone = "9-15 dígitos requeridos";
    }

    if (formData.linkedin && !/linkedin\.com\/in\/.+/.test(formData.linkedin)) {
      newErrors.linkedin = "URL de LinkedIn inválida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true); // Set submitting state to true
      // Simular envío a API
      setTimeout(() => {
        onSave?.(formData);
        setIsSubmitting(false); // Set submitting state back to false
      }, 1000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <form onSubmit={handleSubmit} className="personal-form">
      <fieldset>
        <legend>Información Personal</legend>

        <FormField
          id={ids.name}
          label="Nombre Completo*"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        <FormField
          id={ids.email}
          label="Email*"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <FormField
          id={ids.phone}
          label="Teléfono*"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
          placeholder="Ej: 123456789"
        />

        <FormField
          id={ids.linkedin}
          label="LinkedIn"
          name="linkedin"
          type="url"
          value={formData.linkedin}
          onChange={handleChange}
          error={errors.linkedin}
          placeholder="https://linkedin.com/in/yourprofile"
        />

        <div className="form-actions">
          <Button isSubmitting={isSubmitting} />
        </div>
      </fieldset>
    </form>
  );
}
