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
    suggestions: "",
  });

  const [language, setLanguage] = useState("amharic");
  const [loading, setLoading] = useState(false);

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

  const handleSuggestionsChange = (e) => {
    setFormData({ ...formData, suggestions: e.target.value });
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
    setLoading(true);
    emailjs
      .send(
        "service_toqrs0b",
        "template_cb2zvuj",
        {
          to_name: "Survey Team",
          from_name: formData.name || "Anonymous",
          phone: formData.phone,
          quality_rating: formData.ratings.quality,
          variety_rating: formData.ratings.variety,
          service_rating: formData.ratings.service,
          quality_comment: formData.comments.quality,
          variety_comment: formData.comments.variety,
          service_comment: formData.comments.service,
          suggestions: formData.suggestions || "N/A",
        },
        "XuUj1qmYbuiJUz5iM"
      )
      .then(
        (result) => {
          toast.success("Thank you! Your experience has been submitted.");
          setLoading(false);
          console.log("Email sent successfully:", result.text);
        },
        (error) => {
          toast.error("Failed to send email. Please try again.");
          setLoading(false);
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
            backgroundColor: language === "amharic" ? "#8B0000" : "#0000003a",
            color: language === "amharic" ? "#fff" : "#fff",
          }}
        >
          አማርኛ
        </button>
        <span style={{ color: "#fff", fontSize: "28px" }}> | </span>
        <button
          onClick={() => handleLanguageToggle("english")}
          style={{
            ...styles.languageButton,
            backgroundColor: language === "english" ? "#8B0000" : "#0000003a",
            color: language === "english" ? "#fff" : "#fff",
          }}
        >
          English
        </button>
      </div>

      <h2 style={{ ...styles.heading, color: "#fff" }}>
        Classic Furniture -{" "}
        {language === "english"
          ? "Customer Experience Survey"
          : "የደንበኛ ልምድ ዳሰሳ"}
      </h2>

      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            {language === "english" ? "Phone" : "ስልክ"} (
            {language === "english" ? "required" : "አስፈላጊ"})
          </label>
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
                  ? "በዕቃዎች ጥራት እና ዲዛይን ምን ያህል ረክተዋል?"
                  : "How satisfied are you with the quality and design of our furniture products?"
                : field === "variety"
                ? language === "amharic"
                  ? "ፍላጎቶችዎን ለማሟላት ሰፋ ያለ የተለያዩ አማራጮች አግኝተዋል?"
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
              placeholder={
                language === "english"
                  ? "Any comments, suggestions, or complaints?"
                  : "አስተያየቶች፣ ጥቆማዎች ወይም ቅሬታዎች አልዎት?"
              }
              style={styles.textArea}
              value={formData.comments[field]}
              onChange={(e) => handleCommentChange(field, e)}
            />
          </div>
        ))}

        {/* Additional Suggestions */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            {language === "english"
              ? "If you have any other comments?"
              : "ሌላ አስተያየት ካለዎት?"}
          </label>
          <textarea
            name="suggestions"
            style={styles.textArea}
            value={formData.suggestions}
            onChange={handleSuggestionsChange}
            placeholder={
              language === "english"
                ? "Please share any additional comments."
                : "እባክዎን ማንኛውንም ተጨማሪ አስተያየት ካሎት ያካፍሉ"
            }
          />
        </div>

        <div style={styles.submitButtonContainer}>
          <button type="submit" style={styles.submitButton} disabled={loading}>
            {loading ? (
              <span role="status" aria-hidden="true">
                Loading...
              </span>
            ) : language === "english" ? (
              "Submit"
            ) : (
              "ላክ"
            )}
          </button>
        </div>
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
    backgroundColor: "#8B0000", // Dark red background
    backgroundImage: "url('/furniture-bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  },
  languageToggle: {
    fontSize: "20px",
    marginBottom: "10px",
    color: "#fff",
    display: "flex",
    gap: "10px",
  },
  languageButton: {
    fontSize: "22px",
    fontWeight: "bold",
    border: "2px solid #FF6347", // Red border for the buttons
    backgroundColor: "transparent",
    color: "#FF6347",
    borderRadius: "5px",
    padding: "10px 17px",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
  },
  heading: {
    fontSize: "26px",
    marginBottom: "20px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFDAB9", // Light peach color for contrast
    backgroundColor: "#bd3636f5", // Match with red theme
    borderRadius: "10px",
    padding: "15px",
  },
  form: {
    backgroundColor: "#b62020e0", // Light background for the form
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
    color: "#fff",
    marginBottom: "5px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #8B0000", // Red border for input fields
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
    border: "1px solid #8B0000",
    marginTop: "10px",
    fontSize: "14px",
    minHeight: "70px",
    boxSizing: "border-box",
  },
  submitButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    color: "#333", // Light text color on button
    backgroundColor: "#fff",
    border: "2px solid #8B0000",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonContainer: {
    textAlign: "center",
  },
};

export default App;
