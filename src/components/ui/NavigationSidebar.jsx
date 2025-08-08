import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Brain, BarChart3, Settings, Bell, Search, 
  Briefcase, TrendingUp, MessageSquare, Calendar, FileText, Globe
} from 'lucide-react';
import { useAppStore } from '../../hooks/useAppStore';
import { PulseIndicator } from './LoadingStates';

const NavigationSidebar = () => {
  const { currentView, setCurrentView } = useAppStore();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'ai-matching', label: 'AI Matching', icon: Brain, badge: 'NEW' },
    { id: 'talent', label: 'Talent Pool', icon: Users, badge: null },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
    { id: 'projects', label: 'Active Projects', icon: Briefcase, badge: '12' },
    { id: 'performance', label: 'Performance', icon: TrendingUp, badge: null },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '5' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, badge: null },
    { id: 'reports', label: 'Reports', icon: FileText, badge: null },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: '3' }
  ];

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'global', label: 'Global View', icon: Globe }
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 z-40 w-72 h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl"
    >
      {/* Scrollable Container */}
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <div className="flex flex-col min-h-full p-6 space-y-6">
          
          {/* Logo Section - Fixed Size */}
          <motion.div 
            className="flex-shrink-0"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div 
                className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white font-bold text-xl">
                    <img src="https://codershire.in/wp-content/uploads/2023/06/cropped-cropped-Coral-Logo-CH.png" alt="" />
                </span>
              </motion.div>
              <div className="flex-1 min-w-0">
                <motion.h2 
                  className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Coders Hire
                </motion.h2>
                <motion.p 
                  className="text-gray-400 text-sm leading-tight"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Intelligence Platform
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Search Section - Fixed Size */}
          <motion.div 
            className="flex-shrink-0"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
              <input 
                type="text"
                placeholder="Search candidates..."
                className="w-full bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </motion.div>

          {/* Quick Stats - Fixed Size */}
          <motion.div 
            className="flex-shrink-0 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-blue-500/20"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="flex flex-col items-center">
                <p className="text-lg font-bold text-white leading-tight">2.8K</p>
                <p className="text-xs text-gray-300 leading-tight">Active</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg font-bold text-green-400 leading-tight">97%</p>
                <p className="text-xs text-gray-300 leading-tight">Success</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <PulseIndicator isActive={true} color="green" />
                </div>
                <p className="text-sm font-bold text-blue-400 leading-tight">Live</p>
                <p className="text-xs text-gray-300 leading-tight">Updates</p>
              </div>
            </div>
          </motion.div>

          {/* Navigation Items - Flexible */}
          <div className="flex-1 min-h-0">
            <nav className="space-y-2">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      group relative w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-300
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg text-white' 
                        : 'hover:bg-gray-800/60 text-gray-300 hover:text-white'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <Icon className={`h-5 w-5 flex-shrink-0 transition-all ${
                        isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                      }`} />
                      <span className="font-medium text-sm truncate">{item.label}</span>
                    </div>
                    
                    {item.badge && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`
                          flex-shrink-0 ml-2 text-xs px-2 py-1 rounded-full font-semibold
                          ${item.badge === 'NEW' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                          }
                        `}
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </motion.button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Navigation - Fixed Size */}
          <div className="flex-shrink-0 pt-4 border-t border-gray-700/50">
            <div className="space-y-2">
              {bottomItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    whileHover={{ x: 8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      group w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : 'hover:bg-gray-800/60 text-gray-300 hover:text-white'
                      }
                    `}
                  >
                    <Icon className={`h-5 w-5 flex-shrink-0 transition-all ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* User Profile - Fixed Size */}
          <motion.div 
            className="flex-shrink-0 p-4 bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-xl border border-gray-600/30"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <motion.div 
                className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-white font-semibold text-sm">JS</span>
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight truncate">John Smith</p>
                <p className="text-gray-400 text-xs leading-tight truncate">Talent Manager</p>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200"
            >
              View Profile
            </motion.button>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default NavigationSidebar;
