import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

const MetricsGrid = ({ metrics, selectedMetric, onMetricSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.id}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            delay: index * 0.1,
            duration: 0.5,
            type: "spring",
            stiffness: 100
          }}
        >
          <GlassCard 
            className={`${metric.bgColor} border-0 overflow-hidden relative cursor-pointer`}
            hover={true}
            glowOnHover={true}
            onClick={() => onMetricSelect(selectedMetric === metric.id ? null : metric.id)}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <motion.div 
                  whileHover={{ scale: 1.08,
    boxShadow: "0px 4px 10px rgba(59,130,246,0.20)",
    y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`p-3 rounded-xl bg-gradient-to-r ${metric.color} shadow-lg`}
                >
                  <metric.icon className="h-6 w-6 text-white" />
                </motion.div>
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    metric.changeType === 'positive' 
                      ? 'text-green-700 bg-green-100' 
                      : 'text-red-700 bg-red-100'
                  }`}
                >
                  {metric.change}
                </motion.span>
              </div>

              {/* Content */}
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                {metric.title}
              </h3>
              <motion.p 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="text-3xl font-bold text-gray-900 mb-2"
              >
                {metric.value}
              </motion.p>
              
              {/* Mini Trend Chart */}
              {metric.trend && (
                <div className="flex items-end space-x-1 h-8 mb-2">
                  {metric.trend.map((value, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${(value / Math.max(...metric.trend)) * 100}%` }}
                      transition={{ delay: index * 0.1 + 0.5 + i * 0.05 }}
                      className={`bg-gradient-to-t ${metric.color} rounded-sm flex-1 opacity-60`}
                    />
                  ))}
                </div>
              )}
              
              <AnimatePresence>
                {selectedMetric === metric.id && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-gray-600 leading-relaxed"
                  >
                    {metric.description}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Animated background accent */}
              <motion.div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${metric.color}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
              />
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
};

export default MetricsGrid;
