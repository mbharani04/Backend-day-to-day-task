
import { useState } from "react";
const Daytentask = () => {

    const [student, setStudent] = useState({
    name: "",
    age: "",
    course: "",
    city: "",
  });

  // Task 2 - Employee
  const [employee, setEmployee] = useState({
    name: "",
    id: "",
    department: "",
    salary: "",
  });

  // Task 3 - Product
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
  });

  // Task 4 - User Profile
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  // Task 5 - School
  const [school, setSchool] = useState({
    schoolName: "",
    principal: "",
    city: "",
    students: "",
  });

  // Submit Data
  const [studentData, setStudentData] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [schoolData, setSchoolData] = useState(null);
  

  return (
    <>
    <div className="p-6 space-y-10">

      {/* Task 1 */}
      <div className="border p-5 rounded shadow">
        <h2 className="text-xl font-bold mb-3">1. Student Registration Form</h2>

        <input
          className="border p-2 m-2"
          placeholder="Name"
          onChange={(e) =>
            setStudent({ ...student, name: e.target.value })
          }
        />

        <input
          className="border p-2 m-2"
          placeholder="Age"
          onChange={(e) =>
            setStudent({ ...student, age: e.target.value })
          }
        />

        <input
          className="border p-2 m-2"
          placeholder="Course"
          onChange={(e) =>
            setStudent({ ...student, course: e.target.value })
          }
        />

        <input
          className="border p-2 m-2"
          placeholder="City"
          onChange={(e) =>
            setStudent({ ...student, city: e.target.value })
          }
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setStudentData(student)}
        >
          Submit
        </button>

        {studentData && (
          <div className="mt-3 text-black bg-gray-100 p-3 rounded">
            <h3 className="font-bold">Student Details</h3>
            <p>Name: {studentData.name}</p>
            <p>Age: {studentData.age}</p>
            <p>Course: {studentData.course}</p>
            <p>City: {studentData.city}</p>
          </div>
        )}
      </div>

      {/* Task 2 */}
      <div className="border p-5  rounded shadow">
        <h2 className="text-xl font-bold mb-3">2. Employee Details Form</h2>

        <input className="border  p-2 m-2" placeholder="Employee Name"
          onChange={(e)=>setEmployee({...employee,name:e.target.value})} />

        <input className="border p-2 m-2" placeholder="Employee ID"
          onChange={(e)=>setEmployee({...employee,id:e.target.value})} />

        <input className="border p-2 m-2" placeholder="Department"
          onChange={(e)=>setEmployee({...employee,department:e.target.value})} />

        <input className="border p-2 m-2" placeholder="Salary"
          onChange={(e)=>setEmployee({...employee,salary:e.target.value})} />

        <button className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={()=>setEmployeeData(employee)}>
          Submit
        </button>

        {employeeData && (
          <div className="mt-3 text-black bg-yellow-600 k p-3 rounded">
            <h3 className="text-black font-bold">Employee Card</h3>
            <p>Name: {employeeData.name}</p>
            <p>ID: {employeeData.id}</p>
            <p>Department: {employeeData.department}</p>
            <p>Salary: ₹{employeeData.salary}</p>
          </div>
        )}
      </div>

      {/* Task 3 */}
      <div className="border p-5  rounded shadow">
        <h2 className="text-xl font-bold mb-3">3. Product Management Form</h2>

        <input className="border p-2 m-2" placeholder="Product Name"
          onChange={(e)=>setProduct({...product,name:e.target.value})} />

        <input className="border p-2 m-2" placeholder="Price"
          onChange={(e)=>setProduct({...product,price:e.target.value})} />

        <input className="border p-2 m-2" placeholder="Category"
          onChange={(e)=>setProduct({...product,category:e.target.value})} />

        <input className="border p-2 m-2" placeholder="Brand"
          onChange={(e)=>setProduct({...product,brand:e.target.value})} />

        <button className="bg-purple-500 text-white px-4 py-2 rounded"
          onClick={()=>setProductData(product)}>
          Submit
        </button>

        {productData && (
          <div className="mt-3 text-black bg-blue-500 p-3 rounded">
            <h3 className="font-bold">Product Details</h3>
            <p>Name: {productData.name}</p>
            <p>Price: ₹{productData.price}</p>
            <p>Category: {productData.category}</p>
            <p>Brand: {productData.brand}</p>
          </div>
        )}
      </div>

      {/* Task 4 */}
      <div className="border p-5 rounded shadow">
        <h2 className="text-xl font-bold mb-3">4. User Profile Form</h2>

        <input className="border p-2 m-2" placeholder="Name"
          onChange={(e)=>setProfile({...profile,name:e.target.value})} />

        <input className="border p-2 m-2" placeholder="Email"
          onChange={(e)=>setProfile({...profile,email:e.target.value})} />

        <input className="border p-2 m-2" placeholder="Mobile"
          onChange={(e)=>setProfile({...profile,mobile:e.target.value})} />

        <input className="border p-2 m-2" placeholder="Address"
          onChange={(e)=>setProfile({...profile,address:e.target.value})} />

        <button className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={()=>setProfileData(profile)}>
          Submit
        </button>

        {profileData && (
          <div className="mt-3 text-black bg-gray-100 p-3 rounded">
            <h3 className="font-bold">User Profile</h3>
            <p>Name: {profileData.name}</p>
            <p>Email: {profileData.email}</p>
            <p>Mobile: {profileData.mobile}</p>
            <p>Address: {profileData.address}</p>
          </div>
        )}
      </div>

      {/* Task 5 */}
      <div className="border p-5 rounded shadow">
        <h2 className="text-xl font-bold mb-3">5. School Management Form</h2>

        <input className="border p-2 m-2" placeholder="School Name"
          onChange={(e)=>setSchool({...school,schoolName:e.target.value})} />

        <input className="border p-2 m-2" placeholder="Principal Name"
          onChange={(e)=>setSchool({...school,principal:e.target.value})} />

        <input className="border p-2 m-2" placeholder="City"
          onChange={(e)=>setSchool({...school,city:e.target.value})} />

        <input className="border p-2 m-2" placeholder="Total Students"
          onChange={(e)=>setSchool({...school,students:e.target.value})} />

        <button className="bg-indigo-500 text-white px-4 py-2 rounded"
          onClick={()=>setSchoolData(school)}>
          Save
        </button>

        {schoolData && (
          <div className="mt-3 bg-green-500 text-black p-3 rounded">
            <h3 className="font-bold">School Information</h3>
            <p>School: {schoolData.schoolName}</p>
            <p>Principal: {schoolData.principal}</p>
            <p>City: {schoolData.city}</p>
            <p>Total Students: {schoolData.students}</p>
          </div>
        )}
      </div>

    </div>
    </>
  );
};

export default Daytentask