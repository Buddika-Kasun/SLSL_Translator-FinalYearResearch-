"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    icon: Facebook,
    href: "https://facebook.com/godayanalk",
    label: "Facebook",
    color: "hover:text-[#1877F2]",
  },
  {
    icon: Instagram,
    href: "https://instagram.com/godayanalk",
    label: "Instagram",
    color: "hover:text-[#E4405F]",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/company/godayanalk",
    label: "LinkedIn",
    color: "hover:text-[#0A66C2]",
  },
  {
    icon: MessageCircle,
    href: "https://wa.me/94112345678",
    label: "WhatsApp",
    color: "hover:text-[#25D366]",
  },
];

const quickLinks = [
  { label: "Find Jobs", href: "/jobs" },
  { label: "Visa Guides", href: "/visa" },
  { label: "Migration Courses", href: "/courses" },
  { label: "Explore Countries", href: "/countries" },
  { label: "Godayana Gateway", href: "/gateway" },
];

const supportLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "FAQs", href: "/faqs" },
];

// Animation variants with proper typing
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

const socialVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      delay: i * 0.1,
    },
  }),
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative from-background to-muted/30 border-t ">
      {/* Scroll to top button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{
          y: [0, -8, 0, -4, 0],
          scale: [1, 1.1, 1, 1.05, 1],
          transition: {
            duration: 0.6,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          },
        }}
        transition={{ delay: 1 }}
        onClick={scrollToTop}
        className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow z-10 cursor-pointer"
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>

      <div className="w-full px-4 sm:px-6 lg:px-8 pt-16 pb-8 max-w-[100vw] overflow-x-hidden">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className=""
        >
          {/* Brand Section */}
          <motion.div
            variants={itemVariants}
            className="flex-col space-y-8"
          >
            <Link href="/" className="inline-block text-center w-full">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-3xl font-bold mb-8 bg-clip-text"
              >
                <span className="bg-gradient-to-r text-primary bg-clip-text">
                  SLSL
                </span>
                <span className="text-gray-400"> Translator</span>
              </motion.span>
            </Link>

            <p className="text-muted-foreground leading-relaxed text-center">
              Department of ICT <br />
              Faculty of Technology <br />
              University of Sri Jayewardenepura 
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © Final Year Research Project — 2026.
          </p>

          <div className="flex flex-wrap justify-center space-x-4 md:space-x-6 text-sm">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Cookies
            </Link>
            <Link
              href="/sitemap"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
