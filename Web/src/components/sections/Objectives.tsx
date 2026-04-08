"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Target,
  Database,
  Brain,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Zap,
  Globe,
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
    y: -8,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
};

const progressVariants: Variants = {
  hidden: { width: 0 },
  visible: (progress: number) => ({
    width: `${progress}%`,
    transition: {
      duration: 1.5,
      delay: 0.5,
      ease: "easeOut",
    },
  }),
};

export function Objectives() {
  const mainObjectives = [
    {
      title: "Dataset Engineering",
      description:
        "Create a comprehensive healthcare-focused SLSL dataset with 50 medical sentences from multiple signers.",
      icon: Database,
      color: "blue",
      progress: 85,
      metrics: ["200+ videos", "50 sentences", "3+ signers"],
    },
    {
      title: "Multi-Modal Model Development",
      description:
        "Design and train a deep learning architecture that processes hand, pose, and lip features simultaneously.",
      icon: Brain,
      color: "purple",
      progress: 90,
      metrics: ["468 features/frame", "280 frames", "225K parameters"],
    },
    {
      title: "Mobile Deployment",
      description:
        "Convert and optimize the model for on-device inference with <150ms latency on standard smartphones.",
      icon: Smartphone,
      color: "green",
      progress: 95,
      metrics: ["1.2 MB model", "<120ms latency", "Offline capable"],
    },
  ];

  const subObjectives = [
    {
      title: "Real-Time Translation",
      description:
        "Achieve <150ms inference time for natural conversation flow",
      icon: Zap,
    },
    {
      title: "Medical Vocabulary",
      description: "Focus on healthcare-specific signs for clinical settings",
      icon: Target,
    },
    {
      title: "Multi-Modal Fusion",
      description: "Combine hand (168), pose (100), and lip (200) features",
      icon: Layers,
    },
    {
      title: "Accessibility First",
      description: "Design for the Sri Lankan Deaf community's needs",
      icon: Globe,
    },
  ];

  return (
    <section
      id="objectives"
      className="relative py-8 overflow-hidden w-full"
    >
      {/* Background decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px] mask-gradient-to-b from-transparent via-transparent to-transparent opacity-20" />
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
            <Target className="h-8 w-8 text-primary" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Research{" "}
            <span className="text-primary relative">
              Objectives
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
            Our research aims to develop a robust, real-time SLSL translation
            system through three main objectives and several supporting goals.
          </p>
        </motion.div>

        {/* Main Objectives Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20"
        >
          {mainObjectives.map((objective, index) => {
            const Icon = objective.icon;
            const colorClasses = {
              blue: "from-blue-500 to-blue-600",
              purple: "from-purple-500 to-purple-600",
              green: "from-green-500 to-green-600",
            }[objective.color];

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="relative bg-card border rounded-2xl overflow-hidden group cursor-default"
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"
                />

                {/* Top accent bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colorClasses} origin-left`}
                />

                <div className="p-6 md:p-8">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`w-14 h-14 rounded-xl bg-${objective.color}-500/10 flex items-center justify-center mb-4`}
                  >
                    <Icon className={`h-7 w-7 text-${objective.color}-500`} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold mb-3">
                    {objective.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4">
                    {objective.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{objective.progress}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        custom={objective.progress}
                        variants={progressVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={`h-full bg-gradient-to-r ${colorClasses} rounded-full`}
                      />
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-2">
                    {objective.metrics.map((metric, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className="flex items-center gap-2 text-xs"
                      >
                        <CheckCircle2 className="h-3 w-3 text-green-500 shrink-0" />
                        <span className="text-muted-foreground">{metric}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom decorative element */}
                <motion.div
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Sub Objectives Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold text-center mb-10"
          >
            Supporting <span className="text-primary">Objectives</span>
          </motion.h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {subObjectives.map((objective, index) => {
              const Icon = objective.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative bg-card border rounded-xl p-4 md:p-6 text-center group cursor-default"
                >
                  {/* Hover effect */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl"
                  />

                  {/* Icon */}
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
                    className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center"
                  >
                    <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </motion.div>

                  {/* Title - truncated to single line */}
                  <h4
                    className="text-xsz md:text-base font-semibold mb-1 truncate"
                    title={objective.title}
                  >
                    {objective.title}
                  </h4>

                  {/* Description - hidden on mobile, visible on larger screens */}
                  <p className="hidden md:block text-xs text-muted-foreground">
                    {objective.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline / Next Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/5 to-secondary/5 border rounded-2xl p-6 md:p-8"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center gap-6"
          >
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                Ready to make an impact?
              </h3>
              <p className="text-sm text-muted-foreground">
                Our next phase focuses on expanding the dataset and deploying in
                real healthcare settings.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="shrink-0"
            >
              <Button className="group bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-5 text-base">
                View Our Timeline
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Next: Clinical Trials</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
