import React, { useState } from "react";
import { portfolioData } from "../data/portfolioData";
import { Phone, Mail, MapPin, Send, Check, Copy } from "lucide-react";

const Contact = () => {
  const { contact } = portfolioData;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Full Stack / AI ML Opportunity",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "Full Stack / AI ML Opportunity", message: "" });
    }, 4000);
  };

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(""), 2500);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            Let's Connect
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Get In <span className="text-accent">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-accent rounded-full mt-4" />
          <p className="max-w-[600px] text-white/70 mt-4 text-base">
            Feel free to reach out for project inquiries, career opportunities, or collaboration in AI/ML & Full Stack development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Details Cards (4 columns on lg) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Phone Card */}
            <div className="glass-card glass-card-hover p-6 rounded-2xl flex items-center justify-between border border-white/10 group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
                  <Phone size={22} />
                </div>
                <div>
                  <span className="text-xs text-white/50 block">Phone</span>
                  <span className="text-base font-bold text-white group-hover:text-accent transition-colors">
                    {contact.phone}
                  </span>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(contact.phone, "phone")}
                className="p-2 text-white/60 hover:text-accent transition-colors"
                title="Copy Phone"
              >
                {copiedField === "phone" ? <Check size={18} className="text-accent" /> : <Copy size={18} />}
              </button>
            </div>

            {/* Email Card */}
            <div className="glass-card glass-card-hover p-6 rounded-2xl flex items-center justify-between border border-white/10 group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
                  <Mail size={22} />
                </div>
                <div>
                  <span className="text-xs text-white/50 block">Email</span>
                  <span className="text-base font-bold text-white group-hover:text-accent transition-colors">
                    {contact.email}
                  </span>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(contact.email, "email")}
                className="p-2 text-white/60 hover:text-accent transition-colors"
                title="Copy Email"
              >
                {copiedField === "email" ? <Check size={18} className="text-accent" /> : <Copy size={18} />}
              </button>
            </div>

            {/* Address Card */}
            <div className="glass-card glass-card-hover p-6 rounded-2xl flex items-center justify-between border border-white/10 group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
                  <MapPin size={22} />
                </div>
                <div>
                  <span className="text-xs text-white/50 block">Location</span>
                  <span className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                    {contact.address}
                  </span>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(contact.address, "address")}
                className="p-2 text-white/60 hover:text-accent transition-colors"
                title="Copy Address"
              >
                {copiedField === "address" ? <Check size={18} className="text-accent" /> : <Copy size={18} />}
              </button>
            </div>

          </div>

          {/* Contact Form (7 columns on lg) */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 rounded-3xl border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">
                Send Me a <span className="text-accent">Message</span>
              </h3>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-accent/10 border border-accent/40 text-center animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center mx-auto mb-3 font-bold">
                    ?
                  </div>
                  <h4 className="text-xl font-bold text-accent mb-2">Message Sent Successfully!</h4>
                  <p className="text-sm text-white/80">Thank you for reaching out, Raj Tilak Singh will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors text-sm"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Your Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors text-sm"
                    />
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#1c1c22] border border-white/10 text-white focus:outline-none focus:border-accent transition-colors text-sm"
                    >
                      <option value="Full Stack / AI ML Opportunity">AI / ML Project Inquiry</option>
                      <option value="Full Stack Web Application">Full Stack Development</option>
                      <option value="Career & Hiring">Career & Hiring</option>
                      <option value="Other">General Inquiry</option>
                    </select>
                  </div>

                  <textarea
                    name="message"
                    required
                    rows="5"
                    placeholder="Your Message..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors text-sm resize-none"
                  ></textarea>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-accent text-primary font-bold text-base flex items-center justify-center gap-2 hover:bg-accent-hover hover:shadow-[0_0_25px_rgba(0,255,153,0.4)] transition-all duration-300 mt-2"
                  >
                    <span>Send Message</span>
                    <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
