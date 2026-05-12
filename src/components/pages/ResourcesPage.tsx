import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { LazyMotion, domAnimation, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Building,
  Globe,
  Hammer,
  Heart,
  Star,
  Target,
  Users
} from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from "tailwind-merge";
import { ImageWithFallback } from '../figma/ImageWithFallback';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}, ref) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
});

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <h4
      data-slot="card-title"
      className={cn("leading-none", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 [&:last-child]:pb-6", className)}
      {...props}
    />
  );
}

// Define the component's props interface.
interface MissionVisionPageProps {
  // Optional prop for handling page changes, useful for parent components.
  onPageChange?: (page: string) => void;
}

const ResourcesPage: React.FC<MissionVisionPageProps> = ({ onPageChange }) => {
  const { t } = useTranslation();

  // WhatsApp Donation Handler
  const handleDonateClick = useCallback(() => {
    const phoneNumber = '919452463669';
    const message = encodeURIComponent(t('resources.whatsappDonationMessage'));
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }, [t]);

  // WhatsApp Donation for Construction Project
  const handleDonateProject = useCallback(() => {
    const phoneNumber = '9452463669';
    const message = encodeURIComponent(t('resources.whatsappProjectDonationMessage'));
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }, [t]);

  // Optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const rotateVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Animated Counter Component
  const AnimatedCounter: React.FC<{ value: number; duration?: number }> = ({ value, duration = 2 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
      if (isInView) {
        let startTime: number;
        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
          setCount(Math.floor(progress * value));
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(value);
          }
        };
        requestAnimationFrame(animate);
      }
    }, [isInView, value, duration]);

    return (
      <div ref={ref} className="text-4xl lg:text-5xl font-bold text-white mb-2">
        {count}+
      </div>
    );
  };

  // Hook to check if element is in viewport
  const useInView = (ref: React.RefObject<HTMLElement>, options?: IntersectionObserverInit) => {
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setIsInView(entry.isIntersecting);
      }, options);
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [ref, options]);
    return isInView;
  };

  // Handles the click event for the "Join Us" button.
  const handleJoinUs = useCallback(() => {
    if (onPageChange) {
      onPageChange('contact');
    }
  }, [onPageChange]);

  // Data for the core goals section.
  const coreGoals = useMemo(() => [
    {
      title: t("resources.producingHuffaz"),
      description: t("resources.producingHuffazDescription"),
      icon: BookOpen
    },
    {
      title: t("resources.makingQuranSimple"),
      description: t("resources.makingQuranSimpleDescription"),
      icon: BookOpen
    },
    {
      title: t("resources.promotingArabicLanguage"),
      description: t("resources.promotingArabicLanguageDescription"),
      icon: Globe
    },
    {
      title: t("resources.strengtheningUrduMotherTongue"),
      description: t("resources.strengtheningUrduMotherTongueDescription"),
      icon: Users
    },
    {
      title: t("resources.buildingTrustworthyInstitution"),
      description: t("resources.buildingTrustworthyInstitutionDescription"),
      icon: Building
    }
  ], [t]);

  // Data for the quick stats section.
  const stats = useMemo(() => [
    { label: t("resources.stats.huffazTraining"), value: 200 },
    { label: t("resources.stats.qualifiedTeachers"), value: 30 },
    { label: t("resources.stats.studentsBenefited"), value: 1000 },
    { label: t("resources.stats.programs"), value: 10 }
  ], [t]);

  // Data for the ongoing construction section
  const constructionImages = useMemo(() => [
    {
      src: "/assets/phas1.webp",
      subheading: t("resources.construction.phase1.subheading"),
      details: t("resources.construction.phase1.details")
    },
    {
      src: "/assets/c1.webp",
      subheading: t("resources.construction.phase2.subheading"),
      details: t("resources.construction.phase2.details")
    },
    {
      src: "/assets/c3.webp",
      subheading: t("resources.construction.phase3.subheading"),
      details: t("resources.construction.phase3.details")
    },
    {
      src: "/assets/c5.webp",
      subheading: t("resources.construction.phase4.subheading"),
      details: t("resources.construction.phase4.details")
    },
    {
      src: "/assets/c7.webp",
      subheading: t("resources.construction.phase5.subheading"),
      details: t("resources.construction.phase5.details")
    }
  ], [t]);

  return (
    <LazyMotion features={domAnimation}>
      {/* Main container with a minimum height and consistent background color. */}
      <div className="min-h-screen bg-white font-sans">
        {/* Hero Section: A large, eye-catching banner with a gradient background. */}
        <motion.section
          className="relative bg-gradient-to-br from-[#1F7A53] via-[#1e6b48] to-[#1a5d40] py-20 lg:py-32 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative, semi-transparent circular elements for visual interest. */}
          <motion.div
            className="absolute inset-0 opacity-10"
            variants={rotateVariants}
            initial="initial"
            animate="animate"
          >
            <div className="absolute top-10 left-10 w-64 h-64 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 border border-white/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-white/20 rounded-full"></div>
          </motion.div>

          {/* Content of the hero section, centered and styled. */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              className="mb-6 flex justify-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6"
                variants={pulseVariants}
                initial="initial"
                animate="animate"
              >
                <BookOpen className="w-10 h-10 text-white" />
              </motion.div>
            </motion.div>
            <motion.h1
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t('resources.ourMissionVision')}
            </motion.h1>
            <motion.p
              className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {t('resources.nurturingFaithKnowledgeService')}
            </motion.p>
          </div>
        </motion.section>

        {/* Mission Section: A two-column layout for text and a quote card. */}
        <motion.section
          className="py-20 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Mission statement content */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center mb-6">
                  <motion.div
                    className="w-12 h-12 bg-[#1F7A53] rounded-lg flex items-center justify-center mr-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Target className="w-6 h-6 text-white" />
                  </motion.div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0D0E]">
                    {t('resources.ourMission')}
                  </h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {t('resources.missionDescription')}
                </p>

                {/* Three-column grid for key mission values. */}
                <div className="grid grid-cols-3 gap-4">
                  <motion.div className="text-center" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                    <motion.div
                      className="w-16 h-16 bg-[#F1F5F9] rounded-lg flex items-center justify-center mx-auto mb-3"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <BookOpen className="w-8 h-8 text-[#1F7A53]" />
                    </motion.div>
                    <p className="text-sm font-medium text-gray-700">{t('resources.quranBased')}</p>
                  </motion.div>
                  <motion.div className="text-center" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                    <motion.div
                      className="w-16 h-16 bg-[#F1F5F9] rounded-lg flex items-center justify-center mx-auto mb-3"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart className="w-8 h-8 text-[#1F7A53]" />
                    </motion.div>
                    <p className="text-sm font-medium text-gray-700">{t('resources.characterBuilding')}</p>
                  </motion.div>
                  <motion.div className="text-center" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                    <motion.div
                      className="w-16 h-16 bg-[#F1F5F9] rounded-lg flex items-center justify-center mx-auto mb-3"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Building className="w-8 h-8 text-[#1F7A53]" />
                    </motion.div>
                    <p className="text-sm font-medium text-gray-700">{t('resources.modernExcellence')}</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Quranic quote card. */}
              <motion.div variants={itemVariants} className="relative">
                <Card className="rounded-2xl p-8 lg:p-12 h-full flex items-center justify-center shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="text-center">
                    <motion.div
                      className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Star className="w-12 h-12 text-[#1F7A53]" />
                    </motion.div>
                    <blockquote className="text-xl font-semibold text-[#0B0D0E] mb-4 italic">
                      "{t('resources.quranQuote')}"
                    </blockquote>
                    <cite className="text-[#1F7A53] font-medium">{t('resources.quranReference')}</cite>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Core Goals Section: A grid of cards describing the goals. */}
        <motion.section
          className="py-20 bg-[#F9FAFB]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              variants={itemVariants}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4">
                {t('resources.ourCoreGoals')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('resources.coreGoalsDescription')}
              </p>
            </motion.div>

            {/* Grid for the core goal cards. */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {coreGoals.map((goal, index) => {
                const IconComponent = goal.icon;
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  >
                    <Card className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300 group h-full flex flex-col">
                      {/* Card content with left alignment for icons and text. */}
                      <CardContent className="p-6 flex flex-col items-start text-left">
                        <motion.div
                          className="w-14 h-14 bg-[#1F7A53] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <IconComponent className="w-7 h-7 text-white" />
                        </motion.div>
                        <CardTitle className="text-xl font-bold text-[#0B0D0E] leading-tight mb-2">
                          {goal.title}
                        </CardTitle>
                        <p className="text-gray-700 leading-relaxed flex-grow">{goal.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.section>

        {/* New On-Going Construction Section */}
        <motion.section
          className="py-20 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.div variants={itemVariants} className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-[#1e5fa8] rounded-full flex items-center justify-center">
                  <Hammer className="w-10 h-10 text-white" />
                </div>
              </motion.div>
              <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4">
                {t('resources.onGoingConstruction')}
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('resources.onGoingConstructionDescription')}
              </motion.p>
            </div>

            {/* Grid for construction images */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {constructionImages.map((project, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <Card className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative overflow-hidden rounded-t-xl h-64">
                      <ImageWithFallback
                        src={project.src}
                        alt={project.subheading}
                        className={`w-full h-full transition-transform duration-300 group-hover:scale-110 object-cover`}
                        style={index === 0 ? { transform: 'scale(1.5)' } : {}}
                      />
                    </div>
                    <CardContent className="p-6 flex flex-col items-start">
                      <CardTitle className="text-xl font-bold text-[#0B0D0E] mb-2">
                        {project.subheading}
                      </CardTitle>
                      <p className="text-gray-700 leading-relaxed">{project.details}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Donate button */}
            <motion.div
              className="text-center mt-12"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: [1, 1.02, 1],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <Button
                  onClick={handleDonateProject}
                  className="bg-[#1F7A53] hover:bg-[#1F7A53]/90 text-white text-lg px-10 py-6 font-semibold rounded-full shadow-xl hover:shadow-2xl hover:shadow-[#1F7A53]/50 transition-all duration-300"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  {t('resources.donateForProject')}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Section: Displays key metrics with animated counters. */}
        <motion.section
          className="py-20 bg-[#1F7A53]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              variants={itemVariants}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {t('resources.quickStats')}
              </h2>
              <p className="text-xl text-white/90">
                {t('resources.statsDescription')}
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                    <AnimatedCounter value={stat.value} />
                    <div className="text-white/90 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action Section: Encourages students and community support. */}
        <motion.section
          className="py-20 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              className="mb-8"
              variants={itemVariants}
            >
              <motion.div
                className="w-24 h-24 bg-[#1F7A53] rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Heart className="w-12 h-12 text-white" />
              </motion.div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4">
                {t('resources.joinUs')}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {t('resources.joinUsDescription')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Student & Families Card */}
              <motion.div variants={cardVariants} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                <Card className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="w-10 h-10 text-[#1F7A53] mx-auto mb-4"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Users className="w-full h-full" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-[#0B0D0E] mb-2">{t('resources.studentsFamilies')}</h3>
                    <p className="text-gray-600 mb-4">
                      {t('resources.studentsFamiliesDescription')}
                    </p>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleJoinUs}
                        className="bg-[#1F7A53] hover:bg-[#1F7A53]/90 text-white w-full"
                      >
                        {t('resources.applyForAdmission')}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Community Support Card */}
              <motion.div variants={cardVariants} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                <Card className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="w-10 h-10 text-[#1e5fa8] mx-auto mb-4"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Building className="w-full h-full" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-[#0B0D0E] mb-2">{t('resources.communitySupport')}</h3>
                    <p className="text-gray-600 mb-4">
                      {t('resources.communitySupportDescription')}
                    </p>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleDonateClick}
                        className="bg-[#1F7A53] hover:bg-[#1F7A53]/90 text-white w-full"
                      >
                        {t('resources.supportOurMission')}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.p
              className="text-gray-600 italic"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              "{t('resources.quranVerse')}" - {t('resources.quranVerseReference')}
            </motion.p>
          </div>
        </motion.section>
      </div>
    </LazyMotion>
  );
};

export default ResourcesPage;