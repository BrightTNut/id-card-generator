import React, { useEffect, useState } from "react";

const School = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:3000/students");
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          setError("Error fetching students");
        }
      } catch (error) {
        setError("Error fetching students");
      }
    };

    fetchStudents();
  }, []);

  const groupedStudents = students.reduce((acc, student) => {
    const { schoolname } = student;
    if (!acc[schoolname]) {
      acc[schoolname] = [];
    }
    acc[schoolname].push(student);
    return acc;
  }, {});

  return (
    <div className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 items-center justify-center h-screen p-5">
      <h1 className="text-3xl font-bold mb-6 text-center">Students</h1>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {Object.keys(groupedStudents).map((school) => (
        <div key={school} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">School Name : {school}</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">DOB</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Class</th>
              </tr>
            </thead>
            <tbody>
              {groupedStudents[school].map((student) => (
                <tr key={student.id}>
                  <td className="py-2 px-4 border-b">{student.name}</td>
                  <td className="py-2 px-4 border-b">{student.id}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(student.dob).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">{student.phone}</td>
                  <td className="py-2 px-4 border-b">{student.classes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default School;
