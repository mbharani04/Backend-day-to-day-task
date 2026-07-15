const StudentList = ({ students }) => { 
    return ( 
    
    <> 
    <h2>Student List</h2> 



{students.map((student, index) => ( <div key={index}> 
    <p>Name : {student.name}</p> <p>Age : {student.age}</p> 
    <p>Course : {student.course}</p>
    <p>City : {student.city}</p> <hr /> </div> ))}
     </>
 ) }; 
export default StudentList;