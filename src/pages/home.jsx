import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.error("No such document!");
        }
        setLoading(false);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="pb-4 pr-1 text-2xl font-bold">Loading </h1>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start mt-[70px] min-h-screen bg-gray-100 pt-[92px]">
      <h1 className="mb-6 text-2xl font-bold">Home</h1>
      {userData ? (
        <div className="p-6 bg-white rounded shadow-md w-80">
          <h2 className="mb-4 text-xl font-semibold">
            Welcome, {userData.email}
          </h2>
          <p>
            <strong>Points:</strong> {userData.points}
          </p>
          <p>
            <strong>Current Level:</strong> {userData.progress.currentLevel}
          </p>
          <p>
            <strong>Lessons Completed:</strong>{" "}
            {userData.progress.lessonsCompleted}
          </p>
          <p>
            <strong>Quizzes Completed:</strong>{" "}
            {userData.progress.quizzesCompleted}
          </p>
          <div className="mt-4">
            <h3 className="mb-2 text-lg font-semibold">Rewards</h3>
            {userData.rewards.length > 0 ? (
              <ul>
                {userData.rewards.map((reward, index) => (
                  <li key={index} className="mb-1">
                    {reward.name} -{" "}
                    {new Date(reward.achievedAt).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No rewards yet</p>
            )}
          </div>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Home;
