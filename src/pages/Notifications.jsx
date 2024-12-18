import React from "react";

const NotificationsPage = () => {
  // Data de las notificaciones gamificadas
  const notificationsData = [
    {
      id: 1,
      message: "¡Felicidades! Has alcanzado el nivel 5.",
      type: "level",
      timestamp: "Hoy, 10:30 AM",
    },
    {
      id: 2,
      message: "Has obtenido 50 puntos por completar una lección.",
      type: "points",
      timestamp: "Ayer, 3:45 PM",
    },
    {
      id: 3,
      message:
        "¡Recompensa desbloqueada! Obtuviste el badge de 'Estudiante Avanzado'.",
      type: "reward",
      timestamp: "Ayer, 11:20 AM",
    },
    {
      id: 4,
      message: "¡Te falta poco para terminar tu lección! Sigue así.",
      type: "progress",
      timestamp: "Hoy, 9:00 AM",
    },
    {
      id: 5,
      message:
        "Haz completado todas las lecciones de nivel básico. ¡Sigue avanzando!",
      type: "level",
      timestamp: "Hoy, 8:15 AM",
    },
    {
      id: 6,
      message:
        "Obtuviste 100 puntos adicionales por responder correctamente en la prueba.",
      type: "points",
      timestamp: "Ayer, 6:30 PM",
    },
    {
      id: 7,
      message:
        "¡Nuevo desafío disponible! Aprende 10 nuevas palabras en inglés.",
      type: "reward",
      timestamp: "Hoy, 11:45 AM",
    },
    {
      id: 8,
      message: "¡Has alcanzado el 50% de progreso en tu curso de gramática!",
      type: "progress",
      timestamp: "Ayer, 9:50 AM",
    },
  ];

  // Función para obtener el estilo según el tipo de notificación
  const getNotificationTypeStyle = (type) => {
    switch (type) {
      case "level":
        return "bg-gradient-to-r from-purple-500 to-purple-700";
      case "points":
        return "bg-gradient-to-r from-blue-500 to-blue-700";
      case "reward":
        return "bg-gradient-to-r from-yellow-500 to-yellow-700";
      case "progress":
        return "bg-gradient-to-r from-green-500 to-green-700";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="h-full px-4 bg-gray-200">
      <div className="max-w-lg mx-auto mt-8">
        <div className="space-y-4">
          {/* Iterar sobre la data de las notificaciones */}
          {notificationsData.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-md p-4 shadow-lg flex items-center space-x-4 ${getNotificationTypeStyle(
                notification.type
              )}`}
            >
              <div className="flex-none">
                {notification.type === "level" && (
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
                {notification.type === "points" && (
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                )}
                {notification.type === "reward" && (
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12l5 5L19 7"
                    />
                  </svg>
                )}
                {notification.type === "progress" && (
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l-3 3m0 0l-3-3m3 3V4"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-grow text-white">
                <p className="text-lg font-semibold">{notification.message}</p>
                <p className="text-sm">{notification.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
