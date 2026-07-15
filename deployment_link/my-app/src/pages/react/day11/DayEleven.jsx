import { useState } from "react";
import Form from "./Form";
import Dashboard from "./DayElevendash";


const DayEleven = () => {


const [page, setPage] = useState("register");

  const registerUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration Successful");
    setPage("login");
  };

  const loginUser = (user) => {
    const data = JSON.parse(localStorage.getItem("user"));

    if (
      data &&
      data.email === user.email &&
      data.password === user.password
    ) {
      setPage("dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <>
      {page === "register" && (
        <Form
          title="Register"
          button="Register"
          isRegister={true}
          submit={registerUser}
          changePage={() => setPage("login")}
        />
      )}

      {page === "login" && (
        <Form
          title="Login"
          button="Login"
          isRegister={false}
          submit={loginUser}
          changePage={() => setPage("register")}
        />
      )}

      {page === "dashboard" && <Dashboard />}
    </>
  );
};


export default DayEleven
