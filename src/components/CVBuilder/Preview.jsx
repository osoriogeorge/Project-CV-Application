import React from "react";

export default function Preview({ data }) {
  const { personalInfo = {}, experiences = [], education = [] } = data;

  // Función para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString("en-US", options);
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
                  {edu.institution && (
                    <span className="cv-education-institution">
                      {edu.institution}
                    </span>
                  )}
                  {edu.institution && edu.year && " | "}
                  {edu.year && (
                    <span className="cv-education-year">{edu.year}</span>
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
