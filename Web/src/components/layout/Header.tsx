"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Menu,
  X,
  Info,
  Target,
  Layers,
  Cpu,
  BarChart,
  Users,
} from "lucide-react";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { cn } from "@/lib/utils";
import { AnimatedHandIcon } from "../ui/AnimatedHandIcon";

const navigation = [
  { name: "About", href: "/#about", icon: Info, id: "about" },
  { name: "Objective", href: "/#objectives", icon: Target, id: "objectives" },
  {
    name: "Architecture",
    href: "/#architecture",
    icon: Layers,
    id: "architecture",
  },
  { name: "Technology", href: "/#technologies", icon: Cpu, id: "technologies" },
  { name: "Results", href: "/#results", icon: BarChart, id: "results" },
  { name: "Team", href: "/#team", icon: Users, id: "team" },
];

// Animation variants
const headerVariants: Variants = {
  hidden: { y: -100 },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const mobileMenuVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
    },
  },
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const mobileItemVariants: Variants = {
  hidden: { x: 50, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.1 },
  }),
};

const navItemVariants: Variants = {
  hover: {
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const themeChangerVariants: Variants = {
  hover: {
    scale: 1.2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
  tap: {
    scale: 0.95,
  },
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll listener for active section
  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      // Check if we're at the top (hero section)
      if (scrollPosition < 200) {
        setActiveSection("");
        return;
      }

      // Check each section
      for (const item of navigation) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;

          if (
            scrollPosition >= elementTop - 100 &&
            scrollPosition < elementBottom - 100
          ) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Handle hash on mount and changes - FIXED: using requestAnimationFrame
  useEffect(() => {
    if (pathname !== "/") return;

    const hash = window.location.hash.replace("#", "");
    const rafId = requestAnimationFrame(() => {
      setActiveSection(hash || "");
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  // Close mobile menu when route changes - FIXED: using requestAnimationFrame
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      setIsOpen(false);
    });
    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Smooth scroll function
  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent, href: string, closeMenu?: () => void) => {
      e.preventDefault();

      if (closeMenu) closeMenu();

      const hash = href.split("#")[1];
      if (!hash) return;

      // Set active immediately
      setActiveSection(hash);

      const scrollToElement = () => {
        const element = document.getElementById(hash);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      };

      if (pathname !== "/") {
        router.push(href);
        setTimeout(scrollToElement, 100);
      } else {
        scrollToElement();
      }
    },
    [pathname, router],
  );

  // Logo click handler
  const handleLogoClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      setActiveSection("");

      if (pathname !== "/") {
        router.push("/");
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [pathname, router],
  );

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
            : "bg-background border-b",
        )}
      >
        <nav className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="shrink-0"
            >
              <Link
                href="/"
                onClick={handleLogoClick}
                className="shrink-0 block cursor-pointer"
              >
                <motion.div className="text-2xl md:text-3xl font-bold inline-flex items-center">
                  <AnimatedHandIcon />
                  <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pl-2">
                    SLSL
                  </span>
                  <span className="text-foreground/70 ml-1 text-xl md:text-2xl">
                    Translator
                  </span>
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-end flex-1 space-x-1">
              {navigation.map((item) => {
                const isActive = pathname === "/" && activeSection === item.id;

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="relative px-2 py-2 cursor-pointer"
                  >
                    <motion.div
                      variants={navItemVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className={cn(
                        "flex items-center text-sm font-medium transition-colors bg-primary/5 rounded-md px-3 py-1.5",
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-primary hover:bg-primary/5",
                      )}
                    >
                      <item.icon className="h-4 w-4 mr-2 shrink-0" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </motion.div>
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Desktop Right Section */}
            <motion.div
              variants={themeChangerVariants}
              whileHover="hover"
              whileTap="tap"
              className={cn(
                "hidden md:flex items-center justify-end space-x-3 md:ml-4",
              )}
            >
              <ThemeSwitcher />
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
              <ThemeSwitcher />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer" />
                ) : (
                  <Menu className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer" />
                )}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-16 right-0 bottom-0 w-full max-w-sm bg-background border-l shadow-xl z-40 md:hidden overflow-y-auto"
            >
              <div className="p-6 space-y-6 flex-col h-full flex justify-between">
                <div className="space-y-2">
                  {navigation.map((item, index) => {
                    const isActive =
                      pathname === "/" && activeSection === item.id;

                    return (
                      <motion.div
                        key={item.name}
                        custom={index}
                        variants={mobileItemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <motion.a
                          href={item.href}
                          onClick={(e) =>
                            handleSmoothScroll(e, item.href, () =>
                              setIsOpen(false),
                            )
                          }
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors cursor-pointer",
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground bg-primary/5 hover:bg-muted",
                          )}
                        >
                          <item.icon className="h-5 w-5 shrink-0" />
                          <span className="font-medium">{item.name}</span>
                          {isActive && (
                            <motion.div
                              layoutId="mobile-active"
                              className="ml-auto w-1.5 h-1.5 bg-primary rounded-full"
                            />
                          )}
                        </motion.a>
                      </motion.div>
                    );
                  })}
                </div>
                <div>
                  <div className="border-t border-border pb-8" />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-4 text-sm text-muted-foreground"
                  >
                    <p className="text-center">
                      Real-time SLSL to Sinhala translation for healthcare
                    </p>
                    <div className="flex justify-center mt-4 gap-2">
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="text-xs px-2 py-1 bg-primary/10 rounded-full text-primary"
                      >
                        468 features
                      </motion.span>
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="text-xs px-2 py-1 bg-primary/10 rounded-full text-primary"
                      >
                        &lt;120ms
                      </motion.span>
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="text-xs px-2 py-1 bg-primary/10 rounded-full text-primary"
                      >
                        8.2 MB
                      </motion.span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  );
}
