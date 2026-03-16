"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Hand,
  Languages,
  Smartphone,
  CheckCircle,
  Sparkles,
  Zap,
} from "lucide-react";
import type { Variants } from "framer-motion";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
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

const floatingVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  },
};

const floatingVariants2: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      delay: 0.5,
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse" as const,
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
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  },
};

export function Hero() {
  return (
    <section className="relative pb-8 pt-4 md:pt-2 overflow-y-hidden overflow-x-hidden w-full">
      {/* Background decorative elements with animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 -z-10"
      >
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl hidden md:block"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl hidden md:block"
        />
        {/* Mobile background blurs - smaller */}
        <div className="absolute top-10 left-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl md:hidden" />
        <div className="absolute bottom-10 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl md:hidden" />
      </motion.div>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-8 max-w-[100vw] overflow-x-hidden overflow-y-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-8 md:gap-12"
        >
          {/* Left Column - Content */}
          <div className="space-y-4 md:space-y-6 px-2 sm:px-0 flex-col items-center md:items-start text-center md:text-left pt-4">

            {/* English Subheading */}
            <motion.h2
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-primary max-w-lg px-4 sm:px-0 text-center md:text-left font-medium"
            >
              Real-Time Sri Lankan Sign Language to Sinhala Text Translation
            </motion.h2>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-center md:text-left font-bold font-sinhala pb-4 md:pb-6 mt-4 sm:mt-6 pl-4"
              style={{ lineHeight: "1.1", letterSpacing: "0.02em" }}
            >
              <motion.span
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="inline-block text-foreground"
              >
                සන්නිවේදන
              </motion.span>{" "}
              <br />
              <span className="text-primary relative whitespace-nowrap">
                <motion.span
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                  className="inline-block"
                >
                  බාධක
                </motion.span>{" "}
                <motion.span
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                  className="inline-block"
                >
                  නැති
                </motion.span>{" "}
                <br />
              </span>
              <span className="text-forground relative whitespace-nowrap">
                <motion.span
                  animate={{
                    y: [0, -12, 0],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 0.6,
                  }}
                  className="inline-block"
                >
                  ලෝකයක්
                </motion.span>
              </span>
              <motion.span
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 0.8,
                }}
                className="inline-block text-primary ml-2"
              >
                .
              </motion.span>
              {/* Decorative underline */}
              <motion.svg
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                className="absolute -bottom-4 left-0 w-full h-4 text-primary/20 hidden md:block"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,5 Q25,10 50,5 T100,5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </motion.svg>
            </motion.h1>

            {/* NEW Badge */}
            <motion.div variants={itemVariants}>
              <Badge
                variant="secondary"
                className="bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 px-3 sm:px-4 py-1.5 sm:py-2 mt-2 sm:mt-2 text-[10px] sm:text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full mr-1.5 shrink-0"
                />
                <span className="truncate">
                  🚀 REAL-TIME SLSL TRANSLATION FOR HEALTHCARE
                </span>
              </Badge>
            </motion.div>

            {/* Mobile Visual - Shown only below lg breakpoint */}
            <div className="lg:hidden w-full px-4 mt-6">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Decorative circles */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
                />

                {/* Visual placeholder with animation */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute inset-10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl border border-blue-500/20 flex items-center justify-center backdrop-blur-sm"
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="text-center"
                  >
                    <Hand className="h-16 w-16 text-blue-500/40 mx-auto mb-4" />
                    <Languages className="h-12 w-12 text-purple-500/40 mx-auto" />
                  </motion.div>
                </motion.div>

                {/* Floating stats - Repositioned for mobile */}
                <motion.div
                  variants={floatingVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute -left-4 top-16 bg-card border rounded-lg shadow-lg"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5"
                  >
                    <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center shrink-0">
                      <Zap className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground">
                        Inference Time
                      </span>
                      <span className="text-lg font-bold text-center">
                        &lt;120ms
                      </span>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={floatingVariants2}
                  initial="initial"
                  animate="animate"
                  className="absolute -right-4 bottom-16 bg-card border rounded-lg shadow-lg"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5"
                  >
                    <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center shrink-0">
                      <Smartphone className="h-4 w-4 text-purple-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground">
                        Model Size
                      </span>
                      <span className="text-lg font-bold text-center">
                        8.2 MB
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-muted-foreground max-w-lg px-4 sm:px-0 text-center md:text md:text-left -mt-4 md:mt-2"
            >
              A multimodal deep learning system that translates Sri Lankan Sign
              Language gestures into Sinhala text in real-time. Breaking
              communication barriers for the Deaf community in healthcare
              settings.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 pt-4 md:pt-6 px-2 sm:px-0"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto text-sm sm:text-base cursor-pointer">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Try Demo
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  className="border-primary/20 hover:bg-primary/5 px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto text-sm sm:text-base cursor-pointer"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>

            {/* Key Features */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 md:pt-4 pb-4 text-xs sm:text-sm text-muted-foreground px-2 sm:px-0"
            >
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-1 sm:gap-2 cursor-default"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 shrink-0" />
                </motion.div>
                <span className="whitespace-nowrap">Real-time</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-1 sm:gap-2 cursor-default"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                >
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 shrink-0" />
                </motion.div>
                <span className="whitespace-nowrap">Offline</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-1 sm:gap-2 cursor-default"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                >
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 shrink-0" />
                </motion.div>
                <span className="whitespace-nowrap">Medical Focus</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-1 sm:gap-2 cursor-default"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
                >
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 shrink-0" />
                </motion.div>
                <span className="whitespace-nowrap">Multi-modal</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Visual/Image - Hidden on mobile, shown on lg */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block lg:mt-16"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Animated background pulses */}
              <motion.div
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
              />

              {/* Main visual container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl border border-blue-500/20 flex items-center justify-center backdrop-blur-sm max-h-96 max-w-96 ml-8"
              >
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="text-center space-y-4"
                >
                  {/* Icon grid */}
                  <div className="flex gap-6 justify-center">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 8, repeat: Infinity }}
                      className="p-4 bg-blue-500/10 rounded-2xl"
                    >
                      <Hand className="h-12 w-12 text-blue-500" />
                    </motion.div>
                    <motion.div
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                      className="p-4 bg-purple-500/10 rounded-2xl"
                    >
                      <Languages className="h-12 w-12 text-purple-500" />
                    </motion.div>
                  </div>
                  <div className="flex gap-6 justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="p-4 bg-green-500/10 rounded-2xl"
                    >
                      <Smartphone className="h-12 w-12 text-green-500" />
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                      className="p-4 bg-orange-500/10 rounded-2xl"
                    >
                      <Zap className="h-12 w-12 text-orange-500" />
                    </motion.div>
                  </div>
                  <p className="text-muted-foreground font-medium">
                    468 Landmarks • 90 Frames • 50 Classes
                  </p>
                </motion.div>
              </motion.div>

              {/* Floating stats */}
              <motion.div
                variants={floatingVariants}
                initial="initial"
                animate="animate"
                className="absolute -left-20 top-16 bg-card border rounded-lg shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 rounded-lg px-4 py-3"
                >
                  <div className="w-12 h-12 rounded-md bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Zap className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">
                      Inference Time
                    </span>
                    <span className="text-2xl font-bold">&lt; 120ms</span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                variants={floatingVariants2}
                initial="initial"
                animate="animate"
                className="absolute -right-20 bottom-18 bg-card border rounded-lg shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 rounded-lg px-4 py-3"
                >
                  <div className="w-12 h-12 rounded-md bg-purple-500/10 flex items-center justify-center shrink-0">
                    <Smartphone className="h-6 w-6 text-purple-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">
                      Model Size
                    </span>
                    <span className="text-2xl font-bold">8.2 MB</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Top floating badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -top-4 -right-30 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg"
              >
                ⚡ Real-time • Offline • Medical
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
