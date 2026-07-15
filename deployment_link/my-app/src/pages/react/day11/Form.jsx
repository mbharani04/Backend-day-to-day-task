import { useState } from "react";

const Form = ({ title, button, isRegister, submit, changePage }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen text-black bg-slate-900">
      <div className="bg-white p-6 rounded w-96">

        <h1 className="text-2xl font-bold mb-4">{title}</h1>

        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border w-full p-2 mb-3"
            onChange={handleChange}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border w-full p-2 mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border w-full p-2 mb-3"
          onChange={handleChange}
        />

        <button
          className="bg-blue-600 text-white w-full p-2 rounded"
          onClick={() => submit(user)}
        >
          {button}
        </button>

        <p
          className="mt-3 text-blue-600 cursor-pointer"
          onClick={changePage}
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  );
};

export default Form;