import { Link } from "react-router-dom";

const DayNine = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">

      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        Day 3 React Assignment
      </h1>

      <div className="flex flex-col md:flex-row gap-8">

        {/* Class Task */}
        <div className="bg-white w-80 p-8 rounded-xl shadow-lg border hover:shadow-2xl hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-semibold text-center text-blue-700 mb-4">
            Class Task
          </h2>

          <p className="text-gray-600 text-center mb-6">
            View and practice the class exercises.
          </p>

          <Link
            to="/daynineclass"
            className="block text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Open Class Task
          </Link>
        </div>

        {/* Assignment */}
        <div className="bg-white w-80 p-8 rounded-xl shadow-lg border hover:shadow-2xl hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-semibold text-center text-green-700 mb-4">
             Assignment
          </h2>

          <p className="text-gray-600 text-center mb-6">
            Complete the React assignment tasks.
          </p>

          <Link
            to="/dayninasign"
            className="block text-center bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Open Assignment
          </Link>
        </div>

      </div>
    </div>
  );
};

export default DayNine;