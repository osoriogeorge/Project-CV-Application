import { useState } from "react";
import PersonalInformation from "../PersonalInformation/PersonalInformation.jsx";
import EducationForm from "../Education/Education.jsx";
import ExperienceForm from "../Expercience/Experience.jsx";
import Preview from "./Preview.jsx";
import "./CVBuilder.css";

export default function CVBuilder() {
  const [cvData, setCvData] = useState({
    personalInfo: {},
    experiences: [],
    education: [],
  });

  const handleSavePersonalInfo = (data) => {
    setCvData((prev) => ({ ...prev, personalInfo: data }));
  };

  const handleSaveExperiences = (data) => {
    setCvData((prev) => ({ ...prev, experiences: data }));
  };

  const handleSaveEducation = (data) => {
    setCvData((prev) => ({ ...prev, education: data }));
  };

  return (
    <div className="cv-builder">
      <h1>CV Builder</h1>

      <div className="cv-forms">
        <section className="form-section">
          <h2>Personal Information</h2>
          <PersonalInformation onSave={handleSavePersonalInfo} />
        </section>

        <section className="form-section">
          <h2>Work Experience</h2>
          <ExperienceForm onUpdateExperience={handleSaveExperiences} />
        </section>

        <section className="form-section">
          <h2>Education</h2>
          <EducationForm onUpdateEducation={handleSaveEducation} />
        </section>
      </div>

      <div className="cv-preview">
        <h2>CV Preview</h2>
        <Preview data={cvData} />
      </div>
    </div>
  );
}
