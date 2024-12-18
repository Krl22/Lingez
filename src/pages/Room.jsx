import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebaseconfig";
import {
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  setDoc,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { FaCopy } from "react-icons/fa";

// Función para obtener el nickname del usuario desde Firestore
const getUserNickname = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.nickname;
    } else {
      console.log("No such user document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user nickname: ", error);
    return null;
  }
};

const Room = () => {
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        console.log("No user is authenticated");
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchRoomData = async () => {
      if (!user) return;

      const roomRef = doc(db, "rooms", roomId);

      try {
        const roomSnap = await getDoc(roomRef);
        if (roomSnap.exists()) {
          setRoomData(roomSnap.data());
          setLoading(false);
        } else {
          console.log("Room does not exist, creating it...");

          const nickname = await getUserNickname(user.uid);
          if (!nickname) {
            console.error("Nickname not found for user");
            return;
          }

          await setDoc(roomRef, {
            creator: {
              id: user.uid,
              nickname: nickname,
            },
            players: [
              {
                id: user.uid,
                nickname: nickname,
                joinedAt: Timestamp.now(),
              },
            ],
            status: "waiting",
            createdAt: Timestamp.now(),
          });

          const newRoomSnap = await getDoc(roomRef);
          setRoomData(newRoomSnap.data());
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching room data: ", error);
      }
    };

    fetchRoomData();
  }, [roomId, user]);

  useEffect(() => {
    const roomRef = doc(db, "rooms", roomId);
    const unsubscribe = onSnapshot(roomRef, (docSnap) => {
      if (docSnap.exists()) {
        const updatedRoomData = docSnap.data();
        setRoomData(updatedRoomData);

        if (updatedRoomData.status === "in_progress") {
          navigate(`/game/${roomId}`);
        }
      }
    });

    return () => unsubscribe();
  }, [roomId, navigate]);

  useEffect(() => {
    const joinRoom = async () => {
      if (!user || !roomData) return;

      const roomRef = doc(db, "rooms", roomId);
      const isPlayerInRoom = roomData.players.some(
        (player) => player.id === user.uid
      );

      if (isPlayerInRoom) {
        console.log("Player already in the room, skipping join");
        return;
      }

      const nickname = await getUserNickname(user.uid);
      if (!nickname) {
        console.error("Nickname not found for user");
        return;
      }

      try {
        await updateDoc(roomRef, {
          players: arrayUnion({
            id: user.uid,
            nickname: nickname,
            joinedAt: Timestamp.now(),
          }),
        });
      } catch (error) {
        console.error("Error joining room: ", error);
      }
    };

    joinRoom();
  }, [roomId, user, roomData]);

  const handleStartGame = async () => {
    const roomRef = doc(db, "rooms", roomId);

    try {
      await updateDoc(roomRef, {
        status: "in_progress",
      });
      navigate(`/game/${roomId}`);
    } catch (error) {
      console.error("Error starting the game: ", error);
    }
  };

  const handleCopyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      alert("Room ID copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleLeaveRoom = async () => {
    if (!roomData || !user) return;

    const roomRef = doc(db, "rooms", roomId);

    try {
      const updatedPlayers = roomData.players.filter(
        (player) => player.id !== user.uid
      );

      await updateDoc(roomRef, {
        players:
          updatedPlayers.length > 0
            ? updatedPlayers
            : arrayRemove({
                id: user.uid,
                nickname: user.displayName,
              }),
      });

      console.log("Player removed successfully");
      if (updatedPlayers.length === 0) {
        // Si es el último jugador, elimina la sala
        await updateDoc(roomRef, {
          status: "empty",
        });
      }

      navigate("/lobby");
    } catch (error) {
      console.error("Error removing player from room: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Room: <span className="text-indigo-600">{roomId}</span>
          <button
            onClick={handleCopyRoomId}
            className="ml-2 text-indigo-500 transition hover:text-indigo-700 focus:ring-2 focus:ring-indigo-300"
            aria-label="Copy Room ID"
          >
            <FaCopy />
          </button>
        </h2>

        <div className="p-4 rounded-md shadow-inner bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-700">Players</h3>
          <ul className="mt-2 space-y-2">
            {roomData?.players?.map((player, index) => (
              <li
                key={index}
                className="p-2 bg-white border-l-4 border-indigo-500 rounded-md shadow-sm"
              >
                <span className="font-semibold text-gray-800">
                  {player.nickname}
                </span>{" "}
                <span className="text-sm text-gray-500">
                  (Joined: {player.joinedAt.toDate().toLocaleTimeString()})
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Botón para iniciar juego */}
        {roomData?.creator?.id === user?.uid &&
          roomData?.status === "waiting" && (
            <button
              onClick={handleStartGame}
              className="w-full px-4 py-2 font-semibold text-white transition bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300"
            >
              Start Game
            </button>
          )}

        {/* Botón para salir de la sala */}
        <button
          onClick={handleLeaveRoom}
          className="w-full px-4 py-2 font-semibold text-white transition bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:ring-red-300"
        >
          Leave Room
        </button>
      </div>
    </div>
  );
};

export default Room;
