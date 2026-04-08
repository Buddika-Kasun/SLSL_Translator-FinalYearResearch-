"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hand,
  HandMetal,
  HandHeart,
  Handshake,
  HandPlatter,
  Fingerprint,
  MoveRight,
  MoveLeft,
  Waves,
} from "lucide-react";

// Different hand gesture icons to cycle through
const handIcons = [
  Hand,
  HandMetal,
  HandHeart,
  Handshake,
  HandPlatter,
  Fingerprint,
];

// Alternative: Using hand icons with different orientations
const handGestures = [
  { Icon: Hand, rotate: 0 }, // Open hand
  { Icon: HandMetal, rotate: -10 }, // Peace sign
  { Icon: HandHeart, rotate: 10 }, // Heart hand
  { Icon: Handshake, rotate: -5 }, // Shaking hand
  { Icon: HandPlatter, rotate: 15 }, // Offering hand
  { Icon: Hand, rotate: 20 }, // Open hand angled
  { Icon: HandMetal, rotate: -15 }, // Peace sign angled
];

// Or use a custom SVG animation for more fluid motion
const HandWaveSVG = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-primary"
  >
    <motion.path
      d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"
      animate={{ x: [0, 2, 0, -2, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path
      d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"
      animate={{ x: [0, -2, 0, 2, 0] }}
      transition={{ duration: 2.5, repeat: Infinity }}
    />
    <motion.path
      d="M10 9.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"
      animate={{ rotate: [0, 10, 0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <path d="M8 15v3a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4" />
    <path d="M12 12v4" />
  </svg>
);

export function AnimatedHandIcon() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle through icons
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % handGestures.length);
    }, 800); // Change every 800ms

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = handGestures[currentIndex].Icon;
  const rotate = handGestures[currentIndex].rotate;

  return (
    <div className="relative inline-flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: rotate,
            y: [0, -2, 0, 2, 0],
          }}
          exit={{ opacity: 0.3, scale: 0.7, rotate: 30 }}
          transition={{
            duration: 0.8,
            y: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          className="inline-block"
        >
          <CurrentIcon className="h-6 w-6 text-primary" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
