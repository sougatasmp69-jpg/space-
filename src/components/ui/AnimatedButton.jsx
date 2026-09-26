import React, { useState, useRef, useCallback } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ANIMATION_CONFIG } from '../../config/animationConfig';
import { soundEngine } from '../../utils/soundEngine';

/**
 * Reusable GPU-accelerated AnimatedButton component.
 * Features:
 * - Magnetic hover cursor pull
 * - Material-design coordinate-aware ripple
 * - Radial particle burst on click
 * - Severity pulse/shake animations
 * - Continuous icon spin while transitioning
 * - Reduced-motion accessibility compliance
 */
export default function AnimatedButton({
  children,
  onClick,
  className = '',
  style = {},
  variant = 'glass', // 'primary' | 'secondary' | 'glass' | 'deep' | 'galaxy' | 'danger' | 'pill' | 'icon' | 'severity'
  severity = null, // 'low' | 'medium' | 'high' | 'critical' | 'extreme'
  isActive = false,
  disabled = false,
  magnetic = true,
  enableRipple = true,
  enableParticles = false,
  radialBurst = false, // Emits a large expanding circular shockwave (for galaxy view)
  spinIcon = false,
  playSound = true,
  soundType = 'click', // 'click' | 'planet' | 'flyto'
  title = '',
  ariaLabel = '',
  type = 'button',
  ...props
}) {
  const buttonRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Magnetic state
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Ripples state
  const [ripples, setRipples] = useState([]);

  // Particles state
  const [particles, setParticles] = useState([]);

  // Radial burst state (shockwave)
  const [bursts, setBursts] = useState([]);

  // Severity shake trigger
  const [isShaking, setIsShaking] = useState(false);

  // Handle magnetic cursor pull
  const handleMouseMove = useCallback((e) => {
    if (disabled || shouldReduceMotion || !magnetic || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) * ANIMATION_CONFIG.button.magneticStrength;
    const dy = (e.clientY - centerY) * ANIMATION_CONFIG.button.magneticStrength;

    // Constrain max translation
    const max = ANIMATION_CONFIG.button.magneticRadius;
    const clampedX = Math.max(-max, Math.min(max, dx));
    const clampedY = Math.max(-max, Math.min(max, dy));

    setPosition({ x: clampedX, y: clampedY });
  }, [disabled, shouldReduceMotion, magnetic]);

  const handleMouseLeave = useCallback(() => {
    if (magnetic) {
      setPosition({ x: 0, y: 0 });
    }
  }, [magnetic]);

  // Trigger Material Ripple at exact click coordinates
  const triggerRipple = useCallback((e) => {
    if (!enableRipple || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size
    };

    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, ANIMATION_CONFIG.ripple.duration * 1000 + 50);
  }, [enableRipple]);

  // Trigger Particle Burst
  const triggerParticles = useCallback((e) => {
    if (shouldReduceMotion || (!enableParticles && !radialBurst) || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const originX = e ? e.clientX - rect.left : rect.width / 2;
    const originY = e ? e.clientY - rect.top : rect.height / 2;

    const count = radialBurst ? 16 : ANIMATION_CONFIG.particles.count;
    const newParticles = Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const dist = radialBurst
        ? 35 + Math.random() * 45
        : ANIMATION_CONFIG.particles.minDistance +
          Math.random() * (ANIMATION_CONFIG.particles.maxDistance - ANIMATION_CONFIG.particles.minDistance);
      const size = ANIMATION_CONFIG.particles.minSize + Math.random() * (ANIMATION_CONFIG.particles.maxSize - ANIMATION_CONFIG.particles.minSize);
      const color = ANIMATION_CONFIG.particles.colors[Math.floor(Math.random() * ANIMATION_CONFIG.particles.colors.length)];

      return {
        id: Date.now() + i + Math.random(),
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        originX,
        originY,
        size,
        color
      };
    });

    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, ANIMATION_CONFIG.particles.duration * 1000 + 50);
  }, [shouldReduceMotion, enableParticles, radialBurst]);

  // Trigger Radial Burst Shockwave
  const triggerRadialBurst = useCallback(() => {
    if (!radialBurst || shouldReduceMotion) return;
    const newBurstId = Date.now() + Math.random();
    setBursts((prev) => [...prev, newBurstId]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((id) => id !== newBurstId));
    }, ANIMATION_CONFIG.galaxyView.radialBurstDuration * 1000);
  }, [radialBurst, shouldReduceMotion]);

  // Handle Main Click Event
  const handleClick = (e) => {
    if (disabled) return;

    // Audio feedback
    if (playSound) {
      if (soundType === 'planet') {
        soundEngine.playPlanetSelectTone(528);
      } else if (soundType === 'flyto') {
        soundEngine.playFlyToSound();
      } else {
        soundEngine.playUiClick();
      }
    }

    // Ripple
    triggerRipple(e);

    // Particles & Radial Burst
    triggerParticles(e);
    triggerRadialBurst();

    // Severity shake / pulse
    if (severity && ANIMATION_CONFIG.severity[severity]) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), (ANIMATION_CONFIG.severity[severity].duration || 0.4) * 1000);
    }

    if (onClick) {
      onClick(e);
    }
  };

  // Severity config lookup
  const severityCfg = severity ? ANIMATION_CONFIG.severity[severity.toLowerCase()] : null;

  // Variant styling presets
  const variantStyles = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/30 border-cyan-400',
    secondary: 'glass-panel text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-400',
    glass: 'glass-panel text-slate-300 border-slate-700 hover:text-white hover:bg-slate-800/80',
    deep: 'glass-panel-deep text-slate-200 border-slate-800 hover:border-slate-700',
    galaxy: isActive
      ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white border-purple-400 shadow-xl shadow-purple-500/40 ring-1 ring-purple-300 font-bold'
      : 'glass-panel text-purple-300 border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-400',
    danger: 'bg-rose-500/20 border-rose-500/40 text-rose-300 hover:bg-rose-500/30 hover:border-rose-400 shadow-md shadow-rose-950/40',
    pill: isActive
      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/30 border-cyan-400'
      : 'glass-panel text-slate-400 hover:text-white border-slate-800 hover:bg-slate-800/60',
    icon: 'glass-panel p-2.5 rounded-xl text-slate-300 hover:text-white border-slate-700 hover:bg-slate-800/80',
    severity: severityCfg
      ? `border text-xs font-mono font-bold uppercase transition-all`
      : 'glass-panel text-slate-300 border-slate-700'
  };

  // Base motion animations
  const hoverAnimation = shouldReduceMotion || disabled
    ? {}
    : {
        scale: ANIMATION_CONFIG.button.hoverScale,
        transition: ANIMATION_CONFIG.button.hoverTransition
      };

  const tapAnimation = shouldReduceMotion || disabled
    ? {}
    : {
        scale: ANIMATION_CONFIG.button.tapScale,
        transition: ANIMATION_CONFIG.button.tapTransition
      };

  const shakeAnimation = isShaking && severityCfg && !shouldReduceMotion
    ? {
        x: severityCfg.shakeX,
        boxShadow: severityCfg.glow,
        transition: { duration: severityCfg.duration, ease: 'easeInOut' }
      }
    : {};

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      title={title}
      aria-label={ariaLabel || title}
      disabled={disabled}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
        ...shakeAnimation
      }}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      className={`relative inline-flex items-center justify-center select-none overflow-hidden transition-colors ${
        disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
      } ${variantStyles[variant] || ''} ${className}`}
      style={{
        ...style,
        ...(severity && severityCfg && variant === 'severity'
          ? {
              backgroundColor: `${severityCfg.color}18`,
              borderColor: isShaking ? severityCfg.color : `${severityCfg.color}50`,
              color: severityCfg.color,
              boxShadow: isShaking ? severityCfg.glow : undefined
            }
          : {})
      }}
      {...props}
    >
      {/* Radial Burst Shockwave (Galaxy view) */}
      <AnimatePresence>
        {bursts.map((burstId) => (
          <motion.span
            key={burstId}
            initial={{ scale: 0.2, opacity: 0.9 }}
            animate={{ scale: 3.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ANIMATION_CONFIG.galaxyView.radialBurstDuration, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border-2 border-purple-400 pointer-events-none -z-10"
            style={{
              boxShadow: '0 0 30px rgba(168, 85, 247, 0.8), inset 0 0 15px rgba(147, 51, 234, 0.6)'
            }}
          />
        ))}
      </AnimatePresence>

      {/* Coordinate-Aware Material Ripples */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.65 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: ANIMATION_CONFIG.ripple.duration, ease: [0.1, 0.8, 0.3, 1] }}
          className="absolute rounded-full pointer-events-none -z-10"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: ANIMATION_CONFIG.ripple.color,
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)'
          }}
        />
      ))}

      {/* Radial Particle Bursts */}
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          initial={{
            x: particle.originX,
            y: particle.originY,
            scale: 1,
            opacity: 1
          }}
          animate={{
            x: particle.originX + particle.x,
            y: particle.originY + particle.y,
            scale: 0,
            opacity: 0
          }}
          transition={{ duration: ANIMATION_CONFIG.particles.duration, ease: 'easeOut' }}
          className="absolute rounded-full pointer-events-none z-20"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 8px ${particle.color}`
          }}
        />
      ))}

      {/* Button Content with Optional Spinning Icon container */}
      <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">
        {React.Children.map(children, (child) => {
          if (spinIcon && React.isValidElement(child) && !shouldReduceMotion) {
            return (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: ANIMATION_CONFIG.galaxyView.iconSpinDuration,
                  ease: 'linear'
                }}
                className="inline-flex items-center justify-center"
              >
                {child}
              </motion.span>
            );
          }
          return child;
        })}
      </span>
    </motion.button>
  );
}
