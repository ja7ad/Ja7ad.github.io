
import React, { useEffect } from 'react';
import Support from './Support';

// --- Data Definitions ---

export const LONG_BIO = `Being an IT professional for over 9 years and possessing various hands-on experience across several IT domains, I focus primarily on the analysis, design, development, and implementation of different applications. I have gained substantial experience in Blockchain, AI software development, and Augmented Reality (AR) solutions. Throughout my career, I remain consistent in exhibiting the ability to lead others effectively, think strategically, and be innovative in problem-solving to produce terrific results. By paying great attention to detail and a firm belief in quality, I have been able to ensure my projects go beyond the client perspective. I possess a multitude of skills with programming languages, database management systems, building AI solutions, and developing AR. I am quickly adjustable and able to assess many new technologies and integrate them to optimize work, personnel, and generate efficient processes that would help drive business.`;

// Updated with real projects from search results
const PROJECTS = [
  {
    name: "Aerium | Maintainer and core developer",
    desc: "Aerium is a platform designed to transform the way communities agree, decide, and grow. With transparency and innovation at its core, Aerium makes collaboration not only possible but effortless.",
    url: "https://aerium.network/"
  },
  {
    name: "Meilisearch Go SDK | Maintainer",
    desc: "Meilisearch Go SDK is the official Golang client for the Meilisearch search engine, providing seamless indexing, searching, and document management.",
    url: "https://github.com/meilisearch/meilisearch-go"
  },
  {
    name: "Meilisearch | Contributer",
    desc: "Meilisearch helps you shape a delightful search experience in a snap, offering features that work out of the box to speed up your workflow.",
    url: "https://github.com/meilisearch/meilisearch"
  },
  {
    name: "Artogenia | Backend Developer",
    desc: "A creative marketplace for digital and physical arts, powered by Solana NFTs.",
    url: "https://artogenia.com"
  },
  {
    name: "TrustWallet core | Contributer",
    desc: "Cross-platform, cross-blockchain wallet library.",
    url: "https://github.com/trustwallet/wallet-core"
  },
  {
    name: "Blockchain Implementation | Researcher and Contributer",
    desc: "A Proof-of-Work blockchain implementation written in Go for educational purposes.",
    url: "https://github.com/Ja7ad/Blockchain"
  },
  {
    name: "OTP | Creator",
    desc: "A high-performance, zero-dependency Go package for generating and validating TOTP, HOTP and OCRA one-time passwords — RFC 4226, RFC 6238 and RFC 6287 compliant.",
    url: "https://github.com/ja7ad/otp"
  },
  {
    name: "Consumpion | Creator",
    desc: "Process consumption calculator for watt usage on Linux VMs or servers.",
    url: "https://github.com/ja7ad/consumption"
  },
  {
    name: "Pactus Blockchain | Contributer",
    desc: "A fast, secure, and fully decentralized blockchain built with Go and SSPOS consensus.",
    url: "https://pactus.org"
  }
];

const HONORS = [
  {
    name: "OC2 – AquaSense Winner",
    desc: "AquaSense is a real-time water quality monitoring system for urban and rural environments, using 20 sensors to measure parameters like pH and turbidity every 10 seconds to detect contamination from sources such as industrial discharges or agricultural runoff. Integrated with NebulOuS’s Meta-Operating System, it employs a three-step IoT pipeline where sensors send data via MQTT to Raspberry Pi 4 edge devices running Mosquitto and ThingsBoard, which preprocesses readings into 1-minute averages, filters noise, and reduces cloud data load by 20%. A cloud-based TensorFlow LSTM model then analyzes the data with 95% anomaly detection accuracy within 5 seconds. The IoT Pipeline Orchestrator dynamically scales preprocessing and AI modules to handle spikes of 100–1000 readings/sec with <2-second latency and 99% uptime. Alerts are delivered via APIs or dashboards for rapid response, ensuring regulatory compliance and reducing health risks. By prioritizing edge processing for urban sensors, AquaSense cuts cloud energy use by 30% and supports UN SDG 6, while its scalable, containerized architecture also enables applications in air quality monitoring and smart agriculture.",
    url: "https://nebulouscloud.eu/oc2-winner-aquasense/"
  },
  {
    name: "OC5 - Pactus Nexus",
    desc: "Pactus Nexus is an open-source, energy-efficient, and scalable blockchain solution designed to meet the objectives of the NGI TrustChain initiative. Built on the Pactus platform and powered by an enhanced Solid State Proof of Stake (SSPoS) consensus mechanism, the project aims to deliver a secure, interoperable, and user-friendly framework for decentralized applications (dApps) across various sectors, including finance, healthcare, and supply chain management.",
    url: "https://trustchain.ngi.eu/pactus-nexus/"
  }
]

const SOCIALS = [
  { name: "GitHub", url: "https://github.com/ja7ad" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/ja7ad/" },
  { name: "Twitter / X", url: "https://twitter.com/Ja7adR" },
  { name: "Google Scholar", url: "https://scholar.google.com/citations?user=PXkS0K0AAAAJ" }
];

const INFO = {
  name: "Javad Rajabzadeh",
  role: "Senior Software Engineer",
  desc: LONG_BIO
};

const CONTACT = {
  email: "ja7ad@live.com" // Placeholder or generic
};

// --- Command Metadata for Autocomplete ---
export const COMMANDS_LIST = [
  { cmd: 'help', desc: 'list all commands' },
  { cmd: 'info', desc: 'about javad rajabzadeh' },
  { cmd: 'projects', desc: 'view portfolio & works' },
  { cmd: 'honors', desc: 'view project grants' },
  { cmd: 'socials', desc: 'connect on social media' },
  { cmd: 'contact', desc: 'email & contact' },
  { cmd: 'resume', desc: 'download resume pdf' },
  { cmd: 'support', desc: 'donate & support work' },
  { cmd: 'clear', desc: 'clear terminal' },
];

// --- Utilities & Components ---

const ResumeDownloader = () => {
  useEffect(() => {
    const resumeUrl = "https://raw.githubusercontent.com/Ja7ad/Ja7ad.github.io/main/resume/Javad.pdf";
    window.open(resumeUrl, '_blank');
  }, []);

  return (
    <div style={{ color: '#98c379' }}>
      Opening resume in new tab...
      <br/>
      <span style={{fontSize: '0.8em', color: '#5c6370'}}>(Check pop-up blocker if nothing happens)</span>
    </div>
  );
};

export const executeCommand = (cmd: string): React.ReactNode => {
  const cleanCmd = cmd.trim().toLowerCase();

  switch (cleanCmd) {
    case 'help':
      return (
        <div>
          <p>Available commands:</p>
          <ul style={{ listStyle: 'none', paddingLeft: '20px', margin: '10px 0' }}>
            {COMMANDS_LIST.map((c) => (
              <li key={c.cmd}>
                <span style={{ color: '#61afef' }}>{c.cmd}</span> - {c.desc}
              </li>
            ))}
          </ul>
        </div>
      );

    case 'projects':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
          {PROJECTS.map((p, i) => (
            <div key={i}>
              <div style={{ color: '#98c379', fontWeight: 'bold' }}>{i + 1}. {p.name}</div>
              <div style={{ marginLeft: '1rem', marginBottom: '4px', color: '#abb2bf' }}>{p.desc}</div>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                style={{ marginLeft: '1rem', color: '#61afef', textDecoration: 'underline' }}
              >
                {p.url}
              </a>
            </div>
          ))}
        </div>
      );
    case "honors":
            return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
          {HONORS.map((p, i) => (
            <div key={i}>
              <div style={{ color: '#98c379', fontWeight: 'bold' }}>{i + 1}. {p.name}</div>
              <div style={{ marginLeft: '1rem', marginBottom: '4px', color: '#abb2bf' }}>{p.desc}</div>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                style={{ marginLeft: '1rem', color: '#61afef', textDecoration: 'underline' }}
              >
                {p.url}
              </a>
            </div>
          ))}
        </div>
      );
    case 'socials':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
          {SOCIALS.map((s, i) => (
            <div key={i}>
              <div style={{ color: '#e5c07b', fontWeight: 'bold' }}>{i + 1}. {s.name}</div>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                style={{ marginLeft: '1rem', color: '#61afef' }}
              >
                {s.url}
              </a>
            </div>
          ))}
        </div>
      );

    case 'my info':
    case 'info':
      return (
        <div style={{ marginTop: '10px', lineHeight: '1.6' }}>
          <div><span style={{ color: '#c678dd' }}>Name:</span> {INFO.name}</div>
          <div><span style={{ color: '#c678dd' }}>Role:</span> {INFO.role}</div>
          <div style={{ marginTop: '15px', color: '#abb2bf', textAlign: 'justify', maxWidth: '800px' }}>{INFO.desc}</div>
        </div>
      );

    case 'contact info':
    case 'contact':
      return (
         <div style={{ marginTop: '10px' }}>
            <div>You can reach me at:</div>
            <a href={`mailto:${CONTACT.email}`} style={{ color: '#61afef' }}>{CONTACT.email}</a>
         </div>
      );

    case 'resume':
      return <ResumeDownloader />;

    case 'support':
    case 'donate':
      return <Support />;

    case '':
      return null;

    default:
      return (
        <div style={{ color: '#e06c75' }}>
          command not found: {cmd}. Type 'help' for a list of commands.
        </div>
      );
  }
};
