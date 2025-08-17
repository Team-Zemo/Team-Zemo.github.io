import React, { useEffect } from "react";
import "./Home.scss";
import webpageHomeVideo from "../assets/webpage_home.mp4";

export default function Home() {
  useEffect(() => {
    const updateOpacity = () => {
      document.querySelectorAll(".scroll-reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Element is considered "in view" when its top is within the viewport
        const triggerPoint = windowHeight * 0.7; // adjust for snappiness

        if (rect.top < triggerPoint) {
          el.style.opacity = 1; // fully visible
        } else {
          el.style.opacity = 0.5; // hidden until scroll
        }
      });
    };

    // Initial check
    updateOpacity();

    // Listen to scroll and resize
    window.addEventListener("scroll", updateOpacity, { passive: true });
    window.addEventListener("resize", updateOpacity);

    return () => {
      window.removeEventListener("scroll", updateOpacity);
      window.removeEventListener("resize", updateOpacity);
    };
  }, []);

  // ye wala scaling effect ka

  // useEffect(() => {
  //   const updateScale = () => {
  //     const el = document.querySelector(".big-reveal");
  //     if (!el) return;

  //     const maxScroll = 320; // pixels over which the scale effect happens
  //     const scrollY = window.scrollY;
  //     const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

  //     const minScale = 1;
  //     const maxScale = 1.5;
  //     const scaleValue = minScale + (maxScale - minScale) * progress;

  //     el.style.transform = `scale(${scaleValue.toFixed(2)})`;
  //   };

  //   // Initial run
  //   updateScale();

  //   // Listen to scroll and resize
  //   window.addEventListener("scroll", updateScale, { passive: true });
  //   window.addEventListener("resize", updateScale);

  //   return () => {
  //     window.removeEventListener("scroll", updateScale);
  //     window.removeEventListener("resize", updateScale);
  //   };
  // }, []);

  useEffect(() => {
    const updateScale = () => {
      const el = document.querySelector(".big-reveal");
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start scaling as soon as .big-reveal enters the viewport
      const start = windowHeight;
      const end = 0;

      let progress = (start - rect.top) / (start - end);
      progress = Math.min(1, Math.max(0, progress));

      const minScale = 1;
      const maxScale = 1.5;
      const scaleValue = minScale + (maxScale - minScale) * progress;

      el.style.transform = `scale(${scaleValue.toFixed(2)})`;
    };

    updateScale();
    window.addEventListener("scroll", updateScale, { passive: true });
    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("scroll", updateScale);
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  // useEffect(() => {
  //   const video = document.querySelector(".scalable-video");
  //   if (!video) return;

  //   const handleScroll = () => {
  //     const section = document.querySelector(".video-section");
  //     if (!section) return;

  //     const rect = section.getBoundingClientRect();
  //     const windowHeight = window.innerHeight;

  //     // When the section is at the top, scale to fullscreen
  //     const progress = Math.min(1, Math.max(0, (windowHeight - rect.top) / windowHeight));

  //     // Initial: 45vw, 25vw; Fullscreen: 100vw, 56vw (16:9)
  //     const width = 45 + (55 * progress); // from 45vw to 100vw
  //     const height = 25 + (31 * progress); // from 25vw to 56vw

  //     video.style.width = `${width}vw`;
  //     video.style.height = `${height}vw`;
  //     video.style.maxWidth = "100vw";
  //     video.style.maxHeight = "100vh";
  //   };

  //   handleScroll();
  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   window.addEventListener("resize", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     window.removeEventListener("resize", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    const video = document.querySelector(".scalable-video");
    if (!video) return;

    const handleScroll = () => {
      const section = document.querySelector(".video-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start scaling as soon as section enters viewport
      const start = windowHeight;
      const end = 0;

      const progress = Math.min(
        1,
        Math.max(0, (start - rect.top) / (start - end))
      );

      // Initial: 45vw, 25vw; Fullscreen: 100vw, 56vw (16:9)
      const width = 45 + 55 * progress;
      const height = 25 + 31 * progress;

      video.style.width = `${width}vw`;
      video.style.height = `${height}vw`;
      video.style.maxWidth = "100vw";
      video.style.maxHeight = "100vh";
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <section className="hero">
        <h1>Programming</h1>
        <h1>Experiences</h1>
        <h1 className="scroll-reveal">that</h1>
        <h1 className="scroll-reveal big-reveal">
          <span className="inner">Exhilarates.</span>
        </h1>
      </section>

      <section className="video-section">
        <div className="video-wrapper">
          <video
            className="scalable-video"
            src={webpageHomeVideo}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </section>

      <footer className="footer-section">
        <div className="footer-humaan">
          <p>
            &copy; {new Date().getFullYear()} Team Zemo &mdash; Made in India
          </p>
        </div>
      </footer>
    </>
  );
}
