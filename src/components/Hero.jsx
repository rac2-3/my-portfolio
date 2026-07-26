import React from "react";
import { Download, Github, Linkedin, Code2, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolioData";

const Hero = () => {
  const { personal } = portfolioData;

  const getSocialIcon = (iconName) => {
    switch (iconName) {
      case "Github":
        return <Github size={20} />;
      case "Linkedin":
        return <Linkedin size={20} />;
      case "Code2":
        return <Code2 size={20} />;
      case "Mail":
        return <Mail size={20} />;
      default:
        return <Code2 size={20} />;
    }
  };

  return (
    <section id="home" className="pt-32 pb-16 xl:pt-40 xl:pb-28 min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-0">
          
          {/* Text Content */}
          <div className="text-center xl:text-left order-2 xl:order-none max-w-[650px]">
            <span className="text-xl block mb-2 text-white/90 font-medium">
              {personal.role}
            </span>
            
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-semibold mb-6 tracking-tight leading-none">
              Hello I'm <br />
              <span className="text-accent">{personal.name}</span>
            </h1>
            
            <p className="max-w-[500px] mb-9 text-white/80 text-base sm:text-lg leading-relaxed">
              {personal.bio}
            </p>

            {/* Buttons & Socials */}
            <div className="flex flex-col sm:flex-row items-center gap-8 justify-center xl:justify-start">
              <a
                href={personal.cvUrl}
                download="Raj_Tilak_Singh_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-semibold transition-all duration-500 border border-accent text-accent hover:bg-accent hover:text-primary h-[56px] px-8 tracking-[2px] uppercase group hover:shadow-[0_0_20px_rgba(0,255,153,0.4)]"
              >
                <span>Download CV</span>
                <Download size={20} className="transition-transform group-hover:translate-y-0.5" />
              </a>

              {/* Social Icons */}
              <div className="flex gap-6 items-center">
                {personal.socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                  >
                    {getSocialIcon(social.icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Photo with Exact Bhavya Framer-Motion Animated Circle */}
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <div className="w-full h-full relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.2, duration: 0.6, ease: "easeIn" },
                }}
              >
                <div className="w-[298px] h-[298px] xl:w-[350px] xl:h-[350px] relative flex items-center justify-center">
                  
                  {/* Cutout Photo Element */}
                  <div className="w-[298px] h-[298px] xl:w-[350px] xl:h-[350px] mix-blend-lighten absolute top-0 left-0 z-10">
                    <img
                      src="/raj.png"
                      alt="Raj Tilak Singh"
                      className="object-contain w-full h-full"
                    />
                  </div>

                  {/* Dynamic Morphing & Rotating Framer-Motion SVG Ring */}
                  <motion.svg
                    className="w-[300px] xl:w-[352px] h-[300px] xl:h-[352px]"
                    fill="transparent"
                    viewBox="0 0 506 506"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.circle
                      cx="253"
                      cy="253"
                      r="250"
                      stroke="#00ff99"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ strokeDasharray: "24 10 0 0" }}
                      animate={{
                        strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                        rotate: [120, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  </motion.svg>

                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
