import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import NavigationSidebar from './components/ui/NavigationSidebar';
import AnalyticsDashboard from './components/dashboard/AnalyticsDashboard';
import AIMatchingEngine from './components/talent/AIMatchingEngine';
import TalentHeatmap from './components/talent/TalentHeatmap';
import { useAppStore } from './hooks/useAppStore';
import './styles/globals.css';

function App() {
  const { currentView } = useAppStore();

  const renderContent = () => {
    switch(currentView) {
      case 'dashboard':
        return <AnalyticsDashboard />;
      case 'ai-matching':
        return <AIMatchingEngine />;
      case 'talent':
        return <TalentHeatmap />;
      case 'analytics':
        return (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Advanced Analytics</h2>
            <p className="text-gray-600">Deep insights and reporting tools coming soon...</p>
          </div>
        );
      default:
        return <AnalyticsDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <NavigationSidebar />
      
      <main className="ml-72 min-h-screen">
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Toaster 
        position="top-right"
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
            color: '#374151',
            fontSize: '14px',
            fontWeight: '500'
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff'
            }
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff'
            }
          }
        }}
      />
    </div>
  );
}

export default App;
