import React, { useState } from "react";
import { Slide } from "react-awesome-reveal";
import { TypeAnimation } from "react-type-animation";
import Marquee from "react-fast-marquee";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion , useScroll, useTransform } from "framer-motion";

import logo from "../assets/logoTeamZemo.png";
import AnimationIPad from "../components/ui/IPadAnimation";

// ================= TYPING HEADING =================
function TypingHeading({ sequence }) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <h1
            ref={ref}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold ml-4  mt-12"
        >
            {inView && (
                <TypeAnimation
                    sequence={sequence}
                    wrapper="span"
                    cursor={false}
                    repeat={Infinity}
                />
            )}
        </h1>
    );
}

// ================= WORD-BY-WORD ANIMATION =================
function WordReveal({ text, className = "" }) {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
    };

    const child = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    };

    return (
        <motion.p
            className={` ${className}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {words.map((word, idx) => (
                <motion.span key={idx} variants={child} className="inline-block mr-2">
                    {word}
                </motion.span>
            ))}
        </motion.p>
    );
}

// ================= INTERACTIVE BENTO (PROJECTS) =================
function InteractiveBento({ cards }) {
    // State to track which card is active (expanded)
    const [activeCardIndex, setActiveCardIndex] = useState(null);

    return (
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-6 justify-center">
            {cards.map((card, idx) => (
                <motion.div
                    key={idx}
                    className="relative bg-white rounded-2xl shadow-md flex-1 flex flex-col justify-between overflow-hidden cursor-pointer"

                    // Unified animation logic
                    animate={activeCardIndex === idx ? "hover" : "rest"}

                    // Variants for shared animation properties - using flexGrow instead of flex
                    variants={{
                        rest: { flexGrow: 1, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" },
                        hover: { flexGrow: 3, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }
                    }}

                    // Smooth spring transition
                    transition={{ type: "spring", stiffness: 30, damping: 25, mass: 1 }}

                    // Click handler for mobile devices
                    onClick={() => setActiveCardIndex(activeCardIndex === idx ? null : idx)}
                >
                    {/* Image Container with animated overlay */}
                    <div className="relative h-60 sm:h-150 rounded-t-2xl overflow-hidden">
                        {card.image && (
                            <motion.img
                                src={card.image}
                                alt={card.title}
                                className="w-full h-full object-cover"
                                variants={{
                                    rest: { scale: 1.0 },
                                    hover: { scale: 1.05 }
                                }}
                                transition={{ type: "spring", stiffness: 30, damping: 25, mass: 1 }}
                            />
                        )}
                        {/* Fallback background for cards without images */}
                        {!card.image && (
                            <div className="w-full h-full bg-gray-200"></div>
                        )}
                        {/* Darkening Overlay */}
                        <motion.div
                            className="absolute inset-0 bg-black"
                            variants={{
                                rest: { opacity: 0 },
                                hover: { opacity: 0.3 }
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    {/* Text Content */}
                    <div className="p-6 flex flex-col justify-between flex-1">
                        {/* Title with slight upward animation */}
                        <motion.h3
                            className="text-xl font-semibold mb-2"
                            variants={{
                                rest: { y: 0 },
                                hover: { y: -5 }
                            }}
                        >
                            {card.title}
                        </motion.h3>
                        {/* Description with fade-in and slide-up animation */}
                        <motion.p
                            className="text-gray-600 text-sm"
                            variants={{
                                rest: { opacity: 0, y: 10 },
                                hover: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            {card.description}
                        </motion.p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}



// ================= SERVICES =================
const services = [
    "Web Development",
    "App Development",
    "Server Management",
    "API Integration",
    "Cloud Hosting",
    "Routing Solutions",
    "UI/UX Design",
];

// ================= HOME COMPONENT =================
export default function Home() {
    return (
        <div id="home" className="relative bg-[#f1ffcf] text-gray-900">
            {/* ================= HERO ================= */}
            <section className="relative flex flex-col justify-center min-h-screen text-left pb-20 selection:bg-[#f7a1c2]">
                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold ml-4 sm:ml-10 sm:mt-[250px]">
                    Programming
                </h1>
                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold mt-8 ml-4 sm:ml-10">
                    Experiences that
                </h1>
                <TypingHeading className="sm:ml-10" sequence={["Exhilarates.", 2000]} />
            </section>

            {/* ================= CREATE ================= */}
            <section className="w-full flex items-center justify-center min-h-screen mt-20 selection:bg-[#f7a1c2]">
                <div className="relative w-[90%] lg:w-[75%]">
                    <AnimationIPad
                        className="pb-5"
                        titleComponent={
                            <div>
                                <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 text-center">
                                    Create
                                </h2>
                                <h2 className="text-xl sm:text-3xl md:text-5xl text-center text-gray-700 font-semibold">
                                    Projects that make you feel{" "}
                                    <span className="px-3 py-2 font-bold rounded-3xl bg-amber-400/50 inline-block">
                                        Alive.
                                    </span>
                                </h2>
                            </div>
                        }
                    >
                        <img src={logo} alt="Card" className="w-full h-full object-contain" />
                    </AnimationIPad>
                </div>
            </section>

            {/* ================= ABOUT / OUR PHILOSOPHY ================= */}
            <section className="relative flex flex-col lg:flex-row items-center justify-between gap-12 px-6 sm:px-12 lg:px-24 py-28 selection:bg-[#f7a1c2]">
                <div>
                    <WordReveal
                        className="text-lg sm:text-6xl lg:text-8xl text-gray-800"
                        text="We believe in building bold, meaningful, and human-centered digital experiences. Technology should inspire, not overwhelm — that’s the idea behind every project we create."
                    />
                </div>
            </section>

            {/* ================= PROJECT SHOWCASE ================= */}
            <section className="py-28 bg-[#f1ffcf] px-6 sm:px-12 lg:px-24">
                {/*<h2 className="text-3xl sm:text-5xl font-bold mb-16 text-center">*/}
                {/*    Featured Projects*/}
                {/*</h2>*/}
                <InteractiveBento
                    cards={[
                        { title: "Project One", description: "A short description about this project, explaining what it does and how it helps.", image: null },
                        { title: "Project Two", description: "A short description about this project, explaining what it does and how it helps.", image: null },
                        { title: "Project Three", description: "A short description about this project, explaining what it does and how it helps.", image: null },
                    ]}
                />
            </section>

            {/* ================= DOMINATING SECTION ================= */}
            <section className="relative flex items-start justify-start min-h-[40vh] px-6 sm:px-12 lg:px-24 mt-20 selection:bg-[#f7a1c2]">
                <Slide cascade damping={0.2} direction="up" triggerOnce>
                    <div className="text-left text-3xl sm:text-5xl md:text-8xl ml-5 font-bold leading-snug">
                        Dominating every field with{" "}
                        <span className="px-3 py-0 rounded-4xl bg-green-300/50 inline-block">code</span>.
                        <br />
                        Creating Programs that reveal the true{" "}
                        <span className="px-3 py-0 rounded-4xl bg-green-300/50 inline-block">Potential</span> of
                        <TypingHeading sequence={["Technology.", 2000]} />
                    </div>
                </Slide>
            </section>

            {/* ================= SERVICES MARQUEE ================= */}
            <section className="mt-32 selection:bg-[#f7a1c2]">
                <div className="w-full bg-black text-white py-8">
                    <Marquee speed={50} gradient={false} pauseOnHover>
                        {services.map((service, idx) => (
                            <span
                                key={idx}
                                className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold px-8 overflow-y-hidden inline-block"
                            >
                                {service}
                            </span>
                        ))}
                    </Marquee>
                </div>
            </section>

            {/* ================= STATS / CTA ================= */}
            <section className="h-screen flex items-center justify-center px-6 sm:px-12 lg:px-24 bg-[#d7f7a1] selection:bg-[#f7a1c2]">
                <div className="text-center max-w-5xl">
                    <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-10">
                        We build experiences that{" "}
                        <span className="bg-green-300/50 px-4 py-2 rounded-xl">inspire</span> and last.
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
                        <div>
                            <div className="text-5xl sm:text-6xl font-bold text-green-600">
                                <CountUp end={1} duration={1.6} enableScrollSpy />
                            </div>
                            <div className="mt-2 text-sm sm:text-base font-medium">Competitions won</div>
                        </div>
                        <div>
                            <div className="text-5xl sm:text-6xl font-bold text-green-600">
                                <CountUp end={100} duration={1.6} enableScrollSpy />%
                            </div>
                            <div className="mt-2 text-sm sm:text-base font-medium">In-house / Independent</div>
                        </div>
                        <div>
                            <div className="text-5xl sm:text-6xl font-bold text-green-600">
                                <CountUp end={5} duration={1.6} enableScrollSpy />
                            </div>
                            <div className="mt-2 text-sm sm:text-base font-medium">Years experience</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
