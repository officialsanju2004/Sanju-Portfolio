

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiUsers, FiFolder } from 'react-icons/fi';
import SkillBar from './Skills';


export default function About () {
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

    const stats = [
      { icon: <FiAward size={24} />, value: '2+', label: 'Years Experience' },

      { icon: <FiUsers size={24} />, value: '15+', label: 'Clients' },
      { icon: <FiFolder size={24} />, value: '20+', label: 'Projects' },
    ];

    const skills = [
      { name: 'JavaScript', level: 75 },
      { name: 'React', level: 70 },
      { name: 'HTML/CSS', level: 85 },
      { name: 'Node.js', level: 60 },
      { name: 'MongoDB', level: 65 },
      { name: 'C/C++', level: 80 },
    ];

    return (
      <section
        id="about"
        ref={ref}
        className="py-20 bg-white dark:bg-gray-900"

      >
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About <span className="text-indigo-600">Me</span>
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">

              Here you will find more information about me, what I do, and my
              current skills mostly in terms of programming and technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold mb-6">
                Get to know <span className="text-indigo-600">me!</span>
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  I'm a <strong>Full Stack Web Developer</strong> with a passion for

                  creating beautiful, functional, and user-centered digital
                  experiences. I've been building websites and applications for over
                  2 years, and I specialize in JavaScript technologies across the whole stack.
                </p>
                <p>
                  My approach combines technical expertise with a keen eye for
                  design, ensuring that the products I build are not only
                  high-performing but also provide an engaging user experience.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies,
                  working on personal projects, or enjoying outdoor activities to

                  keep my mind fresh and creative.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center shadow-md hover:shadow-lg transition-all"
                >
                  <div className="text-indigo-600 dark:text-indigo-400 mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <h4 className="text-2xl font-

bold text-gray-800 dark:text-white mb-1">
                    {stat.value}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </motion.div>
      </section>
    );
  };

  