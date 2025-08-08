import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, MapPin, Code, Clock, ExternalLink, Star, DollarSign, 
  Award, Briefcase, Languages, Calendar, Shield, Users
} from 'lucide-react';
import { useAppStore } from '../../hooks/useAppStore';
import toast from 'react-hot-toast';

const CandidateProfiles = () => {
  const { selectedCandidate, setSelectedCandidate } = useAppStore();

  if (!selectedCandidate) return null;

  const handleConnect = () => {
    toast.success(`Connection request sent to ${selectedCandidate.name}!`, {
      icon: '🤝',
      duration: 3000
    });
    setSelectedCandidate(null);
  };

  const handleViewPortfolio = () => {
    toast.success('Opening portfolio in new tab...', {
      icon: '🔗'
    });
  };

  const handleSaveProfile = () => {
    toast.success('Profile saved to favorites!', {
      icon: '⭐'
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={() => setSelectedCandidate(null)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-t-2xl">
            <button
              onClick={() => setSelectedCandidate(null)}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex items-start space-x-6">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-bold text-3xl"
              >
                {selectedCandidate.avatar}
              </motion.div>
              
              <div className="flex-1">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold mb-2"
                >
                  {selectedCandidate.name}
                </motion.h2>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center space-x-4 mb-4"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>{selectedCandidate.city}, {selectedCandidate.region}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>{selectedCandidate.experience}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-300" />
                    <span>{selectedCandidate.rating}</span>
                  </div>
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-blue-100 text-lg italic"
                >
                  "{selectedCandidate.story}"
                </motion.p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-8">
                {/* Technologies */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <Code className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Technologies & Skills</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {selectedCandidate.technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.05 }}
                        className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-xl font-medium"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Specializations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <Award className="h-6 w-6 text-purple-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Specializations</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCandidate.specializations.map((spec, index) => (
                      <motion.div
                        key={spec}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="w-2 h-2 bg-purple-600 rounded-full" />
                        <span className="text-gray-800 font-medium">{spec}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Previous Projects */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <Briefcase className="h-6 w-6 text-green-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Previous Projects</h3>
                  </div>
                  <div className="space-y-3">
                    {selectedCandidate.previousProjects.map((project, index) => (
                      <motion.div
                        key={project}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 + index * 0.1 }}
                        className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                          <Briefcase className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{project}</p>
                          <p className="text-sm text-gray-600">Successfully delivered</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Certifications */}
                {selectedCandidate.certifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <Shield className="h-6 w-6 text-indigo-600" />
                      <h3 className="text-xl font-semibold text-gray-900">Certifications</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {selectedCandidate.certifications.map((cert, index) => (
                        <motion.span
                          key={cert}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.3 + index * 0.05 }}
                          className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-xl font-medium"
                        >
                          {cert}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Key Stats */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Statistics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Skill Level</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <motion.div 
                            className="bg-blue-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedCandidate.skillLevel}%` }}
                            transition={{ delay: 0.8, duration: 1 }}
                          />
                        </div>
                        <span className="font-semibold">{selectedCandidate.skillLevel}%</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Hourly Rate</span>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-semibold">{selectedCandidate.hourlyRate}/hour</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Projects Completed</span>
                      <span className="font-semibold">{selectedCandidate.completedProjects}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Client Satisfaction</span>
                      <span className="font-semibold text-green-600">{selectedCandidate.clientSatisfaction}%</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Years with Company</span>
                      <span className="font-semibold">{selectedCandidate.yearsWithCompany} years</span>
                    </div>
                  </div>
                </motion.div>

                {/* Availability */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-6"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Availability</h3>
                  </div>
                  <div className={`text-center p-4 rounded-xl ${
                    selectedCandidate.availability === 'Available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                      selectedCandidate.availability === 'Available' ? 'bg-green-500' : 'bg-orange-500'
                    }`} />
                    <span className="font-semibold text-lg">{selectedCandidate.availability}</span>
                    {selectedCandidate.availability === 'Available' && (
                      <p className="text-sm mt-1">Ready to start immediately</p>
                    )}
                  </div>
                </motion.div>

                {/* Languages */}
                {selectedCandidate.languages && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white border-2 border-gray-200 rounded-2xl p-6"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <Languages className="h-5 w-5 text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
                    </div>
                    <div className="space-y-2">
                      {selectedCandidate.languages.map((language, index) => (
                        <div key={language} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <span className="text-gray-700">{language}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Contact Actions */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="space-y-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConnect}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Users className="h-5 w-5 inline mr-2" />
                    Connect Now
                  </motion.button>

                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleViewPortfolio}
                      className="flex items-center justify-center space-x-2 py-3 px-4 border-2 border-gray-300 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="text-sm font-medium">Portfolio</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSaveProfile}
                      className="flex items-center justify-center space-x-2 py-3 px-4 border-2 border-gray-300 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
                    >
                      <Star className="h-4 w-4" />
                      <span className="text-sm font-medium">Save</span>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CandidateProfiles;
