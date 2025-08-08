import React from 'react';
import { motion } from 'framer-motion';

// Skeleton Loader
export const SkeletonLoader = ({ className = '', width = '100%', height = '1rem' }) => {
  return (
    <motion.div
      className={`bg-gray-200 rounded-md ${className}`}
      style={{ width, height }}
      animate={{
        backgroundColor: ['#e5e7eb', '#f3f4f6', '#e5e7eb'],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

// Card Skeleton
export const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-glass p-6 border border-white/20">
      <div className="animate-pulse">
        <div className="flex items-center space-x-4 mb-4">
          <SkeletonLoader className="rounded-full" width="48px" height="48px" />
          <div className="space-y-2 flex-1">
            <SkeletonLoader height="1rem" width="60%" />
            <SkeletonLoader height="0.75rem" width="40%" />
          </div>
        </div>
        <div className="space-y-3">
          <SkeletonLoader height="0.75rem" width="100%" />
          <SkeletonLoader height="0.75rem" width="80%" />
          <SkeletonLoader height="0.75rem" width="60%" />
        </div>
        <div className="flex space-x-2 mt-4">
          <SkeletonLoader height="2rem" width="80px" className="rounded-lg" />
          <SkeletonLoader height="2rem" width="80px" className="rounded-lg" />
        </div>
      </div>
    </div>
  );
};

// Chart Skeleton
export const ChartSkeleton = ({ height = 300 }) => {
  return (
    <div className="bg-white rounded-2xl shadow-glass p-6 border border-white/20">
      <div className="animate-pulse">
        <SkeletonLoader height="1.5rem" width="200px" className="mb-6" />
        <div className="space-y-4" style={{ height }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-end space-x-2">
              <SkeletonLoader 
                height={`${Math.random() * 80 + 20}%`} 
                width="40px" 
                className="rounded-t-md" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Spinner Component
export const Spinner = ({ size = 'md', color = 'blue' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colors = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    green: 'border-green-500',
    red: 'border-red-500',
    gray: 'border-gray-500'
  };

  return (
    <motion.div
      className={`${sizes[size]} border-2 ${colors[color]} border-t-transparent rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};

// Loading Overlay
export const LoadingOverlay = ({ isVisible, message = 'Loading...' }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl p-8 shadow-2xl"
      >
        <div className="flex flex-col items-center space-y-4">
          <Spinner size="lg" />
          <p className="text-gray-700 font-medium">{message}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Pulse Animation for Live Data
export const PulseIndicator = ({ isActive = true, color = 'green' }) => {
  const colors = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500'
  };

  return (
    <div className="relative">
      <motion.div
        className={`w-3 h-3 ${colors[color]} rounded-full`}
        animate={isActive ? {
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1]
        } : {}}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {isActive && (
        <motion.div
          className={`absolute inset-0 w-3 h-3 ${colors[color]} rounded-full opacity-25`}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.25, 0, 0.25]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );
};

// Progress Bar
export const ProgressBar = ({ progress = 0, color = 'blue', showPercentage = true, className = '' }) => {
  const colors = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500'
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        {showPercentage && (
          <span className="text-sm font-medium text-gray-700">
            {Math.round(progress)}%
          </span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className={`h-2 ${colors[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

// Typing Animation
export const TypingAnimation = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className="font-mono">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  );
};
