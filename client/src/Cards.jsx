import React from "react";
import { useLocation } from "react-router-dom";
import Card1 from "./Cardes/Card1"; // Adjust the path if necessary
import Card2 from "./Cardes/Card2";
import Card3 from "./Cardes/Card3";
import Card4 from "./Cardes/Card4";
import Card5 from "./Cardes/Card5";
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
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <h1 className="text-center pt-9 text-pink-200 text-4xl italic">
        Select Your Card
      </h1>
      <div className="grid grid-cols-3 ">
        <Card1
          name={name}
          id={id}
          schoolname={schoolname}
          image={image}
          dob={dob}
          phone={phone}
        />
        <Card2
          name={name}
          id={id}
          schoolname={schoolname}
          image={image}
          dob={dob}
          phone={phone}
          class={studentClass}
        />

        <Card3
          name={name}
          id={id}
          schoolname={schoolname}
          image={image}
          dob={dob}
          phone={phone}
          class={studentClass}
        />
        <Card4
          name={name}
          id={id}
          schoolname={schoolname}
          image={image}
          dob={dob}
          phone={phone}
          class={studentClass}
        />
        <Card5
          name={name}
          id={id}
          schoolname={schoolname}
          image={image}
          dob={dob}
          phone={phone}
          class={studentClass}
        />
      </div>
    </div>
  );
};

export default Cards;
