import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./form";
import Cards from "./Cards";
import School from "./School";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/students" element={<School />} />
      </Routes>
    </Router>
  );
}

export default App;
