import schoolBranch1 from '../Images/branch1.jpg';
import schoolBranch2 from '../Images/branch2.jpg';
import khalsaCollege from '../Images/khalsacollege.jpg';
import hifiTech from '../Images/hitek.jpg';
import twelth from '../Images/twelth.jpg';
import tenth from '../Images/tenth.jpg';
import cpp from '../Images/cpp.jpg';
import clan from '../Images/clan.jpg';

import seven from '../Images/seven.jpg';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


// Education Component
export default function Education () {
    const [ref, inView] = useInView({
      threshold: 0.1,
      triggerOnce: false,
    });

    const educationData = [
      {
        id: 1,

        year: '2007 - 2014',
        title: 'Primary & Middle School',
        institution: 'Bibi Kaulan Ji Public School (Branch 1)',
        location: 'Amritsar, Punjab',
        description: 'Started my educational journey here from 1st standard and continued till 7th standard.',
        images: [
          { src: schoolBranch1, caption: 'School Building' },
          { src: seven, caption: '7th Marksheet' },
        ],
      },
      {
        id: 2,
        year: '2014 - 2023',
        title: 'High School & Senior Secondary',
        institution: 'Bibi Kaulan Ji Public School (Branch 2)',

        location: 'Amritsar, Punjab',
        description: 'Continued my education from 8th standard and completed my 12th grade here.',
        images: [
          { src: schoolBranch2, caption: 'School Campus' },
          { src: tenth, caption: '10th Marksheet' },
          { src: twelth, caption: '12th Marksheet' },
        ],
      },
      {
        id: 3,
        year: '2023 - Present',
        title: 'Bachelor of Computer Applications',
        institution: 'Khalsa College',
        location: 'Amritsar, Punjab',
        description: 'Currently pursuing BCA (4th Semester). During this time, I\'ve expanded my technical skills through various courses and self-learning.',
        images: [
          { src: khalsaCollege, caption: 'College Campus' },
        ],
      },
      {
        id: 4,
        year: '2023',
        title: 'Additional Courses & Self-Learning',
        institution: 'HiFi Tech Institute & Online Learning (YouTube)',
        location: '',
        description: 'Completed professional courses in C and C++ programming languages. Learned web development technologies including HTML, CSS, Bootstrap, and JavaScript through self-paced online learning.',
        images: [
          { src: hifiTech, caption: 'HiFi Tech Institute' },
          { src: clan, caption: 'C Programming' },
          { src: cpp, caption: 'C++ Programming' },
        ],
      },
    ];

    return (
      <section 
        id="education"
        ref={ref}
        className="education-section py-20 bg-white dark:bg-gray-900"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : 

{}}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h1 className="text-center text-3xl md:text-4xl font-bold mb-10 relative">
            My Education Journey
            <span className="block w-20 h-1 bg-indigo-600 mx-auto mt-2"></span>
          </h1>
          
          <div className="timeline relative pl-8 md:pl-16">
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-1 bg-indigo-200 dark:bg-indigo-900/50"></div>
            
            {educationData.map((item, index) => (
              <motion.div

                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="timeline-item relative mb-12 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-transform hover:-translate-y-1"
              >
                <div className="absolute -left-10 md:-left-14 top-6 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white dark:border-gray-900"></div>
                
                <div className="timeline-year text-indigo-600 dark:text-indigo-400 font-bold text-lg mb-2">
                  {item.year}
                </div>

                
                <div className="timeline-content">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{item.title}</h3>
                  <p className="mb-2">
                    <span className="institution font-semibold text-gray-700 dark:text-gray-300">{item.institution}</span>
                    {item.location && (
                      <span className="location text-gray-500 dark:text-gray-400 italic">, {item.location}</span>
                    )}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                  
                  <div className="gallery flex 

flex-wrap gap-4 mt-6">
                    {item.images.map((image, imgIndex) => (
                      <motion.div
                        key={imgIndex}
                        whileHover={{ scale: 1.03 }}
                        className="gallery-item w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] rounded-lg overflow-hidden shadow-md"
                      >
                        <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                          {image.src ? (
                            <img 
                              src={image.src} 
                              alt={image.caption}
                              className="w-full h-full object-cover"
                            />

                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                              Image not available
                            </div>
                          )}
                        </div>
                        <div className="caption bg-white dark:bg-gray-700 p-3 text-center">
                          <p className="text-sm text-gray-600 dark:text-gray-300">{image.caption}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </section>
    );
  };

