"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Hand,
  Eye,
  Brain,
  Smartphone,
  Zap,
  Shield,
  Globe,
  Heart,
  ArrowRight,
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
  hidden: { scale: 0.9, opacity: 0 },
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
    y: -8,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
};

const numberVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.5,
    },
  },
};

export function About() {
  const stats = [
    { label: "Videos Collected", value: "200+", icon: Eye },
    { label: "Landmark Features", value: "468", icon: Hand },
    { label: "Medical Sentences", value: "50", icon: Heart },
    { label: "Model Size", value: "1.2 MB", icon: Smartphone },
  ];

  const features = [
    {
      title: "Multi-Modal Architecture",
      description:
        "Combines hand (168), pose (100), and lip (200) features for comprehensive gesture understanding.",
      icon: Brain,
      color: "blue",
    },
    {
      title: "Real-Time Inference",
      description:
        "<120ms processing on mobile devices with 60-frame buffer for natural conversation flow.",
      icon: Zap,
      color: "yellow",
    },
    {
      title: "Offline-First Design",
      description:
        "Fully on-device TFLite model works without internet, suitable for healthcare settings.",
      icon: Shield,
      color: "green",
    },
    {
      title: "Medical Focus",
      description:
        "Specialized vocabulary for healthcare communication, tested in medical scenarios.",
      icon: Heart,
      color: "red",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-8 overflow-hidden w-full"
    >
      {/* Background decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute top-40 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </motion.div>

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
            <Hand className="h-8 w-8 text-primary" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            About{" "}
            <span className="text-primary relative">
              The Project
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
            A multimodal deep learning system that translates Sri Lankan Sign
            Language (SLSL) into Sinhala text in real-time, designed
            specifically for healthcare communication.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="relative bg-card border rounded-2xl p-4 md:p-6 text-center group cursor-default overflow-hidden h-[140px] md:h-[160px] flex flex-col items-center justify-center"
              >
                {/* Animated background on hover */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 -z-10"
                />

                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.2,
                  }}
                  className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"
                >
                  <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </motion.div>

                <motion.div
                  variants={numberVariants}
                  className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 leading-tight"
                >
                  {stat.value}
                </motion.div>

                <div className="text-[10px] md:text-xs lg:text-sm text-muted-foreground max-w-full px-1">
                  <span className="block truncate" title={stat.label}>
                    {stat.label}
                  </span>
                </div>

                {/* Corner decoration */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="absolute top-2 right-2 w-1 h-1 bg-primary/30 rounded-full"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="absolute bottom-2 left-2 w-1 h-1 bg-primary/30 rounded-full"
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Problem & Solution */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <div className="inline-block px-4 py-2 bg-red-100 dark:bg-red-950/30 rounded-full mb-4">
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  ⚠️ The Challenge
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
                300,000+ Deaf Individuals in Sri Lanka Face Communication
                Barriers
              </h3>
              <p className="text-muted-foreground text-center md:text-left">
                In healthcare settings, miscommunication can lead to
                misdiagnosis, incorrect treatment, and life-threatening
                situations. Current solutions either don&apos;t exist or fail to
                handle the complexity of Sri Lankan Sign Language (SLSL).
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="inline-block px-4 py-2 bg-green-100 dark:bg-green-950/30 rounded-full mb-4">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  ✅ Our Solution
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
                Real-Time SLSL to Sinhala Translation
              </h3>
              <p className="text-muted-foreground text-center md:text-left">
                We&apos;ve built a multimodal deep learning system that
                processes hand, pose, and lip movements simultaneously,
                translating complete sentences in real-time on a mobile device.
              </p>
            </motion.div>

            {/* Key differentiators */}
            <motion.div variants={itemVariants} className="pt-4">
              <div className="space-y-3">
                {[
                  "First sentence-level SLSL translator",
                  "Medical vocabulary focus",
                  "Works offline - no internet needed",
                  "<120ms inference on mobile",
                  "Multi-modal (hand + pose + lip)",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                      className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </motion.div>
                    <span className="text-sm md:text-base">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="pt-4">
              <Button className="group bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-5 text-base">
                Learn More About Our Approach
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Visual/Architecture Preview */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Background glow */}
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

              {/* Main visual card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute inset-0 bg-card border rounded-3xl shadow-xl overflow-hidden backdrop-blur-sm"
              >
                {/* Architecture visualization */}
                <div className="p-6 h-full flex flex-col">
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Multi-Modal Architecture
                  </h4>

                  {/* Streams visualization */}
                  <div className="space-y-4 flex-1">
                    {/* Hand Stream */}
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="relative"
                    >
                      <div className="flex items-center gap-3 p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                        <Hand className="h-5 w-5 text-blue-500 shrink-0" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">Hand Stream</div>
                          <div className="text-xs text-muted-foreground">
                            84 features (left) + 84 features (right)
                          </div>
                        </div>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-blue-500"
                        />
                      </div>
                    </motion.div>

                    {/* Pose Stream */}
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="relative"
                    >
                      <div className="flex items-center gap-3 p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                        <Eye className="h-5 w-5 text-green-500 shrink-0" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">Pose Stream</div>
                          <div className="text-xs text-muted-foreground">
                            100 features (25 points × 4)
                          </div>
                        </div>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.3,
                          }}
                          className="w-2 h-2 rounded-full bg-green-500"
                        />
                      </div>
                    </motion.div>

                    {/* Lip Stream */}
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="relative"
                    >
                      <div className="flex items-center gap-3 p-3 bg-purple-500/5 rounded-lg border border-purple-500/20">
                        <Brain className="h-5 w-5 text-purple-500 shrink-0" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">Lip Stream</div>
                          <div className="text-xs text-muted-foreground">
                            200 features (50 points × 4)
                          </div>
                        </div>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.6,
                          }}
                          className="w-2 h-2 rounded-full bg-purple-500"
                        />
                      </div>
                    </motion.div>

                    {/* Fusion */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.6, type: "spring" }}
                      className="flex justify-center py-2"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
                      </div>
                    </motion.div>

                    {/* Output */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="p-3 bg-primary/5 rounded-lg border border-primary/20 text-center"
                    >
                      <span className="text-sm font-medium">Sinhala Text</span>
                      <div className="text-xs text-muted-foreground mt-1 font-sinhala">
                        මට උණ තියෙනවා
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                animate={{
                  y: [-5, 5, -5],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg"
              >
                468 Features/Frame
              </motion.div>

              <motion.div
                animate={{
                  y: [5, -5, 5],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1,
                }}
                className="absolute -bottom-4 -left-4 bg-card border px-4 py-2 rounded-full text-sm font-medium shadow-lg"
              >
                280 Frames • 50 Classes
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
