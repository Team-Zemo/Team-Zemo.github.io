import React from "react";
import Navbar from "../components/Navbar";

function Projects() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#fff7ed", // Light orange background
      }}
    >
      {/* Navbar with Projects theme */}
      <Navbar
        backgroundColor="rgba(251, 191, 36, 0.15)"
        textColor="text-yellow-800"
        logoColor="invert-0"
      />

      <div className="container mx-auto px-4 pt-20">
        <h1 className="text-6xl font-bold text-center text-yellow-800 mb-8">
          Our Projects
        </h1>
        <p className="text-xl text-center text-yellow-700">
          Showcasing our amazing work and creative solutions.
        </p>
        {/* Add your projects content here */}
      </div>
    </div>
  );
}

export default Projects;
