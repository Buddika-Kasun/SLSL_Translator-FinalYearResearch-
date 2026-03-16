"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Layers,
  Hand,
  Eye,
  Brain,
  Split,
  Merge,
  ArrowRight,
  Smartphone,
  Camera,
  Zap,
  Cpu,
  Database,
  Download,
  Play,
  Video,
  Repeat,
  Globe,
  CircuitBoard,
  Gauge,
  ChevronRight,
  MoveRight,
  ArrowDown,
} from "lucide-react";
import type { Variants } from "framer-motion";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

const cardVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0, y: 20 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  hover: {
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
};

const flowLineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.5,
      ease: "easeInOut",
    },
  },
};

const pulseVariants: Variants = {
  initial: { scale: 1, opacity: 0.5 },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const nodeVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
};

const arrowVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

export function Architecture() {
  const phases = [
    {
      title: "Phase 1: Data Collection",
      description: "Video capture and landmark extraction",
      icon: Camera,
      color: "blue",
      items: [
        "50 medical sentences × 2 signers × 2 reps = 100+ videos",
        "MediaPipe Holistic extracts 468 landmarks per frame",
        "90 frames per video (3 seconds at 30fps)",
        "Total: 42,120 features per video",
      ],
    },
    {
      title: "Phase 2: Model Training",
      description: "Multi-modal deep learning",
      icon: Brain,
      color: "purple",
      items: [
        "Multi-modal architecture (hand + pose + lip)",
        "Bi-LSTM for temporal modeling",
        "225,000 trainable parameters",
        "TFLite conversion with quantization",
      ],
    },
    {
      title: "Phase 3: Mobile Deployment",
      description: "Real-time on-device inference",
      icon: Smartphone,
      color: "green",
      items: [
        "8.2 MB TFLite model",
        "<120ms inference time",
        "60-frame buffer for continuous signing",
        "Offline-first design",
      ],
    },
  ];

  const streams = [
    {
      name: "Hand Stream",
      icon: Hand,
      color: "blue",
      features: "84 (left) + 84 (right) = 168",
      layers: "Conv1D(64) → Conv1D(128) → Dense(64)",
      delay: 0.1,
    },
    {
      name: "Pose Stream",
      icon: Eye,
      color: "green",
      features: "100 (25 points × 4)",
      layers: "Conv1D(32) → Dense(32)",
      delay: 0.2,
    },
    {
      name: "Lip Stream",
      icon: Brain,
      color: "purple",
      features: "200 (50 points × 4)",
      layers: "Conv1D(64) → LSTM(64) → LSTM(32)",
      delay: 0.3,
    },
  ];

  return (
    <section
      id="architecture"
      className="relative py-8 overflow-hidden w-full bg-gradient-to-b from-background via-background to-primary/5"
    >
      {/* Circuit board background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_0.5px,transparent_0.5px)] bg-[size:20px_20px] opacity-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:40px_40px] opacity-5" />

        {/* Glowing orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-block p-3 bg-primary/10 rounded-2xl mb-4"
          >
            <CircuitBoard className="h-8 w-8 text-primary" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            System{" "}
            <span className="text-primary relative">
              Architecture
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full origin-left"
              />
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A complete three-phase pipeline with circuit-style flow diagram
            showing data transformation from raw video to Sinhala text
          </p>
        </motion.div>

        {/* Original Architecture Diagram - Simple Phase Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden lg:flex items-center justify-between gap-4 mb-16"
        >
          {/* Phase 1: Data Collection */}
          <motion.div variants={cardVariants} className="flex-1">
            <div className="bg-card border rounded-xl p-6 text-center relative group hover:border-blue-500/50 transition-colors">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Phase 1
              </div>
              <Camera className="h-10 w-10 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Data Collection</h3>
              <p className="text-xs text-muted-foreground">
                100+ videos • 468 landmarks
              </p>
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 origin-left"
          />

          {/* Phase 2: Model Training */}
          <motion.div variants={cardVariants} className="flex-1">
            <div className="bg-card border rounded-xl p-6 text-center relative group hover:border-purple-500/50 transition-colors">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Phase 2
              </div>
              <Brain className="h-10 w-10 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Model Training</h3>
              <p className="text-xs text-muted-foreground">
                Multi-modal • Bi-LSTM
              </p>
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex-1 h-0.5 bg-gradient-to-r from-purple-500 to-green-500 origin-left"
          />

          {/* Phase 3: Mobile Deployment */}
          <motion.div variants={cardVariants} className="flex-1">
            <div className="bg-card border rounded-xl p-6 text-center relative group hover:border-green-500/50 transition-colors">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Phase 3
              </div>
              <Smartphone className="h-10 w-10 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Mobile Deployment</h3>
              <p className="text-xs text-muted-foreground">
                &lt;120ms • 8.2 MB
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* === CIRCUIT-STYLE FLOW DIAGRAM (FROM YOUR DIAGRAM) === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 p-6 bg-card/50 border rounded-2xl backdrop-blur-sm"
        >
          <h3 className="text-xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <CircuitBoard className="h-5 w-5 text-primary" />
            Complete Pipeline Flow
            <CircuitBoard className="h-5 w-5 text-primary" />
          </h3>

          {/* Desktop Flow Diagram */}
          <div className="hidden lg:block space-y-8">
            {/* Phase 1 - Dataset Creation */}
            <div className="relative">
              <div className="text-blue-500 font-bold text-sm mb-4">
                PHASE 1: DATASET CREATION
              </div>
              <div className="flex items-center justify-between gap-4">
                {/* Raw Video */}
                <motion.div
                  variants={nodeVariants}
                  whileHover="hover"
                  className="w-48 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-4 text-center backdrop-blur-sm"
                >
                  <Video className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-xs font-bold">RAW VIDEO</div>
                  <div className="text-[10px] text-blue-500/70">
                    Medical SLSL
                  </div>
                </motion.div>

                {/* Arrow */}
                <motion.div
                  variants={arrowVariants}
                  className="flex-1 flex justify-center"
                >
                  <ArrowRight className="h-6 w-6 text-blue-500 animate-pulse" />
                </motion.div>

                {/* Landmark Extraction */}
                <motion.div
                  variants={nodeVariants}
                  whileHover="hover"
                  className="w-48 bg-purple-500/10 border-2 border-purple-500/30 rounded-xl p-4 text-center backdrop-blur-sm"
                >
                  <Eye className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-xs font-bold">LANDMARK EXTRACTION</div>
                  <div className="text-[10px] text-purple-500/70">
                    MediaPipe Holistic
                  </div>
                </motion.div>

                {/* Arrow */}
                <motion.div
                  variants={arrowVariants}
                  className="flex-1 flex justify-center"
                >
                  <ArrowRight className="h-6 w-6 text-purple-500 animate-pulse" />
                </motion.div>

                {/* Multi Model Dataset */}
                <motion.div
                  variants={nodeVariants}
                  whileHover="hover"
                  className="w-48 bg-green-500/10 border-2 border-green-500/30 rounded-xl p-4 text-center backdrop-blur-sm"
                >
                  <Database className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-xs font-bold">MULTI MODEL DATASET</div>
                  <div className="text-[10px] text-green-500/70">
                    468 features/frame
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Phase 2 - Multi-Modal Training */}
            <div className="relative mt-12">
              <div className="text-purple-500 font-bold text-sm mb-4">
                PHASE 2: MULTI-MODAL MODEL TRAINING
              </div>

              {/* Streams Row */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <motion.div
                  variants={nodeVariants}
                  whileHover="hover"
                  className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-4 text-center"
                >
                  <Hand className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-xs font-bold">HAND STREAM</div>
                  <div className="text-[10px] text-blue-500/70">
                    1D CNN • 168
                  </div>
                </motion.div>

                <motion.div
                  variants={nodeVariants}
                  whileHover="hover"
                  className="bg-green-500/10 border-2 border-green-500/30 rounded-xl p-4 text-center"
                >
                  <Eye className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-xs font-bold">POSE STREAM</div>
                  <div className="text-[10px] text-green-500/70">
                    Dense • 100
                  </div>
                </motion.div>

                <motion.div
                  variants={nodeVariants}
                  whileHover="hover"
                  className="bg-purple-500/10 border-2 border-purple-500/30 rounded-xl p-4 text-center"
                >
                  <Brain className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-xs font-bold">LIP STREAM</div>
                  <div className="text-[10px] text-purple-500/70">
                    1D CNN/LSTM • 200
                  </div>
                </motion.div>
              </div>

              {/* Down Arrow */}
              <div className="flex justify-center my-2">
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ChevronRight className="h-6 w-6 text-purple-500 rotate-90" />
                </motion.div>
              </div>

              {/* Fusion Row */}
              <div className="flex items-center justify-center gap-8 mb-4">
                <motion.div
                  variants={nodeVariants}
                  whileHover="hover"
                  className="w-64 bg-orange-500/10 border-2 border-orange-500/30 rounded-xl p-4 text-center"
                >
                  <Merge className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-xs font-bold">FEATURE FUSION</div>
                  <div className="text-[10px] text-orange-500/70">
                    Concatenate
                  </div>
                </motion.div>

                {/* Arrow */}
                <motion.div
                  variants={arrowVariants}
                  className="flex justify-center"
                >
                  <ArrowRight className="h-6 w-6 text-orange-500 animate-pulse" />
                </motion.div>

                <motion.div
                  variants={nodeVariants}
                  whileHover="hover"
                  className="w-64 bg-red-500/10 border-2 border-red-500/30 rounded-xl p-4 text-center"
                >
                  <Repeat className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <div className="text-xs font-bold">TEMPORAL MODEL</div>
                  <div className="text-[10px] text-red-500/70">Bi-LSTM</div>
                </motion.div>

                {/* Arrow */}
                <motion.div
                  variants={arrowVariants}
                  className="flex justify-center"
                >
                  <ArrowRight className="h-6 w-6 text-red-500 animate-pulse" />
                </motion.div>

                <motion.div
                  variants={nodeVariants}
                  whileHover="hover"
                  className="w-64 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-xl p-4 text-center"
                >
                  <Layers className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-xs font-bold">CLASSIFICATION HEAD</div>
                  <div className="text-[10px] text-yellow-500/70">
                    Dense + Softmax
                  </div>
                </motion.div>
              </div>

              {/* Down Arrow */}
              <div className="flex justify-center my-2">
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ChevronRight className="h-6 w-6 text-green-500 rotate-90" />
                </motion.div>
              </div>

              {/* Trained Model */}
              <div className="flex justify-center">
                <motion.div
                  variants={nodeVariants}
                  whileHover="hover"
                  className="w-48 bg-green-500/10 border-2 border-green-500/30 rounded-xl p-4 text-center"
                >
                  <Download className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-xs font-bold">TRAINED MODEL</div>
                  <div className="text-[10px] text-green-500/70">
                    225K parameters
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Phase 3 - Mobile Deployment */}
            <div className="relative mt-12">
              <div className="text-green-500 font-bold text-sm mb-4">
                PHASE 3: MOBILE DEPLOYMENT
              </div>
              <div className="flex items-center justify-center gap-8">
                <motion.div
                  variants={nodeVariants}
                  whileHover="hover"
                  className="w-48 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-4 text-center"
                >
                  <Zap className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-xs font-bold">TFLITE CONVERSION</div>
                  <div className="text-[10px] text-blue-500/70">
                    Quantization
                  </div>
                </motion.div>

                {/* Arrow */}
                <motion.div
                  variants={arrowVariants}
                  className="flex justify-center"
                >
                  <ArrowRight className="h-6 w-6 text-blue-500 animate-pulse" />
                </motion.div>

                <motion.div
                  variants={nodeVariants}
                  whileHover="hover"
                  className="w-48 bg-green-500/10 border-2 border-green-500/30 rounded-xl p-4 text-center"
                >
                  <Smartphone className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-xs font-bold">OPTIMIZED .tflite</div>
                  <div className="text-[10px] text-green-500/70">
                    8.2 MB • &ls; 120ms
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Phase 4 - Mobile Application */}
            <div className="relative mt-12">
              <div className="text-orange-500 font-bold text-sm mb-4">
                PHASE 4: MOBILE APPLICATION
              </div>

              {/* First Row */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <motion.div
                  variants={nodeVariants}
                  whileHover="hover"
                  className="w-40 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-3 text-center"
                >
                  <Camera className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                  <div className="text-[10px] font-bold">MOBILE CAMERA</div>
                </motion.div>

                <ArrowRight className="h-5 w-5 text-blue-500 animate-pulse" />

                <motion.div
                  variants={nodeVariants}
                  whileHover="hover"
                  className="w-40 bg-purple-500/10 border-2 border-purple-500/30 rounded-xl p-3 text-center"
                >
                  <Eye className="h-6 w-6 text-purple-500 mx-auto mb-1" />
                  <div className="text-[10px] font-bold">
                    REAL-TIME LANDMARK
                  </div>
                </motion.div>

                <ArrowRight className="h-5 w-5 text-purple-500 animate-pulse" />

                <motion.div
                  variants={nodeVariants}
                  whileHover="hover"
                  className="w-40 bg-orange-500/10 border-2 border-orange-500/30 rounded-xl p-3 text-center"
                >
                  <Gauge className="h-6 w-6 text-orange-500 mx-auto mb-1" />
                  <div className="text-[10px] font-bold">SEQUENCE BUFFER</div>
                  <div className="text-[8px] text-orange-500/70">30 frames</div>
                </motion.div>
              </div>

              {/* Second Row */}
              <div className="flex items-center justify-center gap-8">
                <motion.div
                  variants={nodeVariants}
                  whileHover="hover"
                  className="w-40 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-xl p-3 text-center"
                >
                  <Layers className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                  <div className="text-[10px] font-bold">MULTI-MODAL INPUT</div>
                </motion.div>

                <ArrowRight className="h-5 w-5 text-yellow-500 animate-pulse" />

                <motion.div
                  variants={nodeVariants}
                  whileHover="hover"
                  className="w-40 bg-red-500/10 border-2 border-red-500/30 rounded-xl p-3 text-center"
                >
                  <Zap className="h-6 w-6 text-red-500 mx-auto mb-1" />
                  <div className="text-[10px] font-bold">TFLITE INFERENCE</div>
                </motion.div>

                <ArrowRight className="h-5 w-5 text-red-500 animate-pulse" />

                <motion.div
                  variants={nodeVariants}
                  whileHover="hover"
                  className="w-40 bg-green-500/10 border-2 border-green-500/30 rounded-xl p-3 text-center"
                >
                  <Globe className="h-6 w-6 text-green-500 mx-auto mb-1" />
                  <div className="text-[10px] font-bold font-sinhala">
                    SINHALA TEXT
                  </div>
                  <div className="text-[8px] font-sinhala">මට උණ තියෙනවා</div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Mobile Version - Stacked Flow Diagram */}
          <div className="lg:hidden space-y-6">
            {/* Phase 1 - Dataset Creation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4"
            >
              <div className="text-blue-500 font-bold text-sm mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                PHASE 1: DATASET CREATION
              </div>

              {/* Raw Video */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center mb-2"
              >
                <Video className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                <div className="text-xs font-bold">RAW VIDEO</div>
                <div className="text-[8px] text-blue-500/70">Medical SLSL</div>
              </motion.div>

              {/* Arrow Down */}
              <div className="flex justify-center my-1">
                <ArrowDown className="h-4 w-4 text-blue-400 animate-bounce" />
              </div>

              {/* Landmark Extraction */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center mb-2"
              >
                <Eye className="h-6 w-6 text-purple-500 mx-auto mb-1" />
                <div className="text-xs font-bold">LANDMARK EXTRACTION</div>
                <div className="text-[8px] text-purple-500/70">
                  MediaPipe Holistic
                </div>
              </motion.div>

              {/* Arrow Down */}
              <div className="flex justify-center my-1">
                <ArrowDown className="h-4 w-4 text-purple-400 animate-bounce" />
              </div>

              {/* Multi Model Dataset */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center"
              >
                <Database className="h-6 w-6 text-green-500 mx-auto mb-1" />
                <div className="text-xs font-bold">MULTI MODEL DATASET</div>
                <div className="text-[8px] text-green-500/70">
                  468 features/frame
                </div>
              </motion.div>
            </motion.div>

            {/* Phase 2 - Multi-Modal Training */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4"
            >
              <div className="text-purple-500 font-bold text-sm mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                PHASE 2: MULTI-MODAL TRAINING
              </div>

              {/* Streams Row */}
              <div className="space-y-2 mb-2">
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2 text-center"
                >
                  <Hand className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                  <div className="text-[10px] font-bold">HAND STREAM</div>
                  <div className="text-[8px] text-blue-500/70">
                    1D CNN • 168
                  </div>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-green-500/10 border border-green-500/30 rounded-lg p-2 text-center"
                >
                  <Eye className="h-5 w-5 text-green-500 mx-auto mb-1" />
                  <div className="text-[10px] font-bold">POSE STREAM</div>
                  <div className="text-[8px] text-green-500/70">
                    Dense • 100
                  </div>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-2 text-center"
                >
                  <Brain className="h-5 w-5 text-purple-500 mx-auto mb-1" />
                  <div className="text-[10px] font-bold">LIP STREAM</div>
                  <div className="text-[8px] text-purple-500/70">
                    LSTM • 200
                  </div>
                </motion.div>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center my-2">
                <ArrowDown className="h-4 w-4 text-purple-400 animate-bounce" />
              </div>

              {/* Feature Fusion */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-2 text-center mb-2"
              >
                <Merge className="h-5 w-5 text-orange-500 mx-auto mb-1" />
                <div className="text-[10px] font-bold">FEATURE FUSION</div>
                <div className="text-[8px] text-orange-500/70">Concatenate</div>
              </motion.div>

              {/* Arrow Down */}
              <div className="flex justify-center my-2">
                <ArrowDown className="h-4 w-4 text-orange-400 animate-bounce" />
              </div>

              {/* Temporal Model */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 text-center mb-2"
              >
                <Repeat className="h-5 w-5 text-red-500 mx-auto mb-1" />
                <div className="text-[10px] font-bold">TEMPORAL MODEL</div>
                <div className="text-[8px] text-red-500/70">Bi-LSTM</div>
              </motion.div>

              {/* Arrow Down */}
              <div className="flex justify-center my-2">
                <ArrowDown className="h-4 w-4 text-red-400 animate-bounce" />
              </div>

              {/* Classification Head */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-2 text-center mb-2"
              >
                <Layers className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                <div className="text-[10px] font-bold">CLASSIFICATION HEAD</div>
                <div className="text-[8px] text-yellow-500/70">
                  Dense + Softmax
                </div>
              </motion.div>

              {/* Arrow Down */}
              <div className="flex justify-center my-2">
                <ArrowDown className="h-4 w-4 text-yellow-400 animate-bounce" />
              </div>

              {/* Trained Model */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-green-500/10 border border-green-500/30 rounded-lg p-2 text-center"
              >
                <Download className="h-5 w-5 text-green-500 mx-auto mb-1" />
                <div className="text-[10px] font-bold">TRAINED MODEL</div>
                <div className="text-[8px] text-green-500/70">
                  225K parameters
                </div>
              </motion.div>
            </motion.div>

            {/* Phase 3 - Mobile Deployment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-green-500/5 border border-green-500/20 rounded-xl p-4"
            >
              <div className="text-green-500 font-bold text-sm mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                PHASE 3: MOBILE DEPLOYMENT
              </div>

              {/* TFLite Conversion */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center mb-2"
              >
                <Zap className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                <div className="text-xs font-bold">TFLITE CONVERSION</div>
                <div className="text-[8px] text-blue-500/70">Quantization</div>
              </motion.div>

              {/* Arrow Down */}
              <div className="flex justify-center my-1">
                <ArrowDown className="h-4 w-4 text-green-400 animate-bounce" />
              </div>

              {/* Optimized Model */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center"
              >
                <Smartphone className="h-6 w-6 text-green-500 mx-auto mb-1" />
                <div className="text-xs font-bold">OPTIMIZED .tflite</div>
                <div className="text-[8px] text-green-500/70">
                  8.2 MB • &lt;120ms
                </div>
              </motion.div>
            </motion.div>

            {/* Phase 4 - Mobile Application */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4"
            >
              <div className="text-orange-500 font-bold text-sm mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                PHASE 4: MOBILE APPLICATION
              </div>

              {/* Mobile Camera */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2 text-center mb-2"
              >
                <Camera className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                <div className="text-[10px] font-bold">MOBILE CAMERA INPUT</div>
              </motion.div>

              {/* Arrow Down */}
              <div className="flex justify-center my-1">
                <ArrowDown className="h-3 w-3 text-blue-400 animate-bounce" />
              </div>

              {/* Real-time Landmark */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-2 text-center mb-2"
              >
                <Eye className="h-5 w-5 text-purple-500 mx-auto mb-1" />
                <div className="text-[10px] font-bold">REAL-TIME LANDMARK</div>
              </motion.div>

              {/* Arrow Down */}
              <div className="flex justify-center my-1">
                <ArrowDown className="h-3 w-3 text-purple-400 animate-bounce" />
              </div>

              {/* Sequence Buffer */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-2 text-center mb-2"
              >
                <Gauge className="h-5 w-5 text-orange-500 mx-auto mb-1" />
                <div className="text-[10px] font-bold">SEQUENCE BUFFER</div>
                <div className="text-[8px] text-orange-500/70">30 frames</div>
              </motion.div>

              {/* Arrow Down */}
              <div className="flex justify-center my-1">
                <ArrowDown className="h-3 w-3 text-orange-400 animate-bounce" />
              </div>

              {/* Multi-modal Input */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-2 text-center mb-2"
              >
                <Layers className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                <div className="text-[10px] font-bold">MULTI-MODAL INPUT</div>
              </motion.div>

              {/* Arrow Down */}
              <div className="flex justify-center my-1">
                <ArrowDown className="h-3 w-3 text-yellow-400 animate-bounce" />
              </div>

              {/* TFLite Inference */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 text-center mb-2"
              >
                <Zap className="h-5 w-5 text-red-500 mx-auto mb-1" />
                <div className="text-[10px] font-bold">TFLITE INFERENCE</div>
              </motion.div>

              {/* Arrow Down */}
              <div className="flex justify-center my-1">
                <ArrowDown className="h-3 w-3 text-red-400 animate-bounce" />
              </div>

              {/* Sinhala Text */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-green-500/10 border border-green-500/30 rounded-lg p-2 text-center"
              >
                <Globe className="h-5 w-5 text-green-500 mx-auto mb-1" />
                <div className="text-[10px] font-bold font-sinhala">
                  SINHALA TEXT
                </div>
                <div className="text-[8px] font-sinhala">මට උණ තියෙනවා</div>
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile Version - Simplified */}
          <div className="lg:hidden space-y-6">
            <div className="text-center text-sm text-muted-foreground">
              <p className="text-xs mt-2">
                4 Phases • 15+ Components • 468 Features
              </p>
            </div>
          </div>
        </motion.div>

        {/* Multi-Modal Architecture Visualization */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold text-center mb-10"
          >
            Multi-Modal <span className="text-primary">Architecture</span>
          </motion.h3>

          <div className="relative max-w-4xl mx-auto">
            {/* Streams */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {streams.map((stream, index) => {
                const Icon = stream.icon;
                const colorClasses = {
                  blue: "border-blue-500/20 bg-blue-500/5",
                  green: "border-green-500/20 bg-green-500/5",
                  purple: "border-purple-500/20 bg-purple-500/5",
                }[stream.color];

                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover="hover"
                    className={`relative border rounded-xl p-5 ${colorClasses} group cursor-default`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`absolute inset-0 bg-${stream.color}-500/5 rounded-xl`}
                    />

                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        animate={{
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: stream.delay,
                        }}
                        className={`w-10 h-10 rounded-lg bg-${stream.color}-500/10 flex items-center justify-center shrink-0`}
                      >
                        <Icon className={`h-5 w-5 text-${stream.color}-500`} />
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-sm">{stream.name}</h4>
                        <p className="text-[10px] text-muted-foreground">
                          {stream.features}
                        </p>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono bg-background/50 p-2 rounded border">
                      {stream.layers}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Fusion Layer */}
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="relative border-2 border-primary/20 rounded-xl p-6 bg-primary/5 max-w-md mx-auto text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute inset-0 bg-primary/5 rounded-xl"
              />

              <div className="relative z-10">
                <Merge className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Feature Fusion</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Concatenate all streams (192 features)
                </p>
                <div className="text-xs font-mono bg-background/50 p-2 rounded border">
                  Dense(128) → Dropout(0.3) → Dense(50)
                </div>
              </div>
            </motion.div>

            {/* Output */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 }}
              className="mt-6 text-center"
            >
              <div className="inline-block bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2">
                <span className="text-sm font-medium font-sinhala">
                  මට උණ තියෙනවා
                </span>
                <span className="ml-2 text-xs text-muted-foreground">
                  (50 classes)
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Phases Details */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            const colorClasses = {
              blue: "from-blue-500 to-blue-600",
              purple: "from-purple-500 to-purple-600",
              green: "from-green-500 to-green-600",
            }[phase.color];

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="relative bg-card border rounded-xl overflow-hidden group cursor-default"
              >
                {/* Top accent bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colorClasses} origin-left`}
                />

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-10 h-10 rounded-lg bg-${phase.color}-500/10 flex items-center justify-center shrink-0`}
                    >
                      <Icon className={`h-5 w-5 text-${phase.color}-500`} />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-sm">{phase.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {phase.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {phase.items.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className="flex items-start gap-2 text-xs"
                      >
                        <CheckCircle2 className="h-3 w-3 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Feature Extraction Details */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/5 to-secondary/5 border rounded-2xl p-6 md:p-8"
        >
          <motion.div variants={itemVariants} className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              MediaPipe Holistic Feature Extraction
            </h3>
            <p className="text-sm text-muted-foreground">
              468 landmarks per frame • 90 frames per video • 42,120 features
              total
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Left Hand", value: "84", color: "blue" },
              { label: "Right Hand", value: "84", color: "blue" },
              { label: "Pose", value: "100", color: "green" },
              { label: "Lips", value: "200", color: "purple" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-card border rounded-lg"
              >
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.2,
                  }}
                  className={`text-2xl md:text-3xl font-bold text-${item.color}-500 mb-1`}
                >
                  {item.value}
                </motion.div>
                <div
                  className="text-xs text-muted-foreground truncate"
                  title={item.label}
                >
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Add missing import
import { CheckCircle2 } from "lucide-react";