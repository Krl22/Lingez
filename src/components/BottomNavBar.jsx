import React from "react";
import { NavLink } from "react-router-dom";
import { signal } from "@preact/signals-react";
import {
  FaHome,
  FaBook,
  FaGlobe,
  FaEllipsisH,
  FaComment,
} from "react-icons/fa";

export const title = signal("Home");

const BottomNavBar = () => {
  const handleTitle = (option) => {
    title.value = option;
    console.log(option);
  };

  return (
    <div className="fixed bottom-0 flex items-center justify-between w-full p-2 shadow-lg bg-gradient-to-r from-purple-400 to-indigo-600 z-9">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          isActive ? "text-white" : "text-gray-200"
        }
        onClick={() => handleTitle("Home")}
      >
        <div className="flex flex-col items-center transition-transform duration-300 ease-in-out transform hover:scale-110">
          <FaHome className="w-6 h-6" />
          <span>Home</span>
        </div>
      </NavLink>
      <NavLink
        to="/lessons"
        className={({ isActive }) =>
          isActive ? "text-white" : "text-gray-200"
        }
        onClick={() => handleTitle("Lessons")}
      >
        <div className="flex flex-col items-center transition-transform duration-300 ease-in-out transform hover:scale-110">
          <FaBook className="w-6 h-6" />
          <span>Lessons</span>
        </div>
      </NavLink>
      <NavLink
        to="/environment"
        className={({ isActive }) =>
          isActive ? "text-white" : "text-gray-200"
        }
        onClick={() => handleTitle("Environment")}
      >
        <div className="flex flex-col items-center transition-transform duration-300 ease-in-out transform hover:scale-110">
          <FaGlobe className="w-6 h-6" />
          <span>Environment</span>
        </div>
      </NavLink>
      <NavLink
        to="/more"
        className={({ isActive }) =>
          isActive ? "text-white" : "text-gray-200"
        }
        onClick={() => handleTitle("More")}
      >
        <div className="flex flex-col items-center transition-transform duration-300 ease-in-out transform hover:scale-110">
          <FaEllipsisH className="w-6 h-6" />
          <span>More</span>
        </div>
      </NavLink>
      <div className="absolute transform -translate-x-1/2 bottom-1 left-1/2">
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive ? "text-white" : "text-gray-200"
          }
        >
          <div
            className="flex flex-col items-center p-3 text-white transition-transform duration-300 ease-in-out rounded-full shadow-lg hover:scale-110 bg-gradient-to-r from-purple-400 to-indigo-600 "
            style={{ marginBottom: "2rem" }}
          >
            <FaComment className="w-7 h-7 " />
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNavBar;
