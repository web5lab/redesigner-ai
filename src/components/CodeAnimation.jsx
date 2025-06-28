import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import {
  Rocket, Code, Globe, Palette, Zap, CheckCircle, X, Activity,
  Layers, Package, TrendingUp, Users, Eye, LayoutGrid, ShieldCheck,
  Clock, Timer, Sparkles, Play, Pause,  Maximize, Minimize, Hourglass, // Added Hourglass
  RefreshCcw
} from 'lucide-react';

// CONSTANTS
const EXACTLY_TEN_MINUTES_MS = 10 * 60 * 1000;
const MS_PER_SECOND = 1000;

// Progress segments with expanded capabilities
const PHASES = [
  'discovery', 'strategy', 'design', 'development', 
  'optimization', 'testing', 'launch'
];

const PHASE_DETAILS = {
  discovery: {
    label: "Discovery",
    Icon: Eye,
    description: "Exploring brand identity and user needs",
    milestones: [
      "Analyzing market positioning...",
      "Mapping user journeys...",
      "Identifying core objectives...",
      "Collecting competitive insights..."
    ],
    color: "text-blue-400", 
    bgColor: "bg-blue-500",
    gradientFrom: "from-blue-500/30", 
    gradientTo: "to-indigo-950",
    duration: 90 // seconds
  },
  strategy: {
    label: "Strategy",
    Icon: LayoutGrid,
    description: "Planning the architectural foundation",
    milestones: [
      "Defining information architecture...",
      "Creating content strategy...",
      "Mapping user flows...",
      "Establishing success metrics..."
    ],
    color: "text-indigo-400", 
    bgColor: "bg-indigo-500",
    gradientFrom: "from-indigo-500/30", 
    gradientTo: "to-violet-950",
    duration: 80 // seconds
  },
  design: {
    label: "Design",
    Icon: Palette,
    description: "Crafting visual identity and interfaces",
    milestones: [
      "Developing design language...",
      "Creating UI component system...",
      "Designing key user interfaces...",
      "Refining visual hierarchy..."
    ],
    color: "text-violet-400", 
    bgColor: "bg-violet-500",
    gradientFrom: "from-violet-500/30", 
    gradientTo: "to-purple-950",
    duration: 100 // seconds
  },
  development: {
    label: "Development",
    Icon: Code,
    description: "Building the functional experience",
    milestones: [
      "Implementing frontend components...",
      "Developing core functionalities...",
      "Building responsive layouts...",
      "Integrating animations..."
    ],
    color: "text-emerald-400", 
    bgColor: "bg-emerald-500",
    gradientFrom: "from-emerald-500/30", 
    gradientTo: "to-teal-950",
    duration: 120 // seconds
  },
  optimization: {
    label: "Optimization",
    Icon: Zap,
    description: "Enhancing performance and experience",
    milestones: [
      "Optimizing load times...",
      "Improving resource efficiency...",
      "Enhancing interaction feedback...",
      "Reducing friction points..."
    ],
    color: "text-amber-400", 
    bgColor: "bg-amber-500",
    gradientFrom: "from-amber-500/30", 
    gradientTo: "to-orange-950",
    duration: 75 // seconds
  },
  testing: {
    label: "Testing",
    Icon: ShieldCheck,
    description: "Ensuring quality and compliance",
    milestones: [
      "Running cross-browser tests...",
      "Validating accessibility standards...",
      "Conducting user testing...",
      "Fixing identified issues..."
    ],
    color: "text-rose-400", 
    bgColor: "bg-rose-500",
    gradientFrom: "from-rose-500/30", 
    gradientTo: "to-pink-950",
    duration: 65 // seconds
  },
  launch: {
    label: "Launch",
    Icon: Rocket,
    description: "Deploying and celebrating",
    milestones: [
      "Finalizing deployment checklist...",
      "Moving to production servers...",
      "Monitoring initial performance...",
      "Celebrating our new presence!"
    ],
    color: "text-cyan-400", 
    bgColor: "bg-cyan-500", 
    gradientFrom: "from-cyan-500/30", 
    gradientTo: "to-blue-950",
    duration: 70 // seconds
  }
};

// Calculate total time to ensure phases add up to exactly 10 minutes
const totalPhaseDuration = Object.values(PHASE_DETAILS).reduce((acc, phase) => acc + phase.duration, 0);
const durationMultiplier = EXACTLY_TEN_MINUTES_MS / (totalPhaseDuration * MS_PER_SECOND);

// UTILITY FUNCTIONS
const formatTime = (ms) => {
  const totalSeconds = Math.max(0, Math.floor(ms / MS_PER_SECOND));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// COMPONENTS
const FloatingParticle = memo(({ style, colorClass }) => (
  <div
    className={`absolute rounded-full ${colorClass}`}
    style={{
      animation: `float-particle ${style.duration}s infinite ease-in-out`,
      animationDelay: style.delay,
      ...style
    }}
  />
));

const InteractiveBackground = memo(({ activePhase }) => {
  const particles = useMemo(() => {
    const phaseColor = PHASE_DETAILS[activePhase]?.bgColor || "bg-blue-500";
    const baseColors = [
      `${phaseColor}/10`,
      `${phaseColor}/15`,
      `${phaseColor}/20`,
      "bg-slate-700/10",
      "bg-slate-600/10"
    ];
    
    return Array(25).fill(0).map((_, i) => ({
      id: i,
      style: {
        width: `${Math.random() * 30 + 8}px`, 
        height: `${Math.random() * 30 + 8}px`, 
        left: `${Math.random() * 100}%`, 
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.6 + 0.2,
        duration: Math.random() * 20 + 15, // seconds for animation
        delay: `-${Math.random() * 15}s`, // animation delay
      },
      colorClass: baseColors[Math.floor(Math.random() * baseColors.length)],
    }));
  }, [activePhase]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map(p => (
        <FloatingParticle key={p.id} style={p.style} colorClass={p.colorClass} />
      ))}
    </div>
  );
});

const MilestoneItem = memo(({ milestone, isActive, isCompleted, index }) => (
  <div 
    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-500 ease-out ${
      isCompleted ? 'bg-slate-800/60 border-slate-700/50 text-slate-300' :
      isActive ? 'bg-slate-800/90 border-slate-600/80 text-white shadow-lg animate-pulse-subtle' :
      'bg-slate-800/30 border-slate-700/30 text-slate-500'
    }`}
    style={{
      transform: isActive || isCompleted ? 'translateY(0) scale(1)' : 'translateY(5px) scale(0.98)',
      opacity: isActive || isCompleted ? 1 : 0.7,
      transitionDelay: `${index * 100}ms`,
    }}
  >
    <div className="flex-shrink-0">
      {isCompleted ? (
        <CheckCircle className="w-4 h-4 text-green-400" />
      ) : isActive ? (
        <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
      ) : (
        <div className="w-4 h-4 rounded-full border border-slate-600" />
      )}
    </div>
    <span className={isCompleted || isActive ? "text-slate-200" : "text-slate-400"}>
      {milestone}
    </span>
  </div>
));

const PhaseIndicator = memo(({ phaseKey, isActive, isCompleted, isNext }) => {
  const phaseDatum = PHASE_DETAILS[phaseKey];
  
  return (
    <div 
      className={`relative flex-1 h-12 rounded-md flex flex-col items-center justify-center transition-all duration-500 p-1 ${
        isActive ? `${phaseDatum.bgColor} shadow-lg scale-110 z-10` : 
        isCompleted ? `${phaseDatum.bgColor}/70` : 
        isNext ? 'bg-slate-700/80' : 'bg-slate-800/40'
      }`}
      title={phaseDatum.label}
    >
      <phaseDatum.Icon 
        className={`w-5 h-5 mb-0.5 ${
          isActive ? 'text-white' : 
          isCompleted ? 'text-white/90' : 
          isNext ? 'text-slate-300' : 'text-slate-500'
        }`}
      />
      
      {isActive && (
        <div className="w-full h-0.5 mt-1 bg-white/60 animate-pulse" />
      )}
      
      {!isActive && !isCompleted && (
        <div className="w-full h-0.5 mt-1 bg-slate-600/50" />  
      )}
      
      {isCompleted && (
        <div className="w-full h-0.5 mt-1 bg-white/40" />
      )}
      
      {isCompleted && (
        <div className="absolute top-1 right-1">
          <CheckCircle className="w-3 h-3 text-white" />
        </div>
      )}
    </div>
  );
});

const StatCard = memo(({ icon: StatIcon, label, value, unit, color, animate }) => (
  <div 
    className={`flex flex-col items-center p-3 bg-slate-800/70 backdrop-blur-sm rounded-lg border border-slate-700/50 hover:bg-slate-700/60 transition-all duration-300 ${
      animate ? 'animate-stat-update' : ''
    }`}
  >
    <StatIcon className={`w-6 h-6 ${color} mb-1`} />
    <span className="text-slate-100 text-base font-semibold">{value}{unit}</span>
    <span className="text-xs text-slate-400 text-center">{label}</span>
  </div>
));

const ControlPanel = memo(({ isRunning, onPlayPause, onReset, onSpeedChange, speedFactor }) => (
  <div className="flex items-center justify-center space-x-3 p-2 bg-slate-800/80 backdrop-blur-md rounded-lg border border-slate-700/50">
    <button 
      onClick={onPlayPause}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
      aria-label={isRunning ? "Pause" : "Play"}
    >
      {isRunning ? <Pause className="w-4 h-4 text-slate-200" /> : <Play className="w-4 h-4 text-slate-200" />}
    </button>
    
    <button 
      onClick={onReset}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
      aria-label="Reset"
    >
      <RefreshCcw className="w-4 h-4 text-slate-200" />
    </button>
    
    <div className="flex items-center space-x-2">
      <button 
        onClick={() => onSpeedChange(0.5)}
        className={`px-2 py-1 text-xs rounded ${speedFactor === 0.5 ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
      >
        0.5x
      </button>
      <button 
        onClick={() => onSpeedChange(1)}
        className={`px-2 py-1 text-xs rounded ${speedFactor === 1 ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
      >
        1x
      </button>
      <button 
        onClick={() => onSpeedChange(2)}
        className={`px-2 py-1 text-xs rounded ${speedFactor === 2 ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
      >
        2x
      </button>
    </div>
  </div>
));

// MAIN COMPONENT
const InteractiveTenMinuteProcess = ({ onClose, onComplete }) => {
  // Core state
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [elapsedTimeMs, setElapsedTimeMs] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [speedFactor, setSpeedFactor] = useState(1);
  const [isExiting, setIsExiting] = useState(false);
  const [showTips, setShowTips] = useState(false); // Set to true to show tips by default
  const [currentPhaseKey, setCurrentPhaseKey] = useState(PHASES[0]);
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const [currentPhaseTimeMs, setCurrentPhaseTimeMs] = useState(0);
  const [completedMilestones, setCompletedMilestones] = useState([]);
  const [completedPhases, setCompletedPhases] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showCompletionEffect, setShowCompletionEffect] = useState(false);
  
  // Derived state
  const currentPhaseData = PHASE_DETAILS[currentPhaseKey];
  const currentPhaseIndex = PHASES.indexOf(currentPhaseKey);
  const nextPhaseKey = PHASES[currentPhaseIndex + 1];
  const currentPhaseDurationMs = currentPhaseData.duration * MS_PER_SECOND * durationMultiplier;
  const milestonesInCurrentPhase = currentPhaseData.milestones;
  const milestoneTimeMs = currentPhaseDurationMs / (milestonesInCurrentPhase.length || 1); // Avoid division by zero
  
  // Progress calculations
  const overallProgressPercent = (elapsedTimeMs / EXACTLY_TEN_MINUTES_MS) * 100;
  const currentPhaseProgressPercent = currentPhaseDurationMs > 0 ? (currentPhaseTimeMs / currentPhaseDurationMs) * 100 : 0;
  const timeRemainingMs = EXACTLY_TEN_MINUTES_MS - elapsedTimeMs;

  // Calculate stats based on progress
  const stats = {
    components: Math.floor(overallProgressPercent * 0.9) + 5,
    uxScore: Math.min(Math.floor(overallProgressPercent * 0.8) + 20, 100),
    iterations: Math.floor(overallProgressPercent * 0.25) + 2
  };
  
  // Main timer effect
  useEffect(() => {
    if (!isRunning || isComplete) return;
    
    const interval = setInterval(() => {
      setElapsedTimeMs(prev => {
        const increment = (MS_PER_SECOND / 4) * speedFactor; // Update 4 times per second
        const newTime = prev + increment;
        
        if (newTime >= EXACTLY_TEN_MINUTES_MS) {
          // clearInterval(interval); // Will be cleared by isComplete changing
          return EXACTLY_TEN_MINUTES_MS;
        }
        return newTime;
      });
      
      setCurrentPhaseTimeMs(prev => prev + ((MS_PER_SECOND / 4) * speedFactor));
    }, 250); // Update 4 times per second
    
    return () => clearInterval(interval);
  }, [isRunning, speedFactor, isComplete]);
  
  // Phase progression logic & Completion logic
  useEffect(() => {
    if (elapsedTimeMs >= EXACTLY_TEN_MINUTES_MS && !isComplete) {
      setIsRunning(false);
      setIsComplete(true);
      setCurrentPhaseKey(PHASES[PHASES.length -1]); // Ensure last phase is active
      setCompletedPhases(PHASES); // Mark all phases as completed
      setCompletedMilestones( // Mark all milestones of all phases as completed
        PHASES.flatMap(phaseKey => 
          PHASE_DETAILS[phaseKey].milestones.map((_, index) => `${phaseKey}-${index}`)
        )
      );
      
      setShowCompletionEffect(true); // Show completion effect immediately
      
      if (onComplete) {
        setTimeout(() => {
          onComplete();
        }, 3000); // Call onComplete after a delay for the effect
      }
    }
  }, [elapsedTimeMs, isComplete, onComplete]);
  
  // Milestone progression logic
  useEffect(() => {
    if (!isRunning || isComplete || !milestonesInCurrentPhase.length) return;
    
    // Check if we need to move to the next milestone
    // activeMilestoneIndex is 0-based
    const nextMilestoneTriggerTime = (activeMilestoneIndex + 1) * milestoneTimeMs;

    if (currentPhaseTimeMs >= nextMilestoneTriggerTime && activeMilestoneIndex < milestonesInCurrentPhase.length -1 ) {
      setCompletedMilestones(prev => [...prev, `${currentPhaseKey}-${activeMilestoneIndex}`]);
      setActiveMilestoneIndex(prev => prev + 1);
    }
    
    // Check if we need to move to the next phase
    if (currentPhaseTimeMs >= currentPhaseDurationMs && currentPhaseIndex < PHASES.length - 1) {
      // Complete current milestone if not already
      if (!completedMilestones.includes(`${currentPhaseKey}-${activeMilestoneIndex}`)) {
         setCompletedMilestones(prev => [...prev, `${currentPhaseKey}-${activeMilestoneIndex}`]);
      }
      // Complete all milestones in the current phase
       const allMilestonesOfCurrentPhase = milestonesInCurrentPhase
        .map((_, i) => `${currentPhaseKey}-${i}`)
        .filter(id => !completedMilestones.includes(id)); // Filter what's already added this tick

      setCompletedMilestones(prev => {
        const newCompleted = new Set([...prev, ...allMilestonesOfCurrentPhase]);
        return Array.from(newCompleted);
      });

      setCompletedPhases(prev => [...prev, currentPhaseKey]);
      
      // Move to next phase
      setCurrentPhaseKey(nextPhaseKey);
      setActiveMilestoneIndex(0);
      setCurrentPhaseTimeMs(0); // Reset phase timer for the new phase
    } else if (currentPhaseTimeMs >= currentPhaseDurationMs && currentPhaseIndex === PHASES.length - 1 && activeMilestoneIndex < milestonesInCurrentPhase.length -1) {
       // If it's the last phase and time is up for this phase, complete remaining milestones of this phase
        setCompletedMilestones(prev => {
            const remaining = milestonesInCurrentPhase
                .map((_, i) => `${currentPhaseKey}-${i}`)
                .filter(id => !prev.includes(id));
            return [...prev, ...remaining];
        });
        setActiveMilestoneIndex(milestonesInCurrentPhase.length -1); // Go to last milestone
    }

  }, [
    currentPhaseTimeMs, activeMilestoneIndex, milestoneTimeMs, 
    milestonesInCurrentPhase.length, currentPhaseKey, currentPhaseDurationMs, 
    currentPhaseIndex, isRunning, isComplete, nextPhaseKey, 
    completedMilestones, milestonesInCurrentPhase
  ]);
  
  // Handle playback controls
  const handlePlayPause = useCallback(() => {
    if (isComplete) return; // Don't allow play/pause if complete
    setIsRunning(prev => !prev);
  }, [isComplete]);
  
  const handleReset = useCallback(() => {
    setElapsedTimeMs(0);
    setCurrentPhaseTimeMs(0);
    setCurrentPhaseKey(PHASES[0]);
    setActiveMilestoneIndex(0);
    setCompletedMilestones([]);
    setCompletedPhases([]);
    setIsComplete(false);
    setShowCompletionEffect(false);
    setIsRunning(true); // Start running on reset
    setSpeedFactor(1); // Reset speed
  }, []);
  
  const handleSpeedChange = useCallback((factor) => {
    setSpeedFactor(factor);
  }, []);
  
  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 600); // Match animation duration
  }, [onClose]);
  
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);
  
  const toggleTips = useCallback(() => { // Added for completeness, if you want a button for it
    setShowTips(prev => !prev);
  }, []);
  
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-all duration-500
        ${isExiting ? 'opacity-0' : 'opacity-100 animate-fadeIn'}
        ${isFullscreen ? 'bg-black' : 'bg-slate-950/80 backdrop-blur-xl'}`}
    >
      <InteractiveBackground activePhase={currentPhaseKey} />
      
      <div 
        className={`relative bg-slate-900/80 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl transition-all duration-500 flex flex-col
          ${isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-5xl h-[90vh] sm:h-[85vh] max-h-[800px]'}
          ${isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <div className="relative h-1.5 w-full bg-slate-800 overflow-hidden">
          <div 
            className={`h-full ${isComplete ? 'bg-cyan-500' : currentPhaseData.bgColor} transition-all duration-300`}
            style={{ width: `${overallProgressPercent}%` }}
          />
        </div>
        
        <div className="absolute top-3 right-3 z-40 flex space-x-2">
          {/* <button // Example button to toggle tips
            onClick={toggleTips}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-all"
          >
            ?
          </button> */}
          <button
            onClick={toggleFullscreen}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-all"
            aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? 
              <Minimize className="w-4 h-4" /> : 
              <Maximize className="w-4 h-4" />
            }
          </button>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/80 text-slate-400 hover:bg-rose-900/80 hover:text-rose-200 transition-all"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
          <div 
            className={`relative md:w-1/3 p-4 sm:p-6 flex flex-col transition-all duration-700 ease-out
              bg-gradient-to-br ${currentPhaseData.gradientFrom} ${currentPhaseData.gradientTo}`}
          >
            <div className="mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Design Process</h1>
              <div className="flex items-center text-xs sm:text-sm text-slate-300">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-blue-400"/> 
                <span>Exactly 10:00 minutes</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center mb-4 sm:mb-6 flex-grow">
              <div className="mb-4 sm:mb-6 relative">
                <div className={`absolute -inset-4 sm:-inset-6 rounded-full ${currentPhaseData.bgColor} opacity-20 animate-pulse-slow`}></div>
                <currentPhaseData.Icon className={`w-16 h-16 sm:w-24 sm:h-24 ${currentPhaseData.color}`} />
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {currentPhaseData.label}
              </h2>
              <p className={`text-sm sm:text-base ${currentPhaseData.color} px-2`}>
                {currentPhaseData.description}
              </p>
              
              <div className="mt-4 sm:mt-6 text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  {Math.round(isComplete ? 100 : currentPhaseProgressPercent)}%
                </div>
                <p className="text-xs sm:text-sm text-slate-300">Phase Progress</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="bg-slate-800/60 rounded-lg p-2 sm:p-3 flex flex-col items-center">
                <Timer className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mb-1" />
                <span className="text-base sm:text-lg font-mono font-semibold text-white">{formatTime(elapsedTimeMs)}</span>
                <span className="text-xs text-slate-400">Elapsed</span>
              </div>
              <div className="bg-slate-800/60 rounded-lg p-2 sm:p-3 flex flex-col items-center">
                <Hourglass className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mb-1" />
                <span className="text-base sm:text-lg font-mono font-semibold text-white">{formatTime(timeRemainingMs)}</span>
                <span className="text-xs text-slate-400">Remaining</span>
              </div>
            </div>
            
            <ControlPanel 
              isRunning={isRunning}
              onPlayPause={handlePlayPause}
              onReset={handleReset}
              onSpeedChange={handleSpeedChange}
              speedFactor={speedFactor}
            />
          </div>
          
          <div className="md:w-2/3 p-4 sm:p-6 flex flex-col overflow-hidden bg-slate-900"> {/* Added bg for consistent panel color */}
            <div className="flex justify-between space-x-1 mb-4 sm:mb-6">
              {PHASES.map((phaseKey) => (
                <PhaseIndicator 
                  key={phaseKey}
                  phaseKey={phaseKey}
                  isActive={phaseKey === currentPhaseKey && !isComplete}
                  isCompleted={completedPhases.includes(phaseKey) || (isComplete && phaseKey === currentPhaseKey)}
                  isNext={phaseKey === nextPhaseKey && !isComplete}
                />
              ))}
            </div>
            
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-grow overflow-y-auto pr-2 custom-scrollbar">
              <h3 className="text-base sm:text-lg font-medium text-white mb-2">Current Tasks</h3>
              {milestonesInCurrentPhase.map((milestone, index) => {
                const milestoneId = `${currentPhaseKey}-${index}`;
                const isCompleted = completedMilestones.includes(milestoneId) || (isComplete && currentPhaseKey === PHASES[PHASES.length -1]);
                const isActive = index === activeMilestoneIndex && !isCompleted && !isComplete;
                
                return (
                  <MilestoneItem 
                    key={milestoneId}
                    milestone={milestone}
                    isActive={isActive}
                    isCompleted={isCompleted}
                    index={index}
                  />
                );
              })}
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">Project Metrics</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <StatCard 
                  icon={Package} 
                  label="Components" 
                  value={stats.components} 
                  unit="" 
                  color="text-blue-400"
                  animate={!isComplete && elapsedTimeMs % 5000 < 250 && elapsedTimeMs > 0}
                />
                <StatCard 
                  icon={Users} 
                  label="UX Score" 
                  value={stats.uxScore} 
                  unit="%" 
                  color="text-purple-400"
                  animate={!isComplete && elapsedTimeMs % 7000 < 250 && elapsedTimeMs > 0}
                />
                <StatCard 
                  icon={TrendingUp} 
                  label="Iterations" 
                  value={stats.iterations} 
                  unit="" 
                  color="text-emerald-400"
                  animate={!isComplete && elapsedTimeMs % 9000 < 250 && elapsedTimeMs > 0}
                />
              </div>
            </div>
          </div>
        </div>
        
        {showCompletionEffect && (
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/30 via-slate-900/70 to-blue-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 animate-fadeIn">
            <div className="relative p-6 bg-slate-800/50 rounded-xl shadow-2xl">
                <div className="absolute -inset-2 sm:-inset-4 bg-cyan-500/30 rounded-full animate-pulse-slow -z-10"></div>
                <Rocket className="w-20 h-20 sm:w-28 sm:h-28 text-cyan-400 animate-float" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6 mb-2">Project Complete!</h2>
            <p className="text-lg sm:text-xl text-cyan-200 mb-6 text-center px-4">Your new experience is ready to launch.</p>
            <div className="flex space-x-4">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300 animate-spin-slow" />
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300 animate-pulse" />
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300 animate-spin-slow" style={{animationDirection: 'reverse'}} />
            </div>
          </div>
        )}
      </div>
      
      {showTips && (
        <div className="absolute bottom-4 left-4 max-w-xs bg-slate-800/90 p-4 rounded-lg border border-slate-700 text-sm text-slate-300 shadow-xl animate-fadeIn">
          <h4 className="font-medium text-white mb-2">Interaction Tips</h4>
          <ul className="space-y-1 list-disc list-inside text-slate-400">
            <li>Use play/pause to control the animation.</li>
            <li>Adjust speed with 0.5x, 1x, 2x buttons.</li>
            <li>Toggle fullscreen for an immersive view.</li>
            <li>Press 'Reset' to start over.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default InteractiveTenMinuteProcess;