import { useState, useEffect } from 'react';
import { analyticsData, realtimeMetrics } from '../data/mockData';

export const useRealtimeData = () => {
  const [data, setData] = useState(analyticsData);
  const [metrics, setMetrics] = useState(realtimeMetrics);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate real-time connection
    setIsConnected(true);
    
    // Simulate data updates every 5 seconds
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activeMatches: prev.activeMatches + Math.floor(Math.random() * 3) - 1,
        ongoingInterviews: Math.max(0, prev.ongoingInterviews + Math.floor(Math.random() * 3) - 1),
        todayPlacements: prev.todayPlacements + (Math.random() > 0.8 ? 1 : 0),
        liveApplications: prev.liveApplications + Math.floor(Math.random() * 5) - 2,
        clientsOnline: prev.clientsOnline + Math.floor(Math.random() * 10) - 5,
        candidatesOnline: prev.candidatesOnline + Math.floor(Math.random() * 20) - 10
      }));
    }, 5000);

    return () => {
      clearInterval(interval);
      setIsConnected(false);
    };
  }, []);

  const refreshData = () => {
    setData({ ...analyticsData });
    setMetrics({ ...realtimeMetrics });
  };

  return {
    data,
    metrics,
    isConnected,
    refreshData
  };
};
