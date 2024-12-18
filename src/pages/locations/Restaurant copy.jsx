import React, { useState, useEffect } from "react";
import "./Restaurant.css";

const RestaurantGame = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [showCharacter, setShowCharacter] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);

  const scenes = [
    {
      background:
        "https://hospitalitydesign.com/wp-content/uploads/2020/09/cafe-lido.jpg",
      character: "https://pngimg.com/d/waiter_PNG55.png",
      audio: "/audio/host-greeting.mp3", // Cambia esta ruta al archivo de audio
      dialogue: "Hi, how can I help you?",
      question: "Hi, how can I help you?",
      options: [
        { text: "I would like a table for two, please.", correct: true },
        { text: "Can I sit anywhere I want?", correct: false },
      ],
    },
  ];

  useEffect(() => {
    const characterTimeout = setTimeout(() => setShowCharacter(true), 2000);

    const audioTimeout = setTimeout(() => {
      const audio = new Audio(scenes[currentScene].audio);
      audio.play();
      audio.onended = () => setAudioPlayed(true);
    }, 4000);

    return () => {
      clearTimeout(characterTimeout);
      clearTimeout(audioTimeout);
    };
  }, [currentScene]);

  const handleReplayAudio = () => {
    const audio = new Audio(scenes[currentScene].audio);
    audio.play();
  };

  const handleOptionClick = (isCorrect) => {
    if (isCorrect) {
      setCurrentScene((prev) => (prev + 1) % scenes.length);
      setShowCharacter(false);
      setAudioPlayed(false);
    } else {
      alert("Try again!");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Canvas con fondo y personaje */}
      <div className="relative w-full bg-gray-200 h-1/2">
        <img
          src={scenes[currentScene].background}
          alt="Scene background"
          className="absolute inset-0 object-cover w-full h-full"
        />
        {showCharacter && (
          <img
            src={scenes[currentScene].character}
            alt="Character"
            className={`absolute bottom-0 left-20 h-56 transition-opacity duration-1000 ${
              showCharacter ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      {/* Texto y opciones */}
      <div className="flex-grow p-4 bg-white">
        {audioPlayed && (
          <div>
            <div className="mb-4 text-center">
              <p className="text-xl font-semibold">
                {scenes[currentScene].dialogue}
              </p>
              <button
                onClick={handleReplayAudio}
                className="px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                Replay Audio
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              {scenes[currentScene].options.map((option, index) => (
                <button
                  key={index}
                  className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700"
                  onClick={() => handleOptionClick(option.correct)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantGame;
