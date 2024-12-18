import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { title } from "./BottomNavBar";
import { auth, db } from "../firebaseconfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const TopNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleTitle = (option) => {
    title.value = option;
    console.log(option);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleMenu = () => {
    setTimeout(() => {
      setMenuOpen(!menuOpen);
    }, 50); // Agrega un pequeño retraso de 50 milisegundos
  };

  const closeMenu = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("click", closeMenu);
    } else {
      document.removeEventListener("click", closeMenu);
    }
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [menuOpen]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleNotificationsClick = () => {
    navigate("/notifications");
    handleTitle("Notifications");
  };

  const handleAccountClick = () => {
    handleTitle("Account");
    navigate("/account");
  };
  const handleFriendsClick = () => {
    handleTitle("Friends");
    navigate("/Friends");
  };

  return (
    <div className="fixed top-0 z-10 w-full px-4 py-1 shadow-md bg-gradient-to-r from-purple-400 to-indigo-600">
      <div className="flex items-center justify-between">
        <div className="relative">
          <span className="absolute top-0 left-0 z-10 inline-flex items-center justify-center w-6 h-6 text-xs font-semibold text-white bg-red-500 rounded-full -translate-x-1/4 -translate-y-1/4">
            99+
          </span>
          <button
            className="relative p-2 transition-all duration-200 ease-in-out bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            aria-label="Notifications"
            onClick={handleNotificationsClick}
          >
            <FaBell className="w-8 h-8 text-white" />
          </button>
        </div>

        <div className="text-center text-white">
          <h1 className="text-xl font-semibold">{title.value}</h1>
        </div>
        {userData && (
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center mb-2">
              <span className="mr-1 text-sm text-white">Nivel:</span>
              <span className="px-2 py-1 text-lg font-bold text-white bg-purple-600 rounded-lg">
                {userData.progress.currentLevel}
              </span>
            </div>
            <div className="relative h-4 bg-blue-100 rounded-full w-28">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                style={{ width: `${(userData.points / 1000) * 100}%` }}
              ></div>
              <div className="absolute top-0 right-0 mr-4 text-sm text-black">
                {userData.points}/1000
              </div>
            </div>
          </div>
        )}

        <div className="relative">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="User Menu"
          >
            <FaUserCircle className="w-8 h-8" />
          </button>
          {menuOpen && (
            <ul
              className="absolute right-0 z-10 p-2 mt-2 text-black bg-white rounded-md shadow"
              role="menu"
              ref={menuRef}
            >
              <li className="py-2" role="none">
                <button
                  className="w-full text-left text-gray-700 hover:text-gray-900 focus:outline-none"
                  onClick={handleFriendsClick}
                >
                  Friends
                </button>
              </li>
              <li className="py-2" role="none">
                <button
                  className="w-full text-left text-gray-700 hover:text-gray-900 focus:outline-none"
                  onClick={handleAccountClick}
                >
                  Account
                </button>
              </li>
              <li className="py-2" role="none">
                <button
                  className="w-full text-left text-gray-700 hover:text-gray-900 focus:outline-none"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
