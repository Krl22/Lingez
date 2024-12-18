import React, { useState } from "react";
import EntranceScene from "./Entrance";
import TableScene from "./Table";
// import RestaurantScene03 from "./Restaurant03";

const Scene = () => {
  const [currentScene, setCurrentScene] = useState("restaurant"); // Escena inicial

  // Función para cambiar de escena
  const changeScene = (sceneName) => {
    setCurrentScene(sceneName);
  };

  // Renderiza la escena actual
  const renderScene = () => {
    switch (currentScene) {
      case "restaurant":
        return <EntranceScene changeScene={changeScene} />;
      case "table":
        return <TableScene changeScene={changeScene} />;
      case "Restaurant03":
        return <MenuScene changeScene={changeScene} />;
      default:
        return <div>Unknown scene</div>;
    }
  };

  return <div className="h-screen">{renderScene()}</div>;
};

export default Scene;
