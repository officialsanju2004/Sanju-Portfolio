
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {  FiCode, FiLayers, FiSmartphone, FiDatabase, FiSearch, FiServer } from 'react-icons/fi';




export default function Services () {
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

    const services = [
      {
        icon: <FiCode size={32} />,

        title: 'Web Development',
        description:
          'Custom website development tailored to your business needs with modern technologies and frameworks.',
      },
      {
        icon: <FiSmartphone size={32} />,
        title: 'Mobile Development',
        description:
          'Cross-platform mobile applications that work seamlessly on both iOS and Android devices.',
      },
      {
        icon: <FiLayers size={32} />,
        title: 'UI/UX Design',
        description:
          'Beautiful and intuitive interfaces designed to enhance user experience and engagement.',

      },
      {
        icon: <FiDatabase size={32} />,
        title: 'Backend Development',
        description:
          'Robust server-side solutions, APIs, and database architectures to power your applications.',
      },
      {
        icon: <FiSearch size={32} />,
        title: 'SEO Optimization',
        description:
          'Improve your website visibility and ranking on search engines with our optimization strategies.',
      },
      {
        icon: <FiServer size={32} />,
        title: 'DevOps & Cloud',
        description:

          'Deployment, scaling, and maintenance of your applications on cloud platforms like AWS and Azure.',
      },
    ];

    return (
      <section
        id="services"
        ref={ref}
        className="py-20 bg-gray-100 dark:bg-gray-800/50"
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
              My <span className="text-indigo-600">Services</span>
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              I offer a wide range of services to help your business grow and
              succeed in the digital world. Here are some of the services I provide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                <div className="text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-

semibold mb-3 text-gray-800 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    );
  };


