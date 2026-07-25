import React from "react";
import { portfolioData } from "../data/portfolioData";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";

const Experience = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-20 bg-[#141418]/60 relative">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            Work Journey
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Work <span className="text-accent">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-accent rounded-full mt-4" />
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="glass-card glass-card-hover p-8 rounded-3xl relative overflow-hidden border-l-4 border-l-accent"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="p-2 rounded-lg bg-accent/10 text-accent border border-accent/20">
                      <Briefcase size={22} />
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      {exp.role}
                    </h3>
                  </div>
                  <span className="text-accent text-lg font-semibold block pl-11">
                    {exp.company}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-white/70 bg-white/5 border border-white/10 px-4 py-2 rounded-full self-start md:self-auto text-sm">
                  <Calendar size={16} className="text-accent" />
                  <span>{exp.duration}</span>
                </div>
              </div>

              {/* Responsibilities */}
              <ul className="space-y-3 mb-6">
                {exp.description.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-white/80 text-sm sm:text-base leading-relaxed">
                    <CheckCircle2 size={18} className="text-accent mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {exp.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
