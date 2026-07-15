const EmployeeCard = ({ employee }) => {
  


  return (
    <> 


    <div className="max-w-sm mx-auto mt-5 p-5 text-black border rounded-lg shadow-lg bg-white">
      
         <div className="bg-indigo-600 text-white py-3 rounded-lg mb-4">
  <h1 className="flex justify-center text-2xl font-bold">
    TASK - 2
  </h1>
</div>
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        Employee Card
      </h2>

      <p><strong>Name:</strong> {employee.Name}</p>
      <p><strong>ID:</strong> {employee.Id}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <p><strong>Salary:</strong> ₹{employee.salary}</p>
      <p><strong>Experience:</strong> {employee.experience}</p>
    </div>
    </>
  );
};

export default EmployeeCard;