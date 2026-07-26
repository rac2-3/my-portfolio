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
                href={personal.cvUrl}
                download="Raj_Tilak_Singh_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full text-base font-semibold transition-all duration-500 border border-accent text-accent hover:bg-accent hover:text-primary h-[56px] px-8 tracking-wider uppercase group hover:shadow-[0_0_20px_rgba(0,255,153,0.4)]"
              >
                <span>Download CV</span>
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

          {/* Profile Photo with Animated SVG Accent Ring */}
          <div className="order-1 xl:order-none mb-4 xl:mb-0">
            <div className="w-full h-full relative flex items-center justify-center">
              <div className="relative w-[298px] h-[298px] sm:w-[340px] sm:h-[340px] xl:w-[420px] xl:h-[420px]">
                
                {/* SVG Rotating Dashed Accent Ring (Bhavya Style) */}
                <svg
                  className="w-full h-full absolute top-0 left-0 animate-spin-slow pointer-events-none z-10"
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
                    strokeDasharray="24 10 0 0"
                  />
                </svg>

                {/* Profile Photo Container */}
                <div className="w-full h-full rounded-full p-4 flex items-center justify-center relative">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-accent/40 shadow-[0_0_40px_rgba(0,255,153,0.25)] relative group bg-[#141418]">
                    <img
                      src="/raj.png"
                      alt="Raj Tilak Singh"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity" />
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
