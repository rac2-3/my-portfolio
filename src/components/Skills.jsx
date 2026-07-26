import React, { useState } from "react";
import { portfolioData } from "../data/portfolioData";
import { Code, Brain, Database, Layout, Server, Cpu } from "lucide-react";

const Skills = () => {
  const { skills } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Artificial Intelligence", "AI & Programming", "Frontend", "Backend", "Databases"];

  const filteredSkills = selectedCategory === "All"
    ? skills
    : skills.filter(s => s.category.includes(selectedCategory) || selectedCategory.includes(s.category));

  const getCategoryIcon = (category) => {
    if (category.includes("AI") || category.includes("Intelligence")) return <Brain size={32} className="text-accent" />;
    if (category.includes("Frontend")) return <Layout size={32} className="text-accent" />;
    if (category.includes("Backend")) return <Server size={32} className="text-accent" />;
    if (category.includes("Databases")) return <Database size={32} className="text-accent" />;
    return <Code size={32} className="text-accent" />;
  };

  return (
    <section id="skills" className="py-20 bg-[#141418]/60 relative">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            My Capabilities
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Skills & <span className="text-accent">Technologies</span>
          </h2>
          <div className="w-20 h-1 bg-accent rounded-full mt-4" />
          <p className="max-w-[600px] text-white/70 mt-4 text-base">
            Core technologies and tools I specialize in for AI/ML development and scalable web applications.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-accent text-primary font-semibold shadow-[0_0_15px_rgba(0,255,153,0.4)]"
                  : "bg-white/5 border border-white/10 text-white/80 hover:border-accent/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid - Centered Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="glass-card glass-card-hover p-8 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group cursor-pointer border border-white/10 hover:border-accent/40"
            >
              {/* Subtle accent glow on hover */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/20 transition-all duration-500" />
              
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-accent/50 group-hover:bg-accent/10 transition-all duration-300 mb-4 flex items-center justify-center group-hover:scale-110">
                {getCategoryIcon(skill.category)}
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors mb-1">
                {skill.name}
              </h3>
              
              <span className="text-xs text-white/50 block">
                {skill.category}
              </span>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
