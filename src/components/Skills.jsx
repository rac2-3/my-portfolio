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
    if (category.includes("AI") || category.includes("Intelligence")) return <Brain size={20} className="text-accent" />;
    if (category.includes("Frontend")) return <Layout size={20} className="text-accent" />;
    if (category.includes("Backend")) return <Server size={20} className="text-accent" />;
    if (category.includes("Databases")) return <Database size={20} className="text-accent" />;
    return <Code size={20} className="text-accent" />;
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

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Subtle accent glow on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/20 transition-all duration-500" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-accent/50 transition-colors">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <span className="text-xs text-accent font-semibold px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
                    {skill.experience}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-1 group-hover:text-accent transition-colors">
                  {skill.name}
                </h3>
                <span className="text-xs text-white/50 block mb-6">
                  {skill.category}
                </span>
              </div>

              {/* Progress meter */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2 font-medium">
                  <span className="text-white/70">Proficiency</span>
                  <span className="text-accent">{skill.level}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-1000 rounded-full shadow-[0_0_10px_#00ff99]"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
