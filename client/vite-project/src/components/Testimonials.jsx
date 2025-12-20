
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {  FiMessageSquare } from 'react-icons/fi';



export default function Testimonials () {
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

    const testimonials = [
      {
        id: 1,
        name: 'Sarah Johnson',
        role: 'CEO, TechStart Inc.',
        content:
          'Working with this developer was an absolute pleasure. They delivered our project ahead of schedule with exceptional quality. Their attention to detail and problem-solving skills are unmatched.',
      },

      {
        id: 2,
        name: 'Michael Chen',
        role: 'Product Manager, Digital Solutions',
        content:
          'The mobile app they developed for us exceeded all expectations. User engagement increased by 40% after launch. Their technical expertise and creative approach were invaluable.',
      },
      {
        id: 3,
        name: 'Emily Rodriguez',
        role: 'Marketing Director, BrandVision',
        content:
          'Our website redesign was a complete success thanks to their skills. They understood our brand perfectly and translated it into a stunning digital experience that boosted our conversions.',
      },
    ];

    return (
      <section
        id="testimonials"
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
              Client <span className="text-indigo-600">Testimonials</span>
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Don't just take my word for it. Here's what my clients say about
              working with me.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}

                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 relative group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity">
                  <svg viewBox="0 0 100 100" className="text-indigo-600">
                    <path d="M20,20 C40,0 60,0 80,20 C100,40 100,60 80,80 C60,100 40,100 20,80 C0,60 0,40 20,20 Z" fill="currentColor" />
                  </svg>
                </div>
                <div className="text-indigo-600 dark:text-indigo-400 absolute top-6 left-6 opacity-10">

                  <FiMessageSquare size={60} />
                </div>
                <div className="relative z-10">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">

                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    );
  };

  
