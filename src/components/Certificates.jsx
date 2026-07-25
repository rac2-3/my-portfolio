import React from "react";
import { portfolioData } from "../data/portfolioData";
import { Award, ExternalLink, Calendar, ShieldCheck } from "lucide-react";

const Certificates = () => {
  const { certificates } = portfolioData;

  return (
    <section id="certificates" className="py-20 bg-[#141418]/60 relative">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            Verified Achievements
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Certifications & <span className="text-accent">Credentials</span>
          </h2>
          <div className="w-20 h-1 bg-accent rounded-full mt-4" />
          <p className="max-w-[600px] text-white/70 mt-4 text-base">
            Verified industry certifications in Data Analytics, Machine Learning, and Database Architecture.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="glass-card glass-card-hover p-8 rounded-3xl flex flex-col justify-between relative group border border-white/10 hover:border-accent/40"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <Award size={26} />
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                    <ShieldCheck size={14} />
                    <span>Verified</span>
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                  {cert.title}
                </h3>
                
                <p className="text-accent font-semibold text-base mb-4">
                  {cert.company}
                </p>

                <div className="flex items-center gap-2 text-white/60 text-xs mb-6">
                  <Calendar size={14} className="text-accent" />
                  <span>Issued: {cert.date}</span>
                </div>

                {/* Skills Tested */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {cert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct View Certificate Button */}
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-accent text-primary font-bold text-sm flex items-center justify-center gap-2 hover:bg-accent-hover hover:shadow-[0_0_20px_rgba(0,255,153,0.4)] transition-all duration-300"
              >
                <span>View Certificate</span>
                <ExternalLink size={16} />
              </a>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certificates;
