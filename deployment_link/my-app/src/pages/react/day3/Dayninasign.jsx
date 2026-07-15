

const Dayninasign = () => {

   
   const schools = [
  {
    id: 1,
    schoolName: "Green Valley Public School",
    city: "Chennai",
    principal: "Mrs. Priya",
    students: 1200,
    teachers: 65,
  },
  {
    id: 2,
    schoolName: "Sunrise Matric School",
    city: "Coimbatore",
    principal: "Mr. Kumar",
    students: 950,
    teachers: 50,
  },
  {
    id: 3,
    schoolName: "Oxford Higher Secondary School",
    city: "Madurai",
    principal: "Mrs. Lakshmi",
    students: 1500,
    teachers: 80,
  },
  {
    id: 4,
    schoolName: "Royal International School",
    city: "Salem",
    principal: "Mr. Arjun",
    students: 1100,
    teachers: 60,
  },
];


  return (
    <>
    <div className="min-h-screen flex flex-col justify-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        School Cards
      </h1>

      <div className="flex flex-col border-amber-500 w-90 gap-4 p-2 m-2">
        {schools.map((school) => (
          <div
            key={school.id}
            className="bg-blue-500 rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
          >
            <h2 className="text-xl font-bold text-black -4">
              {school.schoolName}
            </h2>

            <p className="mb-2">
              <span className="font-semibold"> City:</span> {school.city}
            </p>

            <p className="mb-2">
              <span className="font-semibold"> Principal:</span>{" "}
              {school.principal}
            </p>

            <p className="mb-2">
              <span className="font-semibold"> Students:</span>{" "}
              {school.students}
            </p>

            <p>
              <span className="font-semibold"> Teachers:</span>{" "}
              {school.teachers}
            </p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};


   
   
  


export default Dayninasign