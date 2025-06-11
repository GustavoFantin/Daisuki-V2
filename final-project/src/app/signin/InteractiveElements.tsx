import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const InteractiveElements: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };


    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-5">
      {/* Mouse-following gradient will go here*/}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(255, 107, 157, 0.4) 0%, rgba(196, 69, 105, 0.2) 50%, transparent 100%)",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Parallax floating elements will be here as well LOL */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full opacity-20"
          style={{
            background: `linear-gradient(45deg, ${
              i % 3 === 0 ? '#ff6b9d, #c44569' : 
              i % 3 === 1 ? '#4facfe, #00f2fe' : '#ffeaa7, #fab1a0'
            })`,
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
            x: mousePosition.x * (0.02 + i * 0.01),
            y: mousePosition.y * (0.02 + i * 0.01),
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Ripple effect on mouse position: in case You dont where, Where some animaation also take place */}
      <motion.div
        className="absolute w-32 h-32 border border-pink-300 rounded-full opacity-20"
        style={{
          left: mousePosition.x + '%',
          top: mousePosition.y + '%',
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.2, 0, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      {/* Secondary ripple same for motion */}
      <motion.div
        className="absolute w-24 h-24 border border-purple-300 rounded-full opacity-15"
        style={{
          left: mousePosition.x + '%',
          top: mousePosition.y + '%',
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.15, 0, 0.15],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.3,
        }}
      />
    </div>
  );
};

export default InteractiveElements;
