
import { useState } from 'react';
import { motion} from 'framer-motion';
import Sanju from '../Images/Sanju.jpg'


export default function Profile3D () {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className="relative w-64 h-64 md:w-80 md:h-80 lg:w-126 lg:h-126"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ 
        rotateX: rotation.x,
        rotateY: rotation.y
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      style={{ transformStyle: 'preserve-3d' }}
    >

      {/* Background glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-xl transform translate-z-[-30px]" />
      
      {/* Main profile container */}
      <div className="relative w-full h-full flex items-center justify-center rounded-full transform transition-transform duration-300" style={{ transformStyle: 'preserve-3d' }}>
        {/* Outer ring */}
        <div className="absolute w-full h-full rounded-full border-4 border-indigo-500/30 transform translate-z-[-10px]" />
        
        {/* Middle ring */}
        <div className="absolute w-[90%] h-[90%] rounded-full border-4 border-purple-500/20 transform translate-z-[-5px]" 

/>
        
        {/* Image container */}
        <div className="relative w-5/6 h-5/6 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl transform translate-z-0">
          <img 
            src={Sanju}
            alt="Profile"
            className="w-full h-full object-cover"
            style={{ objectPosition: '0% 23%' }}
          />
          
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        </div>
        
        
      
      </div>
    </motion.div>
  );
};
