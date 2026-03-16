"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Cpu,
  Smartphone,
  Eye,
  Hand,
  Languages,
  Zap,
  Cloud,
  Server,
  Code,
  Github,
  ExternalLink,
  ArrowRight,
  CircuitBoard,
  Gauge,
  Repeat,
  Download,
  Wifi,
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

const floatingVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

export function Technologies() {
  const frontendTech = [
    {
      name: "Flutter",
      description: "Cross-platform mobile framework for iOS & Android",
      icon: Smartphone,
      color: "blue",
      version: "3.16+",
    },
    {
      name: "Dart",
      description: "Optimized UI development with hot reload",
      icon: Code,
      color: "teal",
      version: "3.2+",
    },
    {
      name: "Camera Package",
      description: "30fps real-time video capture",
      icon: Eye,
      color: "purple",
      version: "0.10.5",
    },
    {
      name: "Provider",
      description: "State management for reactive UI",
      icon: Gauge,
      color: "orange",
      version: "6.1.1",
    },
  ];

  const mlTech = [
    {
      name: "TensorFlow",
      description: "Deep learning framework for model training",
      icon: Brain,
      color: "orange",
      version: "2.19.0",
    },
    {
      name: "Keras",
      description: "High-level neural networks API",
      icon: Cpu,
      color: "red",
      version: "3.10.0",
    },
    {
      name: "MediaPipe Holistic",
      description: "468 landmarks from hand, pose & face",
      icon: Hand,
      color: "green",
      version: "0.10.32",
    },
    {
      name: "TFLite",
      description: "On-device inference with quantization",
      icon: Zap,
      color: "yellow",
      version: "0.10.4",
    },
  ];

  const backendTech = [
    {
      name: "Python",
      description: "Core language for model training",
      icon: Code,
      color: "blue",
      version: "3.12",
    },
    {
      name: "Google Colab",
      description: "Cloud GPU for model training",
      icon: Cloud,
      color: "yellow",
      version: "Free T4 GPU",
    },
    {
      name: "NumPy/Pandas",
      description: "Data processing & augmentation",
      icon: Server,
      color: "green",
      version: "1.24.3 / 2.2.2",
    },
    {
      name: "GitHub",
      description: "Version control & collaboration",
      icon: Github,
      color: "purple",
      version: "Actions CI/CD",
    },
  ];

  const stats = [
    { label: "Model Size", value: "8.2 MB", icon: Download },
    { label: "Inference Time", value: "<120ms", icon: Zap },
    { label: "Features/Frame", value: "468", icon: Eye },
    { label: "Offline", value: "100%", icon: Wifi },
  ];

  return (
    <section
      id="technologies"
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

        {/* Circuit board pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#8882_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />
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
            <CircuitBoard className="h-8 w-8 text-primary" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Technologies{" "}
            <span className="text-primary relative">
              Used
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
            Built with cutting-edge deep learning frameworks and modern mobile
            development tools
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-card border rounded-xl p-4 text-center relative overflow-hidden group"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.2,
                  }}
                  className="absolute inset-0 bg-primary/5 rounded-xl"
                />
                <div className="relative z-10">
                  <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-xl md:text-2xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Frontend Technologies */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mb-6"
          >
            <Smartphone className="h-6 w-6 text-blue-500" />
            <h3 className="text-xl md:text-2xl font-bold">Frontend & Mobile</h3>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {frontendTech.map((tech, index) => {
              const Icon = tech.icon;
              const colorClasses = {
                blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
                teal: "text-teal-500 bg-teal-500/10 border-teal-500/20",
                purple: "text-purple-500 bg-purple-500/10 border-purple-500/20",
                orange: "text-orange-500 bg-orange-500/10 border-orange-500/20",
              }[tech.color];

              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`border rounded-xl p-5 ${colorClasses} group cursor-default`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg bg-${tech.color}-500/10`}>
                      <Icon className={`h-5 w-5 text-${tech.color}-500`} />
                    </div>
                    <span className="text-xs font-mono bg-background/50 px-2 py-1 rounded">
                      {tech.version}
                    </span>
                  </div>
                  <h4 className="font-semibold mb-1">{tech.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {tech.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Machine Learning Technologies */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mb-6"
          >
            <Brain className="h-6 w-6 text-purple-500" />
            <h3 className="text-xl md:text-2xl font-bold">
              Machine Learning & AI
            </h3>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mlTech.map((tech, index) => {
              const Icon = tech.icon;
              const colorClasses = {
                orange: "text-orange-500 bg-orange-500/10 border-orange-500/20",
                red: "text-red-500 bg-red-500/10 border-red-500/20",
                green: "text-green-500 bg-green-500/10 border-green-500/20",
                yellow: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
              }[tech.color];

              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`border rounded-xl p-5 ${colorClasses} group cursor-default`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg bg-${tech.color}-500/10`}>
                      <Icon className={`h-5 w-5 text-${tech.color}-500`} />
                    </div>
                    <span className="text-xs font-mono bg-background/50 px-2 py-1 rounded">
                      {tech.version}
                    </span>
                  </div>
                  <h4 className="font-semibold mb-1">{tech.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {tech.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Backend & Infrastructure */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mb-6"
          >
            <Server className="h-6 w-6 text-green-500" />
            <h3 className="text-xl md:text-2xl font-bold">
              Backend & Infrastructure
            </h3>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {backendTech.map((tech, index) => {
              const Icon = tech.icon;
              const colorClasses = {
                blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
                yellow: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
                green: "text-green-500 bg-green-500/10 border-green-500/20",
                purple: "text-purple-500 bg-purple-500/10 border-purple-500/20",
              }[tech.color];

              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`border rounded-xl p-5 ${colorClasses} group cursor-default`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg bg-${tech.color}-500/10`}>
                      <Icon className={`h-5 w-5 text-${tech.color}-500`} />
                    </div>
                    <span className="text-xs font-mono bg-background/50 px-2 py-1 rounded">
                      {tech.version}
                    </span>
                  </div>
                  <h4 className="font-semibold mb-1">{tech.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {tech.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Tech Stack Summary */}
        <motion.div
          variants={itemVariants}
          className="mt-12 bg-gradient-to-r from-primary/5 via-primary/10 to-secondary/5 border rounded-2xl p-6 text-center relative overflow-hidden"
        >
          {/* Animated background */}
          <motion.div
            animate={{
              x: [0, 100, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="absolute inset-0 opacity-10"
          >
            <div className="absolute top-0 left-0 w-20 h-20 bg-primary/20 rounded-full blur-xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-xl" />
          </motion.div>

          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-3">Complete Tech Stack</h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-4">
              Flutter • Dart • TensorFlow • Keras • MediaPipe • TFLite • Python
              • Google Colab • NumPy • Pandas • GitHub
            </p>
            <Button variant="outline" size="sm" className="gap-2 cursor-pointer">
              View on GitHub
              <Github className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
