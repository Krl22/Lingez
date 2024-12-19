import React, { useState, useEffect, useRef } from "react";
import OpenAI from "openai";
import { FiMic, FiSend } from "react-icons/fi";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
    {
      role: "assistant",
      content:
        "Hello! I am your English tutor. I can help you with writing, speaking, and listening. How can I assist you today?",
      avatar: "https://via.placeholder.com/50",
    },
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [suggestions, setSuggestions] = useState([
    "I need help to pronounce 'thought'",
    "What is the meaning of 'made'?",
    "Can you help me with past tense?",
  ]);
  const messagesEndRef = useRef(null);
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  let mediaRecorder;
  let audioChunks = [];

  const handleSendMessage = async (messageContent) => {
    if (messageContent.trim() !== "") {
      const newMessage = {
        role: "user",
        content: messageContent,
        avatar: "https://via.placeholder.com/50",
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      setSuggestions([]); // Remove suggestions after sending a message

      try {
        const chatCompletion = await openai.chat.completions.create({
          messages: [...messages, newMessage],
          model: "gpt-3.5-turbo",
        });

        const assistantMessage = {
          role: "assistant",
          content: chatCompletion.choices[0].message.content,
          avatar: "https://via.placeholder.com/50",
        };

        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      } catch (error) {
        console.error("Error al obtener respuesta del chat:", error);
      }
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        audioChunks = [];
      };
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorder.stop();
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    handleSendMessage(suggestion); // Automatically send the message when a suggestion is clicked
  };

  return (
    <div className="flex flex-col justify-between pb-[100px] h-screen p-6 bg-gradient-to-r from-purple-400 to-indigo-600">
      <div className="flex-grow p-6 overflow-y-auto bg-white rounded-lg shadow-lg">
        {messages.slice(1).map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex items-start ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <img
                src={msg.avatar}
                alt="AI Avatar"
                className="w-10 h-10 mr-3 rounded-full"
              />
            )}
            <div
              className={`max-w-xs p-4 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <span className="block mb-1 font-bold">
                {msg.role === "user" ? "You" : "AI"}
              </span>
              {msg.content}
            </div>
            {msg.role === "user" && (
              <img
                src={msg.avatar}
                alt="User Avatar"
                className="w-10 h-10 ml-3 rounded-full"
              />
            )}
          </div>
        ))}
        {suggestions.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-gray-800">Suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="text-gray-800 border-gray-800 btn btn-outline hover:bg-gray-800 hover:text-white"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center mt-4">
        <div className="relative flex items-center w-full">
          <input
            type="text"
            className="w-full pr-24 input input-bordered focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(input);
              }
            }}
          />
          <button
            className="absolute inset-y-0 px-3 py-2 text-white bg-purple-500 right-10 hover:bg-purple-600"
            onClick={isRecording ? stopRecording : startRecording}
          >
            <FiMic />
          </button>
          <button
            className="absolute inset-y-0 right-0 px-3 py-2 text-white bg-purple-500 rounded-r-lg hover:bg-purple-600"
            onClick={() => handleSendMessage(input)}
          >
            <FiSend />
          </button>
        </div>
      </div>
      {audioURL && (
        <div className="flex items-center justify-center mt-4">
          <audio controls src={audioURL} className="w-full max-w-xs" />
        </div>
      )}
    </div>
  );
};

export default Chat;
