import EmployeeCard from "./EmployeeCard";
import SplStudent from "./SplStudent";






const SplClass = () => { 

  const studentData = {
    name: "Bharani",
    age: 21,
    course: "MERN Development",
    city: "Chennai"
  };


    const employeeData = {
    Name: "Bharani",
    Id: "EMP101",
    department: "Frontend Developer",
    salary: 50000,
    experience: "2 Years"

  };

  return (

    <>
      <SplStudent student={studentData} />
      <EmployeeCard employee = {employeeData} />
    </>




  )
}

export default SplClass
