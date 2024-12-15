import React from "react";
import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold text-center sm:text-5xl lg:text-6xl">
        Bienvenido a ESOL
      </h1>
      <p className="mt-4 text-center text-gray-700 sm:text-lg lg:text-xl">
        Aprende inglés de manera divertida y efectiva.
      </p>
      <div className="flex flex-col mt-8 space-y-4 text-center sm:flex-row sm:space-y-0 sm:space-x-8">
        <NavLink to="/login">
          <button className="px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-600">
            Login
          </button>
        </NavLink>
        <NavLink to="/register">
          <button className="px-6 py-3 text-white bg-green-500 rounded hover:bg-green-600">
            Register
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Landing;
