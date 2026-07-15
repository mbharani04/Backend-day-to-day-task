import { useState } from "react";

const StudentForm = ({ addStudent }) => {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    course: "",
    city: "",
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    addStudent(student);
    setStudent({
      name: "",
      age: "",
      course: "",
      city: "",
    });
  };

  return (
    <>
      <input
        name="name"
        placeholder="Name"
        value={student.name}
        onChange={handleChange}
      />

      <input
        name="age"
        placeholder="Age"
        value={student.age}
        onChange={handleChange}
      />

      <input
        name="course"
        placeholder="Course"
        value={student.course}
        onChange={handleChange}
      />

      <input
        name="city"
        placeholder="City"
        value={student.city}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Add Student</button>
    </>
  );
};

export default StudentForm;




