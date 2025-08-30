import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import webpageHomeVideo from "../assets/webpage_home.mp4";
import noiseImage from "../assets/nnnoise.svg";
import Navbar from "../components/Navbar";
import PageWrapper from "../components/PageWrapper";
import AnimationIPad from "../components/ui/IPadAnimation";
import logo from "../assets/logoTeamZemo.png";
// import Particles from "../components/Particles";

gsap.registerPlugin(ScrollTrigger);

const services = [
  "Web Development",
  "App Development",
  "Server Management",
  "API Integration",
  "Cloud Hosting",
  "Routing Solutions",
  "UI/UX Design",
];

function TypingText({ text, className }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function AnimatedWord() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["awesome", "cool", "great", "stunning", "chaotic"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return <span className="text-green-500">{words[currentWord]}</span>;
}

export default function Home() {
  const heroRef = useRef(null);
  const marqueeRef = useRef(null);

  // GSAP animations
  useEffect(() => {
    // Hero text parallax
    gsap.utils.toArray(".hero-text").forEach((el, i) => {
      gsap.to(el, {
        y: (i + 1) * 60,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          scrub: true,
        },
      });
    });

    // Marquee infinite scroll
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 16,
      ease: "linear",
    });
  }, []);

  return (
    <div
      style={{
        position: "relative",
        zIndex: 10,
        backgroundColor: "#f1ffcf",
      }}
    >
      {/* Navbar with Home theme */}
      <Navbar
        backgroundColor="rgba(34, 197, 94, 0.15)"
        textColor="text-green-800"
        logoColor="invert-0"
      />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-left justify-center min-h-screen text-left pb-40 selection:bg-[#f7a1c2]"
      >
        <h1 className="hero-text text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold mt-20 sm:mt-40 ml-4 sm:ml-10">
          Programming
        </h1>
        <h1 className="hero-text text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold mt-6 sm:mt-20 mb-2 ml-4 sm:ml-10">
          Experiences that
        </h1>
        <h1 className="hero-text scroll-reveal text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] font-bold ml-4 sm:ml-10">
          <TypingText text="Exhilarates." />
        </h1>
      </section>

      {/* Create Section */}
      <section className="w-full flex items-center justify-center min-h-screen mt-20 bg-[#d7f7a1] selection:bg-[#f7a1c2]">
        <div className="relative min-w-lvh w-[80%]">
          <AnimationIPad
            className="pb-5"
            titleComponent={
              <div>
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 text-center">
                  Create
                </h2>
                <h2 className="text-2xl sm:text-4xl md:text-6xl text-center font-gray-500 font-bold">
                  Projects that makes you feel{" "}
                  <span className="font-bolder bg-amber-400/50">Alive.</span>
                </h2>
              </div>
            }
          >
            <img
              src={logo}
              alt="Card"
              className="w-full h-full object-contain"
            />
          </AnimationIPad>
        </div>
      </section>

      {/* Dominating Section */}
      <section className="flex items-center justify-left min-h-[40vh] px-4 sm:px-8 ml-4 sm:ml-10 mt-20 selection:bg-[#f7a1c2]">
        <div className="text-left text-4xl sm:text-6xl md:text-8xl font-bold">
          Dominating every field with{" "}
          <span className="px-3 rounded bg-green-300/50">code</span>. <br />
          Creating Programs that reveals the true{" "}
          <span className="px-3 rounded bg-green-300/50">
            Potential
          </span> of <br />
          <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] font-bold mt-6">
            <TypingText text="Technology." />
          </h1>
        </div>
      </section>

      {/* Services Marquee */}
      <section className="mt-40 selection:bg-[#f7a1c2]">
        <div className="w-full overflow-hidden bg-black text-white py-8">
          <div ref={marqueeRef} className="flex gap-16 whitespace-nowrap w-max">
            {[...services, ...services].map((service, idx) => (
              <span
                key={idx}
                className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white px-4 sm:px-8"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="min-h-screen flex flex-col justify-left items-left text-left px-4 sm:px-8 py-20 mt-20 bg-[#d7f7a1] selection:bg-[#f7a1c2]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 flex items-left justify-left gap-6">
              Let's make something{" "}
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </h1>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold leading-tight mt-4">
              <AnimatedWord /> together.
            </h1>
          </div>

          {/* Contact Section */}
          <div className="mt-20 space-y-12">
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="text-left">
                <h3 className="text-2xl sm:text-3xl font-bold mb-6">
                  Get in touch
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold mb-2">
                      General Inquiries
                    </h4>
                    <a
                      href="mailto:tanishqtiwari2020@gmail.com"
                      className="block text-gray-600 hover:text-green-500 transition-colors"
                    >
                      [Tanishq Tiwari]
                    </a>
                    <a
                      href="mailto:udaykhare77@gmail.com"
                      className="block text-gray-600 hover:text-green-500 transition-colors"
                    >
                      [Uday Khare]
                    </a>
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold mb-2">
                      Business
                    </h4>
                    <a
                      href="mailto:"
                      className="block text-gray-600 hover:text-green-500 transition-colors"
                    >
                      []
                    </a>
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold mb-2">
                      Support
                    </h4>
                    <a
                      href="mailto:"
                      className="block text-gray-600 hover:text-green-500 transition-colors"
                    >
                      [SUPPORT EMAIL HERE]
                    </a>
                  </div>
                </div>
              </div>

              <div className="text-left">
                <h3 className="text-2xl sm:text-3xl font-bold mb-6">
                  Follow Us
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold mb-2">
                      Social Media
                    </h4>
                    <div className="space-y-2">
                      <a
                        href="#"
                        className="block text-gray-600 hover:text-green-500 transition-colors"
                      >
                        Twitter / X
                      </a>
                      <a
                        href="#"
                        className="block text-gray-600 hover:text-green-500 transition-colors"
                      >
                        LinkedIn
                      </a>
                      <a
                        href="#"
                        className="block text-gray-600 hover:text-green-500 transition-colors"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#d7f7a1] selection:bg-[#f7a1c2]">
        <div className="text-center">
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            &copy; {new Date().getFullYear()} Team Zemo &mdash; Made in India
          </p>
        </div>
      </footer>
    </div>
  );
}
