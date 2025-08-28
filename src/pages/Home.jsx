import React, { useEffect, useState, useRef } from "react";
import webpageHomeVideo from "../assets/webpage_home.mp4";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import noiseImage from "../assets/nnnoise.svg";
import Navbar from "../components/Navbar";
import PageWrapper from "../components/PageWrapper";
import AnimationIPad from "../components/ui/IPadAnimation";
import logo from "../assets/logoTeamZemo.png";
import Particles from "../components/Particles";

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
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    let timeout;
    if (inView) {
      let i = 0;
      function type() {
        setDisplayed(text.slice(0, i));
        if (i <= text.length) {
          timeout = setTimeout(() => {
            i++;
            type();
          }, 80);
        }
      }
      type();
    }
    return () => clearTimeout(timeout);
  }, [inView, text]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {displayed}
      <span className="animate-pulse">|</span>
    </motion.span>
  );
}

function AnimatedWord() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["awesome", "cool", "great", "stunning", "chaotic"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <motion.span
      key={currentWord}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-green-500"
    >
      {words[currentWord]}
    </motion.span>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll({ target: heroRef });
  const y1 = useTransform(scrollY, [0, 400], [0, 60]); // slowest
  const y2 = useTransform(scrollY, [0, 400], [0, 100]); // medium
  const y3 = useTransform(scrollY, [0, 400], [0, 160]); // fastest

  return (
    <>
      {/* <div
        className="min-h-screen relative"
        style={{
          backgroundImage: `url("${noiseImage}")`,
          backgroundRepeat: "repeat",
          backgroundColor: "#e4fcbb",
          backgroundBlendMode: "normal",
        }}
      > */}
      {/* <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            pointerEvents: "auto",
          }}
        >
          <Particles
            particleColors={["#000000", "#333333", "#666666"]}
            particleCount={80}
            particleSpread={12}
            speed={0.2}
            particleBaseSize={120}
            alphaParticles={true}
            disableRotation={false}
            moveParticlesOnHover={true}
            particleHoverFactor={3}
          />
        </div> */}

      <div
        style={{
          position: "relative",
          zIndex: 10,
          backgroundColor: "#f1ffcf",
          // backgroundImage: `url("${noiseImage}")`,
          // backgroundRepeat: "repeat",
        }}
      >
        <Navbar />
        <section
          ref={heroRef}
          className="relative flex flex-col items-left justify-center min-h-screen text-left pb-40 selection:bg-[#f7a1c2]"
        >
          <motion.h1
            className="text-[10rem] font-bold  mt-60 ml-10"
            style={{ y: y1 }}
          >
            Programming
          </motion.h1>
          <motion.h1
            className="text-[10rem] font-bold -mt-20 mb-2 ml-10"
            style={{ y: y2 }}
          >
            Experiences that
          </motion.h1>
          <motion.h1
            className="scroll-reveal text-[15rem] font-bold ml-10"
            style={{ y: y3 }}
          >
            <TypingText text="Exhilarates." />
          </motion.h1>
        </section>

        <section className="w-full flex items-center justify-center min-h-screen p-0 m-0 mt-20 bg-[#d7f7a1]  selection:bg-[#f7a1c2]">
          <div className="relative min-w-lvh w-[80%]">
            <AnimationIPad
              className=" pb-5"
              titleComponent={
                <div>
                  <h2 className="text-8xl font-black mb-8 text-center">
                    Create
                  </h2>
                  <h2 className="text-6xl text-center font-gray-500 font-bold">
                    Projects that makes you feel{" "}
                    <span className="font-bolder bg-amber-400/50 ">Alive.</span>
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
        <section className="flex items-center justify-left min-h-[40vh] px-8 ml-10 mt-20  selection:bg-[#f7a1c2]">
          <div className="text-left text-8xl font-bold">
            Dominating every field with{" "}
            <motion.span
              initial={{ backgroundColor: "rgba(34,197,94,0)" }}
              whileInView={{ backgroundColor: "rgba(34,197,94,0.5)" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="px-3 rounded"
            >
              code
            </motion.span>
            . <br />
            Creating Programs that reveals the true{" "}
            <motion.span
              initial={{ backgroundColor: "rgba(34,197,94,0)" }}
              whileInView={{ backgroundColor: "rgba(34,197,94,0.5)" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="px-3 rounded"
            >
              Potential
            </motion.span>{" "}
            of <br />
            <h1 className="text-[12rem] font-bold mt-6">
              <TypingText text="Technology." />
            </h1>
          </div>
        </section>
        <section className="mt-40  selection:bg-[#f7a1c2]">
          <div className="w-full overflow-hidden bg-black text-white py-8">
            <motion.div
              className="flex gap-16 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 16,
                ease: "linear",
              }}
              style={{ willChange: "transform" }}
            >
              {[...services, ...services].map((service, idx) => (
                <span key={idx} className="text-8xl font-bold text-white px-8">
                  {service}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Dynamic Call-to-Action Section */}
        <section className="min-h-screen flex flex-col justify-left items-left text-left px-8 py-20 mt-20 bg-[#d7f7a1]  selection:bg-[#f7a1c2]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-[3rem] font-bold  mb-4 flex items-left justify-left gap-6">
                Let's make something{" "}
                <svg
                  width="80"
                  height="80"
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
              <h1 className="text-[3rem] font-bold leading-tight mt-4">
                <AnimatedWord /> together.
              </h1>
            </div>

            {/* Email Contact Section */}
            <div className="mt-20 space-y-12">
              <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                <div className="text-left">
                  <h3 className="text-3xl font-bold mb-6">Get in touch</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold mb-2">
                        General Inquiries
                      </h4>
                      <a
                        href="https://tanishqtiwari2020@gmail.com"
                        className="text-lg text-gray-600 hover:text-green-500 transition-colors"
                      >
                        [Tanishq Tiwari]
                      </a>
                      <a
                        href="https://udaykhare77@gmail.com"
                        className="text-lg text-gray-600 hover:text-green-500 transition-colors"
                      >
                        [Uday Khare]
                      </a>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Business</h4>
                      <a
                        href="mailto:"
                        className="text-lg text-gray-600 hover:text-green-500 transition-colors"
                      >
                        []
                      </a>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Support</h4>
                      <a
                        href="mailto:"
                        className="text-lg text-gray-600 hover:text-green-500 transition-colors"
                      >
                        [SUPPORT EMAIL HERE]
                      </a>
                    </div>
                  </div>
                </div>

                <div className="text-left">
                  <h3 className="text-3xl font-bold mb-6">Follow Us</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold mb-2">
                        Social Media
                      </h4>
                      <div className="space-y-2">
                        <a
                          href="#"
                          className="block text-lg text-gray-600 hover:text-green-500 transition-colors"
                        >
                          Twitter / X
                        </a>
                        <a
                          href="#"
                          className="block text-lg text-gray-600 hover:text-green-500 transition-colors"
                        >
                          LinkedIn
                        </a>
                        <a
                          href="#"
                          className="block text-lg text-gray-600 hover:text-green-500 transition-colors"
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

        <footer className="bg-[#d7f7a1] selection:bg-[#f7a1c2]">
          <div className="text-center">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} Team Zemo &mdash; Made in India
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
