import React, { useState, useId } from "react";
import FormField from "../FormField/FormField.jsx";
import Button from "../Button/Button.jsx";
import "./Education.css";

export default function EducationForm({ onUpdateEducation }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [educationList, setEducationList] = useState([
    { id: Date.now(), school: "", degree: "", startDate: "", endDate: "" },
  ]);
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generación de IDs únicos para accesibilidad
  const schoolId = useId();
  const degreeId = useId();
  const startDateId = useId();
  const endDateId = useId();
  const collapseButtonId = useId(); // ID for the collapse button

  const handleAddEducation = () => {
    setEducationList([
      ...educationList,
      { id: Date.now(), school: "", degree: "", startDate: "", endDate: "" },
    ]);
    setErrors([...errors, {}]);
  };

  const handleRemoveEducation = (id) => {
    setEducationList(educationList.filter((edu) => edu.id !== id));
    setErrors(
      errors.filter(
        (err, index) =>
          educationList.findIndex((edu) => edu.id === id) !== index
      )
    );
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedEducationList = educationList.map((edu, i) =>
      i === index ? { ...edu, [name]: value } : edu
    );
    setEducationList(updatedEducationList);
    // Clear error for this field if it exists
    const updatedErrors = errors.map((err, i) =>
      i === index ? { ...err, [name]: "" } : err
    );
    setErrors(updatedErrors);
  };

  const handleBlur = (index, name, value) => {
    if (!value && !errors[index]?.hasOwnProperty(name)) {
      const updatedErrors = [...errors];
      updatedErrors[index] = {
        ...updatedErrors[index],
        [name]: `This field is required`,
      };
      setErrors(updatedErrors);
    }
  };

  const validateForm = () => {
    const newErrors = educationList.map(() => ({}));
    let isValid = true;

    educationList.forEach((edu, index) => {
      if (!edu.school.trim()) {
        newErrors[index].school = "School name is required.";
        isValid = false;
      }
      if (!edu.degree.trim()) {
        newErrors[index].degree = "Degree/Title is required.";
        isValid = false;
      }
      // Optional: Add validation for dates if needed
      if (edu.endDate && edu.startDate && edu.endDate < edu.startDate) {
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
        await onUpdateEducation(educationList);
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

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2 className="form-title">Education</h2>
        <Button
          id={collapseButtonId}
          type="button"
          onClick={toggleCollapse}
          className="collapse-button"
          aria-expanded={!isCollapsed}
          aria-controls="education-section"
        >
          {isCollapsed ? "Show Education" : "Hide Education"}
        </Button>
      </div>

      {!isCollapsed && (
        <div id="education-section" className="education-section">
          {isSuccess && (
            <div className="success-message">
              Your education information has been saved successfully!
            </div>
          )}

          {errors.some((err) => err?.submit) && (
            <div className="error-message">
              {errors.find((err) => err?.submit)?.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="education-form">
            {educationList.map((education, index) => (
              <div key={education.id} className="education-entry">
                <FormField
                  id={`${schoolId}-${index}`}
                  label="School Name:"
                  name="school"
                  value={education.school}
                  onChange={(e) => handleChange(index, e)}
                  onBlur={(e) => handleBlur(index, "school", e.target.value)}
                  error={errors[index]?.school}
                  required
                  placeholder="e.g., University of Paris"
                />
                <FormField
                  id={`${degreeId}-${index}`}
                  label="Degree/Title:"
                  name="degree"
                  value={education.degree}
                  onChange={(e) => handleChange(index, e)}
                  onBlur={(e) => handleBlur(index, "degree", e.target.value)}
                  error={errors[index]?.degree}
                  required
                  placeholder="e.g., Master's in Computer Science"
                />
                <div className="date-fields">
                  <FormField
                    id={`${startDateId}-${index}`}
                    label="Start Date:"
                    name="startDate"
                    type="date"
                    value={education.startDate}
                    onChange={(e) => handleChange(index, e)}
                    onBlur={(e) =>
                      handleBlur(index, "startDate", e.target.value)
                    }
                    error={errors[index]?.startDate}
                    placeholder="YYYY-MM-DD"
                  />
                  <FormField
                    id={`${endDateId}-${index}`}
                    label="End Date:"
                    name="endDate"
                    type="date"
                    value={education.endDate}
                    onChange={(e) => handleChange(index, e)}
                    onBlur={(e) => handleBlur(index, "endDate", e.target.value)}
                    error={errors[index]?.endDate}
                    placeholder="YYYY-MM-DD or leave blank if ongoing"
                  />
                </div>
                {educationList.length > 1 && (
                  <Button
                    type="button"
                    variant="remove"
                    onClick={() => handleRemoveEducation(education.id)}
                    className="remove-button"
                  >
                    Remove Education
                  </Button>
                )}
              </div>
            ))}
            <div className="form-actions">
              <Button
                variant="add"
                type="button"
                onClick={handleAddEducation}
                className="add-button"
              >
                Add Education
              </Button>
              <Button
                variant="save"
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="save-button"
              >
                {isSubmitting ? (
                  <span className="button-loading">
                    <span className="spinner"></span>
                    Saving...
                  </span>
                ) : (
                  "Save Education"
                )}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
