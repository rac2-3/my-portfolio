import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = ({ activeSection, setActiveSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "home", href: "#home" },
    { name: "skills", href: "#skills" },
    { name: "education", href: "#education" },
    { name: "experience", href: "#experience" },
    { name: "projects", href: "#projects" },
    { name: "certificates", href: "#certificates" },
    { name: "contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href, name) => {
    e.preventDefault();
    setActiveSection(name);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#1c1c22]/90 backdrop-blur-md py-4 shadow-lg border-b border-white/5" : "bg-transparent py-6 xl:py-8"}`}>
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, "#home", "home")} className="group">
          <h1 className="text-3xl font-semibold tracking-tight">
            Raj Tilak<span className="text-accent transition-transform duration-300 inline-block group-hover:scale-125">.</span>
          </h1>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-8">
          <nav className="flex gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.name)}
                className={`capitalize font-medium transition-all duration-300 hover:text-accent relative py-1 ${
                  activeSection === item.name
                    ? "text-accent border-b-2 border-accent"
                    : "text-white/80"
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>
          
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact", "contact")}
          >
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-semibold transition-all duration-300 bg-accent text-primary hover:bg-accent-hover hover:shadow-[0_0_15px_rgba(0,255,153,0.4)] h-[44px] px-6">
              Hire me
            </button>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="xl:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex justify-center items-center p-2 text-accent focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 top-[70px] bg-[#1c1c22]/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center py-8 px-6 border-t border-white/10 animate-fadeIn">
          <nav className="flex flex-col gap-6 items-center text-center">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.name)}
                className={`text-2xl capitalize font-medium transition-all duration-300 hover:text-accent ${
                  activeSection === item.name
                    ? "text-accent border-b-2 border-accent pb-1"
                    : "text-white/80"
                }`}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact", "contact")}
              className="mt-4"
            >
              <button className="rounded-full text-lg font-semibold bg-accent text-primary hover:bg-accent-hover h-[50px] px-8 transition-all">
                Hire me
              </button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
