import { Slot } from "@radix-ui/react-slot";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { LazyMotion, domAnimation, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  GraduationCap,
  Heart,
  Home,
  Users,
  Utensils,
  Wifi
} from 'lucide-react';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
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

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
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

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] flex",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-card dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );}

interface ProgramsPageProps {
  onPageChange: (page: string) => void;
}

interface Department {
  slug: string;
  name: string;
  summary: string;
  description?: string;
  duration?: string;
  prerequisites?: string;
  facilities?: string[];
}

const ProgramsPage: React.FC<ProgramsPageProps> = ({ onPageChange }) => {
  const { t } = useTranslation();

  // WhatsApp Donation Handler
  const handleDonateClick = useCallback(() => {
    const phoneNumber = '919452463669';
    const message = encodeURIComponent(t('cta.donateNowMessage'));
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
        ease: 'easeOut'
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
        ease: 'easeOut'
      }
    }
  };

  const ACADEMIC_DEPARTMENTS: Department[] = useMemo(() => [
    {
      slug: 'tajweed',
      name: t('programsPage.academic.tajweed.name'),
      summary: t('programsPage.academic.tajweed.summary'),
      description: t('programsPage.academic.tajweed.description'),
      prerequisites: t('programsPage.academic.tajweed.prerequisites')
    },
    {
      slug: 'naajrah',
      name: t('programsPage.academic.naajrah.name'),
      summary: t('programsPage.academic.naajrah.summary'),
      description: t('programsPage.academic.naajrah.description'),
      prerequisites: t('programsPage.academic.naajrah.prerequisites')
    },
    {
      slug: 'hifz',
      name: t('programsPage.academic.hifz.name'),
      summary: t('programsPage.academic.hifz.summary'),
      description: t('programsPage.academic.hifz.description'),
      prerequisites: t('programsPage.academic.hifz.prerequisites')
    },
    {
      slug: 'aalimiyat',
      name: t('programsPage.academic.aalimiyat.name'),
      summary: t('programsPage.academic.aalimiyat.summary'),
      description: t('programsPage.academic.aalimiyat.description'),
      prerequisites: t('programsPage.academic.aalimiyat.prerequisites')
    },
    {
      slug: 'computer-science',
      name: t('programsPage.academic.computerScience.name'),
      summary: t('programsPage.academic.computerScience.summary'),
      description: t('programsPage.academic.computerScience.description'),
      prerequisites: t('programsPage.academic.computerScience.prerequisites')
    },
    {
      slug: 'ncert',
      name: t('programsPage.academic.ncertCourses.name'),
      summary: t('programsPage.academic.ncertCourses.summary'),
      description: t('programsPage.academic.ncertCourses.description'),
      prerequisites: t('programsPage.academic.ncertCourses.prerequisites')
    },
    {
      slug: 'bazm-siddiq',
      name: t('programsPage.academic.bazmSiddiq.name'),
      summary: t('programsPage.academic.bazmSiddiq.summary'),
      description: t('programsPage.academic.bazmSiddiq.description'),
    },
    {
      slug: 'arabic-literature',
      name: t('programsPage.academic.arabicLiterature.name'),
      summary: t('programsPage.academic.arabicLiterature.summary'),
      description: t('programsPage.academic.arabicLiterature.description'),
      prerequisites: t('programsPage.academic.arabicLiterature.prerequisites')
    },
    {
      slug: 'mazlis-talaba',
      name: t('programsPage.academic.majlisTalaba.name'),
      summary: t('programsPage.academic.majlisTalaba.summary'),
      description: t('programsPage.academic.majlisTalaba.description'),
    },
    {
      slug: 'girls-education',
      name: t('programsPage.academic.girlsEducation.name'),
      summary: t('programsPage.academic.girlsEducation.summary'),
      description: t('programsPage.academic.girlsEducation.description'),
    }
  ], [t]);

  const SERVICE_DEPARTMENTS: Department[] = useMemo(() => [
    {
      slug: 'dining-hall',
      name: t('programsPage.service.diningHall.name'),
      summary: t('programsPage.service.diningHall.summary'),
      description: t('programsPage.service.diningHall.description'),
      facilities: [
        t('programsPage.service.diningHall.facilities.hygienicKitchen'),
        t('programsPage.service.diningHall.facilities.spaciousSeating'),
        t('programsPage.service.diningHall.facilities.regularMealService'),
        t('programsPage.service.diningHall.facilities.specialDietaryAccommodations')
      ]
    },
    {
      slug: 'playground',
      name: t('programsPage.service.playground.name'),
      summary: t('programsPage.service.playground.summary'),
      description: t('programsPage.service.playground.description'),
      facilities: [
        t('programsPage.service.playground.facilities.cricketPitch'),
        t('programsPage.service.playground.facilities.footballField'),
        t('programsPage.service.playground.facilities.runningTrack'),
        t('programsPage.service.playground.facilities.sportsEquipment')
      ]
    },
    {
      slug: 'medical-room',
      name: t('programsPage.service.medicalRoom.name'),
      summary: t('programsPage.service.medicalRoom.summary'),
      description: t('programsPage.service.medicalRoom.description'),
      facilities: [
        t('programsPage.service.medicalRoom.facilities.firstAid'),
        t('programsPage.service.medicalRoom.facilities.emergencyCare'),
        t('programsPage.service.medicalRoom.facilities.regularCheckups'),
        t('programsPage.service.medicalRoom.facilities.medicationDispensation')
      ]
    },
    {
      slug: 'lecture-hall',
      name: t('programsPage.service.lectureHall.name'),
      summary: t('programsPage.service.lectureHall.summary'),
      description: t('programsPage.service.lectureHall.description'),
      facilities: [
        t('programsPage.service.lectureHall.facilities.audioVisualSystems'),
        t('programsPage.service.lectureHall.facilities.climateControl'),
        t('programsPage.service.lectureHall.facilities.comfortableSeating'),
        t('programsPage.service.lectureHall.facilities.presentationEquipment')
      ]
    },
    {
      slug: 'kitchen',
      name: t('programsPage.service.bigMessKitchen.name'),
      summary: t('programsPage.service.bigMessKitchen.summary'),
      description: t('programsPage.service.bigMessKitchen.description'),
      facilities: [
        t('programsPage.service.bigMessKitchen.facilities.industrialEquipment'),
        t('programsPage.service.bigMessKitchen.facilities.hygienicPreparation'),
        t('programsPage.service.bigMessKitchen.facilities.storageFacilities'),
        t('programsPage.service.bigMessKitchen.facilities.professionalStaff')
      ]
    }
  ], [t]);

  const FALLBACK_DEPARTMENTS: Department[] = useMemo(() => [...ACADEMIC_DEPARTMENTS, ...SERVICE_DEPARTMENTS], [ACADEMIC_DEPARTMENTS, SERVICE_DEPARTMENTS]);

  const ICON_MAP: { [key: string]: React.ComponentType<any> } = useMemo(() => ({
    [t('programsPage.academic.tajweed.slug')]: BookOpen,
    [t('programsPage.academic.naajrah.slug')]: GraduationCap,
    [t('programsPage.academic.hifz.slug')]: Heart,
    [t('programsPage.academic.aalimiyat.slug')]: BookOpen,
    [t('programsPage.academic.computerScience.slug')]: GraduationCap,
    [t('programsPage.academic.ncertCourses.slug')]: BookOpen,
    [t('programsPage.academic.bazmSiddiq.slug')]: Users,
    [t('programsPage.academic.arabicLiterature.slug')]: BookOpen,
    [t('programsPage.academic.majlisTalaba.slug')]: Users,
    [t('programsPage.academic.girlsEducation.slug')]: GraduationCap,
    [t('programsPage.service.diningHall.slug')]: Utensils,
    [t('programsPage.service.playground.slug')]: Home,
    [t('programsPage.service.medicalRoom.slug')]: Heart,
    [t('programsPage.service.lectureHall.slug')]: BookOpen,
    [t('programsPage.service.bigMessKitchen.slug')]: Utensils
  }), [t]);

  const CATEGORIES = {
    all: t('programsPage.tabs.allCourses'),
    academic: t('programsPage.tabs.academicCourses'),
    services: t('programsPage.tabs.servicesFacilities')
  };

  const ACADEMIC_SLUGS = useMemo(() => new Set(ACADEMIC_DEPARTMENTS.map(dept => dept.slug)), [ACADEMIC_DEPARTMENTS]);
  const SERVICE_SLUGS = useMemo(() => new Set(SERVICE_DEPARTMENTS.map(dept => dept.slug)), [SERVICE_DEPARTMENTS]);

  // Memoized ProgramCard component
  const ProgramCard = memo(({
    dept,
    onPageChange,
  }: {
    dept: Department;
    onPageChange: (page: string) => void;
  }) => {
    const IconComponent = ICON_MAP[dept.slug] || BookOpen;
    const isService = SERVICE_SLUGS.has(dept.slug);

    const handleClick = useCallback(() => {
      if (!isService) {
        setSelectedDepartment(dept);
      }
    }, [isService, dept]);

    return (
      <motion.div
        key={dept.slug}
        variants={cardVariants}
        whileHover={{
          y: -5,
          transition: { duration: 0.3, ease: 'easeOut' }
        }}
      >
        <Card
          className="group h-full cursor-pointer rounded-xl shadow-md hover:shadow-lg transition-all duration-500 hover:bg-gradient-to-tr from-[#EAF2FB] to-[#E8F5EF]"
          onClick={handleClick}
        >
          <CardHeader className="p-6">
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-[#1F7A53] bg-white"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <IconComponent className="w-8 h-8 text-[#1F7A53]" />
            </motion.div>
            <div className="text-center">
              <CardTitle className="text-2xl font-semibold text-[#0B0D0E] leading-tight mb-4 group-hover:text-[#1F7A53] transition-colors duration-300">
                {dept.name}
              </CardTitle>
              <Badge
                variant="outline"
                className={isService ? 'text-[#1E5FA8] border-[#1E5FA8]' : 'text-[#1F7A53] border-[#1F7A53]'}
              >
                {isService ? t('programsPage.card.service') : t('programsPage.card.academic')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-600 text-base mb-4 line-clamp-3 text-center">{dept.summary}</p>

            {dept.duration && (
              <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                <Clock className="w-4 h-4 mr-2" />
                {dept.duration}
              </div>
            )}

            {!isService && (
              <Button
                variant="ghost"
                className="w-full text-green-700 text-base font-medium flex items-center justify-center hover:text-green-800 hover:translate-x-2 transition-all duration-300"
                onClick={handleClick}
              >
                {t('programsPage.card.moreInfo')} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  });

  ProgramCard.displayName = 'ProgramCard';

  // Memoized ServiceCard component
  const ServiceCard = memo(({
    service,
  }: {
    service: {
      icon: React.ComponentType<any>;
      title: string;
      description: string;
    };
  }) => {
    const IconComponent = service.icon;

    return (
      <motion.div
        variants={cardVariants}
        whileHover={{
          y: -5,
          transition: { duration: 0.3 }
        }}
      >
        <Card className="border-0 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-500 hover:bg-gradient-to-tr from-white to-[#E8F5EF]">
          <CardContent className="p-6">
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-[#1F7A53] bg-white"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <IconComponent className="w-8 h-8 text-[#1F7A53]" />
            </motion.div>
            <h3 className="text-2xl font-semibold text-[#0B0D0E] mb-4 text-center">{service.title}</h3>
            <p className="text-gray-600 text-base text-center">{service.description}</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  });

  ServiceCard.displayName = 'ServiceCard';

  // ProgramDetail component
  const ProgramDetail = memo(({
    department,
    onBack,
  }: {
    department: Department;
    onBack: () => void;
  }) => {
    const IconComponent = ICON_MAP[department.slug] || BookOpen;

    const handleContactClick = useCallback(() => {
      const phoneNumber = '919452463669';
      const message = encodeURIComponent(t('programsPage.programDetail.whatsappMessage', { programName: department.name }));
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    }, [department.name, t]);

    return (
      <div className="min-h-screen bg-gray-50">
        <motion.section
          className="bg-gradient-to-r from-[#E8F5EF] via-white to-[#EAF2FB] py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-6 text-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-[#1F7A53] hover:text-[#1F7A53]/80"
              >
                {t('programsPage.backToPrograms')}
              </Button>
            </motion.div>
            <motion.div
              className="flex flex-col items-center space-y-4 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-[#1F7A53] bg-white"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <IconComponent className="w-8 h-8 text-[#1F7A53]" />
              </motion.div>
              <div className="text-center">
                <h1 className="text-4xl lg:text-5xl font-semibold text-[#0B0D0E] leading-tight mb-2">
                  {department.name}
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {department.summary}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="py-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={itemVariants}>
              <Card className="rounded-xl shadow-md hover:shadow-lg transition-all duration-500 hover:bg-gradient-to-tr from-[#EAF2FB] to-[#E8F5EF]">
                <CardContent className="p-6 text-center">
                  <h2 className="text-2xl font-semibold text-[#0B0D0E] mb-4">{t('programsPage.programOverview')}</h2>
                  <p className="text-gray-600 text-base mb-6">{department.description}</p>

                  {department.facilities && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-[#0B0D0E] mb-4">{t('programsPage.facilitiesAvailable')}</h3>
                      <div className="flex flex-col items-center gap-2">
                        {department.facilities.map((facility, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center space-x-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                          >
                            <CheckCircle className="w-5 h-5 text-[#1F7A53] flex-shrink-0" />
                            <span className="text-gray-600">{facility}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {department.duration && (
                    <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                      <Clock className="w-4 h-4 mr-2" />
                      {department.duration}
                    </div>
                  )}

                  {department.prerequisites && (
                    <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      {department.prerequisites}
                    </div>
                  )}

                  <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
                    <Users className="w-4 h-4 mr-2" />
                    15-20 students
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full text-green-700 text-base font-medium flex items-center justify-center hover:text-green-800 hover:translate-x-2 transition-all duration-300"
                    onClick={handleContactClick}
                  >
                    {t('programsPage.contactNow')} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>
      </div>
    );
  });

  ProgramDetail.displayName = 'ProgramDetail';

  const [departments, setDepartments] = useState<Department[]>(FALLBACK_DEPARTMENTS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const filteredDepartments = useMemo(() => {
    switch (selectedCategory) {
      case 'academic':
        return departments.filter(dept => ACADEMIC_SLUGS.has(dept.slug));
      case 'services':
        return departments.filter(dept => SERVICE_SLUGS.has(dept.slug));
      default:
        // 'all' category
        return departments;
    }
  }, [departments, selectedCategory, ACADEMIC_SLUGS, SERVICE_SLUGS]);

  const handleBackClick = useCallback(() => {
    setSelectedDepartment(null);
  }, []);

  const handleApplyClick = useCallback(() => {
    onPageChange('contact');
  }, [onPageChange]);

  const handleLearnMoreClick = useCallback(() => {
    onPageChange('about');
  }, [onPageChange]);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 800);

        const response = await fetch('/data/departments.json', {
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          setDepartments(data);
        }
      } catch (error) {
        console.log('Using fallback data for better performance');
      } finally {
        setTimeout(() => setIsLoading(false), 50);
      }
    };

    loadDepartments();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <motion.div
            className="w-12 h-12 border-4 border-[#1F7A53] border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p className="text-gray-600">{t('programsPage.loadingPrograms')}</p>
        </div>
      </div>
    );
  }

  if (selectedDepartment) {
    return (
      <ProgramDetail
        department={selectedDepartment}
        onBack={handleBackClick}
      />
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen">
        {/* Header */}
        <motion.section
          className="bg-gradient-to-r from-[#E8F5EF] via-white to-[#EAF2FB] py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              className="text-4xl lg:text-5xl font-bold text-[#0B0D0E] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {t('programsPage.coursesHeader')}
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t('programsPage.coursesSubtitle')}
            </motion.p>
          </div>
        </motion.section>

        {/* Filter Tabs */}
        <motion.section
          className="py-16 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <motion.div variants={itemVariants}>
                <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-12">
                  <TabsTrigger value="all">{t('programsPage.tabs.allCourses')}</TabsTrigger>
                   <TabsTrigger value="academic">{t('programsPage.tabs.academicCourses')}</TabsTrigger>
                   <TabsTrigger value="services">{t('programsPage.tabs.servicesFacilities')}</TabsTrigger>
                </TabsList>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredDepartments.map((dept, index) => (
                  <ProgramCard
                    key={dept.slug}
                    dept={dept}
                    onPageChange={onPageChange}
                  />
                ))}
              </motion.div>
            </Tabs>
          </div>
        </motion.section>

        {/* Additional Services Info */}
        <motion.section
          className="py-20 bg-gray-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              variants={itemVariants}
            >
             <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4">
  {t('programsPage.programDetail.supportingJourneyTitle')}
</h2>
<p className="text-xl text-gray-600">
  {t('programsPage.programDetail.beyondAcademics')}
</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24"
              variants={containerVariants}
            >
              {[
                {
                  icon: Wifi,
                  title: t('programsPage.digitalResourcesTitle'),
                  description: t('programsPage.digitalResourcesDescription'),
                },
                {
                  icon: Utensils,
                  title: t('programsPage.diningServicesTitle'),
                  description: t('programsPage.diningServicesDescription'),
                },
                {
                  icon: Heart,
                  title: t('programsPage.studentWelfareTitle'),
                  description: t('programsPage.studentWelfareDescription'),
                }
              ].map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-16 bg-gradient-to-r from-[#1F7A53] to-[#1E5FA8] text-white relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'Radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.05) 0%, transparent 50%)'
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear'
            }}
          />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className="text-3xl lg:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('programsPage.readyToBeginJourney')}
            </motion.h2>
            <motion.p
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('programsPage.joinCommunity')}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-[#1F7A53] hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleApplyClick}
                >
                  <GraduationCap className="w-5 h-5 mr-2" />
                  {t('programsPage.applyNow')}
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue text-white bg-white text-[#1F7A53] transition-all duration-300"
                  onClick={handleDonateClick}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  {t('programsPage.donate')}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </LazyMotion>
  );
};

export default ProgramsPage;