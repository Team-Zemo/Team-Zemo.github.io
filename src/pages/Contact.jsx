import React from "react";
import Navbar from "../components/Navbar";

function Contact() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#faf5ff", // Light purple background
      }}
    >
      {/* Navbar with Contact theme */}
      <Navbar
        backgroundColor="rgba(168, 85, 247, 0.15)"
        textColor="text-purple-800"
        logoColor="invert-0"
      />

      <div className="container mx-auto px-4 pt-20">
        <h1 className="text-6xl font-bold text-center text-purple-800 mb-8">
          Contact Us
        </h1>
        <p className="text-xl text-center text-purple-700">
          Get in touch with Team Zemo for your next project.
        </p>
        {/* Add your contact form here */}
      </div>
    </div>
  );
}

export default Contact;
