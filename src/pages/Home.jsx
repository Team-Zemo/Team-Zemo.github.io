import React from "react";
import { Slide } from "react-awesome-reveal";
import { TypeAnimation } from "react-type-animation";
import Marquee from "react-fast-marquee";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";

import logo from "../assets/logoTeamZemo.png";
import AnimationIPad from "../components/ui/IPadAnimation";

//===================Line Reveal====================
const revealLine = {
    hidden: { clipPath: "inset(0 0 100% 0)", y: 5 },
    visible: { clipPath: "inset(0 0 0% 0)", y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// ================= TYPING HEADING =================
function TypingHeading({ sequence }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <h1
            ref={ref}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold mt-4"
        >
            {inView && <TypeAnimation sequence={sequence} wrapper="span" cursor={false} repeat={Infinity} />}
        </h1>
    );
}

// ================= WORD-BY-WORD ANIMATION =================
function WordReveal({ text, className = "" }) {
    const words = text.split(" ");

    const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
    const child = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } } };

    return (
        <motion.p className={` ${className}`} variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {words.map((word, idx) => (
                <motion.span key={idx} variants={child} className="inline-block mr-2">{word}</motion.span>
            ))}
        </motion.p>
    );
}

// ================= TIMELINE PROJECTS =================
function TimelineProjects({ projects }) {
    return (
        <div className="relative w-full max-w-5xl mx-auto py-12">
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-green-300/70 rounded-full z-0 hidden sm:block" />
            <div className="flex flex-col gap-20">
                {projects.map((project, idx) => (
                    <motion.div
                        key={idx}
                        className={`relative flex flex-col sm:flex-row items-center gap-8 ${idx % 2 === 0 ? "sm:flex-row-reverse" : ""}`}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 80, damping: 20 }}
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-500 rounded-full shadow-lg z-10" />
                        <motion.div className="bg-white rounded-3xl shadow-xl p-8 w-full sm:w-1/2 z-10 hover:scale-[1.02] transition-transform duration-300" whileHover={{ y: -6 }}>
                            {project.image ? (
                                <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-xl mb-6" />
                            ) : (
                                <div className="w-full h-48 bg-gray-100 rounded-xl mb-6 flex items-center justify-center">
                                    <div className="text-gray-400 text-sm">No preview</div>
                                </div>
                            )}
                            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                            <p className="text-gray-600">{project.description}</p>
                            {project.meta && <div className="mt-4 text-sm text-gray-500">{project.meta}</div>}
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// ================= SERVICES =================
const services = ["Web Development","App Development","Server Management","API Integration","Cloud Hosting","Routing Solutions","UI/UX Design"];

// ================= HOME COMPONENT =================
export default function Home() {
    const projectsData = [
        { title: "Project One", description: "A creative digital experience with bold UI/UX. Built with React and modern animation patterns.", image: null, meta: "React • Framer Motion • Tailwind" },
        { title: "Project Two", description: "Scalable web application focusing on performance and accessibility.", image: null, meta: "Next.js • Node • PostgreSQL" },
        { title: "Project Three", description: "Mobile-first product with delightful micro-interactions and offline support.", image: null, meta: "React Native • IndexedDB • Service Workers" },
        { title: "Project Four", description: "Experimental immersive project using 3D and motion for unique storytelling.", image: null, meta: "Three.js • GLSL • Framer Motion" },
    ];

    // ==================== LENIS SCROLL ====================
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => t,
            smooth: true,
            direction: "vertical",
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return (
        <div id="home" className="relative bg-[#f1ffcf] text-gray-900">
            {/* ================= HERO ================= */}
            <section className="flex flex-col justify-center min-h-screen text-left px-4 sm:px-10 selection:bg-[#f7a1c2]">
                <motion.h1 variants={revealLine} initial="hidden" animate="visible" transition={{ delay: 0 }} className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold mt-[250px] overflow-hidden">Programming</motion.h1>
                <motion.h1 variants={revealLine} initial="hidden" animate="visible" transition={{ delay: 0.6 }} className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold mt-8 overflow-hidden">Experiences that</motion.h1>
                <motion.h1 variants={revealLine} initial="hidden" animate="visible" transition={{ delay: 1.2 }} className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold mt-8 overflow-hidden">Exhilarates.</motion.h1>
            </section>

            {/* ================= CREATE ================= */}
            <section className="w-full flex items-center justify-center min-h-screen mt-20 selection:bg-[#f7a1c2]">
                <div className="relative w-[90%] lg:w-[75%]">
                    <AnimationIPad className="pb-5" titleComponent={
                        <div>
                            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 text-center">Create</h2>
                            <h2 className="text-xl sm:text-3xl md:text-5xl text-center text-gray-700 font-semibold">
                                Projects that make you feel{" "}
                                <span className="px-3 py-2 font-bold rounded-3xl bg-amber-400/50 inline-block">Alive.</span>
                            </h2>
                        </div>
                    }>
                        <img src={logo} alt="Card" className="w-full h-full object-contain" />
                    </AnimationIPad>
                </div>
            </section>

            {/* ================= ABOUT ================= */}
            <section className="relative flex flex-col lg:flex-row items-center justify-between gap-12 px-6 sm:px-12 lg:px-24 py-28 selection:bg-[#f7a1c2]">
                <WordReveal className="text-lg sm:text-6xl lg:text-8xl text-gray-800" text="We believe in building bold, meaningful, and human-centered digital experiences. Technology should inspire, not overwhelm — that’s the idea behind every project we create." />
            </section>

            {/* ================= PROJECT SHOWCASE ================= */}
            <section className="py-28 bg-[#f1ffcf] px-6 sm:px-12 lg:px-24">
                <h2 className="text-3xl sm:text-5xl font-bold mb-12 text-center">Featured Projects</h2>
                <TimelineProjects projects={projectsData} />
            </section>

            {/* ================= DOMINATING ================= */}
            <section className="relative flex items-start justify-start min-h-[40vh] px-6 sm:px-12 lg:px-24 mt-20 selection:bg-[#f7a1c2]">
                <Slide cascade damping={0.2} direction="up" triggerOnce>
                    <div className="text-left text-3xl sm:text-5xl md:text-8xl ml-5 font-bold leading-snug">
                        Dominating every field with <span className="px-3 py-0 rounded-4xl bg-green-300/50 inline-block">code</span>.
                        <br />
                        Creating Programs that reveal the true <span className="px-3 py-0 rounded-4xl bg-green-300/50 inline-block">Potential</span> of
                        <TypingHeading sequence={["Technology.", 2000]} />
                    </div>
                </Slide>
            </section>

            {/* ================= SERVICES MARQUEE ================= */}
            <section className="mt-60 selection:bg-[#f7a1c2]">
                <div className="w-full bg-black text-white py-8">
                    <Marquee speed={50} gradient={false} pauseOnHover>
                        {services.map((service, idx) => (
                            <span key={idx} className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold px-8 overflow-y-hidden inline-block">{service}</span>
                        ))}
                    </Marquee>
                </div>
            </section>

            {/* ================= STATS / CTA ================= */}
            <section className="h-screen flex flex-row items-center justify-between px-6 sm:px-12 lg:px-24 selection:bg-[#f7a1c2]">
                <div className="text-left max-w-4xl">
                    <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-10">We build experiences that <span className="bg-green-300/50 px-4 py-2 rounded-xl">inspire</span> and last.</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
                        <div><div className="text-5xl sm:text-6xl font-bold text-green-600"><CountUp end={1} duration={1.6} enableScrollSpy /></div><div className="mt-2 text-sm sm:text-base font-medium">Competitions won</div></div>
                        <div><div className="text-5xl sm:text-6xl font-bold text-green-600"><CountUp end={100} duration={1.6} enableScrollSpy />%</div><div className="mt-2 text-sm sm:text-base font-medium">In-house / Independent</div></div>
                        <div><div className="text-5xl sm:text-6xl font-bold text-green-600"><CountUp end={5} duration={1.6} enableScrollSpy /></div><div className="mt-2 text-sm sm:text-base font-medium">Years experience</div></div>
                    </div>
                </div>
                <div className="bottom-10 text-sm text-gray-600">ghiuhlkj;lk</div>
            </section>
        </div>
    );
}
