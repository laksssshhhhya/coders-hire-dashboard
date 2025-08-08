import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, AreaChart, Area, ResponsiveContainer, 
  XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';
import { 
  TrendingUp, Users, Clock, Target, Brain, Zap, 
  Globe, DollarSign, Star, Award, ArrowUp, ArrowDown
} from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import MetricsGrid from './MetricsGrid';
import PerformanceCharts from './PerformanceCharts';
import { analyticsData, chartData, skillsData } from '../../data/mockData';
import { useRealtimeData } from '../../hooks/useRealtimeData';

const AnalyticsDashboard = () => {
  const { data: realtimeData, metrics, isConnected } = useRealtimeData();
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [timeRange, setTimeRange] = useState('6months');

  const metricCards = [
    {
      id: 'placements',
      title: 'Total Placements',
      value: analyticsData.totalPlacements.toLocaleString(),
      change: '+23.5%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-purple-50',
      description: 'Successful candidate placements this year',
      trend: [65, 78, 89, 94, 112, 127]
    },
    {
      id: 'matchTime',
      title: 'Avg Match Time',
      value: analyticsData.avgMatchTime,
      change: '-32%',
      changeType: 'positive',
      icon: Clock,
      color: 'from-green-500 to-teal-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-teal-50',
      description: 'Average time to find perfect candidate match',
      trend: [48, 42, 35, 28, 22, 18]
    },
    {
      id: 'successRate',
      title: 'Success Rate',
      value: `${analyticsData.successRate}%`,
      change: '+2.8%',
      changeType: 'positive',
      icon: Target,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
      description: 'Percentage of successful long-term placements',
      trend: [94, 95, 96, 97, 97, 98]
    },
    {
      id: 'aiAccuracy',
      title: 'AI Accuracy',
      value: `${analyticsData.aiAccuracy}%`,
      change: '+5.3%',
      changeType: 'positive',
      icon: Brain,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      description: 'AI matching algorithm accuracy rate',
      trend: [89, 91, 92, 93, 94, 95]
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600 capitalize">{entry.dataKey}:</span>
              <span className="font-semibold text-gray-800">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            ProMatch Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Real-time talent analytics and insights for global recruitment
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.div 
            animate={{ 
              boxShadow: isConnected 
                ? ['0 0 20px rgba(34, 197, 94, 0.3)', '0 0 30px rgba(34, 197, 94, 0.5)', '0 0 20px rgba(34, 197, 94, 0.3)']
                : '0 0 0px rgba(239, 68, 68, 0)'
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-white ${
              isConnected ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-red-600 to-red-700'
            }`}
          >
            <Zap className="h-5 w-5" />
            <span className="font-semibold">{isConnected ? 'Live Updates' : 'Reconnecting...'}</span>
          </motion.div>
          
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white/80 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
        </div>
      </motion.div>

      {/* Real-time Metrics Strip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid grid-cols-2 md:grid-cols-6 gap-4"
      >
        {[
          { label: 'Active Matches', value: metrics.activeMatches, icon: Target, color: 'text-blue-600' },
          { label: 'Live Interviews', value: metrics.ongoingInterviews, icon: Users, color: 'text-green-600' },
          { label: 'Today Placements', value: metrics.todayPlacements, icon: Award, color: 'text-purple-600' },
          { label: 'Applications', value: metrics.liveApplications, icon: Clock, color: 'text-orange-600' },
          { label: 'Clients Online', value: metrics.clientsOnline, icon: Globe, color: 'text-indigo-600' },
          { label: 'Candidates Online', value: metrics.candidatesOnline, icon: TrendingUp, color: 'text-pink-600' }
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20"
          >
            <div className="flex items-center justify-between mb-2">
              <metric.icon className={`h-5 w-5 ${metric.color}`} />
              <motion.span
                key={metric.value}
                initial={{ scale: 1.2, color: '#10b981' }}
                animate={{ scale: 1, color: '#374151' }}
                className="text-lg font-bold"
              >
                {metric.value}
              </motion.span>
            </div>
            <p className="text-xs text-gray-600">{metric.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Metrics Grid */}
      <MetricsGrid 
        metrics={metricCards} 
        selectedMetric={selectedMetric}
        onMetricSelect={setSelectedMetric}
      />

      {/* Performance Charts */}
      <PerformanceCharts 
        chartData={chartData}
        skillsData={skillsData}
        timeRange={timeRange}
      />

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Performing Skills */}
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Top Skills in Demand</h3>
          <div className="space-y-4">
            {skillsData.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: skill.color }}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{skill.name}</p>
                    <p className="text-sm text-gray-500">{skill.demand} demand</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{skill.value}%</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    {skill.growth}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Recent Activity */}
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New candidate registered', time: '2 min ago', type: 'success' },
              { action: 'Interview completed', time: '15 min ago', type: 'info' },
              { action: 'Project started', time: '1 hour ago', type: 'warning' },
              { action: 'Client feedback received', time: '2 hours ago', type: 'success' },
              { action: 'AI matching completed', time: '3 hours ago', type: 'info' }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
              >
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'info' ? 'bg-blue-500' : 'bg-orange-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Quick Stats */}
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Stats</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Client Satisfaction</span>
                <span className="text-sm font-semibold text-gray-900">
                  {analyticsData.clientSatisfaction}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${analyticsData.clientSatisfaction}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Client Retention</span>
                <span className="text-sm font-semibold text-gray-900">
                  {analyticsData.clientRetention}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${analyticsData.clientRetention}%` }}
                  transition={{ duration: 1, delay: 0.7 }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Revenue Growth</span>
                <span className="text-sm font-semibold text-gray-900">
                  {analyticsData.revenueGrowth}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${analyticsData.revenueGrowth}%` }}
                  transition={{ duration: 1, delay: 0.9 }}
                />
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
