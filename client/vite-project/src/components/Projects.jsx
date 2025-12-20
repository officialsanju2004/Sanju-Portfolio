import tetris from '../Images/tetris.png';
import quiz from '../Images/quiz.png';
import currency from '../Images/currency.png';
import hits from '../Images/hits.png';
import tic from '../Images/tic.png';
import bookstore from '../Images/bookstore.png';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';


export default function Projects () {
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

    const projects = [
      {
        id: 1,
        title: 'Tetris Game',
        category: 'Graphics',
        description:
          'Tetris Game is a game in which there are numerous blocks which fall from the top. The user has to score as many points as possible until the game is over.',
        tags: ['C language', 'Graphic Programming'],
        image: tetris,
        github: 'https://github.com/officialsanju2004',
        demo: '#',
      },
      {
        id: 2,
        title: 'Quiz Game',
        category: 'Graphics',
        description:

          'Quiz is a brain intelligence game designed to test knowledge. This game is specially designed to test the IQ of school students.',
        tags: ['C language', 'Graphic Programming'],
        image: quiz,
        github: 'https://github.com/officialsanju2004',
        demo: '#',
      },
      {
        id: 3,
        title: 'Currency Converter',
        category: 'Web',
        description:
          'Currency Converter is a web application used to convert currency from one country to another. Simply select the source and target currency.',
        tags: ['HTML', 'CSS', 'Javascript', 'API integration'],

        image: currency,
        github: 'https://github.com/officialsanju2004',
        demo: '#',
      },
      {
        id: 4,
        title: 'Hits Game',
        category: 'Web',
        description:
          'A simple fun game where you control a paddle to hit a ball and prevent it from touching the ground. Each hit increases your score.',
        tags: ['HTML', 'CSS', 'Javascript'],
        image: hits,
        github: 'https://github.com/officialsanju2004',
        demo: '#',
      },
      {
        id: 5,
        title: 'Tic Tac Toe Game',

        category: 'Web',
        description:
          'Tic Tac Toe is a popular game where two players take turns marking spaces in a 3×3 grid. The player who succeeds in placing three marks wins.',
        tags: ['HTML', 'CSS', 'Javascript'],
        image: tic,
        github: 'https://github.com/officialsanju2004',
        demo: '#',
      },
      {
        id: 6,
        title: 'BookStore Website',
        category: 'Web',
        description:
          'Bookstore website is a website which provide users various variety of books. It also provides AI search features and recommendations.',
        tags: ['React.js', 'MongoDb', 'Tailwind Css', 'Express.js', 'AI'],
        image: bookstore,
        github: 'https://github.com/officialsanju2004',
        demo: '#',
      },
    ];

    return (
      <section
        id="projects"
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
            variants={containerVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My <span className="text-indigo-600">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Here are some of my recent projects. Each project represents a
              challenge I've solved with creativity and technical expertise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 

md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      </section>
    );
  };