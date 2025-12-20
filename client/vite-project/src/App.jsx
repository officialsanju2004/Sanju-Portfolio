
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, progress } from 'framer-motion';

import { FiHeart  } from 'react-icons/fi';
import { FaLinkedinIn, FaGithub, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import About from './components/About';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import Services from './components/Services';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Education from './components/Education';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(99, 102, 241, ${Math.random() * 0.5})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;

        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 10000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };


    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, 

particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };

  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-30 dark:opacity-20 z-0"
    />
  );
};

// Floating elements component
const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"

          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 100 + 20}px`,
            height: `${Math.random() * 100 + 20}px`,
            background: `radial-gradient(circle, rgba(99, 102, 241, ${Math.random() * 0.2}) 0%, rgba(0,0,0,0) 70%)`,
          }}
          animate={{
            y: [0, Math.random() * 40 - 20, 0],
            x: [0, Math.random() * 40 - 20, 0],
            rotate: [0, Math.random() * 360],
            scale: [1, 1 + Math.random() * 0.5, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",

          }}
        />
      ))}
    </div>
  );
};
// Scroll progress indicator
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentProgress = window.scrollY;

      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setScrollProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 

z-50"
      initial={{ width: 0 }}
      animate={{ width: `${scrollProgress}%` }}
      transition={{ duration: 0.3 }}
    />
  );
};


const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,

      });
    };

    const mouseDown = () => setClicked(true);
    const mouseUp = () => setClicked(false);

    const linkHover = () => setHovered(true);
    const linkLeave = () => setHovered(false);

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);

    const links = document.querySelectorAll('a, button, .cursor-pointer');

    links.forEach(link => {
      link.addEventListener('mouseenter', linkHover);
      link.addEventListener('mouseleave', linkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);

      links.forEach(link => {
        link.removeEventListener('mouseenter', 

linkHover);
        link.removeEventListener('mouseleave', linkLeave);
      });
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-indigo-600 mix-blend-difference pointer-events-none z-50 flex items-center justify-center"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: clicked ? 0.8 : hovered ? 1.5 : 1,
        }}
        transition={{

          type: "spring",
          mass: 0.1,
          stiffness: 500,
          damping: 28,
        }}
      >
        <motion.div
          className="w-1 h-1 rounded-full bg-white"
          animate={{ scale: hovered ? 1 : 0 }}
        />
      </motion.div>
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 border-indigo-600 pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: clicked ? 1.2 : hovered ? 1.8 : 1.2,

          opacity: hovered ? 0.4 : 0.2,
        }}
        transition={{
          type: "spring",
          mass: 0.2,
          stiffness: 400,
          damping: 30,
        }}
      />
    </>
  );
};


// Main App component
const App = () => {

  const [activeSection, setActiveSection] = useState('home');
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    
    

    // Add scroll event listener to track active section
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentSection = 'home';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + 

sectionHeight - 200) {
          currentSection = section.id;
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

  
  
  
  // Footer Component
  const Footer = () => {
    return (
      <footer className="bg-gray-100 dark:bg-gray-800/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="flex space-x-6 mb-6">
              {[
                { icon: <FaLinkedinIn size={20} />, 

href: 'https://www.linkedin.com/in/sanju-singh-a36776380?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
                { icon: <FaGithub size={20} />, href: 'https://github.com/officialsanju2004' },
                { icon: <FaWhatsapp size={20} />, href: 'https://twitter.com'  ,target:"_blank" , rel:"noopener noreferrer"},
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>


            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              © {new Date().getFullYear()} Sanju's Portfolio. All rights reserved.
            </p>
            <p className="text-gray-500 dark:text-red-500 text-xs flex items-center">
              Made by ~Sanju
            </p>
          </motion.div>
        </div>
      </footer>
    );
  };

return (
   <div className={`min-h-screen transition-colors duration-300`}>
      <div className="dark:bg-gray-900 dark:text-gray-100">
        <CustomCursor />
        <ParticleBackground />
        <FloatingElements />
        <ScrollProgress />
        <Navbar activeSection={activeSection}/>
        <Header />
        <About />
        <Services />
    <Skills/>
        <Projects />
        <Education />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};


export default App;
