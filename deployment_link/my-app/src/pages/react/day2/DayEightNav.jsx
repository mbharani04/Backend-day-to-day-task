import { NavLink, useNavigate } from "react-router-dom";

const DayEightNav = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Banner */}
      <div className="bg-blue-600 text-white text-center p-6">
        <h1 className="text-4xl font-bold">
          React Router Navigation
        </h1>
        <p className="mt-2">
          Welcome to My Website
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center bg-gray-800 p-4">
        <div className="flex gap-6">
          <NavLink
            to="/hometask"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-bold"
                : "text-white"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-bold"
                : "text-white"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-bold"
                : "text-white"
            }
          >
            Contact
          </NavLink>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="bg-green-500 px-4 py-2 rounded text-white"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-orange-500 px-4 py-2 rounded text-white"
          >
            Register
          </button>
        </div>
      </nav>
    </>
  );
};

export default DayEightNav ;

