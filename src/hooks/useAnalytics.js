import { useState, useEffect } from 'react';
import { chartData, analyticsData, skillsData } from '../data/mockData';

export const useAnalytics = (timeRange = '6months') => {
  const [analytics, setAnalytics] = useState(analyticsData);
  const [charts, setCharts] = useState(chartData);
  const [skills, setSkills] = useState(skillsData);
  const [isLoading, setIsLoading] = useState(false);

  const generateTrendData = (timeRange) => {
    const baseData = [...chartData];
    
    switch(timeRange) {
      case '1month':
        return baseData.slice(-1);
      case '3months':
        return baseData.slice(-3);
      case '6months':
        return baseData;
      case '1year':
        // Generate more months for yearly view
        const yearData = [...baseData];
        const additionalMonths = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        additionalMonths.forEach((month, index) => {
          const lastMonth = yearData[yearData.length - 1];
          yearData.push({
            month,
            placements: lastMonth.placements + Math.floor(Math.random() * 20) - 5,
            revenue: lastMonth.revenue + Math.floor(Math.random() * 200) - 50,
            clients: lastMonth.clients + Math.floor(Math.random() * 10) - 2,
            satisfaction: Math.min(100, lastMonth.satisfaction + Math.random() * 2 - 1),
            candidates: lastMonth.candidates + Math.floor(Math.random() * 50) - 10
          });
        });
        return yearData;
      default:
        return baseData;
    }
  };

  const calculateGrowthRate = (data, key) => {
    if (data.length < 2) return 0;
    const current = data[data.length - 1][key];
    const previous = data[data.length - 2][key];
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const getTopPerformingSkills = () => {
    return skills
      .sort((a, b) => parseInt(b.growth.replace('%', '')) - parseInt(a.growth.replace('%', '')))
      .slice(0, 3);
  };

  const getClientSatisfactionTrend = () => {
    return charts.map(month => ({
      month: month.month,
      satisfaction: month.satisfaction
    }));
  };

  const updateTimeRange = (newTimeRange) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const newChartData = generateTrendData(newTimeRange);
      setCharts(newChartData);
      
      // Update analytics based on new time range
      const totalPlacements = newChartData.reduce((sum, month) => sum + month.placements, 0);
      const totalRevenue = newChartData.reduce((sum, month) => sum + month.revenue, 0) * 1000;
      const avgSatisfaction = newChartData.reduce((sum, month) => sum + month.satisfaction, 0) / newChartData.length;
      
      setAnalytics(prev => ({
        ...prev,
        totalPlacements,
        totalRevenue,
        clientSatisfaction: avgSatisfaction.toFixed(1)
      }));
      
      setIsLoading(false);
    }, 1000);
  };

  const exportData = (format = 'json') => {
    const exportData = {
      analytics,
      charts,
      skills,
      timeRange,
      generatedAt: new Date().toISOString()
    };
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-${timeRange}-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return {
    analytics,
    charts,
    skills,
    isLoading,
    updateTimeRange,
    calculateGrowthRate,
    getTopPerformingSkills,
    getClientSatisfactionTrend,
    exportData
  };
};
