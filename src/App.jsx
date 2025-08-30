import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import "./App.css";

function NavbarWithRoute() {
  const location = useLocation();
  const path = location.pathname;
  const themes = {
    "/": {
      backgroundColor: "rgba(34, 197, 94, 0.15)",
      textColor: "text-green-800",
      logoColor: "invert-0",
    },
    "/about": {
      backgroundColor: "rgba(59, 130, 246, 0.15)",
      textColor: "text-blue-800",
      logoColor: "invert-0",
    },
    "/projects": {
      backgroundColor: "rgba(251, 191, 36, 0.15)",
      textColor: "text-yellow-800",
      logoColor: "invert-0",
    },
    "/contact": {
      backgroundColor: "rgba(168, 85, 247, 0.15)",
      textColor: "text-purple-800",
      logoColor: "invert-0",
    },
  };
  const theme = themes[path] || themes["/"];
  return <Navbar {...theme} />;
}

function App() {
  return (
    <Router>
      <NavbarWithRoute />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
