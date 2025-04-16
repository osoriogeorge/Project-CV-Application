import React from "react";
import "./Preview.css";

export default function Preview({ data }) {
  const {
    personalInfo = {},
    description = "",
    experiences = [],
    education = [],
  } = data;

  // Función para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "short" };
      return date.toLocaleDateString("en-US", options);
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return "Invalid Date";
    }
  };

  return (
    <article className="cv-preview">
      {/* Header con información personal */}
      <header className="cv-header">
        <div className="cv-header-content">
          <h1 className="cv-name">{personalInfo.name || "Your Name"}</h1>
          <div className="cv-contact">
            {personalInfo.email && (
              <p className="cv-contact-item">
                <span className="visually-hidden">Email: </span>
                <a href={`mailto:${personalInfo.email}`}>
                  {personalInfo.email}
                </a>
              </p>
            )}
            {personalInfo.phone && (
              <p className="cv-contact-item">
                <span className="visually-hidden">Phone: </span>
                {personalInfo.phone}
              </p>
            )}
            {personalInfo.personalWebsite && (
              <p className="cv-contact-item">
                <span className="visually-hidden">Website: </span>
                <a
                  href={personalInfo.personalWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {personalInfo.personalWebsite.replace(/^https?:\/\//, "")}
                </a>
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Sección de descripción profesional */}
      {description && (
        <section className="cv-section">
          <h2 className="cv-section-title">Professional Summary</h2>
          <p className="cv-description">{description}</p>
        </section>
      )}

      {/* Sección de experiencia laboral */}
      {experiences.length > 0 && (
        <section className="cv-section">
          <h2 className="cv-section-title">Work Experience</h2>
          <div className="cv-experiences">
            {experiences.map((exp, index) => (
              <div key={`exp-${index}`} className="cv-experience">
                <div className="cv-experience-header">
                  <h3 className="cv-experience-title">
                    {exp.title || "Job Title"}
                  </h3>
                  <div className="cv-experience-meta">
                    {exp.company && (
                      <span className="cv-experience-company">
                        {exp.company}
                      </span>
                    )}
                    {exp.company && exp.startDate && " | "}
                    {exp.startDate && (
                      <span className="cv-experience-dates">
                        {formatDate(exp.startDate)} -{" "}
                        {exp.endDate ? formatDate(exp.endDate) : "Present"}
                      </span>
                    )}
                  </div>
                </div>
                {exp.description && (
                  <div className="cv-experience-description">
                    <p>{exp.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sección de educación */}
      {education.length > 0 && (
        <section className="cv-section">
          <h2 className="cv-section-title">Education</h2>
          <div className="cv-education-list">
            {education.map((edu, index) => (
              <div key={`edu-${index}`} className="cv-education-item">
                <h3 className="cv-education-degree">
                  {edu.degree || "Degree"}
                </h3>
                <div className="cv-education-meta">
                  {edu.school && (
                    <span className="cv-education-institution">
                      {edu.school}
                    </span>
                  )}
                  {edu.school && edu.startDate && " | "}
                  {edu.startDate && (
                    <span className="cv-education-dates">
                      {formatDate(edu.startDate)} -{" "}
                      {edu.endDate ? formatDate(edu.endDate) : "Present"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
