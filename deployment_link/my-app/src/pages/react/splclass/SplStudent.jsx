

const SplStudent = ({ student }) => {



  return (
<>

   <div className="bg-indigo-600 text-white p-4 w-30 rounded-lg mb-4">
  <h1 className="flex justify-center text-xl font-bold">
    TASK - 1
  </h1>
</div>


<h2>Student Profile</h2>
      <p>Name: {student.name}</p>
      <p>Age: {student.age}</p>
      <p>Course: {student.course}</p>
      <p>City: {student.city}</p>


</>
  )
}

export default SplStudent