import React, { useState } from "react";
import { portfolioData } from "../data/portfolioData";
import { ExternalLink, Github, FolderGit2, X } from "lucide-react";

const Projects = () => {
  const { projects } = portfolioData;
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ["All", "AI/ML", "Full Stack"];

  const filteredProjects = filter === "All"
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            My Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Featured <span className="text-accent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-accent rounded-full mt-4" />
          <p className="max-w-[600px] text-white/70 mt-4 text-base">
            Explore my recent work spanning Artificial Intelligence, Machine Learning models, and Full Stack applications.
          </p>
        </div>

        {/* Project Filter Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? "bg-accent text-primary font-semibold shadow-[0_0_15px_rgba(0,255,153,0.4)]"
                  : "bg-white/5 border border-white/10 text-white/80 hover:border-accent/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card glass-card-hover p-8 rounded-3xl flex flex-col justify-between relative group border border-white/10 hover:border-accent/40"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-accent transition-colors"
                      title="View GitHub Source"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-accent transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-3 rounded-xl border border-accent/40 text-accent hover:bg-accent hover:text-primary transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <FolderGit2 size={16} />
                  <span>View Project Details</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card max-w-2xl w-full p-8 rounded-3xl relative border border-accent/30 shadow-[0_0_50px_rgba(0,255,153,0.2)] animate-fadeIn">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-accent p-2 rounded-full bg-white/5 border border-white/10"
            >
              <X size={20} />
            </button>

            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 inline-block mb-3">
              {selectedProject.category}
            </span>

            <h3 className="text-3xl font-bold text-white mb-4">
              {selectedProject.title}
            </h3>

            <p className="text-white/80 text-base leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-accent mb-3 uppercase tracking-wider">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-white/10">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-accent text-primary font-bold text-center flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors"
              >
                <Github size={18} />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Projects;
