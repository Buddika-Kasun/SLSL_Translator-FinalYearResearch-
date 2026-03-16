"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Users,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Award,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Quote,
  Star,
} from "lucide-react";
import type { Variants } from "framer-motion";
import Image from "next/image";

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
    y: -10,
    boxShadow: "0 25px 30px -12px rgba(0, 0, 0, 0.25)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
};

const photoVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
};

export function Team() {
  const supervisor = {
    name: "Dr. Nalaka Lankasena",
    role: "Senior Lecturer",
    department: "Department of ICT",
    university: "University of Sri Jayewardenepura",
    email: "nalaka@sjp.ac.lk",
    phone: "+94 11 123 4567",
    bio: "Expert in Computer Vision and Deep Learning with over 15 years of experience in AI research. Guided numerous successful research projects in sign language recognition and medical imaging.",
    image: "/images/team/nalaka-lankasena.jpg", // Replace with actual image path
    education: [
      "PhD in Computer Science, University of Moratuwa",
      "MSc in Artificial Intelligence, University of Colombo",
      "BSc in Computer Science, University of Peradeniya",
    ],
    expertise: [
      "Computer Vision",
      "Deep Learning",
      "Pattern Recognition",
      "Medical Imaging",
    ],
    social: {
      linkedin: "https://linkedin.com/in/nalaka-lankasena",
      github: "https://github.com/nalaka",
      twitter: "https://twitter.com/nalaka",
    },
  };

  const teamMembers = [
    {
      name: "G.S.R. Silva",
      //role: "Lead Researcher",
      id: "ICT/21/923",
      email: "ict21923@fot.sjp.ac.lk",
      phone: "+94 71 630 5744",
      focus: "Dataset Collection & Preprocessing",
      contributions: [
        "Collected 100+ SLSL videos from multiple signers",
        "Implemented MediaPipe Holistic landmark extraction",
        "Data augmentation and preprocessing pipeline",
        "Created the medical sentence dataset",
      ],
      image: "/images/team/silva.jpg", // Replace with actual image path
      social: {
        github: "https://github.com/silva",
        linkedin: "https://linkedin.com/in/silva",
      },
    },
    {
      name: "D.L.B. Kasun (Buddika)",
      //role: "Lead Developer",
      id: "ICT/21/870",
      email: "ict21870@fot.sjp.ac.lk",
      phone: "+94 71 531 5915",
      focus: "Model Development & Mobile App",
      contributions: [
        "Designed multi-modal deep learning architecture",
        "Implemented Bi-LSTM for temporal modeling",
        "Developed Flutter mobile application",
        "TFLite model conversion and optimization",
      ],
      image: "/images/team/kasun.jpg", // Replace with actual image path
      social: {
        github: "https://github.com/buddikakasun",
        linkedin: "https://linkedin.com/in/buddika-kasun",
      },
    },
    {
      name: "M.L.M. Fernando",
      //role: "Research Assistant",
      id: "ICT/21/839",
      email: "ict21839@fot.sjp.ac.lk",
      phone: "+94 78 801 7808",
      focus: "Documentation & Testing",
      contributions: [
        "Conducted comprehensive literature review",
        "Documented technical specifications",
        "Performed model testing and validation",
        "Assisted in mobile app UI/UX design",
      ],
      image: "/images/team/fernando.jpg", // Replace with actual image path
      social: {
        github: "https://github.com/fernando",
        linkedin: "https://linkedin.com/in/fernando",
      },
    },
  ];

  return (
    <section
      id="team"
      className="relative pb-12 pt-8 overflow-hidden w-full"
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

        {/* Dots pattern */}
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
            <Users className="h-8 w-8 text-primary" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Research{" "}
            <span className="text-primary relative">
              Team
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
            Meet the dedicated team behind the SLSL Medical Translator project
          </p>
        </motion.div>

        {/* Supervisor Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2"
          >
            <Award className="h-6 w-6 text-yellow-500" />
            Project Supervisor
          </motion.h3>

          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="max-w-3xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5 border rounded-2xl p-8 relative overflow-hidden group"
          >
            {/* Background decoration */}
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
              className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Photo */}
              <motion.div
                variants={photoVariants}
                initial="initial"
                whileHover="hover"
                className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/30 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent z-10" />
                <Image
                  src={supervisor.image}
                  alt={supervisor.name}
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </motion.div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-2xl md:text-3xl font-bold mb-2">
                  {supervisor.name}
                </h4>
                <p className="text-primary font-medium mb-1">
                  {supervisor.role}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  {supervisor.department} • {supervisor.university}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {supervisor.bio}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                  {supervisor.expertise.map((item, index) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Contact & Social */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <a
                    href={`mailto:${supervisor.email}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {supervisor.email}
                  </a>
                  {supervisor.social.linkedin && (
                    <a
                      href={supervisor.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {supervisor.social.github && (
                    <a
                      href={supervisor.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Team Members Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="bg-card border rounded-xl overflow-hidden group relative"
            >
              {/* Top accent bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left"
              />

              {/* Photo Container */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                <motion.div
                  variants={photoVariants}
                  initial="initial"
                  whileHover="hover"
                  className="absolute inset-0"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </motion.div>

                {/* Overlay with role */}
                {/* 
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white font-medium">{member.role}</p>
                </div> 
                */}

                {/* ID Badge */}
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-mono border">
                  {member.id}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                <p className="text-sm text-primary mb-3">{member.focus}</p>

                {/* Contributions */}
                <div className="space-y-2 mb-4">
                  {member.contributions.map((contribution, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <Star className="h-3 w-3 text-yellow-500 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        {contribution}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-sm border-t pt-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="text-xs">{member.email}</span>
                  </a>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    <span className="text-xs">{member.phone}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  <a
                    href={`mailto:${member.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors ml-auto"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote/Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center relative"
        >
          <Quote className="h-8 w-8 text-primary/20 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto italic">
            &#34;Together, we&quot;re breaking communication barriers for the deaf
            community in Sri Lanka through innovative AI and deep learning
            technologies.&#34;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
