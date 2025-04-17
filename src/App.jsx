import { useState, useId } from "react";
import PersonalInformation from "./components/PersonalInformation/PersonalInformation.jsx";
import Description from "./components/Description/Description.jsx";
import EducationForm from "./components/Education/Education.jsx";
import ExperienceForm from "./components/Expercience/Experience.jsx";
import Preview from "./components/Preview/Preview.jsx";
import MiCVPDF from "./components/MiCVPDF/MiCVPDF.jsx";
import { PDFDownloadLink } from "@react-pdf/renderer";
import "./styles/App.css";

export default function App() {
  const [cvData, setCvData] = useState({
    personalInfo: {},
    description: "",
    experiences: [],
    education: [],
  });
  const [activeForm, setActiveForm] = useState(null);
  const personalInfoId = useId();
  const descriptionId = useId();
  const experienceFormId = useId();
  const educationFormId = useId();

  const handlePersonalInfoChange = (data) => {
    setCvData((prev) => ({ ...prev, personalInfo: data }));
  };
  const handleDescriptionChange = (data) => {
    setCvData((prev) => ({ ...prev, description: data.description }));
  };

  const handleExperienceChange = (data) => {
    setCvData((prev) => ({ ...prev, experiences: data }));
  };

  const handleEducationChange = (data) => {
    setCvData((prev) => ({ ...prev, education: data }));
  };

  const toggleForm = (formName) => {
    setActiveForm((prevActiveForm) =>
      prevActiveForm === formName ? null : formName
    );
  };

  return (
    <div className="cv-builder">
      <div className="cv-forms">
        <section className="form-section">
          <button
            id={personalInfoId}
            type="button"
            onClick={() => toggleForm("personal")}
            className="collapse-button"
            aria-expanded={activeForm !== "personal"}
            aria-controls="personal-info-section"
            style={{ fontSize: "1.2em" }}
          >
            {activeForm === "personal" ? "\u25B4" : "\u25BE"} Personal
            Information
          </button>
          {activeForm === "personal" && (
            <PersonalInformation
              onSave={handlePersonalInfoChange}
              onInputChange={handlePersonalInfoChange}
            />
          )}
        </section>

        <section className="form-section">
          <button
            id={descriptionId}
            type="button"
            onClick={() => toggleForm("description")}
            className="collapse-button"
            aria-expanded={activeForm !== "description"}
            aria-controls="description-section"
            style={{ fontSize: "1.2em" }}
          >
            {activeForm === "description" ? "\u25B4" : "\u25BE"} Description
          </button>
          {activeForm === "description" && (
            <Description
              onSave={handleDescriptionChange}
              onInputChange={handleDescriptionChange}
            />
          )}
        </section>

        <section className="form-section">
          <button
            id={experienceFormId}
            type="button"
            onClick={() => toggleForm("experience")}
            className="collapse-button"
            aria-expanded={activeForm !== "experience"}
            aria-controls="experience-section"
            style={{ fontSize: "1.2em" }}
          >
            {activeForm === "experience" ? "\u25B4" : "\u25BE"} Experience
          </button>
          {activeForm === "experience" && (
            <ExperienceForm
              onUpdateExperience={handleExperienceChange}
              onInputChange={handleExperienceChange}
            />
          )}
        </section>

        <section className="form-section">
          <button
            id={educationFormId}
            type="button"
            onClick={() => toggleForm("education")}
            className="collapse-button"
            aria-expanded={activeForm !== "education"}
            aria-controls="education-section"
            style={{ fontSize: "1.2em" }}
          >
            {activeForm === "education" ? "\u25B4" : "\u25BE"} Education
          </button>
          {activeForm === "education" && (
            <EducationForm
              onUpdateEducation={handleEducationChange}
              onInputChange={handleEducationChange}
            />
          )}
        </section>
      </div>

      <div className="cv-preview-container">
        <Preview data={cvData} />

        {/* Botón de descarga del PDF */}
        <div className="download-button-container">
          <PDFDownloadLink
            document={<MiCVPDF data={cvData} />}
            fileName="mi_cv.pdf"
          >
            {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
}
