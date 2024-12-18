import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseconfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import image1 from "../assets/pfp.jpg";
import image2 from "../assets/pfp2.jpg";
import image3 from "../assets/pfp3.jpg";

const Account = () => {
  const [nickname, setNickname] = useState("");
  const [newNickname, setNewNickname] = useState("");
  const [profileImage, setProfileImage] = useState(""); // Estado para la imagen de perfil
  const currentUser = auth.currentUser;

  // Obtener el nickname del usuario desde Firestore
  useEffect(() => {
    const fetchNickname = async () => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setNickname(userDoc.data().nickname);
          // Establecer la imagen de perfil desde Firestore o por defecto
          setProfileImage(userDoc.data().photoURL || image1); // Usar una imagen por defecto
        }
      }
    };
    fetchNickname();
  }, [currentUser]);

  // Manejar el cambio de nickname
  const handleNicknameChange = async () => {
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        nickname: newNickname,
      });
      setNickname(newNickname);
      setNewNickname(""); // Limpiar el campo después de guardar
    }
  };

  // Manejar el cambio de imagen de perfil
  const handleProfileImageChange = (image) => {
    setProfileImage(image);
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      updateDoc(userDocRef, {
        photoURL: image,
      });
    }
  };

  // Imágenes disponibles en la carpeta assets
  const availableImages = [
    image1,
    image2,
    image3,
    // Agrega más importaciones de imágenes según sea necesario
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-[92px]">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
        Account Information
      </h1>
      {currentUser && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Información de la cuenta */}
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-700">
              User Details
            </h2>
            <div>
              <p className="font-semibold text-gray-600">Photo:</p>
              {profileImage ? (
                <div className="flex items-center">
                  <img
                    src={profileImage}
                    alt="User profile"
                    className="w-24 h-24 border-2 border-gray-300 rounded-full"
                  />
                  <button
                    className="ml-4 btn btn-primary"
                    onClick={() =>
                      document.getElementById("profileImageModal").showModal()
                    }
                  >
                    Change Profile Picture
                  </button>
                </div>
              ) : (
                <p className="text-gray-800">N/A</p>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-600">Email:</p>
                <p className="text-gray-800">{currentUser.email}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Nickname:</p>
                <p className="text-gray-800">{nickname || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Display Name:</p>
                <p className="text-gray-800">
                  {currentUser.displayName || "N/A"}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Email Verified:</p>
                <p className="text-gray-800">
                  {currentUser.emailVerified ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>

          {/* Sección de cambio de nickname */}
          <div className="p-4 mb-20 bg-gray-100 rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-700">
              Change Nickname
            </h2>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="text-gray-600 label-text">New Nickname</span>
                </label>
                <input
                  type="text"
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                  className="w-full input input-bordered input-primary"
                  placeholder="Enter new nickname"
                />
              </div>
              <button
                onClick={handleNicknameChange}
                className="w-full btn btn-primary"
              >
                Save Nickname
              </button>
            </div>
          </div>

          {/* Modal para cambiar imagen de perfil */}
          <dialog id="profileImageModal" className="modal">
            <div className="modal-box">
              <h3 className="text-lg font-bold">Choose a Profile Picture</h3>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {availableImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Profile option ${index + 1}`}
                    className="w-20 h-20 border-2 border-gray-300 rounded-full cursor-pointer hover:opacity-75"
                    onClick={() => handleProfileImageChange(image)}
                  />
                ))}
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default Account;
