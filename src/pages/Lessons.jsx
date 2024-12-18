import React from "react";

const lessons = [
  {
    title: "Introduction to English",
    description:
      "Learn the basics of English language, including alphabet, pronunciation, and simple phrases.",
    image: "https://via.placeholder.com/150?text=Intro+to+English",
  },
  {
    title: "Beginner Vocabulary",
    description:
      "Expand your vocabulary with common words and phrases used in everyday conversations.",
    image: "https://via.placeholder.com/150?text=Beginner+Vocabulary",
  },
  {
    title: "Basic Grammar",
    description:
      "Understand the basic rules of English grammar, including sentence structure and common grammar rules.",
    image: "https://via.placeholder.com/150?text=Basic+Grammar",
  },
  {
    title: "Listening Skills",
    description:
      "Improve your listening skills with exercises and practice conversations.",
    image: "https://via.placeholder.com/150?text=Listening+Skills",
  },
  {
    title: "Speaking Practice",
    description:
      "Practice speaking English with interactive exercises and role plays.",
    image: "https://via.placeholder.com/150?text=Speaking+Practice",
  },
  {
    title: "Reading Comprehension",
    description:
      "Enhance your reading skills with interesting articles and stories.",
    image: "https://via.placeholder.com/150?text=Reading+Comprehension",
  },
  {
    title: "Writing Skills",
    description:
      "Develop your writing skills with practice prompts and exercises.",
    image: "https://via.placeholder.com/150?text=Writing+Skills",
  },
  {
    title: "Cultural Insights",
    description:
      "Learn about the cultural aspects of English-speaking countries.",
    image: "https://via.placeholder.com/150?text=Cultural+Insights",
  },
];

const Lessons = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6 pt-[92px] pb-[112px]">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-700">Lessons</h1>
        <p className="text-lg text-gray-600">
          Improve your English skills with our comprehensive lessons
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson, index) => (
          <div
            key={index}
            className="p-6 transition duration-500 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2"
          >
            <div className="relative mb-4 overflow-hidden rounded-lg shadow-md pb-2/3">
              <img
                src={lesson.image}
                alt={lesson.title}
                className="absolute inset-0 object-cover w-full h-full"
              />
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-blue-700">
              {lesson.title}
            </h2>
            <p className="text-gray-600">{lesson.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lessons;
