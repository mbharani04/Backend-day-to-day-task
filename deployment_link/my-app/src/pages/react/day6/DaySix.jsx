 import { useState } from "react";

const DaySix = () => {
  // Task 1 - Object
  const [student, setStudent] = useState({
    name: "Sudhan",
    age: 20,
    course: "React",
    city: "Chennai",
  });

  // Task 2 - Array
  const [fruits, setFruits] = useState([
    "Apple",
    "Banana",
    "Orange",
  ]);

  // Task 3 - Array of Objects
  const [employees, setEmployees] = useState([
    { id: 1, name: "John", salary: 30000 },
    { id: 2, name: "David", salary: 40000 },
    { id: 3, name: "Peter", salary: 50000 },
  ]);

  // Update Object
  const updateStudent = () => {
    setStudent({
      ...student,
      age: student.age + 1,
    });
  };

  // Update Array
  const addFruit = () => {
    setFruits([...fruits, "Mango"]);
  };

  // Update Array of Objects
  const updateSalary = () => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === 1
        ? { ...employee, salary: employee.salary + 5000 }
        : employee
    );
    setEmployees(updatedEmployees);
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Task 1: Object */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition hover:shadow-md">
          <h2 className="text-xl font-bold text-indigo-600 mb-4 flex items-center gap-2">
            Task 1 - Object useState
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-xl">
              <span className="text-xs text-gray-400 block font-medium uppercase tracking-wider">Name</span>
              <span className="text-base font-semibold text-gray-700">{student.name}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
              <span className="text-xs text-gray-400 block font-medium uppercase tracking-wider">Age</span>
              <span className="text-base font-semibold text-gray-700">{student.age}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
              <span className="text-xs text-gray-400 block font-medium uppercase tracking-wider">Course</span>
              <span className="text-base font-semibold text-gray-700">{student.course}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
              <span className="text-xs text-gray-400 block font-medium uppercase tracking-wider">City</span>
              <span className="text-base font-semibold text-gray-700">{student.city}</span>
            </div>
          </div>
          <button 
            onClick={updateStudent}
            className="px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-indigo-700 active:scale-95 transition-all"
          >
            Increase Age
          </button>
        </div>

        {/* Task 2: Array */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition hover:shadow-md">
          <h2 className="text-xl font-bold text-emerald-600 mb-4 flex items-center gap-2">
         Task 2 - Array useState
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {fruits.map((fruit, index) => (
              <span 
                key={index} 
                className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-lg border border-emerald-100"
              >
                {fruit}
              </span>
            ))}
          </div>
          <button 
            onClick={addFruit}
            className="px-4 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-emerald-700 active:scale-95 transition-all"
          >
            Add Mango
          </button>
        </div>

        {/* Task 3: Array of Objects */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition hover:shadow-md">
          <h2 className="text-xl font-bold text-amber-600 mb-4 flex items-center gap-2">
             Task 3 - Array of Objects useState
          </h2>
          <div className="grid gap-3 sm:grid-cols-3 mb-6">
            {employees.map((employee) => (
              <div 
                key={employee.id} 
                className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{employee.name}</h3>
                  <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full font-mono">ID: {employee.id}</span>
                </div>
                <p className="text-sm text-gray-500">
                  Salary: <span className="text-base font-bold text-gray-700 ml-1">₹{employee.salary.toLocaleString()}</span>
                </p>
              </div>
            ))}
          </div>
          <button 
            onClick={updateSalary}
            className="px-4 py-2.5 bg-amber-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-amber-700 active:scale-95 transition-all"
          >
            Increase First Employee Salary
          </button>
        </div>

      </div>
    </div>

 </>
  )
}

export default DaySix
