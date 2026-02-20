import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Search,
  Menu,
  X,
  ChevronRight,
  Code2,
  GitPullRequest,
  ShieldCheck,
  Cpu,
  Database,
  Globe,
  Terminal,
  Server,
  Zap,
  Twitter,
  GraduationCap,
  Award,
  ExternalLink,
  Trophy,
  Send,
  Download,
  BookOpen,
  Rss
} from 'lucide-react';

// === Custom Hooks ===

const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = windowHeight > 0 ? Math.min(100, (totalScroll / windowHeight) * 100) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
};

const useReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [threshold]);

  return [ref, isVisible];
};

// === Main Component ===

export default function App() {
  const scrollProgress = useScrollProgress();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // تابع جدید برای اسکرول نرم با در نظر گرفتن ارتفاع هدر
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // فاصله از بالا برای دیده شدن کامل بخش
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false); // بستن منوی موبایل در صورت باز بودن
  };

  return (
    <div
      dir="ltr"
      className="bg-[#0d1117] min-h-screen text-[#c9d1d9] overflow-x-hidden selection:bg-[#1f6feb] selection:text-white"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      {/* Background Grid Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(48,54,61,0.3) 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>

      {/* Floating Social Sidebar (Desktop) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4">
        <FloatingSocialIcon icon={<Github size={22} />} href="https://github.com/ja7ad" tooltip="GitHub" delay="0" />
        <FloatingSocialIcon icon={<Linkedin size={22} />} href="https://www.linkedin.com/in/ja7ad/" tooltip="LinkedIn" delay="100" />
        <FloatingSocialIcon icon={<Twitter size={22} />} href="https://twitter.com/Ja7adR" tooltip="Twitter / X" delay="200" />
        <FloatingSocialIcon icon={<Send size={20} className="ml-[-2px]" />} href="https://t.me/ja7adr" tooltip="Telegram" delay="300" />
        <FloatingSocialIcon icon={<GraduationCap size={22} />} href="https://scholar.google.com/citations?user=PXkS0K0AAAAJ" tooltip="Google Scholar" delay="400" />
        <FloatingSocialIcon icon={<Mail size={22} />} href="mailto:ja7ad@live.com" tooltip="Email" delay="500" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0d1117]/80 backdrop-blur-md border-b border-[#30363d]/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex justify-between items-center relative">

          {/* Left: Logo and Name */}
          <div className="flex items-center gap-4 z-10">
            <img
              src="https://avatars.githubusercontent.com/u/56496801?v=4"
              alt="Javad Rajabzadeh"
              className="w-9 h-9 rounded-full border border-[#30363d] shadow-[0_0_15px_rgba(255,255,255,0.15)] object-cover"
            />
            <span className="font-bold text-white hidden sm:block">Javad Rajabzadeh</span>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 font-semibold text-sm whitespace-nowrap">
            <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="hover:text-white transition-colors cursor-pointer">Skills</a>
            <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="hover:text-white transition-colors cursor-pointer">Experience</a>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-white transition-colors cursor-pointer">Projects</a>
            <a href="#honors" onClick={(e) => scrollToSection(e, 'honors')} className="hover:text-white transition-colors cursor-pointer">Honors</a>
            <a href="#blogs" onClick={(e) => scrollToSection(e, 'blogs')} className="hover:text-white transition-colors cursor-pointer">Blogs</a>
          </div>

          {/* Right: Download Resume & Mobile Toggle */}
          <div className="flex items-center gap-4 z-10">
            <a
              href="https://raw.githubusercontent.com/ja7ad/Ja7ad.github.io/refs/heads/main/resume/Javad.pdf"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-md bg-[#21262d] border border-[#30363d] text-white hover:bg-[#30363d] hover:border-[#8b949e] transition-all text-sm font-semibold"
            >
              <Download size={16} /> Resume
            </a>
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0d1117] pt-20 px-6 flex flex-col gap-6 text-xl font-bold md:hidden">
          <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="border-b border-[#30363d] pb-4">Skills</a>
          <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="border-b border-[#30363d] pb-4">Experience</a>
          <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="border-b border-[#30363d] pb-4">Projects</a>
          <a href="#honors" onClick={(e) => scrollToSection(e, 'honors')} className="border-b border-[#30363d] pb-4">Honors</a>
          <a href="#blogs" onClick={(e) => scrollToSection(e, 'blogs')} className="border-b border-[#30363d] pb-4">Blogs</a>
          <a
            href="https://raw.githubusercontent.com/ja7ad/Ja7ad.github.io/refs/heads/main/resume/Javad.pdf"
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center justify-center gap-2 bg-[#21262d] border border-[#30363d] py-4 rounded-lg text-white hover:bg-[#30363d] hover:border-[#8b949e] transition-all"
          >
            <Download size={20} /> Download Resume
          </a>
        </div>
      )}

      {/* MAIN WRAPPER & GLOBAL LINE */}
      <main className="relative z-10 w-full max-w-[1440px] mx-auto pt-24">

        {/* THE GLOBAL VERTICAL CONNECTING LINE */}
        <div className="absolute left-[20px] sm:left-[60px] lg:left-[100px] top-0 bottom-0 w-[3px] z-0 bg-[#30363d]">
          <div
            className="absolute top-0 w-full bg-gradient-to-b from-[#79c0ff] via-[#d2a8ff] to-[#3fb950] transition-all duration-300 ease-out"
            style={{
              height: `${Math.min(100, Math.max(0, scrollProgress + 2))}%`,
              boxShadow: scrollProgress > 0 ? '0 0 20px 2px rgba(210,168,255,0.6)' : 'none'
            }}
          ></div>
        </div>

        {/* Content Container */}
        <div className="pl-[60px] sm:pl-[120px] lg:pl-[200px] pr-4 sm:pr-8 md:pr-12 space-y-8">

          {/* === HERO SECTION === */}
          <section id="hero" className="min-h-[85vh] flex flex-col justify-center pb-10 relative">

            <div className="absolute left-[-40px] sm:left-[-60px] lg:left-[-100px] top-32 w-[3px] flex justify-center z-20">
              <div className="w-6 h-6 shrink-0 rounded-full border-[3px] border-[#8b949e] bg-[#0d1117] flex items-center justify-center">
                 <div className="w-2 h-2 shrink-0 rounded-full bg-white animate-pulse"></div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">

              <div className="w-full lg:w-[55%] relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161b22] border border-[#30363d] text-xs font-semibold text-[#8b949e] mb-8 font-mono shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3fb950] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3fb950]"></span>
                  </span>
                  Software Technical Lead @ Sensifai
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-black mb-2 tracking-tight leading-[1.05] text-white">
                  Javad Rajabzadeh
                </h1>

                <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#79c0ff] via-[#d2a8ff] to-[#ff7b72] text-2xl sm:text-3xl font-extrabold mb-8 inline-block">
                  Senior Software Engineer
                </h2>

                <p className="text-[#8b949e] text-lg mb-10 leading-relaxed font-medium">
                  With over 9 years of experience across diverse IT domains, I specialize in the architecture, development, and implementation of scalable applications. My expertise spans <span className="text-white">Blockchain</span>, <span className="text-white">IoT</span>, and <span className="text-white">AI-driven solutions</span>. I continuously master new technologies like Go and gRPC to build high-performance microservices and deliver robust software that drives business growth.
                </p>

                {/* Mobile & Tablet Socials */}
                <div className="flex xl:hidden gap-4 flex-wrap mt-2">
                  <SocialLink icon={<Github size={20} />} href="https://github.com/ja7ad" />
                  <SocialLink icon={<Linkedin size={20} />} href="https://www.linkedin.com/in/ja7ad/" />
                  <SocialLink icon={<Twitter size={20} />} href="https://twitter.com/Ja7adR" />
                  <SocialLink icon={<Send size={18} />} href="https://t.me/ja7adr" />
                  <SocialLink icon={<GraduationCap size={20} />} href="https://scholar.google.com/citations?user=PXkS0K0AAAAJ" />
                  <SocialLink icon={<Mail size={20} />} href="mailto:ja7ad@live.com" />
                </div>
              </div>

              {/* Hero Abstract Graphic on the Right */}
              <div className="w-full lg:w-[40%] relative z-10 hidden md:block mt-10 lg:mt-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#79c0ff]/10 to-[#d2a8ff]/20 blur-3xl rounded-full animate-pulse"></div>
                <svg viewBox="0 0 400 400" className="w-full h-auto drop-shadow-2xl relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g className="animate-[spin_40s_linear_infinite]" style={{ transformOrigin: 'center' }}>
                    <circle cx="200" cy="200" r="160" stroke="#30363d" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="200" cy="200" r="120" stroke="#30363d" strokeWidth="1" />
                    <circle cx="200" cy="200" r="80" stroke="#79c0ff" strokeWidth="2" strokeDasharray="10 5" className="opacity-50" />
                  </g>
                  <path d="M 200 40 L 200 360 M 40 200 L 360 200" stroke="#30363d" strokeWidth="1" />
                  <rect x="180" y="80" width="40" height="40" rx="8" fill="#161b22" stroke="#d2a8ff" strokeWidth="2" className="animate-bounce" />
                  <rect x="260" y="180" width="60" height="40" rx="8" fill="#161b22" stroke="#3fb950" strokeWidth="2" className="animate-[bounce_2s_infinite]" style={{ animationDelay: '0.5s' }} />
                  <rect x="100" y="240" width="50" height="50" rx="25" fill="#161b22" stroke="#ff7b72" strokeWidth="2" className="animate-[bounce_2s_infinite]" style={{ animationDelay: '1s' }} />
                  <path d="M190 95 L210 95 M200 85 L200 105" stroke="#d2a8ff" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
                </svg>
              </div>

            </div>
          </section>

          {/* === SKILLS SECTION === */}
          <SectionBranch
            id="skills"
            hexColor="#3fb950"
            icon={<Code2 size={16} />}
            subtitle="Expertise"
            title={<span>Core technical <span className="text-[#3fb950]">capabilities</span> & domains.</span>}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              <SkillCard
                icon={<Server className="text-[#3fb950]" />}
                title="Backend & Architecture"
                desc="Expert in Go (Golang), Python, Node.js. Designing highly scalable Microservices, implementing gRPC for fast inter-service communication, and container orchestration with Docker/Kubernetes."
              />
              <SkillCard
                icon={<Globe className="text-[#3fb950]" />}
                title="Blockchain & Web3"
                desc="Deep understanding of decentralized technologies. Core contributions to Pactus Blockchain, Filecoin Lotus Devnet, TrustWallet Core, and building DeFi/NFT platforms like Artogenia."
              />
              <SkillCard
                icon={<Database className="text-[#3fb950]" />}
                title="IoT & Data Systems"
                desc="Developing real-time IoT pipelines using MQTT and ThingsBoard. Expert in schema design for PostgreSQL, MongoDB, caching with Redis, and AI integration via TensorFlow."
              />
            </div>
          </SectionBranch>

          {/* === EXPERIENCE SECTION === */}
          <SectionBranch
            id="experience"
            hexColor="#d2a8ff"
            icon={<GitPullRequest size={16} />}
            subtitle="Career Journey"
            title={<span>Professional <span className="text-[#d2a8ff]">experience</span> & leadership.</span>}
          >
            <div className="space-y-8 relative z-10">
              <ExperienceItem
                year="Feb 2023 - Present"
                role="Software Technical Lead & Senior SW Engineer"
                company="Sensifai (Belgium)"
                desc="Conceived and developed Artogenia, a DeFi platform merging blockchain, AI, and AR. Architected robust microservices upon gRPC for high concurrency optimization. Mentoring junior developers and managing AI/AR integrations cross-functionally."
                color="#d2a8ff"
              />
              <ExperienceItem
                year="Jan 2022 - Feb 2023"
                role="Lead Software Engineer"
                company="Ramooz / MedXFactor"
                desc="Led development for MedXFactor, a cloud-based Case Management solution. Designed microservices architecture employing gRPC and MongoDB. Developed Golang modules and handled deployment/monitoring of production services."
                color="#79c0ff"
              />
              <ExperienceItem
                year="Apr 2021 - Nov 2021"
                role="Senior Software Engineer"
                company="farageek"
                desc="Focused on Blockchain R&D for the Filecoin network. Implemented Filecoin Lotus group logic and Lotus Devnet. Optimized infrastructure issues and implemented a smart miner tool integrated with nanopool."
                color="#3fb950"
              />
              <ExperienceItem
                year="Mar 2013 - Mar 2021"
                role="Software Developer"
                company="Freelance"
                desc="Developed various desktop applications, including PID key checkers, MPK, Ratiborus KMS emulators, and utility software across an 8-year span."
                color="#8b949e"
              />
            </div>
          </SectionBranch>

          {/* === PROJECTS SECTION === */}
          <SectionBranch
            id="projects"
            hexColor="#79c0ff"
            icon={<Terminal size={16} />}
            subtitle="Open Source & Portfolios"
            title={<span>Engineered for <span className="text-[#79c0ff]">scale</span> and impact.</span>}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
              <ProjectCard
                title="Aerium"
                desc="A platform designed to transform the way communities agree, decide, and grow with transparency and innovation."
                role="Maintainer & Core Dev"
                link="https://aerium.network/"
                color="hover:border-[#79c0ff]" titleHover="group-hover:text-[#79c0ff]"
              />
              <ProjectCard
                title="Meilisearch Go SDK"
                desc="Official Golang client for the Meilisearch search engine, providing seamless indexing and searching."
                role="Maintainer"
                link="https://github.com/meilisearch/meilisearch-go"
                color="hover:border-[#79c0ff]" titleHover="group-hover:text-[#79c0ff]"
              />
              <ProjectCard
                title="Pactus Blockchain"
                desc="A fast, secure, and fully decentralized blockchain built with Go and SSPOS consensus."
                role="Contributor"
                link="https://pactus.org"
                color="hover:border-[#79c0ff]" titleHover="group-hover:text-[#79c0ff]"
              />
              <ProjectCard
                title="Artogenia"
                desc="A creative marketplace for digital and physical arts, powered by Solana NFTs."
                role="Backend Developer"
                link="https://artogenia.com"
                color="hover:border-[#79c0ff]" titleHover="group-hover:text-[#79c0ff]"
              />
              <ProjectCard
                title="TrustWallet Core"
                desc="Cross-platform, cross-blockchain wallet library powering the TrustWallet ecosystem."
                role="Contributor"
                link="https://github.com/trustwallet/wallet-core"
                color="hover:border-[#79c0ff]" titleHover="group-hover:text-[#79c0ff]"
              />
              <ProjectCard
                title="Meilisearch"
                desc="Helps you shape a delightful search experience in a snap, working out of the box."
                role="Contributor"
                link="https://github.com/meilisearch/meilisearch"
                color="hover:border-[#79c0ff]" titleHover="group-hover:text-[#79c0ff]"
              />
              <ProjectCard
                title="OTP (Go Package)"
                desc="High-performance, zero-dependency Go package for generating and validating TOTP, HOTP, and OCRA."
                role="Creator"
                link="https://github.com/ja7ad/otp"
                color="hover:border-[#79c0ff]" titleHover="group-hover:text-[#79c0ff]"
              />
              <ProjectCard
                title="Go Blockchain"
                desc="A Proof-of-Work blockchain implementation written in Go for educational purposes."
                role="Researcher / Contributor"
                link="https://github.com/Ja7ad/Blockchain"
                color="hover:border-[#79c0ff]" titleHover="group-hover:text-[#79c0ff]"
              />
              <ProjectCard
                title="Consumption"
                desc="Process consumption calculator for watt usage on Linux VMs or servers."
                role="Creator"
                link="https://github.com/ja7ad/consumption"
                color="hover:border-[#79c0ff]" titleHover="group-hover:text-[#79c0ff]"
              />
            </div>
          </SectionBranch>

          {/* === HONORS & AWARDS SECTION === */}
          <SectionBranch
            id="honors"
            hexColor="#ff7b72"
            icon={<Award size={16} />}
            subtitle="Recognition"
            title={<span>Honors & <span className="text-[#ff7b72]">Awards</span>.</span>}
          >
            <div className="space-y-8 relative z-10">
              <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 hover:border-[#ff7b72] transition-colors duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Trophy size={100} className="text-[#ff7b72]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                  OC2 - AquaSense Winner
                  <a href="https://nebulouscloud.eu/oc2-winner-aquasense/" target="_blank" rel="noreferrer" className="text-[#8b949e] hover:text-[#ff7b72] transition-colors">
                    <ExternalLink size={18} />
                  </a>
                </h3>
                <p className="text-[#ff7b72] font-medium text-sm mb-6">NebulOuS Meta-Operating System Initiative</p>
                <div className="text-[#8b949e] leading-relaxed space-y-4 max-w-4xl relative z-10">
                  <p>
                    AquaSense is a real-time water quality monitoring system for urban and rural environments, using 20 sensors to measure parameters like pH and turbidity every 10 seconds to detect contamination.
                    Integrated with NebulOuS’s Meta-Operating System, it employs a three-step IoT pipeline where sensors send data via MQTT to Raspberry Pi 4 edge devices running Mosquitto and ThingsBoard.
                  </p>
                  <p>
                    A cloud-based TensorFlow LSTM model analyzes the preprocessed data with 95% anomaly detection accuracy within 5 seconds. The architecture dynamically scales to handle spikes of 100–1000 readings/sec with {"<"}2-second latency and 99% uptime, cutting cloud energy use by 30% and supporting UN SDG 6.
                  </p>
                </div>
              </div>

              <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 hover:border-[#ff7b72] transition-colors duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Award size={100} className="text-[#ff7b72]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                  OC5 - Pactus Nexus
                  <a href="https://trustchain.ngi.eu/pactus-nexus/" target="_blank" rel="noreferrer" className="text-[#8b949e] hover:text-[#ff7b72] transition-colors">
                    <ExternalLink size={18} />
                  </a>
                </h3>
                <p className="text-[#ff7b72] font-medium text-sm mb-6">NGI TrustChain Initiative</p>
                <div className="text-[#8b949e] leading-relaxed max-w-4xl relative z-10">
                  <p>
                    Pactus Nexus is an open-source, energy-efficient, and scalable blockchain solution designed to meet the objectives of the NGI TrustChain initiative. Built on the Pactus platform and powered by an enhanced Solid State Proof of Stake (SSPoS) consensus mechanism, the project aims to deliver a secure, interoperable, and user-friendly framework for decentralized applications (dApps) across sectors like finance, healthcare, and supply chain management.
                  </p>
                </div>
              </div>
            </div>
          </SectionBranch>

          {/* === BLOGS & PUBLICATIONS SECTION === */}
          <SectionBranch
            id="blogs"
            hexColor="#e3b341"
            icon={<BookOpen size={16} />}
            subtitle="Publications"
            title={<span>Writing & <span className="text-[#e3b341]">Thoughts</span>.</span>}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">

              <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 hover:border-[#e3b341] transition-all duration-500 group relative overflow-hidden flex flex-col">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d] text-[#e3b341] shadow-inner">
                       <Rss size={24} />
                    </div>
                    <span className="font-mono text-sm font-semibold text-[#8b949e]">bitstack.substack.com</span>
                 </div>
                 <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-[#e3b341] transition-colors">Bitstack Newsletter</h3>
                 <p className="text-[#8b949e] text-base leading-relaxed mb-8 flex-grow">
                   Deep dives into system architecture, Go programming, and decentralized networks. Join my newsletter to get the latest engineering insights, architecture patterns, and thoughts directly in your inbox.
                 </p>
                 <a href="https://bitstack.substack.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white font-semibold hover:text-[#e3b341] transition-colors">
                   Read Articles <ChevronRight size={18} />
                 </a>
              </div>

              <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 hover:border-[#e3b341] transition-all duration-500 group relative overflow-hidden flex flex-col">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d] text-[#e3b341] shadow-inner">
                       <Terminal size={24} />
                    </div>
                    <span className="font-mono text-sm font-semibold text-[#8b949e]">dev.to/gopher</span>
                 </div>
                 <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-[#e3b341] transition-colors">Dev.to Community</h3>
                 <p className="text-[#8b949e] text-base leading-relaxed mb-8 flex-grow">
                   Quick tutorials, open-source updates, and technical discussions with the developer community. A collection of practical guides and code snippets for everyday engineering challenges.
                 </p>
                 <a href="http://dev.to/gopher" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white font-semibold hover:text-[#e3b341] transition-colors">
                   Explore Posts <ChevronRight size={18} />
                 </a>
              </div>

            </div>
          </SectionBranch>

          {/* Spacer to allow full scroll so the last branch can merge */}
          <div className="h-[30vh] sm:h-[40vh] w-full relative">
            {/* The Final Git Node at the absolute end of the line */}
            <div className="absolute bottom-8 left-[-40px] sm:left-[-60px] lg:left-[-100px] w-[3px] flex justify-center z-20">
              <div
                className="w-5 h-5 shrink-0 rounded-full bg-[#0d1117] border-[3px] transition-all duration-700 z-10"
                style={{
                  borderColor: scrollProgress > 98 ? '#3fb950' : '#30363d',
                  boxShadow: scrollProgress > 98 ? '0 0 15px rgba(63,185,80,0.6)' : 'none',
                  transform: scrollProgress > 98 ? 'scale(1.2)' : 'scale(1)'
                }}
              ></div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

// === Sub Components ===

const FloatingSocialIcon = ({ icon, href, tooltip, delay }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative w-12 h-12 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#8b949e] hover:text-white hover:border-[#8b949e] hover:bg-[#30363d] transition-all shadow-lg hover:scale-110"
      style={{ animationDelay: `${delay}ms` }}
    >
      {icon}
      {/* Tooltip */}
      <div className="absolute right-14 bg-[#0d1117] border border-[#30363d] text-white text-xs font-semibold px-3 py-1.5 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl">
        {tooltip}
      </div>
    </a>
  );
};

const SectionBranch = ({ id, hexColor, icon, title, subtitle, children }) => {
  const sectionRef = useRef(null);
  const branchRef = useRef(null);
  const [branchDims, setBranchDims] = useState({ width: 0, height: 0 });
  const [progress, setProgress] = useState(0);

  const [revealRef, isVisible] = useReveal(0.15);

  useEffect(() => {
    if (!branchRef.current) return;
    const observer = new ResizeObserver(entries => {
      setBranchDims({
        width: entries[0].contentRect.width,
        height: entries[0].contentRect.height
      });
    });
    observer.observe(branchRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const triggerPoint = windowHeight * 0.7; // Start slightly earlier
      const scrolled = triggerPoint - rect.top;
      const totalScrollable = rect.height * 0.8; // Finish the branch earlier before section is out of view

      let p = totalScrollable > 0 ? scrolled / totalScrollable : 0;
      p = Math.max(0, Math.min(1, p));
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { width, height } = branchDims;
  const radius = Math.min(32, width / 2);

  const svgPath = width > 0 && height > 0
    ? `M 0 0 L ${width - radius} 0 Q ${width} 0 ${width} ${radius} L ${width} ${height - radius} Q ${width} ${height} ${width - radius} ${height} L 0 ${height}`
    : '';

  return (
    <section id={id} ref={sectionRef} className="relative pt-24 pb-12 w-full">

      <div
        ref={branchRef}
        className="absolute top-24 bottom-12 left-[-40px] sm:left-[-60px] lg:left-[-100px] w-[24px] sm:w-[40px] lg:w-[64px] z-0 pointer-events-none"
      >
        {width > 0 && height > 0 && (
          <svg width={width} height={height} className="absolute inset-0 overflow-visible">
            <path d={svgPath} fill="none" stroke="#30363d" strokeWidth="3" />

            <path
              d={svgPath}
              fill="none"
              stroke={hexColor}
              strokeWidth="3"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - progress}
              className="transition-all duration-150 ease-out"
              style={{ filter: `drop-shadow(0 0 8px ${hexColor}80)` }}
            />
          </svg>
        )}

        <div
          className="absolute rounded-full bg-[#0d1117] border-[3px] flex items-center justify-center transition-all duration-300 z-10"
          style={{
            width: 32, height: 32,
            borderColor: progress > 0.05 ? hexColor : '#30363d',
            color: progress > 0.05 ? hexColor : '#8b949e',
            right: -16,
            top: radius + 10,
            transform: progress > 0.05 ? 'scale(1)' : 'scale(0.8)',
            boxShadow: progress > 0.05 ? `0 0 15px ${hexColor}60` : 'none'
          }}
        >
          {icon}
        </div>
      </div>

      <div ref={revealRef} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} relative z-10`}>
        <h2 className="text-xl font-medium mb-4 text-[#8b949e] tracking-wide">
          {subtitle}
        </h2>
        <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] max-w-3xl mb-16">
          {title}
        </h3>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

const SkillCard = ({ icon, title, desc }) => {
  const [ref, isVisible] = useReveal();
  return (
    <div ref={ref} className={`bg-[#161b22] border border-[#30363d] rounded-2xl p-8 hover:border-[#8b949e] transition-all duration-500 shadow-lg group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="mb-6 p-4 rounded-xl bg-[#0d1117] border border-[#30363d] inline-block shadow-inner group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="text-2xl font-bold text-white mb-4">{title}</h4>
      <p className="text-[#8b949e] leading-relaxed text-sm lg:text-base">
        {desc}
      </p>
    </div>
  );
};

const ExperienceItem = ({ year, role, company, desc, color }) => {
  const [ref, isVisible] = useReveal();
  return (
    <div ref={ref} className={`bg-[#161b22] border border-[#30363d] rounded-2xl p-8 transition-all duration-700 hover:border-[#8b949e] relative overflow-hidden group ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
      <div className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-2" style={{ backgroundColor: color }}></div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          <h4 className="text-2xl font-bold text-white">{role}</h4>
          <h5 className="text-lg font-medium mt-1" style={{ color: color }}>{company}</h5>
        </div>
        <span className="text-xs font-mono text-[#8b949e] mt-2 md:mt-0 bg-[#0d1117] px-3 py-1.5 rounded-full border border-[#30363d] w-fit">{year}</span>
      </div>
      <p className="text-[#8b949e] leading-relaxed text-sm lg:text-base">
        {desc}
      </p>
    </div>
  );
};

const ProjectCard = ({ title, desc, role, link, color, titleHover }) => {
  const [ref, isVisible] = useReveal();
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      ref={ref}
      className={`bg-[#161b22] border border-[#30363d] rounded-2xl p-8 transition-all duration-500 flex flex-col group hover:-translate-y-1 ${color} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-xl font-bold text-white transition-colors ${titleHover}`}>{title}</h3>
        <ExternalLink size={18} className="text-[#8b949e] group-hover:text-white transition-colors" />
      </div>
      <p className="text-[#8b949e] mb-6 flex-grow leading-relaxed text-sm">{desc}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        <Badge text={role} />
      </div>
    </a>
  );
};

const Badge = ({ text }) => (
  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#0d1117] text-[#8b949e] border border-[#30363d]">
    {text}
  </span>
);

const SocialLink = ({ icon, href }) => (
  <a href={href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#8b949e] hover:text-white hover:border-[#8b949e] hover:bg-[#30363d] transition-all">
    {icon}
  </a>
);