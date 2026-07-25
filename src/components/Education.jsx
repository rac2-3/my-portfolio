import React from "react";
import { portfolioData } from "../data/portfolioData";
import { GraduationCap, MapPin, Calendar, Award, BookOpen } from "lucide-react";

const Education = () => {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            Academic Background
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            My <span className="text-accent">Education</span>
          </h2>
          <div className="w-20 h-1 bg-accent rounded-full mt-4" />
        </div>

        {/* Education Timeline / Cards */}
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {education.map((item) => (
            <div
              key={item.id}
              className="glass-card glass-card-hover p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-l-4 border-l-accent"
            >
              <div className="flex-1">
                
                {/* Degree & Status */}
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="p-2 rounded-lg bg-accent/10 text-accent border border-accent/20">
                    <GraduationCap size={22} />
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {item.degree}
                  </h3>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${item.status === 'Pursuing' ? 'bg-accent/20 text-accent border border-accent/40' : 'bg-white/10 text-white/80'}`}>
                    {item.status}
                  </span>
                </div>

                {/* Specialization */}
                {item.specialization && (
                  <p className="text-accent font-medium text-base sm:text-lg mb-3 pl-1 flex items-center gap-2">
                    <BookOpen size={18} />
                    <span>{item.specialization}</span>
                  </p>
                )}

                {/* College Name & Details */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-white/80 text-sm sm:text-base mt-3">
                  <div className="flex items-center gap-2">
                    <Award size={18} className="text-accent" />
                    <span className="font-semibold text-white">{item.institution}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-white/70">
                    <MapPin size={16} className="text-accent" />
                    <span>{item.location}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-white/70">
                    <Calendar size={16} className="text-accent" />
                    <span>{item.date}</span>
                  </div>

                  {item.grade && (
                    <div className="flex items-center gap-1.5 font-semibold text-accent bg-accent/10 px-3 py-1 rounded-md border border-accent/20">
                      <span>?? CGPA: {item.grade}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {item.description && (
                  <p className="text-white/60 text-sm mt-4 leading-relaxed border-t border-white/5 pt-4">
                    {item.description}
                  </p>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;
