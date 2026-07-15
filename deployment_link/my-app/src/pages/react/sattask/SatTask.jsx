import { useState } from "react"; 
import StudentForm from "./StudentForm";
 import StudentList from "./StudentList"; 
 const SatTask = () => { const [students, setStudents] = useState(() => { 
    return JSON.parse(localStorage.getItem("students")) || []; }); 
    
    const addStudent = (student) => { const updated = [...students, student]; 
        setStudents(updated); localStorage.setItem("students", JSON.stringify(updated)); };
        
        return ( 
        <> 
        <StudentForm addStudent={addStudent} /> 
        <StudentList students={students} /> </> ); };
 export default SatTask;