import React from "react";
import { useLocation } from "react-router-dom";
import Card1 from "./Cardes/Card1"; // Adjust the path if necessary

const Cards = () => {
  const location = useLocation();
  const {
    name,
    id,
    schoolname,
    image,
    dob,
    phone,
    class: studentClass,
  } = location.state || {};

  return (
    <div>
      <h1>Card Details</h1>
      <Card1
        name={name}
        id={id}
        schoolname={schoolname}
        image={image}
        dob={dob}
        phone={phone}
        class={studentClass}
      />
    </div>
  );
};

export default Cards;
