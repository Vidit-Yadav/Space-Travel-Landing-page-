import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FadingVideo } from "./components/FadingVideo";
import { BlurText } from "./components/BlurText";

// Suppress Framer Motion benign list key warnings if needed
if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    if (
      args[0] &&
      typeof args[0] === "string" &&
      (args[0].includes('Each child in a list should have a unique "key" prop') ||
        args[0].includes("Framer Motion"))
    ) {
      return;
    }
    originalError(...args);
  };
}

// Custom Inline SVGs as requested
function ArrowUpRightIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function PlayIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <polygon points="6,4 20,12 6,20" />
    </svg>
  );
}

function ClockIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function GlobeIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// Material Icons SVGs
function SceneryIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-white"
    >
      <path
        fill="currentColor"
        d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21H5Zm1-4h12l-3.75-5-3 4L9 13l-3 4Z"
      />
    </svg>
  );
}

function ProductionIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-white"
    >
      <path
        fill="currentColor"
        d="M4 6.47 5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.89-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4Z"
      />
    </svg>
  );
}

function LightingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-white"
    >
      <path
        fill="currentColor"
        d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1Zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7Z"
      />
    </svg>
  );
}

export default function App() {
  const [activeLink, setActiveLink] = useState("Home");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleLinkClick = (link: string, sectionId: string) => {
    setActiveLink(link);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const showInteractiveToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const navLinks = [
    { name: "Home", target: "home" },
    { name: "Voyages", target: "capabilities" },
    { name: "Worlds", target: "capabilities" },
    { name: "Innovation", target: "capabilities" },
    { name: "Plan Launch", target: "home" },
  ];

  return (
    <div id="landing-root" className="bg-black text-white min-h-screen font-body select-none overflow-x-hidden scroll-smooth">
      
      {/* Interactive Micro-Toast for Action confirmation */}
      {toastMessage && (
        <div
          id="action-toast"
          className="fixed bottom-6 right-6 z-[100] liquid-glass px-4 py-3 rounded-xl border border-white/10 flex items-center gap-3 animate-fade-in shadow-2xl"
        >
          <div className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span className="text-xs font-mono tracking-wide text-white/90">
            {toastMessage}
          </span>
        </div>
      )}

      {/* Navbar (fixed top-4, px-8 / lg:px-16, z-50) */}
      <nav
        id="navbar"
        className="fixed top-4 left-0 right-0 px-4 md:px-8 lg:px-16 z-50 flex items-center justify-between"
      >
        {/* Left: 48x48 liquid-glass circle with italic serif lowercase "a" */}
        <div
          id="nav-logo"
          className="w-12 h-12 rounded-full flex items-center justify-center liquid-glass font-heading italic text-2xl text-white select-none cursor-pointer"
          onClick={() => handleLinkClick("Home", "home")}
        >
          a
        </div>

        {/* Center (desktop only): liquid-glass pill holding 5 links + Claim Spot button */}
        <div
          id="nav-menu"
          className="hidden md:flex items-center gap-1 liquid-glass rounded-full p-1"
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => handleLinkClick(link.name, link.target)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 font-body ${
                activeLink === link.name
                  ? "text-white bg-white/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.name}
            </button>
          ))}
          <button
            id="nav-cta"
            onClick={() => showInteractiveToast("MARS LAUNCH SEAT RESERVED")}
            className="bg-white text-black rounded-full px-5 py-2 text-sm font-semibold hover:bg-white/90 active:scale-95 transition-all flex items-center gap-1.5 whitespace-nowrap ml-2"
          >
            Claim a Spot
            <ArrowUpRightIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile/Tablet CTA: balances logo on smaller screens */}
        <div id="nav-mobile-cta" className="md:hidden">
          <button
            id="nav-cta-mobile"
            onClick={() => showInteractiveToast("MARS LAUNCH SEAT RESERVED")}
            className="bg-white text-black rounded-full px-4 py-2 text-xs font-semibold hover:bg-white/95 active:scale-95 transition-all flex items-center gap-1 whitespace-nowrap"
          >
            Claim Spot
            <ArrowUpRightIcon className="h-3 w-3" />
          </button>
        </div>

        {/* Right: 48x48 invisible spacer to balance logo on desktop */}
        <div id="nav-spacer" className="hidden md:block w-12 h-12 invisible" />
      </nav>

      {/* Section 1 — Hero (full viewport, black bg) */}
      <section
        id="home"
        className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black text-center pt-24 pb-8"
      >
        {/* Background video (120% width/height, top-aligned, centered horizontally) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <FadingVideo
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
            className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top"
            style={{ width: "120%", height: "120%" }}
          />
        </div>

        {/* Main Hero Content Layer (z-10) */}
        <div
          id="hero-content"
          className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 max-w-5xl mx-auto"
        >
          {/* Badge: delay 0.4s */}
          <motion.div
            id="hero-badge"
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="liquid-glass rounded-full p-1 pr-3 flex items-center gap-2 border border-white/5 shadow-xl max-w-full"
          >
            <span className="bg-white text-black px-3 py-1 text-xs font-semibold rounded-full tracking-wider uppercase font-body select-none">
              New
            </span>
            <span className="text-xs md:text-sm text-white/90 font-body tracking-wide font-normal">
              Maiden Crewed Voyage to Mars Arrives 2026
            </span>
          </motion.div>

          {/* Headline: Word-by-word blur-in text */}
          <div id="hero-headline-container" className="mt-8 max-w-3xl">
            <BlurText
              text="Venture Past Our Sky Across the Universe"
              className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.85] max-w-2xl justify-center tracking-[-4px]"
            />
          </div>

          {/* Subheading: delay 0.8s */}
          <motion.p
            id="hero-subheading"
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="mt-6 text-sm md:text-base text-white/90 max-w-2xl font-body font-light leading-relaxed px-4"
          >
            Discover the universe in ways once unimaginable. Our pioneering
            vessels and breakthrough engineering bring deep-space exploration
            within reach—secure and extraordinary.
          </motion.p>

          {/* CTAs: delay 1.1s */}
          <motion.div
            id="hero-ctas"
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
            className="flex items-center gap-6 mt-8"
          >
            {/* Primary: liquid-glass-strong rounded-full */}
            <button
              id="hero-cta-primary"
              onClick={() => showInteractiveToast("INITIATING QUANTUM NAVIGATION ENGINE")}
              className="liquid-glass-strong rounded-full px-8 py-3 text-sm font-semibold text-white flex items-center gap-2 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>Start Your Voyage</span>
              <ArrowUpRightIcon className="h-5 w-5" />
            </button>

            {/* Secondary: bare text link + filled Play icon */}
            <button
              id="hero-cta-secondary"
              onClick={() => showInteractiveToast("PLAYING VOYAGE PREVIEW")}
              className="group flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors cursor-pointer"
            >
              <span>View Liftoff</span>
              <div className="w-7 h-7 rounded-full flex items-center justify-center liquid-glass group-hover:scale-110 group-hover:bg-white/5 transition-transform duration-200">
                <PlayIcon className="h-3 w-3 fill-current text-white" />
              </div>
            </button>
          </motion.div>

          {/* Stats row: delay 1.3s */}
          <motion.div
            id="hero-stats"
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-stretch gap-4 mt-12 px-4"
          >
            {/* Card 1 */}
            <div
              id="stats-card-1"
              className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col justify-between items-start text-left border border-white/5 shadow-2xl hover:border-white/10 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="text-white/90 mb-6">
                <ClockIcon className="h-7 w-7" />
              </div>
              <div>
                <div className="font-heading italic text-white text-4xl tracking-[-1px] leading-none">
                  34.5 Min
                </div>
                <div className="text-xs text-white/70 font-body font-light mt-2">
                  Average Videos Watch Time
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              id="stats-card-2"
              className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col justify-between items-start text-left border border-white/5 shadow-2xl hover:border-white/10 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="text-white/90 mb-6">
                <GlobeIcon className="h-7 w-7" />
              </div>
              <div>
                <div className="font-heading italic text-white text-4xl tracking-[-1px] leading-none">
                  2.8B+
                </div>
                <div className="text-xs text-white/70 font-body font-light mt-2">
                  Users Across the Globe
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Partners Layer: delay 1.4s */}
        <motion.div
          id="hero-partners"
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center gap-4 pb-8 w-full mt-12 px-4"
        >
          {/* Tag */}
          <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white/80 border border-white/5">
            Collaborating with top aerospace pioneers globally
          </div>

          {/* Partner names list */}
          <div className="font-heading italic text-white text-2xl md:text-3xl tracking-tight flex flex-wrap items-center justify-center gap-x-12 md:gap-x-16 gap-y-2 max-w-4xl px-4 text-center">
            {["Aeon", "Vela", "Apex", "Orbit", "Zeno"].map((p, idx) => (
              <span
                key={p}
                id={`partner-${p.toLowerCase()}`}
                className="hover:text-white/80 transition-colors cursor-pointer"
                onClick={() => showInteractiveToast(`Quantum link with ${p.toUpperCase()} aerospace system`)}
              >
                {p}
                {idx < 4 && <span className="inline-block ml-12 md:ml-16 select-none opacity-40">·</span>}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Section 2 — Capabilities (min-h-screen, black bg) */}
      <section
        id="capabilities"
        className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black text-white"
      >
        {/* Background video (full-bleed, no 120% scale) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <FadingVideo
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Content (relative z-10 px-8 md:px-16 lg:px-20 pt-24 pb-10 flex flex-col min-h-screen) */}
        <div className="relative z-10 px-6 md:px-16 lg:px-20 pt-24 pb-12 flex flex-col justify-between min-h-screen w-full max-w-7xl mx-auto">
          
          {/* Header */}
          <div id="capabilities-header" className="text-left">
            <span className="text-sm font-body text-white/80 tracking-wider block mb-4 uppercase">
              // Capabilities
            </span>
            <h2 className="font-heading italic text-white text-6xl md:text-7xl lg:text-[6rem] leading-[0.95] tracking-[-3px] max-w-4xl select-none">
              Production
              <br />
              evolved
            </h2>
          </div>

          {/* Three cards: Grid layout */}
          <div
            id="capabilities-grid"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 mb-6"
          >
            {/* Card 1: AI Scenery */}
            <motion.div
              id="capability-card-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              onClick={() => showInteractiveToast("AI SCENERY STAGE ACTIVE")}
              className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between border border-white/5 shadow-2xl hover:border-white/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-4">
                {/* Left: 44x44 nested glass square with white icon */}
                <div className="w-11 h-11 rounded-[0.75rem] flex items-center justify-center liquid-glass bg-white/[0.02]">
                  <SceneryIcon />
                </div>
                {/* Right: small tag chips */}
                <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                  {["Natural Context", "Photo Realism", "Infinite Settings", "Eco-Vibe"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="liquid-glass rounded-full px-2.5 py-1 text-[11px] text-white/90 font-body whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Bottom Row */}
              <div className="mt-6 text-left">
                <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none">
                  AI Scenery
                </h3>
                <p className="mt-3 text-sm text-white/80 font-body font-light leading-snug max-w-[32ch]">
                  AI analyzes your product to create indistinguishable natural environments — from Icelandic cliffs to misty forests.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Batch Production */}
            <motion.div
              id="capability-card-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              onClick={() => showInteractiveToast("BATCH PIPELINE READY")}
              className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between border border-white/5 shadow-2xl hover:border-white/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-4">
                {/* Left: 44x44 nested glass square with movie icon */}
                <div className="w-11 h-11 rounded-[0.75rem] flex items-center justify-center liquid-glass bg-white/[0.02]">
                  <ProductionIcon />
                </div>
                {/* Right: small tag chips */}
                <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                  {["Scale Fast", "Visual Consistency", "Time Saver", "Ready to Post"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="liquid-glass rounded-full px-2.5 py-1 text-[11px] text-white/90 font-body whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Bottom Row */}
              <div className="mt-6 text-left">
                <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none">
                  Batch Production
                </h3>
                <p className="mt-3 text-sm text-white/80 font-body font-light leading-snug max-w-[32ch]">
                  Style your entire product line in minutes. Create a unified visual identity for catalogues and social media without weeks of retouching.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Smart Lighting */}
            <motion.div
              id="capability-card-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              onClick={() => showInteractiveToast("HELIOCENTRIC SUNLIGHT INTEGRATED")}
              className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between border border-white/5 shadow-2xl hover:border-white/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-4">
                {/* Left: 44x44 nested glass square with lightbulb icon */}
                <div className="w-11 h-11 rounded-[0.75rem] flex items-center justify-center liquid-glass bg-white/[0.02]">
                  <LightingIcon />
                </div>
                {/* Right: small tag chips */}
                <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                  {["Ray Tracing", "Physical Shadows", "Studio Quality", "Sunlight Sync"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="liquid-glass rounded-full px-2.5 py-1 text-[11px] text-white/90 font-body whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Bottom Row */}
              <div className="mt-6 text-left">
                <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none">
                  Smart Lighting
                </h3>
                <p className="mt-3 text-sm text-white/80 font-body font-light leading-snug max-w-[32ch]">
                  Automatic lighting and material adjustment. Achieve flawless integration with realistic shadows and sunlight.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Footer of Capabilities */}
          <div id="capabilities-footer" className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 border-t border-white/5 pt-6 text-xs text-white/50 font-mono tracking-wider">
            <span>© 2026 ANTIGRAVITY AEROSPACE LTD.</span>
            <div className="flex items-center gap-6">
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => showInteractiveToast("Terms of Voyage: All spaceflight non-refundable.")}>TERMS OF FLIGHT</span>
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => showInteractiveToast("Deep Space Protocols Enabled.")}>PRIVACY MATRIX</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
