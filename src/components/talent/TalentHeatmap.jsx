import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Filter, RotateCcw, MapPin, Star, DollarSign, Users } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import CandidateProfiles from './CandidateProfiles';
import { mockCandidates, regions, technologies } from '../../data/mockData';
import { useAppStore } from '../../hooks/useAppStore';

const TalentHeatmap = () => {
  const {
    filters,
    setFilter,
    resetFilters,
    selectedCandidate,
    setSelectedCandidate
  } = useAppStore();

  const [viewMode, setViewMode] = useState('heatmap'); // 'heatmap' or 'grid'

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter(candidate => {
      const regionMatch = filters.selectedRegion === 'All' || candidate.region === filters.selectedRegion;
      const techMatch = filters.selectedTechnology === 'All' || 
        candidate.technologies.includes(filters.selectedTechnology);
      return regionMatch && techMatch;
    });
  }, [filters]);

  const heatmapData = useMemo(() => {
    return filteredCandidates.map(candidate => ({
      ...candidate,
      x: candidate.skillLevel,
      y: candidate.availability === 'Available' ? 80 : 20,
      z: parseInt(candidate.experience.split(' ')[0]) || 4 // Extract years for size
    }));
  }, [filteredCandidates]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-md p-4 border border-white/20 rounded-xl shadow-xl">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              {data.avatar}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{data.name}</p>
              <p className="text-sm text-gray-600">{data.city}, {data.region}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Skill Level:</span>
              <span className="font-semibold">{data.skillLevel}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Experience:</span>
              <span className="font-semibold">{data.experience}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rate:</span>
              <span className="font-semibold">${data.hourlyRate}/hour</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className={`font-semibold ${
                data.availability === 'Available' ? 'text-green-600' : 'text-orange-600'
              }`}>
                {data.availability}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rating:</span>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="font-semibold">{data.rating}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-3">
            {data.technologies.slice(0, 3).map(tech => (
              <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                {tech}
              </span>
            ))}
            {data.technologies.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                +{data.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const handleDotClick = (data) => {
    setSelectedCandidate(data);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Global Talent Pool
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Explore our diverse network of {mockCandidates.length.toLocaleString()} pre-vetted developers worldwide
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('heatmap')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'heatmap' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Heatmap View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Grid View
            </button>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Filter Candidates</h3>
          </div>
          <button
            onClick={resetFilters}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Region
            </label>
            <select
              value={filters.selectedRegion}
              onChange={(e) => setFilter('selectedRegion', e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technology
            </label>
            <select
              value={filters.selectedTechnology}
              onChange={(e) => setFilter('selectedTechnology', e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              {technologies.map(tech => (
                <option key={tech} value={tech}>{tech}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <div className="w-full bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 border-2 border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Showing:</span>
                <span className="text-lg font-bold text-blue-600">
                  {filteredCandidates.length} candidates
                </span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'heatmap' ? (
          <motion.div
            key="heatmap"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <GlassCard className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Skill Level vs Availability Matrix
                </h3>
                <p className="text-gray-600">
                  Click on any candidate to view detailed profile. Size indicates years of experience.
                </p>
              </div>
              
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={heatmapData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      type="number" 
                      dataKey="x" 
                      domain={[70, 100]}
                      tickFormatter={(value) => `${value}%`}
                      label={{ value: 'Skill Level →', position: 'insideBottom', offset: -5 }}
                      stroke="#6b7280"
                      fontSize={12}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="y" 
                      domain={[0, 100]}
                      tickFormatter={(value) => value > 50 ? 'Available' : 'Busy'}
                      label={{ value: '← Availability', angle: -90, position: 'insideLeft' }}
                      stroke="#6b7280"
                      fontSize={12}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Scatter 
                      data={heatmapData} 
                      fill="#3b82f6"
                      onClick={handleDotClick}
                      cursor="pointer"
                    >
                      {heatmapData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.availability === 'Available' ? '#3b82f6' : '#f59e0b'}
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              
              {/* Legend */}
              <div className="flex justify-center mt-6 space-x-8">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Busy</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span>Bubble size = Years of experience</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCandidates.map((candidate, index) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard 
                    className="p-6 cursor-pointer hover:scale-105"
                    onClick={() => setSelectedCandidate(candidate)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                          {candidate.avatar}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin className="h-3 w-3" />
                            <span>{candidate.city}, {candidate.region}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-semibold">{candidate.rating}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          candidate.availability === 'Available' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {candidate.availability}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Experience</span>
                        <span className="font-semibold">{candidate.experience}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Skill Level</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${candidate.skillLevel}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold">{candidate.skillLevel}%</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Rate</span>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-semibold">{candidate.hourlyRate}/hour</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex flex-wrap gap-1">
                        {candidate.technologies.slice(0, 3).map(tech => (
                          <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs">
                            {tech}
                          </span>
                        ))}
                        {candidate.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                            +{candidate.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                      <span>{candidate.completedProjects} projects</span>
                      <span>{candidate.clientSatisfaction}% satisfaction</span>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Candidate Profile Modal */}
      <CandidateProfiles />
    </div>
  );
};

export default TalentHeatmap;
