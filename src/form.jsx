import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    schoolname: "",
    image: null,
    dob: "",
    phone: "",
    classes: "",
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
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (file) {
      if (validTypes.includes(file.type)) {
        const imageUrl = URL.createObjectURL(file);
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

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    navigate("/cards", { state: formData });

    // Create a new object excluding the image field
    const { image, ...dataToSend } = formData;

    try {
      const response = await fetch("http://localhost:3000/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert("Form submitted successfully");
      } else {
        const errorData = await response.json();
        alert(`Error submitting form: ${errorData.error}`);
      }
    } catch (error) {
      alert("Error submitting form");
    }
  };
  const Schoollist = () => {
    navigate("/students", { state: formData });
  };
  return (
    <div className="flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 items-center justify-center h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Student ID Card Form
        </h1>
        <form onSubmit={handleOnSubmit} className="grid gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="id"
            placeholder="ID"
            value={formData.id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <select
            name="schoolname"
            value={formData.schoolname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select School Name</option>
            <option value="A">School A</option>
            <option value="B">School B</option>
            <option value="C">School C</option>
          </select>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="classes"
            placeholder="Class"
            value={formData.classes}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={imgChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {formData.image && (
            <div className="flex justify-center">
              <img
                src={formData.image}
                alt="Preview"
                width={100}
                height={100}
                className="border border-gray-300 rounded mt-2"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        <button
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-0 m-6"
          onClick={Schoollist}
        >
          See All List
        </button>
      </div>
    </div>
  );
}

export default Form;
