import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import styles from "./MiCVPDF.styles";

const MiCVPDF = ({ data }) => {
  const {
    personalInfo = {},
    description = "",
    experiences = [],
    education = [],
  } = data;

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
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.name}>{personalInfo.name || "Your Name"}</Text>
            <View style={styles.contact}>
              {personalInfo.email && (
                <Text style={styles.contactItem}>
                  Email: {personalInfo.email}
                </Text>
              )}
              {personalInfo.phone && (
                <Text style={styles.contactItem}>
                  Phone: {personalInfo.phone}
                </Text>
              )}
              {personalInfo.personalWebsite && (
                <Text style={styles.contactItem}>
                  Website:{" "}
                  {personalInfo.personalWebsite.replace(/^https?:\/\//, "")}
                </Text>
              )}
            </View>
          </View>
        </View>

        {description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        )}

        {experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experiences.map((exp, index) => (
              <View key={`exp-${index}`} style={styles.experience}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.experienceTitle}>
                    {exp.title || "Job Title"}
                  </Text>
                  <Text style={styles.experienceMeta}>
                    {exp.company && `${exp.company} | `}
                    {exp.startDate &&
                      `${formatDate(exp.startDate)} - ${
                        exp.endDate ? formatDate(exp.endDate) : "Present"
                      }`}
                  </Text>
                </View>
                {exp.description && (
                  <Text style={styles.experienceDescription}>
                    {exp.description}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, index) => (
              <View key={`edu-${index}`} style={styles.educationItem}>
                <Text style={styles.educationDegree}>
                  {edu.degree || "Degree"}
                </Text>
                <Text style={styles.educationMeta}>
                  {edu.school && `${edu.school} | `}
                  {edu.startDate &&
                    `${formatDate(edu.startDate)} - ${
                      edu.endDate ? formatDate(edu.endDate) : "Present"
                    }`}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default MiCVPDF;
