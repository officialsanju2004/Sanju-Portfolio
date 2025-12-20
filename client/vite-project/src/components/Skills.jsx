   
import { useInView } from 'react-intersection-observer';
import { SiTailwindcss, SiMongodb, SiExpress, SiThreedotjs, SiBlender, SiFramer } from 'react-icons/si';
import { motion } from 'framer-motion';
  import {FaReact,FaNodeJs} from 'react-icons/fa';

export default function Skill () {
    const [ref, inView] = useInView({
      threshold: 0.1,
      triggerOnce: false,
    });

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
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

 

  const skills = [
      {
        category: 'Programming Languages',

        items: [
          { name: 'C', level: 75, proficiency: 'Intermediate' },
          { name: 'C++', level: 75, proficiency: 'Intermediate' },
           { name: 'Java', level: 75, proficiency: 'Intermediate' },
         
        ],
      },
      {
        category: 'Web Development',
        items: [
          { name: 'HTML5', level: 75, proficiency: 'Intermediate' },
          { name: 'CSS3', level: 75, proficiency: 'Intermediate' },
          { name: 'JavaScript', level: 75, proficiency: 'Intermediate' },
          { name: 'Bootstrap', level: 75, proficiency: 'Intermediate' },
          { name: 'React.js', level: 75, proficiency: 'Intermediate' },
         
          { name: 'Tailwind CSS', level: 75, proficiency: 'Intermediate' },
          { name: 'Node.js', level: 75, proficiency: 'Intermediate' },
           { name: 'Express.js', level: 75, proficiency: 'Intermediate' },
          { name: 'MongoDb', level: 75, proficiency: 'Intermediate' },

        ],

      },
      {
        category: 'Other Skills',
        items: [
          { name: 'Problem Solving', level: 75, proficiency: 'Intermediate' },
          { name: 'Algorithm Design', level: 75, proficiency: 'Intermediate' },
          { name: 'Version Control (Git)', level: 75, proficiency: 'Intermediate' },
        ],
      },
    ];

    const techIcons = [
      { icon: <FaReact size={36} />, name: 'React', color: 'text-blue-400' },
      { icon: <SiTailwindcss size={36} />, name: 'Tailwind', color: 'text-cyan-400' },
      { icon: <SiMongodb size={36} />, name: 'MongoDB', color: 'text-green-500' },

      { icon: <SiExpress size={36} />, name: 'Express', color: 'text-gray-400' },
      { icon: <FaNodeJs size={36} />, name: 'Node.js', color: 'text-green-600' },
      { icon: <SiThreedotjs size={36} />, name: 'Three.js', color: 'text-gray-300' },
    ];

    return (
      <section 
        ref={ref}
        id="skills" 
        className="py-20 bg-white dark:bg-gray-900"
      >
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"

        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My <span className="text-indigo-600">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              While I'm still expanding my technical knowledge, I've gained practical experience through various projects.
            </p>
          </motion.div>

          {/* Tech Stack Icons */}
          <motion.div variants={itemVariants} className="mb-16">

            <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800 dark:text-white">
              Tech Stack
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {techIcons.map((tech, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="flex flex-col items-center"
                >
                  <div className={`p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-md ${tech.color}`}>
                    {tech.icon}
                  </div>
                  <span className="mt-2 text-sm text-gray-600 dark:text-

gray-300">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={itemVariants} className="mb-20">
            <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800 dark:text-white">
              Skills & Proficiency
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skillCategory, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}

                  whileHover={{ y: -5 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-6"
                >
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b-2 border-indigo-500">
                    {skillCategory.category}
                  </h4>
                  {skillCategory.items.map((skill, skillIndex) => (
                    <div key={skillIndex} className="mb-4">
                      <div className="flex justify-between mb-1 font-medium text-gray-700 dark:text-gray-300">
                        <span>{skill.name}</span>
                        <span className="text-indigo-600 dark:text-indigo-400">{skill.proficiency}</span>
                      </div>

                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </section>
    );
};
