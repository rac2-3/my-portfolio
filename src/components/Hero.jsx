import React from "react";
import { Download, Github, Linkedin, Code2, Mail } from "lucide-react";
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
            <span className="text-lg xl:text-xl font-medium tracking-wider text-white/80 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full inline-block mb-4 border-accent/20">
              {personal.role}
            </span>
            
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-semibold mb-6 tracking-tight leading-none">
              Hello I'm <br />
              <span className="text-accent">{personal.name}</span>
            </h1>
            
            <p className="max-w-[540px] mb-9 text-white/80 text-base sm:text-lg leading-relaxed">
              {personal.bio}
            </p>

            {/* Buttons & Socials */}
            <div className="flex flex-col sm:flex-row items-center gap-8 justify-center xl:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full text-base font-semibold transition-all duration-500 border border-accent text-accent hover:bg-accent hover:text-primary h-[56px] px-8 tracking-wider uppercase group hover:shadow-[0_0_20px_rgba(0,255,153,0.4)]"
              >
                <span>Get In Touch</span>
                <Download size={20} className="transition-transform group-hover:translate-y-0.5" />
              </a>

              {/* Social Icons */}
              <div className="flex gap-4 items-center">
                {personal.socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className="w-11 h-11 border border-accent/40 rounded-full flex justify-center items-center text-accent hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,153,0.3)] hover:-translate-y-1"
                  >
                    {getSocialIcon(social.icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Animated Profile Photo Circle Visual */}
          <div className="order-1 xl:order-none mb-4 xl:mb-0">
            <div className="w-full h-full relative flex items-center justify-center">
              <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] xl:w-[400px] xl:h-[400px]">
                
                {/* SVG Rotating Dashed Accent Ring */}
                <svg
                  className="w-full h-full absolute top-0 left-0 animate-spin-slow pointer-events-none"
                  viewBox="0 0 506 506"
                  fill="transparent"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="253"
                    cy="253"
                    r="245"
                    stroke="#00ff99"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="24 12 12 12"
                  />
                </svg>

                {/* Inner Avatar Graphic */}
                <div className="w-full h-full rounded-full p-4 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-[#141418] to-[#1c1c22] border-2 border-accent/30 flex flex-col items-center justify-center overflow-hidden shadow-2xl relative group">
                    
                    {/* Visual Graphic Representation */}
                    <div className="absolute inset-0 bg-accent/5 opacity-50 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(0,255,153,0.2)]">
                      <span className="text-4xl sm:text-5xl font-extrabold text-accent">
                        RTS
                      </span>
                    </div>

                    <span className="text-sm font-semibold tracking-widest text-accent uppercase">
                      AI / ML & Full Stack
                    </span>
                    <span className="text-xs text-white/60">Developer</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
