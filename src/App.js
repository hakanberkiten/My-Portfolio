import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiSun, FiMoon, FiLinkedin, FiExternalLink, FiGithub } from 'react-icons/fi';
import { SiGmail } from 'react-icons/si';
import './App.css';
import lightModeImage from './images/light-mode.png';
import movieRecommendationImage from './images/Screenshot.png';
import translatorImage from './images/light-mode-translator.png'

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    menuItems.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Proje listesine ekleme yapıldı
  const projects = [
    {
      title: "Weather Forecast Application",
      description: "This project is a weather forecast application built with React. It provides weather information for any city using the OpenWeather API. The app supports light and dark themes and displays current weather along with daily forecasts.",
      tech: ["React", "Python", "OpenWeather API", "CSS", "JavaScript", "HTML"],
      github: "https://github.com/hakanberkiten/Weather-App",
      demo: "https://weather-app-beta-eight-96.vercel.app/",
      image: lightModeImage
    },
    {
      title: "Movie Recommendation System",
      description: "A content-based movie recommendation system built using Flask (backend) and React (frontend). This project leverages movie metadata to suggest similar movies based on user input, using features such as genres, overview, cast, and more.",
      tech: ["Python", "NLP", "React", "Flask", "Scikit-learn"],
      github: "https://github.com/hakanberkiten/Movie-Recommendation-System",
      demo: "#",
      image: movieRecommendationImage
    },
    {
      title: "Translator Application",
      description: "The Translator App is a React-based application that provides text translation functionality using an AI-powered backend service. Users can input text in one language and translate it into another language, with support for multiple languages and themes (light/dark mode).",
      tech: ["React", "Python", "Flask", "CSS", "JavaScript", "HTML"],
      github: "https://github.com/hakanberkiten/Translate-App",
      demo: "#",
      image: translatorImage
    },
  ];

  return (
    <div className={`app ${theme}`}>
      {/* Header */}
      <nav className="header">
        {/* Toggle butonu */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
        >
          {theme === 'light' ? <FiMoon /> : <FiSun />}
        </button>

        {/* Hamburger menü butonu */}
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Menü öğeleri */}
        <ul className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleScroll(item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="welcome-container">
          <h2 className="welcome-text">Welcome to My Website</h2>
        </div>
        <h1 className="hero-title">
          <span className="gradient-text">Hi! I am Hakan Berkiten</span>
        </h1>
        <div className="hero-description">
          <p className="description-text">
            I’m a second-year Computer Engineering student at Akdeniz University.
            My passion lies in <span className="highlight">Artificial Intelligence</span>,
            especially in <span className="highlight">Machine Learning</span>,
            <span className="highlight">Large Language Models (LLMs)</span>, and
            <span className="highlight">Natural Language Processing (NLP)</span>.
            I also love building innovative applications and exploring new technologies
            to expand my skill set.
          </p>
        </div>
      </section>

      <section id="education" className="education-section">
        <h2 className="section-title">Education</h2>
        <div className="education-item">
          <h3>Computer Engineering</h3>
          <p className="institution">Akdeniz University</p>
          <p className="duration">2023 - 2027</p>
          <p className="description">
            Currently pursuing my bachelor's in computer engineering.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener" className="project-link">
                    <FiGithub /> Code
                  </a>
                  {project.demo !== "#" && (
                    <a href={project.demo} target="_blank" rel="noopener" className="project-link">
                      <FiExternalLink /> Demo
                    </a>
                  )}
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="tech-stack">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="section">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          <div className="skill-card">
            <h3>Front-End</h3>
            <p>React, HTML, CSS, JavaScript</p>
          </div>
          <div className="skill-card">
            <h3>Back-End</h3>
            <p>Node.js, Java , Python , Flask , API Integration</p>
          </div>
          <div className="skill-card">
            <h3>AI & Data Science</h3>
            <p>Machine Learning, Python, NLP</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <h2 className="section-title">Contact Me</h2>
        <div className="contact-info">
          <div className="contact-item">
            <a className="contact-link">
              <SiGmail className="contact-icon" />
              hakanberkiten7 at gmail
            </a>
          </div>
          <div className="contact-item">
            <a
              href="https://www.linkedin.com/in/hakan-berkiten-494320303/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <FiLinkedin className="contact-icon" />
              linkedin.com/hakanberkiten
            </a>
          </div>
          <div className="contact-item">
            <a
              href="https://github.com/hakanberkiten"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <FiGithub className="contact-icon" />
              github.com/hakanberkiten
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
