import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const Front = () => {
    const headingRef = useRef([]);
    const paraRef = useRef([]);
    const prefix = "Welcome to ";
    const brand = "Cronicast";
    const suffix = "!";
    const para =
        "Your personal space to share thoughts, stories, and ideas. Fast. Private. Creative.";

   useEffect(() => {
  const animate = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(headingRef.current, { y: 80, opacity: 0, scale: 0.5 });
        gsap.set(paraRef.current, { y: 40, opacity: 0, scale: 0.8 });
        setTimeout(animate, 3000); // wait 3s then repeat
      },
    });

    const brandStart = prefix.length;
    const brandEnd = prefix.length + brand.length;
    const brandRefs = headingRef.current.slice(brandStart, brandEnd);

    brandRefs.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0.1 },
        {
          opacity: 1,
          duration: 0.15,
          repeat: 3,
          yoyo: true,
          delay: i * 0.03,
          ease: "power1.inOut",
        }
      );
    });

    tl.to(headingRef.current, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      stagger: 0.04,
      ease: "back.out(1.7)",
    })
      .to(
        paraRef.current,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.01,
          ease: "power3.out",
        },
        "-=0.8"
      )
      .from(
        ".cta-button",
        {
          y: 30,
          opacity: 1,
          duration: 1,
          ease: "elastic.out(3, 0.3)",
        },
        "-=0.5"
      );

    gsap.to(".cta-button", {
      y: -5,
      repeat: 2,
      yoyo: true,
      duration: 1.2,
      ease: "sine.inOut",
      delay: 2,
    });
  };

  animate();
}, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-400 p-6 relative overflow-hidden">
            {/* Background moving dots */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                {[...Array(80)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-4 h-4 bg-black rounded-full opacity-40 blur"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `moveStar ${10 + Math.random() * 10}s linear infinite`,
                        }}
                    />
                ))}
            </div>

            {/* Animated Heading */}
            <h1 className="text-6xl md:text-8xl font-extrabold text-center text-white tracking-wide mb-6 flex flex-wrap justify-center">
                {[...prefix].map((char, i) => (
                    <span
                        key={`prefix-${i}`}
                        ref={(el) => (headingRef.current[i] = el)}
                        className="inline-block"
                        style={{ textShadow: "0 0 12px rgba(0, 255, 255, 0.5)" }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
                {[...brand].map((char, i) => (
                    <span
                        key={`brand-${i}`}
                        ref={(el) =>
                            (headingRef.current[prefix.length + i] = el)
                        }
                        className="inline-block animate-gradient"
                        style={{ textShadow: "0 0 20px teal" }}
                    >
                        {char}
                    </span>
                ))}
                {[...suffix].map((char, i) => (
                    <span
                        key={`suffix-${i}`}
                        ref={(el) =>
                            (headingRef.current[prefix.length + brand.length + i] = el)
                        }
                        className="inline-block"
                    >
                        {char}
                    </span>
                ))}
            </h1>

            {/* Animated Paragraph */}
            <h2
                className="text-lg md:text-2xl mb-10 font-medium text-center text-white tracking-wide max-w-4xl leading-snug"
                style={{ textShadow: "0 0 12px rgba(0, 255, 255, 0.5)" }}
            >
                {para.split("").map((char, index) => (
                    <span
                        key={`para-${index}`}
                        ref={(el) => (paraRef.current[index] = el)}
                        className="inline-block"
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </h2>

            {/* Call to Action Button */}
            <Link
                to="/login"
                className="cta-button mt-10 px-6 py-3 text-white bg-teal-500 hover:bg-teal-600 transition-all duration-300 rounded-lg text-lg font-semibold shadow-lg"
                style={{ opacity: 1, transform: "translateY(0)" }} // 👈 Add this
            >
                🚀 Get Started
            </Link>
        </div>
    );
};

export default Front;
