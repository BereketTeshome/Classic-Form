import React, { useState } from "react";
import Rating from "react-rating-stars-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    ratings: { quality: 0, variety: 0, service: 0 },
    comments: { quality: "", variety: "", service: "" },
  });

  const [language, setLanguage] = useState("amharic"); // default language

  const handleLanguageToggle = (lang) => {
    setLanguage(lang);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (field, newRating) => {
    setFormData((prevState) => ({
      ...prevState,
      ratings: { ...prevState.ratings, [field]: newRating },
    }));
  };

  const handleCommentChange = (field, e) => {
    setFormData((prevState) => ({
      ...prevState,
      comments: { ...prevState.comments, [field]: e.target.value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, ratings } = formData;
    const selectedRatings = Object.values(ratings).filter(
      (rating) => rating > 0
    );

    if (!phone || selectedRatings.length < 2) {
      toast.error("Please complete phone number and at least two ratings.");
      return;
    }

    emailjs
      .send("your_service_id", "your_template_id", formData, "your_user_id")
      .then(
        (result) => {
          toast.success("Thank you! Your experience has been submitted.");
          console.log("Email sent successfully:", result.text);
        },
        (error) => {
          toast.error("Failed to send email. Please try again.");
          console.error("Email sending error:", error);
        }
      );

    console.log("Form data submitted:", formData);
  };

  return (
    <div style={styles.container}>
      {/* Language Toggle */}
      <div style={styles.languageToggle}>
        <button
          onClick={() => handleLanguageToggle("amharic")}
          style={{
            ...styles.languageButton,
            backgroundColor: language === "amharic" ? "#008080" : "#0000003a",
            color: language === "amharic" ? "#fff" : "#fff",
          }}
        >
          Amharic
        </button>
        <span style={{ color: "#fff", fontSize: "28px" }}> | </span>
        <button
          onClick={() => handleLanguageToggle("english")}
          style={{
            ...styles.languageButton,
            backgroundColor: language === "english" ? "#008080" : "#0000003a",
            color: language === "english" ? "#fff" : "#fff",
          }}
        >
          English
        </button>
      </div>

      <h2 style={{ ...styles.heading, color: "#fff" }}>
        {" "}
        {/* Change title color */}
        Classic Furniture - Customer Experience Survey
      </h2>

      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            style={styles.input}
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            style={styles.input}
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Phone (required)</label>
          <input
            type="tel"
            name="phone"
            style={styles.input}
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Rating Questions */}
        {["quality", "variety", "service"].map((field, index) => (
          <div key={index} style={styles.question}>
            <label style={styles.label}>
              {field === "quality"
                ? language === "amharic"
                  ? "በእኛ የቤት ዕቃዎች ጥራት እና ዲዛይን ምን ያህል ረክተዋል?"
                  : "How satisfied are you with the quality and design of our furniture products?"
                : field === "variety"
                ? language === "amharic"
                  ? "የእኛ የቤት ዕቃዎች ፍላጎቶችዎን ለማሟላት ሰፋ ያለ የተለያዩ ምርቶችን ያቀርባል?"
                  : "Does our Furniture offer a wide enough variety of products to meet your needs?"
                : language === "amharic"
                ? "በደንበኛ አገልግሎታችን ምን ያህል ረክተዋል?"
                : "How satisfied are you with our customer service?"}
            </label>
            <Rating
              count={5}
              onChange={(rating) => handleRatingChange(field, rating)}
              size={30}
              activeColor="#ffd700"
            />
            <textarea
              placeholder="Any comments, suggestions, or complaints?"
              style={styles.textArea}
              value={formData.comments[field]}
              onChange={(e) => handleCommentChange(field, e)}
            />
          </div>
        ))}

        <button type="submit" style={styles.submitButton}>
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundImage: "url('/furniture-bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  },
  languageToggle: {
    fontSize: "20px",
    marginBottom: "10px",
    color: "#333",
    display: "flex",
    gap: "10px",
  },
  languageButton: {
    fontSize: "22px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    padding: "10px 17px",
    cursor: "pointer",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "20px",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Georgia, serif",
  },
  form: {
    backgroundColor: "#ffffffcc",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.7)",
    width: "100%",
    maxWidth: "500px",
    backdropFilter: "blur(10px)",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "5px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  question: {
    marginBottom: "20px",
  },
  textArea: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginTop: "10px",
    fontSize: "14px",
    minHeight: "60px",
    boxSizing: "border-box",
  },
  submitButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#008080",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default App;
