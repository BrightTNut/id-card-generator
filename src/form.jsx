import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    schoolname: "",
    image: null,
    dob: "",
    phone: "",
    class: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const imgChange = (e) => {
    const file = e.target.files[0];
    console.log(file); // Log the uploaded file
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (validTypes.includes(file.type)) {
        const imageUrl = URL.createObjectURL(file);
        console.log(imageUrl); // Log the created URL
        setFormData({
          ...formData,
          image: imageUrl,
        });
        setError("");
      } else {
        setError("Please select a valid image (JPEG, PNG, GIF)");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/cards", { state: formData });
    setFormData({
      name: "",
      id: "",
      schoolname: "",
      image: null,
      dob: "",
      phone: "",
      class: "",
    });
  };

  useEffect(() => {
    return () => {
      if (formData.image) {
        URL.revokeObjectURL(formData.image);
      }
    };
  }, [formData.image]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="number"
          id="id"
          name="id"
          placeholder="ID"
          value={formData.id}
          onChange={handleChange}
        />
        <select
          id="schoolname"
          name="schoolname"
          value={formData.schoolname}
          onChange={handleChange}
        >
          <option value="">Select School</option>
          <option value="A">School A</option>
          <option value="B">School B</option>
          <option value="C">School C</option>
        </select>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={imgChange}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {formData.image && (
          <img src={formData.image} alt="Preview" width={100} height={100} />
        )}
        <input
          type="date"
          id="dob"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
        />
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          id="class"
          name="class"
          placeholder="Class"
          value={formData.class}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
