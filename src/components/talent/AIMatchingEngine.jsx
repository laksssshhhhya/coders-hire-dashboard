// src/components/talent/AIMatchingEngine.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Sparkles, Target, Zap, CheckCircle, 
  User, MapPin, Clock, DollarSign, Star,
  Code, Award, TrendingUp
} from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { mockCandidates, regions, technologies, experienceLevels, budgetRanges } from '../../data/mockData';
import { useAppStore } from '../../hooks/useAppStore';
import toast from 'react-hot-toast';

const AIMatchingEngine = () => {
  const {
    isMatching,
    matchingStage,
    matches,
    setMatching,
    setMatchingStage,
    setMatches,
    filters,
    setFilter
  } = useAppStore();

  const [projectRequirements, setProjectRequirements] = useState({
    skills: ['React', 'TypeScript', 'Node.js'],
    experience: '3-5 years',
    budget: '$40-60/hour',
    region: 'All',
    projectType: 'Frontend Development',
    duration: '3-6 months'
  });

  const matchingStages = [
    { text: "Analyzing project requirements...", icon: Brain, color: "text-blue-600" },
    { text: "Scanning global talent pool...", icon: Target, color: "text-purple-600" },
    { text: "Running AI matching algorithms...", icon: Sparkles, color: "text-pink-600" },
    { text: "Calculating compatibility scores...", icon: Zap, color: "text-yellow-600" },
    { text: "Ranking top candidates...", icon: TrendingUp, color: "text-green-600" },
    { text: "Perfect matches found!", icon: CheckCircle, color: "text-emerald-600" }
  ];

  const startMatching = async () => {
    setMatching(true);
    setMatchingStage(0);
    setMatches([]);
    
    toast.success('Starting AI talent matching...', {
      icon: '🤖',
      duration: 2000
    });

    // Simulate AI matching process with realistic timing
    for (let i = 0; i < matchingStages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMatchingStage(i);
    }

    // Generate realistic matches based on filters
    const filteredCandidates = mockCandidates
      .filter(candidate => {
        const regionMatch = filters.selectedRegion === 'All' || candidate.region === filters.selectedRegion;
        const skillMatch = projectRequirements.skills.some(skill => 
          candidate.technologies.includes(skill)
        );
        return regionMatch && skillMatch;
      })
      .sort((a, b) => b.skillLevel - a.skillLevel)
      .slice(0, 5)
      .map(candidate => ({
        ...candidate,
        matchScore: Math.min(98, candidate.skillLevel + Math.random() * 5),
        compatibilityReasons: generateCompatibilityReasons(candidate, projectRequirements)
      }));

    await new Promise(resolve => setTimeout(resolve, 800));
    setMatches(filteredCandidates);
    setMatching(false);
    
    toast.success(`Found ${filteredCandidates.length} perfect matches!`, {
      icon: '🎯',
      duration: 3000
    });
  };

  const generateCompatibilityReasons = (candidate, requirements) => {
    const reasons = [];
    
    if (requirements.skills.some(skill => candidate.technologies.includes(skill))) {
      reasons.push(`Expert in ${requirements.skills.filter(skill => 
        candidate.technologies.includes(skill)
      ).join(', ')}`);
    }
    
    if (candidate.rating >= 4.8) {
      reasons.push('Exceptional client ratings');
    }
    
    if (candidate.completedProjects > 20) {
      reasons.push('Proven track record');
    }
    
    if (candidate.specializations.length > 0) {
      reasons.push(`Specialized in ${candidate.specializations[0]}`);
    }
    
    return reasons.slice(0, 3);
  };

  const handleSkillToggle = (skill) => {
    setProjectRequirements(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  return (
    <div className="space-y-8">
      {/* AI Matching Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div 
          className="inline-flex items-center space-x-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white px-8 py-6 rounded-3xl shadow-2xl mb-6"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Brain className="h-10 w-10" />
          </motion.div>
          <div className="text-left">
            <h2 className="text-3xl font-bold">AI-Powered Talent Matching</h2>
            <p className="text-blue-100 text-sm">Next-generation recruitment intelligence</p>
          </div>
        </motion.div>
        
        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          Our advanced AI analyzes <span className="font-semibold text-blue-600">50+ parameters</span> including 
          technical skills, project history, client feedback, and cultural fit to 
          find your <span className="font-semibold text-purple-600">perfect candidate match</span> in seconds
        </p>
      </motion.div>

      {/* Main Matching Interface */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Input Section */}
        <div className="xl:col-span-2">
          <GlassCard className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Code className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Project Requirements</h3>
            </div>
            
            <div className="space-y-6">
              {/* Required Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Required Skills
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {technologies.slice(1).map(skill => (
                    <motion.button
                      key={skill}
                      onClick={() => handleSkillToggle(skill)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-2 rounded-lg text-sm font-medium transition-all ${
                        projectRequirements.skills.includes(skill)
                          ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                          : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100'
                      }`}
                    >
                      {skill}
                    </motion.button>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {projectRequirements.skills.map(skill => (
                    <span 
                      key={skill}
                      className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium flex items-center space-x-1"
                    >
                      <span>{skill}</span>
                      <button 
                        onClick={() => handleSkillToggle(skill)}
                        className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Form Fields */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select 
                    value={projectRequirements.experience}
                    onChange={(e) => setProjectRequirements(prev => ({...prev, experience: e.target.value}))}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    {experienceLevels.slice(1).map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <select 
                    value={projectRequirements.budget}
                    onChange={(e) => setProjectRequirements(prev => ({...prev, budget: e.target.value}))}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    {budgetRanges.slice(1).map(budget => (
                      <option key={budget} value={budget}>{budget}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Region
                  </label>
                  <select 
                    value={projectRequirements.region}
                    onChange={(e) => setProjectRequirements(prev => ({...prev, region: e.target.value}))}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* AI Match Button */}
              <motion.button
                onClick={startMatching}
                disabled={isMatching || projectRequirements.skills.length === 0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
              >
                {isMatching ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Finding Perfect Matches...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    <span>Find AI Matches</span>
                  </>
                )}
              </motion.button>
            </div>
          </GlassCard>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-3">
          <GlassCard className="p-8 min-h-[600px]">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                <Target className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">AI Matching Results</h3>
            </div>
            
            {/* Matching Progress */}
            <AnimatePresence>
              {isMatching && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-4"
                >
                  <div className="text-center mb-8">
                    <motion.div
                      animate={{ 
                        boxShadow: [
                          '0 0 20px rgba(147, 51, 234, 0.3)',
                          '0 0 40px rgba(147, 51, 234, 0.6)',
                          '0 0 20px rgba(147, 51, 234, 0.3)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Brain className="h-10 w-10 text-white" />
                    </motion.div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">AI Processing</h4>
                    <p className="text-gray-600">Analyzing thousands of candidates...</p>
                  </div>

                  {matchingStages.map((stage, index) => {
                    const StageIcon = stage.icon;
                    const isActive = index === matchingStage;
                    const isCompleted = index < matchingStage;
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0.3, x: -20 }}
                        animate={{ 
                          opacity: isActive ? 1 : isCompleted ? 0.8 : 0.4,
                          x: 0,
                          scale: isActive ? 1.02 : 1
                        }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-center space-x-4 p-4 rounded-xl transition-all ${
                          isActive 
                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200' 
                            : isCompleted 
                              ? 'bg-green-50 border border-green-200'
                              : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className={`p-3 rounded-full transition-all ${
                          isCompleted 
                            ? 'bg-green-500' 
                            : isActive 
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                              : 'bg-gray-300'
                        }`}>
                          <StageIcon className="h-5 w-5 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <span className={`font-medium ${
                            isActive ? 'text-gray-900' : 'text-gray-600'
                          }`}>
                            {stage.text}
                          </span>
                        </div>
                        
                        {isActive && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"
                          />
                        )}
                        
                        {isCompleted && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Match Results */}
            <AnimatePresence>
              {matches.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Top {matches.length} Matches Found
                    </h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Award className="h-4 w-4" />
                      <span>Sorted by compatibility</span>
                    </div>
                  </div>

                  {matches.map((match, index) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {match.avatar}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-lg">{match.name}</h4>
                            <div className="flex items-center space-x-2 text-gray-600 mb-1">
                              <MapPin className="h-4 w-4" />
                              <span className="text-sm">{match.city}, {match.region}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{match.experience}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span>{match.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                            className="flex items-center space-x-2 mb-2"
                          >
                            <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                              {Math.round(match.matchScore)}%
                            </span>
                            <span className="text-sm text-gray-500 font-medium">match</span>
                          </motion.div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <DollarSign className="h-4 w-4" />
                            <span>${match.hourlyRate}/hour</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Skills */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {match.technologies.map(tech => (
                            <span 
                              key={tech}
                              className={`px-3 py-1 rounded-lg text-xs font-medium ${
                                projectRequirements.skills.includes(tech)
                                  ? 'bg-green-100 text-green-800 border border-green-200'
                                  : 'bg-blue-50 text-blue-700 border border-blue-200'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Compatibility Reasons */}
                      {match.compatibilityReasons && (
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-900 mb-2">Why this is a great match:</h5>
                          <ul className="space-y-1">
                            {match.compatibilityReasons.map((reason, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span>{match.completedProjects} projects completed</span>
                        <span className="text-green-600 font-medium">{match.availability}</span>
                        <span>{match.clientSatisfaction}% client satisfaction</span>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex space-x-3">
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                          onClick={() => toast.success(`Connecting with ${match.name}...`)}
                        >
                          Connect Now
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200"
                          onClick={() => toast('Profile saved to favorites')}
                        >
                          <User className="h-5 w-5 text-gray-600" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Default State */}
            {!isMatching && matches.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-12 w-12 text-gray-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-600 mb-2">Ready to Find Perfect Matches</h4>
                <p className="text-gray-500">Configure your project requirements and let our AI find the best candidates</p>
              </motion.div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default AIMatchingEngine;
