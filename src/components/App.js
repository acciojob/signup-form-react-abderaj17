import React, { useState } from "react";
import "../styles/App.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "male",
    phoneNumber: "",
    password: "",
  });

  const [error, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    gender: "",
  });

  const [isSubmitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validation = () => {
    const newErrors = { name: "", email: "", phoneNumber: "", password: "", gender: "" };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.name)) {
      newErrors.name = "Name is not valid";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Email must contain @.";
      isValid = false;
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
      isValid = false;
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone Number must contain only numbers.";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters.";
      isValid = false;
    }

    if (!["male", "female", "others"].includes(formData.gender)) {
      newErrors.gender = "Please identify as male, female, or others.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      setSubmitted(true);
    }
  };

  return (
    <div id="main">
      <div className="validation-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            data-test-id="name"
          />
          {error.name && <p className="error">{error.name}</p>}

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            data-test-id="email"
          />
          {error.email && <p className="error">{error.email}</p>}

          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            data-test-id="gender"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            data-test-id="phoneNumber"
          />
          {error.phoneNumber && <p className="error">{error.phoneNumber}</p>}

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            data-test-id="password"
          />
          {error.password && <p className="error">{error.password}</p>}

          <button data-test-id="submit" type="submit">
            Submit
          </button>
        </form>

        {isSubmitted && <h3>Hello {formData.email.split("@")[0]}</h3>}
      </div>
    </div>
  );
};

export default App;
