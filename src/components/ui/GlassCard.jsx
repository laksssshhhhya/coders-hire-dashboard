import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ 
  children, 
  className = '', 
  hover = true,
  glowOnHover = false,
  onClick = null,
  padding = 'p-6'
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { 
        y: -3, 
        scale: 1.02,
        boxShadow: glowOnHover ? '0 0 30px rgba(59, 130, 246, 0.3)' : undefined
      } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`
        backdrop-blur-glass bg-white/80 
        border border-white/30 
        rounded-2xl shadow-glass 
        transition-all duration-300
        hover:bg-white/90 hover:shadow-xl-colored
        ${onClick ? 'cursor-pointer' : ''}
        ${padding}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
