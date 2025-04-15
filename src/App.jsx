import { useState } from "react";
import PersonalInformation from "./components/PersonalInformation/PersonalInformation.jsx";
import EducationForm from "./components/Education/Education.jsx";
import ExperienceForm from "./components/Expercience/Experience.jsx";
import Preview from "./components/Preview/Preview.jsx";
import "./components/Preview/Preview.jsx";
import "./styles/App.css";

export default function App() {
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
      <div className="cv-forms">
        <section className="form-section">
          <PersonalInformation onSave={handleSavePersonalInfo} />
        </section>

        <section className="form-section">
          <ExperienceForm onUpdateExperience={handleSaveExperiences} />
        </section>

        <section className="form-section">
          <EducationForm onUpdateEducation={handleSaveEducation} />
        </section>
      </div>

      <div className="cv-preview-container">
        <Preview data={cvData} />
      </div>
    </div>
  );
}
