import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import SolarSystemCanvas from './components/3d/SolarSystemCanvas';
import NavigationBar from './components/ui/NavigationBar';
import PlanetSelectorPills from './components/ui/PlanetSelectorPills';
import PlanetTooltip from './components/ui/PlanetTooltip';
import LoadingScreen from './components/ui/LoadingScreen';
import PlanetDetailDrawer from './components/panels/PlanetDetailDrawer';
import { SOLAR_SYSTEM_DATA } from './data/solarSystemData';
import { soundEngine } from './utils/soundEngine';
import { ANIMATION_CONFIG } from './config/animationConfig';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlanetId, setSelectedPlanetId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isGalaxyView, setIsGalaxyView] = useState(false);
  const [isGalaxyZooming, setIsGalaxyZooming] = useState(false);
  const [orbitSpeedFactor, setOrbitSpeedFactor] = useState(1);
  const [showOrbits, setShowOrbits] = useState(true);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isTouring, setIsTouring] = useState(false);
  const [tooltipState, setTooltipState] = useState({ isVisible: false });

  const tourIntervalRef = useRef(null);
  const zoomingTimeoutRef = useRef(null);

  // Handle Planet Selection
  const handleSelectPlanet = (planetId) => {
    if (isTouring && planetId) {
      setIsTouring(false);
      clearInterval(tourIntervalRef.current);
    }

    if (planetId) {
      setIsGalaxyView(false);
      setSelectedPlanetId(planetId);
      setIsDrawerOpen(true);
    } else {
      setSelectedPlanetId(null);
      setIsDrawerOpen(false);
    }
  };

  // Toggle Galaxy View Mode
  const handleToggleGalaxyView = () => {
    soundEngine.playUiClick();
    setIsGalaxyZooming(true);
    clearTimeout(zoomingTimeoutRef.current);
    zoomingTimeoutRef.current = setTimeout(() => {
      setIsGalaxyZooming(false);
    }, ANIMATION_CONFIG.galaxyView.zoomDuration * 1000);

    if (!isGalaxyView) {
      setSelectedPlanetId(null);
      setIsDrawerOpen(false);
      if (isTouring) {
        setIsTouring(false);
        clearInterval(tourIntervalRef.current);
      }
      setIsGalaxyView(true);
    } else {
      setIsGalaxyView(false);
    }
  };

  // Close Drawer & Reset Camera View
  const handleCloseDrawer = () => {
    setSelectedPlanetId(null);
    setIsDrawerOpen(false);
  };

  // Audio Toggle
  const handleToggleAudio = () => {
    const newMuted = soundEngine.toggleMute();
    setIsAudioMuted(newMuted);
  };

  // Orbit Speed Toggle
  const handleChangeOrbitSpeed = (speed) => {
    setOrbitSpeedFactor(speed);
  };

  // Orbit Lines Visibility
  const handleToggleOrbits = () => {
    soundEngine.playUiClick();
    setShowOrbits(prev => !prev);
  };

  // Cinematic Tour Mode
  const handleToggleTour = () => {
    soundEngine.playUiClick();
    if (isTouring) {
      setIsTouring(false);
      clearInterval(tourIntervalRef.current);
      handleCloseDrawer();
    } else {
      setIsGalaxyView(false);
      setIsTouring(true);
      const tourOrder = ['earth', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'mercury', 'sun'];
      let tourIdx = 0;

      handleSelectPlanet(tourOrder[tourIdx]);

      tourIntervalRef.current = setInterval(() => {
        tourIdx = (tourIdx + 1) % tourOrder.length;
        handleSelectPlanet(tourOrder[tourIdx]);
      }, 7500);
    }
  };

  // Keyboard Shortcuts (ESC to close drawer / exit galaxy view)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isDrawerOpen) {
          handleCloseDrawer();
        } else if (isGalaxyView) {
          setIsGalaxyView(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, isGalaxyView]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      clearInterval(tourIntervalRef.current);
      clearTimeout(zoomingTimeoutRef.current);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#030712] select-none">
      {/* 1. Initial Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* 2. Top HUD Navigation */}
      <NavigationBar
        selectedPlanetId={selectedPlanetId}
        onSelectPlanet={handleSelectPlanet}
        orbitSpeedFactor={orbitSpeedFactor}
        onChangeOrbitSpeed={handleChangeOrbitSpeed}
        showOrbits={showOrbits}
        onToggleOrbits={handleToggleOrbits}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
        isTouring={isTouring}
        onToggleTour={handleToggleTour}
        isGalaxyView={isGalaxyView}
        onToggleGalaxyView={handleToggleGalaxyView}
        isGalaxyZooming={isGalaxyZooming}
      />

      {/* 3. 3D Solar System & Galaxy Canvas */}
      <SolarSystemCanvas
        selectedPlanetId={selectedPlanetId}
        onSelectPlanet={handleSelectPlanet}
        onHoverPlanet={setTooltipState}
        orbitSpeedFactor={orbitSpeedFactor}
        showOrbits={showOrbits}
        isDrawerOpen={isDrawerOpen}
        isGalaxyView={isGalaxyView}
      />

      {/* 4. 3D Projected Hover Tooltip */}
      <PlanetTooltip tooltipState={tooltipState} isDrawerOpen={isDrawerOpen} />

      {/* 5. Bottom Planet Selector Dock */}
      <PlanetSelectorPills
        selectedPlanetId={selectedPlanetId}
        onSelectPlanet={handleSelectPlanet}
        isGalaxyView={isGalaxyView}
        onToggleGalaxyView={handleToggleGalaxyView}
        isGalaxyZooming={isGalaxyZooming}
      />

      {/* 6. Planet Detail & Environmental Story Drawer */}
      <PlanetDetailDrawer
        selectedPlanetId={selectedPlanetId}
        onClose={handleCloseDrawer}
        isOpen={isDrawerOpen}
      />
    </div>
  );
}
