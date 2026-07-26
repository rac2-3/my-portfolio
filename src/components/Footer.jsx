import React from "react";
import { portfolioData } from "../data/portfolioData";
import { Github, Linkedin, Code2, Mail } from "lucide-react";

const Footer = () => {
  const { personal } = portfolioData;

  return (
    <footer className="py-12 bg-[#141418] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Raj Tilak<span className="text-accent">.</span>
          </h2>
          <p className="text-xs text-white/50 mt-1">
            MCA AI/ML & Full Stack Developer
          </p>
        </div>

        {/* Quick Social Links */}
        <div className="flex gap-4 items-center">
          <a
            href="https://github.com/rac2-3"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-accent hover:border-accent transition-all"
            title="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/rajtilak782"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-accent hover:border-accent transition-all"
            title="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://www.hackerrank.com/profile/rajtilak_msb"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-accent hover:border-accent transition-all"
            title="HackerRank"
          >
            <Code2 size={18} />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=rajtilak.msb@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-accent hover:border-accent transition-all"
            title="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-white/50 text-center md:text-right">
          <p>© {new Date().getFullYear()} Raj Tilak Singh. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
