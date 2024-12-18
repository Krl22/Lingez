import React from "react";
import { NavLink } from "react-router-dom";
import { title } from "../components/BottomNavBar";

const More = () => {
  // Función para manejar el cambio de título y página
  const handleTitle = (option) => {
    title.value = option;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center pt-[92px]">
      {/* Cada opción actualiza la señal y cambia la página */}
      <NavLink
        to="/account"
        onClick={() => handleTitle("Account")} // Actualiza el título al hacer clic
        className="w-full max-w-md p-4 my-2 text-center bg-white border rounded-md shadow-sm cursor-pointer hover:bg-blue-100 hover:shadow-md"
      >
        Account
      </NavLink>
      <NavLink
        to="/avatar"
        onClick={() => handleTitle("Avatar")} // Actualiza el título al hacer clic
        className="w-full max-w-md p-4 my-2 text-center bg-white border rounded-md shadow-sm cursor-pointer hover:bg-blue-100 hover:shadow-md"
      >
        Avatar
      </NavLink>
      <NavLink
        to="/roleplay"
        onClick={() => handleTitle("Role Play")}
        className="w-full max-w-md p-4 my-2 text-center bg-white border rounded-md shadow-sm cursor-pointer hover:bg-blue-100 hover:shadow-md"
      >
        Role Play
      </NavLink>
      <NavLink
        to="/chatgptclone"
        onClick={() => handleTitle("chatgptclone")}
        className="w-full max-w-md p-4 my-2 text-center bg-white border rounded-md shadow-sm cursor-pointer hover:bg-blue-100 hover:shadow-md"
      >
        chatgptclone
      </NavLink>
      <NavLink
        to="/lobby"
        onClick={() => handleTitle("Online Game")}
        className="w-full max-w-md p-4 my-2 text-center bg-white border rounded-md shadow-sm cursor-pointer hover:bg-blue-100 hover:shadow-md"
      >
        Online Game
      </NavLink>
      <NavLink
        to="/vocabulary"
        onClick={() => handleTitle("Vocabulary Builder")}
        className="w-full max-w-md p-4 my-2 text-center bg-white border rounded-md shadow-sm cursor-pointer hover:bg-blue-100 hover:shadow-md"
      >
        Vocabulary Builder
      </NavLink>
      <NavLink
        to="/grammar"
        onClick={() => handleTitle("Grammar")}
        className="w-full max-w-md p-4 my-2 text-center bg-white border rounded-md shadow-sm cursor-pointer hover:bg-blue-100 hover:shadow-md"
      >
        Grammar
      </NavLink>
      <NavLink
        to="/community"
        onClick={() => handleTitle("Community")}
        className="w-full max-w-md p-4 my-2 text-center bg-white border rounded-md shadow-sm cursor-pointer hover:bg-blue-100 hover:shadow-md"
      >
        Community
      </NavLink>
      <NavLink
        to="/culturalinsights"
        onClick={() => handleTitle("Cultural Insights")}
        className="w-full max-w-md p-4 my-2 text-center bg-white border rounded-md shadow-sm cursor-pointer hover:bg-blue-100 hover:shadow-md"
      >
        Cultural Insights
      </NavLink>
    </div>
  );
};

export default More;
