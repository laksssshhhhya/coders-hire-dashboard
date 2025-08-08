import { useState, useCallback } from 'react';
import { mockCandidates } from '../data/mockData';

export const useAIMatching = () => {
  const [isMatching, setIsMatching] = useState(false);
  const [matchResults, setMatchResults] = useState([]);
  const [matchingProgress, setMatchingProgress] = useState(0);

  const calculateMatchScore = (candidate, requirements) => {
    let score = 0;
    let maxScore = 0;

    // Technology match (40% weight)
    const techWeight = 40;
    const matchingTechs = requirements.skills.filter(skill => 
      candidate.technologies.includes(skill)
    );
    const techScore = (matchingTechs.length / requirements.skills.length) * techWeight;
    score += techScore;
    maxScore += techWeight;

    // Experience match (25% weight)
    const expWeight = 25;
    const candidateYears = parseInt(candidate.experience);
    const requiredYears = parseInt(requirements.experience);
    const expScore = Math.min(candidateYears / requiredYears, 1) * expWeight;
    score += expScore;
    maxScore += expWeight;

    // Region preference (15% weight)
    const regionWeight = 15;
    const regionScore = (requirements.region === 'All' || candidate.region === requirements.region) ? regionWeight : regionWeight * 0.5;
    score += regionScore;
    maxScore += regionWeight;

    // Rating and reliability (20% weight)
    const reliabilityWeight = 20;
    const reliabilityScore = (candidate.rating / 5) * reliabilityWeight;
    score += reliabilityScore;
    maxScore += reliabilityWeight;

    return Math.min((score / maxScore) * 100, 98);
  };

  const generateCompatibilityReasons = (candidate, requirements, matchScore) => {
    const reasons = [];
    
    const matchingTechs = requirements.skills.filter(skill => 
      candidate.technologies.includes(skill)
    );
    
    if (matchingTechs.length > 0) {
      reasons.push(`Expert in ${matchingTechs.slice(0, 3).join(', ')}`);
    }
    
    if (candidate.rating >= 4.8) {
      reasons.push('Exceptional client ratings (4.8+)');
    }
    
    if (candidate.completedProjects > 20) {
      reasons.push(`Proven track record (${candidate.completedProjects} projects)`);
    }
    
    if (candidate.clientSatisfaction > 95) {
      reasons.push(`High client satisfaction (${candidate.clientSatisfaction}%)`);
    }
    
    if (candidate.specializations.length > 0) {
      reasons.push(`Specialized in ${candidate.specializations[0]}`);
    }
    
    if (matchScore > 90) {
      reasons.push('Perfect skill-set alignment');
    }
    
    return reasons.slice(0, 4);
  };

  const findMatches = useCallback(async (requirements) => {
    setIsMatching(true);
    setMatchingProgress(0);
    setMatchResults([]);

    // Simulate AI processing stages
    const stages = [
      'Analyzing requirements',
      'Scanning candidate pool',
      'Running compatibility algorithms',
      'Calculating match scores',
      'Ranking candidates'
    ];

    for (let i = 0; i < stages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMatchingProgress((i + 1) / stages.length * 100);
    }

    // Filter and score candidates
    const scoredCandidates = mockCandidates
      .map(candidate => {
        const matchScore = calculateMatchScore(candidate, requirements);
        return {
          ...candidate,
          matchScore,
          compatibilityReasons: generateCompatibilityReasons(candidate, requirements, matchScore)
        };
      })
      .filter(candidate => {
        // Apply filters
        const regionMatch = requirements.region === 'All' || candidate.region === requirements.region;
        const skillMatch = requirements.skills.some(skill => candidate.technologies.includes(skill));
        return regionMatch && skillMatch && candidate.matchScore > 70;
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 6);

    await new Promise(resolve => setTimeout(resolve, 500));
    
    setMatchResults(scoredCandidates);
    setIsMatching(false);
    setMatchingProgress(100);

    return scoredCandidates;
  }, []);

  const resetMatching = () => {
    setIsMatching(false);
    setMatchResults([]);
    setMatchingProgress(0);
  };

  return {
    isMatching,
    matchResults,
    matchingProgress,
    findMatches,
    resetMatching
  };
};
