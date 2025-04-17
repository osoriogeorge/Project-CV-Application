import { StyleSheet } from "@react-pdf/renderer";

const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.7,
    color: "#333",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#343a40",
    color: "white",
    textAlign: "center",
    paddingVertical: 20,
    marginBottom: 30,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  headerContent: {
    padding: 20,
  },
  name: {
    fontSize: 2.5 * 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
  contact: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 15,
  },
  contactItem: {
    fontSize: 0.95 * 10,
    color: "#eee",
    marginBottom: 2,
  },
  contactItemLink: {
    color: "#add8e6",
    textDecoration: "none",
  },
  section: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: "1px solid #e0e0e0",
  },
  lastSection: {
    borderBottom: "none",
    paddingBottom: 0,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 1.8 * 10,
    color: "#343a40",
    borderBottom: "3px solid #007bff",
    paddingBottom: 8,
    marginBottom: 15,
    fontWeight: "bold",
  },
  experience: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 4,
    shadow: {
      x: 1,
      y: 1,
      blur: 4,
      color: "rgba(0, 0, 0, 0.08)",
    },
  },
  educationItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 4,
    shadow: {
      x: 1,
      y: 1,
      blur: 4,
      color: "rgba(0, 0, 0, 0.08)",
    },
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 10,
  },
  experienceTitle: {
    fontSize: 1.2 * 10,
    color: "#2c3e50",
    marginBottom: 5,
    fontWeight: "bold",
  },
  experienceMeta: {
    color: "#555",
    fontSize: 0.9 * 10,
    marginBottom: 10,
  },
  experienceCompany: {
    fontWeight: "bold",
  },
  experienceDates: {
    fontStyle: "italic",
  },
  experienceDescription: {
    marginBottom: 10,
    lineHeight: 1.6,
  },
  educationDegree: {
    fontSize: 1.2 * 10,
    color: "#2c3e50",
    marginBottom: 5,
    fontWeight: "bold",
  },
  educationMeta: {
    color: "#555",
    fontSize: 0.9 * 10,
    marginBottom: 10,
  },
  educationInstitution: {
    fontWeight: "bold",
  },
  educationDates: {
    fontStyle: "italic",
  },
  description: {
    lineHeight: 1.7,
    color: "#444",
    marginBottom: 20,
  },
});

export default pdfStyles;
