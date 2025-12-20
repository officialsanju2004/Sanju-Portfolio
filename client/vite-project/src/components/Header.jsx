
import { motion} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {  FiDownload  } from 'react-icons/fi';
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaWhatsapp, FaReact} from 'react-icons/fa';
import Profile3D from './ProfileCard';
import { useState,useEffect } from 'react';

const TypingAnimation = () => {
  const roles = ['Full Stack Developer', 'UI/UX Designer', 'Creative Problem Solver', 'Software Engineer'];
  const [currentRole, setCurrentRole] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = 

useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const current = roles[currentRoleIndex];
      
      if (isDeleting) {
        setCurrentRole(current.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
        
        if (currentIndex === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((currentRoleIndex + 1) % roles.length);
        }
      } else {
        setCurrentRole(current.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);

        
        if (currentIndex === current.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timer);
  }, [currentIndex, currentRoleIndex, isDeleting, roles]);

  return (
    <span className="text-purple-500 dark:text-purple-400 min-h-[1.5em] inline-block">
      {currentRole}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}

        className="ml-1"
      >
        |
      </motion.span>
    </span>
  );
};

// Header Component
  export default function Header (){
    const [ref, inView] = useInView({
      threshold: 0.1,
      triggerOnce: false,
    });

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
        },
      },
    };

    const itemVariants = {

      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
      },
    };
  const downloadResume = () => {
  const link = document.createElement('a');
  link.href = '/resume.docx';  // .docx file ka exact naam
  link.download = 'SANJU_SINGH_RESUME.docx'; // Download hone ka naam
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
    return (
      <section
        id="home"
        ref={ref}
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-

pink-500/10 dark:from-indigo-900/10 dark:via-purple-900/10 dark:to-pink-900/10" />
        </div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left column - text content */}
            <div>
              <motion.div variants={itemVariants} className="mb-6">
                <span className="px-4 py-2 rounded-full bg-indigo-100 dark:bg-

indigo-900/30 text-indigo-600 dark:text-indigo-600 text-sm font-medium">
                  Hello, I'm Sanju 👋
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              >
                <span className="text-gray-800 dark:text-white">I'm a </span>
                <br />
                <TypingAnimation />
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg"

              >
                I build exceptional digital experiences that are fast, accessible,
                visually appealing, and responsive. Let's work together to bring
                your ideas to life!
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4 items-center"
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium 

transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                >
                  Hire Me
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                      onClick={downloadResume}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 
                  hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-all flex items-center gap-2 group"
                >
                  <FiDownload size={18} />
                  Download Resume
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, 

repeat: Infinity }}
                    className="group-hover:inline-block hidden"
                  >
                    →
                  </motion.span>
                </motion.a>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex gap-4 mt-8 text-gray-600 dark:text-gray-400"
              >
                {[
                  { icon: <FaGithub size={24} />, href: 'https://github.com/officialsanju2004' },
                  { icon: <FaLinkedinIn size={24} />, href: 'https://www.linkedin.com/in/sanju-singh-a36776380?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
                  { icon: <FaWhatsapp size={24} />, href: 'https://wa.me/919877583155',target:"_blank" , rel:"noopener noreferrer"  },

                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Right column - 3D profile image 

*/}
            <motion.div
              variants={itemVariants}
              className="relative flex justify-center"
            >
              <Profile3D />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 

rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>
    );
  };

  
