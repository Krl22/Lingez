import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";

const Search = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // Consulta a Firestore para obtener las salas que están "waiting"
        const q = query(
          collection(db, "rooms"),
          where("status", "==", "waiting")
        );
        const querySnapshot = await getDocs(q);

        const availableRooms = [];
        querySnapshot.forEach((doc) => {
          availableRooms.push({ id: doc.id, ...doc.data() });
        });

        setRooms(availableRooms);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setError("There was an error fetching rooms.");
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleJoinRoom = (roomId) => {
    // Redirigir a la sala seleccionada
    navigate(`/room/${roomId}`);
  };

  if (loading) {
    return <div>Loading rooms...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-4 text-2xl font-bold">Available Rooms</h1>
      {rooms.length > 0 ? (
        <ul className="w-full max-w-md bg-white rounded-lg shadow">
          {rooms.map((room) => (
            <li key={room.id} className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">Room ID: {room.id}</p>
                  <p className="text-sm text-gray-600">
                    Players: {room.players.length}/{room.maxPlayers}
                  </p>
                </div>
                <button
                  onClick={() => handleJoinRoom(room.id)}
                  className="btn btn-primary"
                >
                  Join Room
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-600">
          No rooms available at the moment.
        </div>
      )}
    </div>
  );
};

export default Search;
