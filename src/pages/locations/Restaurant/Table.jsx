import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MdReplay, MdVolumeUp, MdArrowBack } from "react-icons/md";
import TableBg from "./assets/TableBg.png";
import TableLayer from "./assets/table_layer.png";
import waitress from "./assets/waitress.png";
import tableAudio from "./assets/waitressAudio1.mp3";

const TableScene = ({ changeScene }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [restartKey, setRestartKey] = useState(0); // Clave para reiniciar el componente
  const audioRef = useRef(null);

  const replayScene = () => {
    setRestartKey((prevKey) => prevKey + 1); // Cambia la clave para forzar un reinicio
  };

  const replayAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reinicia el audio
      audioRef.current.play(); // Reproduce el audio
    }
  };

  const handleSceneChange = (nextScene) => {
    setIsExiting(true); // Inicia la transición de salida
    setTimeout(() => {
      changeScene(nextScene); // Cambia la escena después de la animación
    }, 1000); // Duración sincronizada con la animación de salida
  };

  const goBack = () => {
    handleSceneChange("restaurant"); // Cambia a la escena anterior
  };

  return (
    <motion.div
      key={restartKey} // Reinicia el componente cuando cambia la clave
      className="flex flex-col items-center justify-around w-full h-screen p-4 pt-10 pb-24"
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Fondo */}
      <div className="relative flex items-center justify-center w-full max-w-4xl mt-8 aspect-video">
        <img
          src={TableBg}
          alt="Table Background"
          className="absolute object-cover w-full h-full rounded-lg shadow-lg"
        />

        {/* Camarera */}
        <motion.img
          src={waitress}
          alt="Waitress"
          className="absolute w-1/3 xl:bottom-[130px] bottom-[50px]"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "10%", opacity: 1 }}
          transition={{
            x: { duration: 1.5, ease: "easeOut" },
            opacity: { duration: 1 },
          }}
        />

        {/* Capa superior */}
        <img
          src={TableLayer}
          alt="Table Layer"
          className="absolute object-cover w-full h-full rounded-lg pointer-events-none"
        />
      </div>

      {/* Audio */}
      <audio ref={audioRef} src={tableAudio} autoPlay />

      <motion.div
        className="w-full max-w-md px-6 py-8 rounded-lg shadow-lg bg-white/90 backdrop-blur-lg sm:px-10 md:px-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center">
          {/* Header Section */}
          <div className="mb-6">
            <p className="text-xl font-semibold text-gray-900">
              The waitress is now at your table. What do you ask?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center mb-6 space-x-4">
            <button
              onClick={goBack}
              className="flex items-center justify-center w-12 h-12 text-white transition-transform transform bg-gray-500 rounded-full shadow-lg hover:bg-gray-600 hover:scale-105"
              aria-label="Go Back"
            >
              <MdArrowBack size={24} />
            </button>
            <button
              onClick={replayScene}
              className="flex items-center justify-center w-12 h-12 text-white transition-transform transform bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 hover:scale-105"
              aria-label="Replay Scene"
            >
              <MdReplay size={24} />
            </button>
            <button
              onClick={replayAudio}
              className="flex items-center justify-center w-12 h-12 text-white transition-transform transform bg-green-500 rounded-full shadow-lg hover:bg-green-600 hover:scale-105"
              aria-label="Replay Audio"
            >
              <MdVolumeUp size={24} />
            </button>
          </div>

          {/* Option Buttons */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              onClick={() => handleSceneChange("menu")}
              className="px-6 py-3 text-sm font-medium text-white transition-transform transform bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105"
            >
              "Can I see the menu?"
            </button>
            <button
              onClick={() => handleSceneChange("order")}
              className="px-6 py-3 text-sm font-medium text-white transition-transform transform bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105"
            >
              "What is the special of the day?"
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TableScene;
