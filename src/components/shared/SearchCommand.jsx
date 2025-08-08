import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, User, Briefcase, BarChart3, Clock } from 'lucide-react';
import { mockCandidates } from '../../data/mockData';
import { useAppStore } from '../../hooks/useAppStore';

const SearchCommand = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { setCurrentView, setSelectedCandidate } = useAppStore();

  const searchCategories = [
    {
      title: 'Candidates',
      icon: User,
      items: mockCandidates.slice(0, 5).map(candidate => ({
        id: candidate.id,
        title: candidate.name,
        subtitle: `${candidate.experience} • ${candidate.region}`,
        action: () => {
          setSelectedCandidate(candidate);
          setCurrentView('talent');
          onClose();
        }
      }))
    },
    {
      title: 'Navigation',
      icon: Command,
      items: [
        {
          id: 'nav-dashboard',
          title: 'Dashboard',
          subtitle: 'Analytics and overview',
          action: () => {
            setCurrentView('dashboard');
            onClose();
          }
        },
        {
          id: 'nav-ai-matching',
          title: 'AI Matching',
          subtitle: 'Find perfect candidates',
          action: () => {
            setCurrentView('ai-matching');
            onClose();
          }
        },
        {
          id: 'nav-talent',
          title: 'Talent Pool',
          subtitle: 'Browse all candidates',
          action: () => {
            setCurrentView('talent');
            onClose();
          }
        }
      ]
    },
    {
      title: 'Quick Actions',
      icon: Briefcase,
      items: [
        {
          id: 'action-new-match',
          title: 'Start AI Matching',
          subtitle: 'Find candidates for new project',
          action: () => {
            setCurrentView('ai-matching');
            onClose();
          }
        },
        {
          id: 'action-view-analytics',
          title: 'View Analytics',
          subtitle: 'Performance metrics and insights',
          action: () => {
            setCurrentView('analytics');
            onClose();
          }
        }
      ]
    }
  ];

  useEffect(() => {
    if (!query.trim()) {
      setResults(searchCategories);
      return;
    }

    const filtered = searchCategories.map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    })).filter(category => category.items.length > 0);

    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const totalItems = results.reduce((sum, category) => sum + category.items.length, 0);
        setSelectedIndex(prev => (prev + 1) % totalItems);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const totalItems = results.reduce((sum, category) => sum + category.items.length, 0);
        setSelectedIndex(prev => (prev - 1 + totalItems) % totalItems);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        let currentIndex = 0;
        for (const category of results) {
          for (const item of category.items) {
            if (currentIndex === selectedIndex) {
              item.action();
              return;
            }
            currentIndex++;
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
        >
          {/* Search Input */}
          <div className="flex items-center px-6 py-4 border-b border-gray-200">
            <Search className="h-5 w-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search candidates, navigate, or perform actions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-lg bg-transparent outline-none placeholder-gray-400"
              autoFocus
            />
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <kbd className="px-2 py-1 bg-gray-100 rounded">↵</kbd>
              <span>to select</span>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {results.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                <Search className="h-8 w-8 mx-auto mb-3 opacity-40" />
                <p>No results found for "{query}"</p>
              </div>
            ) : (
              <div className="py-2">
                {results.map((category) => (
                  <div key={category.title} className="mb-4 last:mb-0">
                    <div className="px-6 py-2 flex items-center space-x-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      <category.icon className="h-4 w-4" />
                      <span>{category.title}</span>
                    </div>
                    {category.items.map((item, itemIndex) => {
                      const globalIndex = results
                        .slice(0, results.indexOf(category))
                        .reduce((sum, cat) => sum + cat.items.length, 0) + itemIndex;
                      
                      return (
                        <motion.button
                          key={item.id}
                          onClick={item.action}
                          className={`w-full px-6 py-3 text-left hover:bg-gray-50 flex items-center justify-between transition-colors ${
                            globalIndex === selectedIndex ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                          }`}
                          whileHover={{ x: 4 }}
                        >
                          <div>
                            <p className="font-medium text-gray-900">{item.title}</p>
                            <p className="text-sm text-gray-500">{item.subtitle}</p>
                          </div>
                          {globalIndex === selectedIndex && (
                            <div className="text-xs text-blue-600 flex items-center space-x-1">
                              <kbd className="px-1.5 py-0.5 bg-blue-100 rounded text-xs">↵</kbd>
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded">↓</kbd>
                  <span>to navigate</span>
                </div>
                <div className="flex items-center space-x-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded">esc</kbd>
                  <span>to close</span>
                </div>
              </div>
              <div className="text-gray-400">
                {results.reduce((sum, category) => sum + category.items.length, 0)} results
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchCommand;
