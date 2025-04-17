import React, { useState, useId } from "react";
import FormField from "../FormField/FormField.jsx";
import Button from "../Button/Button.jsx";
//import "./Experience.css";

// Recibe onInputChange como prop
export default function ExperienceForm({ onUpdateExperience, onInputChange }) {
  const [experiences, setExperiences] = useState([
    {
      id: Date.now(),
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generación de IDs únicos para accesibilidad
  const titleId = useId();
  const companyId = useId();
  const startDateId = useId();
  const endDateId = useId();
  const descriptionId = useId();

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now(),
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
    setErrors([...errors, {}]);
  };

  const handleRemoveExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
    setErrors(
      errors.filter(
        (err, index) => experiences.findIndex((exp) => exp.id === id) !== index
      )
    );
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedExperiences = experiences.map((exp, i) =>
      i === index ? { ...exp, [name]: value } : exp
    );
    setExperiences(updatedExperiences);

    // Llama a onInputChange con la lista de experiencias actualizada
    onInputChange(updatedExperiences);

    // Clear the error for this field if it exists
    const updatedErrors = errors.map((err, i) =>
      i === index ? { ...err, [name]: "" } : err
    );
    setErrors(updatedErrors);
  };

  const handleBlur = (index, name, value) => {
    if (!value && !Object.prototype.hasOwnProperty.call(errors[index], name)) {
      const updatedErrors = [...errors];
      updatedErrors[index] = {
        ...updatedErrors[index],
        [name]: `This field is required`,
      };
      setErrors(updatedErrors);
    }
  };

  const validateForm = () => {
    const newErrors = experiences.map(() => ({}));
    let isValid = true;

    experiences.forEach((exp, index) => {
      if (!exp.title.trim()) {
        newErrors[index].title = "Job Title is required";
        isValid = false;
      }
      if (!exp.company.trim()) {
        newErrors[index].company = "Company is required";
        isValid = false;
      }
      if (!exp.startDate) {
        newErrors[index].startDate = "Start Date is required";
        isValid = false;
      }
      // Validación de fechas (endDate debe ser posterior a startDate si existe)
      if (exp.endDate && exp.startDate && exp.endDate < exp.startDate) {
        newErrors[index].endDate = "End Date must be after Start Date";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    if (validateForm()) {
      try {
        await onUpdateExperience(experiences);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      } catch (error) {
        console.error("Save failed:", error);
        setErrors([...errors, { submit: "Failed to save. Please try again." }]);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <div id="experience-section" className="experience-section">
        {isSuccess && (
          <div className="success-message">
            Your experiences have been saved successfully!
          </div>
        )}

        {errors.some((err) => err.submit) && (
          <div className="error-message">
            {errors.find((err) => err.submit)?.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="experience-form">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="experience-entry">
              <FormField
                id={`${titleId}-${index}`}
                label="Job Title:"
                name="title"
                value={experience.title}
                onChange={(e) => handleChange(index, e)}
                onBlur={(e) => handleBlur(index, "title", e.target.value)}
                error={errors[index]?.title}
                required
                placeholder="e.g., Software Engineer"
              />

              <FormField
                id={`${companyId}-${index}`}
                label="Company:"
                name="company"
                value={experience.company}
                onChange={(e) => handleChange(index, e)}
                onBlur={(e) => handleBlur(index, "company", e.target.value)}
                error={errors[index]?.company}
                required
                placeholder="e.g., Google"
              />

              <div className="date-fields">
                <FormField
                  id={`${startDateId}-${index}`}
                  label="Start Date:"
                  name="startDate"
                  type="date"
                  value={experience.startDate}
                  onChange={(e) => handleChange(index, e)}
                  onBlur={(e) => handleBlur(index, "startDate", e.target.value)}
                  error={errors[index]?.startDate}
                  required
                />

                <FormField
                  id={`${endDateId}-${index}`}
                  label="End Date:"
                  name="endDate"
                  type="date"
                  value={experience.endDate}
                  onChange={(e) => handleChange(index, e)}
                  onBlur={(e) => handleBlur(index, "endDate", e.target.value)}
                  error={errors[index]?.endDate}
                  placeholder="Leave blank if current"
                />
              </div>

              <FormField
                id={`${descriptionId}-${index}`}
                label="Description:"
                name="description"
                type="textarea"
                value={experience.description}
                onChange={(e) => handleChange(index, e)}
                placeholder="Describe your responsibilities and achievements"
              />

              {experiences.length > 1 && (
                <Button
                  variant="remove"
                  type="button"
                  onClick={() => handleRemoveExperience(experience.id)}
                  className="remove-button"
                >
                  Remove Experience
                </Button>
              )}
            </div>
          ))}

          <div className="form-actions">
            <Button
              variant="add"
              type="button"
              onClick={handleAddExperience}
              className="add-button"
            >
              Add Experience
            </Button>

            <Button
              variant="save"
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              className="save-button"
            >
              Save Experiences
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
