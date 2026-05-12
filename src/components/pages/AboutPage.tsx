import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { motion } from 'framer-motion';
import {
  BookOpen,
  Building,
  Download,
  Eye,
  Heart,
  Pause,
  Play,
  Target,
  Users
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from "tailwind-merge";
import { ImageWithFallback } from '../figma/ImageWithFallback';

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

interface AboutPageProps {
  onPageChange: (page: string) => void;
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleOnHover = {
  scale: 1.03,
  transition: { duration: 0.3, ease: "easeOut" }
};

const rotateOnHover = {
  rotate: 5,
  scale: 1.1,
  transition: { duration: 0.3 }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: { duration: 2, repeat: Infinity }
};

const AboutPage: React.FC<AboutPageProps> = ({ onPageChange }) => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(true);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!galleryRef.current || !isPlaying) return;

    const gallery = galleryRef.current;
    let scrollPos = 0;
    const itemWidth = 320 + 16; // w-80 (320px) + gap-4 (16px)
    const totalItems = gallery.children.length / 2;
    let direction = 1; // 1 for right, -1 for left

    const scrollInterval = setInterval(() => {
      if (!gallery) return;
      const maxScroll = gallery.scrollWidth - gallery.clientWidth;

      if (direction === 1) {
        if (gallery.scrollLeft >= maxScroll) {
          direction = -1;
        } else {
          gallery.scrollLeft += 1;
        }
      } else {
        if (gallery.scrollLeft <= 0) {
          direction = 1;
        } else {
          gallery.scrollLeft -= 1;
        }
      }
    }, 20);

    return () => clearInterval(scrollInterval);
  }, [isPlaying]);

  const handleStartTour = () => {
    window.open('https://maps.app.goo.gl/a4mLk2aSqVi9q7Uq5', '_blank');
  };

  const timeline = [
    {
      year: '1999',
      title: t('programsPage.about.timeline.foundation.title', 'Foundation'),
      description: t('programsPage.about.timeline.foundation.description', 'Established with a vision to provide authentic Islamic education')
    },
    {
      year: '2005',
      title: t('programsPage.about.timeline.libraryExpansion.title', 'Library Expansion'),
      description: t('programsPage.about.timeline.libraryExpansion.description', 'Added comprehensive library with 5,000+ books and manuscripts')
    },
    {
      year: '2010',
      title: t('programsPage.about.timeline.hostelFacility.title', 'Hostel Facility'),
      description: t('programsPage.about.timeline.hostelFacility.description', 'Opened student hostel to accommodate out-of-town students')
    },
    {
      year: '2015',
      title: t('programsPage.about.timeline.darulIfta.title', 'Dar-ul-Ifta Launch'),
      description: t('programsPage.about.timeline.darulIfta.description', 'Started Fatwa services to serve the wider Muslim community')
    },
    {
      year: '2020',
      title: t('programsPage.about.timeline.digitalInitiative.title', 'Digital Initiative'),
      description: t('programsPage.about.timeline.digitalInitiative.description', 'Launched online learning platform and digital resources')
    },
    {
      year: '2024',
      title: t('programsPage.about.timeline.anniversary.title', '25 Years of Service'),
      description: t('programsPage.about.timeline.anniversary.description', 'Celebrating a quarter-century of educational excellence')
    }
  ];

  const leadership = [
    {
      name: t('programsPage.about.principalName', 'Maulana Abdul Tawwab Sahab'),
      position: t('programsPage.about.principalPosition', 'Principal'),
    },
    {
      name: t('programsPage.about.vicePrincipalName', 'Mufti Muhammad Imran Sahab'),
      position: t('programsPage.about.vicePrincipalPosition', 'Vice Principal'),
    }
  ];

  const affiliations = [
    'Wifaq-ul-Madaris Al-Arabiyyah',
    'Dar-ul-Uloom Deoband Alumni Network',
    'International Islamic Education Council',
    'Association of Islamic Schools & Colleges'
  ];

  const facilities = [
    { name: t('programsPage.about.libraryName', 'Library'), description: t('programsPage.about.libraryDescription', 'A comprehensive collection of Islamic and modern texts.') },
    { name: t('programsPage.about.hostelName', 'Hostel'), description: t('programsPage.about.hostelDescription', 'Comfortable and secure accommodation for students.') },
    { name: t('programsPage.about.mosqueName', 'Mosque'), description: t('programsPage.about.mosqueDescription', 'A serene place for prayers and spiritual gatherings.') },
    { name: t('programsPage.about.computerLabName', 'Computer Lab'), description: t('programsPage.about.computerLabDescription', 'Equipped with modern computers and internet access.') },
    { name: t('programsPage.about.medicalFacilityName', 'Medical Facility'), description: t('programsPage.about.medicalFacilityDescription', 'On-site medical assistance for students and staff.') }
  ];

  const galleryImages = [
    '/assets/p00.png',
    '/assets/h1.png',
    '/assets/h2.png',
    '/assets/h6.png',
    '/assets/m1.png',
    '/assets/m3.png',
    '/assets/m2.png',
    '/assets/m1.png',
    '/assets/h4.png',
    '/assets/h5.png',
    '/assets/h1.png',
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-[#E8F5EF] via-white to-[#EAF2FB] py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h1
              animate={pulseAnimation}
              className="text-4xl lg:text-5xl font-bold text-[#0B0D0E] mb-4"
            >
              {t('programsPage.about.pageTitle', 'About Our Institution')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              {t('programsPage.about.pageSubtitle', 'Committed to excellence in Islamic education, spiritual development, and community service for over 40 years.')}
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Our Journey Section with Updated UI */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 variants={fadeIn} className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4">
              {t('programsPage.about.journeyTitle', 'Our Journey & Legacy')}
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-gray-600">
              {t('programsPage.about.journeySubtitle', 'A rich history of spreading knowledge, rooted in the dedication of our founders.')}
            </motion.p>
          </div>

          <motion.div variants={fadeIn} className="text-gray-700 text-lg leading-relaxed text-justify space-y-6">
            <h3 className="text-2xl font-bold text-[#1F7A53] mb-4 text-center">
              {t('programsPage.about.madrasaTitle', 'Madrasah Arabia Tajweed-ul-Qur\'an')}
            </h3>
            <p className="text-center">
              <strong>{t('programsPage.about.establishment', 'Establishment')}:</strong> {t('programsPage.about.establishmentYear', '1404 Hijri. / 1984 Yr.')}
            </p>
            <p className="text-center">
              <strong>{t('programsPage.about.patrons', 'Elders/Patrons')}:</strong> {t('programsPage.about.patronsNames', 'Hazrat Maulana Qari Sayyed Siddiq Ahmad Sahab Bandvi (rahimahullah) and Hazrat Maulana Mufti Mahmudul Hasan Sahab Deobandi (rahimahullah).')}
            </p>
            <p className="text-center">
              <strong>{t('programsPage.about.founder', 'Founder')}:</strong> {t('programsPage.about.founderName', 'Hazrat Maulana Sayyed Siddiqui Ahmad Sahab.')}
            </p>

            <p className="mt-8">
              {t('programsPage.about.madrasaHistory', 'Madrasa Arabia Tajweedul Qur\'an is situated in Masauni, post office Kalinjar, tehsil Naraini, District BANDA (UP). This area of Masauni, surrounded by hills and a very famous heritage site (Kalinjar Fort), was considered backward in terms of religion, education, and morality. The great scholar of Islam, Hazrat Allama, Faqih-e-Millat, Hazrat Maulana Sayyed Qari Siddiq Ahmad Sahab Bandvi (rahimahullah), along with Mufti Mahmudul Hasan Sahab Deobandi (rahimahullah), and his student and a founder of this madrasa, Hazrat Maulana Sayyed Siddiq Ahmad Masaunvi (rahimahullah), established this madrasa in 1984 (1404 Hijri).')}
            </p>

            <p>
              {t('programsPage.about.founderDedication', 'Hazrat Maulana Sayyed Siddiq Ahmad Masaunvi (rahimahullah) was deeply devoted to Islam and had a strong desire to revive the Sunnah. He initiated this madrasa in the courtyard of his own house, aiming to provide a sacred place where the children of Muslims could learn the recitation of the Holy Qur\'an with proper **tajweed** (rules of pronunciation). With the cooperation of local people and generous support from devoted Muslims, this sacred institution came into existence. After him, the responsibility of handling the madrasa was handed over to the current principal, **Hazrat Maulana Sayyed Abdul Tawwab Sahab**. Since then, under the supervision of noble and sincere personalities, the madrasa has been continuously progressing. By the grace of Allah, it stands as a remarkable example of religious and educational development for the locality and surrounding areas.')}
            </p>

            <p>
              {t('programsPage.about.currentStatus', 'The madrasa is engaged in its noble mission with sincerity and determination. At present, it has **26 teachers** and about **515 students**, along with **13 branches** in its surrounding areas whose expenses are also maintained by the madrasa only. In addition to religious education, arrangements for modern and academic studies are also provided. The expenses of this madrasa are borne entirely by the generosity of Muslims, as it does not have any permanent source of income.')}
            </p>

            <p>
              {t('programsPage.about.educationDetails', 'Currently, about 515 students are receiving education here. Each year, nearly 80–100 students complete the Nazira Qur\'an (recitation with tajweed). Along with this, the madrasa provides a department of **Hifz** and a department of **Aalimiyat**. All these courses are maintained through the curriculum of **Darul Uloom Nadwa, Lucknow**. The madrasa also contains multiple departments and courses that help students shine in the future like a diamond. These children then become a source of happiness for their parents and a means of continuous reward for the founders of the madrasa.')}
            </p>
          </motion.div>

          {/* New Section for Girls' Madrasa */}
          <motion.div
            variants={fadeIn}
            className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-[#EAF2FB] to-white shadow-card"
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-[#1E5FA8] rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#1E5FA8] text-center">
                {t('programsPage.about.girlsSectionTitle', 'JAMIA-FATIMA-ZAHRA-LIL BANAAT (Girls\' Section)')}
              </h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed text-justify mb-4">
              {t('programsPage.about.girlsSectionText', 'Madarsa Arabia Tajweedul Quran is also running an Islamic institution for girls, which is currently being managed in a small house,with a total of students girls is 90.Which are from locals area only. the peoples from surrounding areas and different cities want to send their girl child to this Girl\'s institute but due to lack of accommodation and hostel facilities we are unable to meet its expenses and cannot provide them with proper comfort. Although the educational facilities are good,and it is same as good and better which we provide for boys. By the grace of Allah and through your prayers, land for the madrasa has already been arranged. Now, only the construction of the building and other requirements remain, for which we need your wishes and your presence in this project.')}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Founder Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="py-20 bg-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-12 text-center">
            {t('programsPage.about.founderSectionTitle', 'Our Esteemed Founder')}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              variants={fadeIn}
              className="flex justify-center"
            >
              <div className="w-80 h-80 rounded-full overflow-hidden shadow-xl border-4 border-white">
                <ImageWithFallback
                  src="/assets/foun.png"
                  alt="Hazrat Maulana Sayyed Siddique Ahmad Masaunvi (R.A)"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Card className="border-0 shadow-card bg-gradient-to-br from-[#E8F5EF] to-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#1F7A53] mb-4">
                    {t('programsPage.about.founderWordsTitle', 'Words from Our Founder')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 text-lg leading-relaxed space-y-4">
                  <p><strong>{t('programsPage.about.founderMessage', 'Dear Muslim Brothers,')}</strong></p>
                  <p>
                    {t('programsPage.about.founderMessageText1', 'It is with pride and privilege that I present the introduction to the services of Madrasa Arabia Tajveedul Quran, located in Village Masauni, Post Office Kalinjar, Tehsil Naraini, District BANDA (UP) 210129, India.')}
                  </p>
                  <p>
                    {t('programsPage.about.founderMessageText2', 'In 1984, I was deeply shocked to witness the emergence of Muslim conversions in my village and surrounding areas, where a few had already renounced Islam. I realized this was due to the absence of a Madrasa providing Islamic teachings.')}
                  </p>
                  <p>
                    {t('programsPage.about.founderMessageText3', 'For me, education was never limited to literacy alone; it was a means of building character, nurturing the soul, and preparing future generations to follow the path shown by Allah ﷻ and His beloved Prophet Muhammad ﷺ. Inspired by the Prophet\'s words, "The seeking of knowledge is obligatory upon every Muslim (male and female)," I established this institution where children learn to embody Islamic values such as honesty, compassion, humility, and respect.')}
                  </p>
                  <p>
                    {t('programsPage.about.founderMessageText4', 'Initially, I dedicated my spare time to teaching students. With Allah\'s blessings, generous individuals donated land, and construction began. We started with a few rooms with earthen walls and Khaprail roofs, and students from outside began residing there. Over time, with students\' assistance, construction continued despite significant challenges.')}
                  </p>
                  <p>
                    {t('programsPage.about.founderMessageText5', 'The dedication of our teaching staff, who persevered despite limited resources, deserves commendation. May Allah grant them abundant blessings (Ameen). May this endeavor thrive and alleviate their hardships (Ameen).')}
                  </p>
                  <p className="text-right italic text-sm text-gray-500 mt-6">
                    {t('programsPage.about.founderSignature', '- Hazrat Maulana Sayyed Siddique Ahmad Masaunvi (R.A), Founder')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Nazim's Message Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-12 text-center">
            {t('programsPage.about.nazimSectionTitle', 'Nazim\'s Message')}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div variants={fadeIn}>
              <Card className="border-0 shadow-card bg-gradient-to-br from-[#EAF2FB] to-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#1E5FA8] mb-4">
                    {t('programsPage.about.nazimMessageTitle', 'Message from Maulana Abdul Tawwab Sahab')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 text-lg leading-relaxed space-y-4">
                  <p>{t('programsPage.about.nazimMessageText1', 'It is with deep reverence that we inform all friends and concerned individuals that Hazrat Maulana Sayyed Siddiq Ahmad Masaunvi (R.A), the esteemed founder of Madarsa Arabia Tajveedul Quran Masauni, passed away on June 6th, 2013 (1418 Hijri).')}</p>
                  <p>{t('programsPage.about.nazimMessageText2', 'Despite my reluctance and Maulana\'s reservations, I was entrusted with continuing his legacy. Alhamdulillah, over the past twelve years, with the grace of the founder, guidance of our revered elders, and support of well-wishers, I have carried forward this work, bringing a sense of fulfillment.')}</p>
                  <p>{t('programsPage.about.nazimMessageText3', 'Beyond the Madrasa, we strive to meet the religious and cultural needs of our community consistently.')}</p>
                  <p>{t('programsPage.about.nazimMessageText4', 'Introducing Madarsa Arabia Tajveedul Quran Masauni: We have created an introductory website with essential information, images, and my father\'s 1984 appeal. We hope it proves valuable to all well-wishers.')}</p>
                  <p>{t('programsPage.about.nazimMessageText5', 'I earnestly invite everyone to visit our institution in person. Your presence will be a source of encouragement. May Allah bless us all.')}</p>
                  <p className="text-right italic text-sm text-gray-500 mt-6">
                    {t('programsPage.about.nazimSignature', '- Maulana Abdul Tawwab Sahab, Nazim')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              variants={fadeIn}
              className="flex justify-center"
            >
              <div className="w-80 h-80 rounded-full overflow-hidden shadow-xl border-4 border-white">
                <ImageWithFallback
                  src="/assets/pr.jpg"
                  alt="Maulana Abdul Tawwab Sahab"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div variants={fadeIn}>
              <motion.div whileHover={scaleOnHover}>
                <Card className="border-0 shadow-card bg-gradient-to-br from-[#E8F5EF] to-white">
                  <CardHeader className="text-center pb-6">
                    <motion.div whileHover={rotateOnHover} className="w-16 h-16 bg-[#1F7A53] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl text-[#1F7A53]">
                      {t('programsPage.about.missionTitle', 'Our Mission')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 leading-relaxed">
                      {t('programsPage.about.missionText', 'To provide authentic Islamic education rooted in the Quran and Sunnah, fostering scholarly excellence, spiritual development, and moral character. We aim to prepare knowledgeable and righteous individuals who can serve their communities with wisdom and dedication.')}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <motion.div whileHover={scaleOnHover}>
                <Card className="border-0 shadow-card bg-gradient-to-br from-[#EAF2FB] to-white">
                  <CardHeader className="text-center pb-6">
                    <motion.div whileHover={rotateOnHover} className="w-16 h-16 bg-[#1E5FA8] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl text-[#1E5FA8]">
                      {t('programsPage.about.visionTitle', 'Our Vision')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 leading-relaxed">
                      {t('programsPage.about.visionText', 'To be a leading center of Islamic learning that combines traditional scholarship with contemporary understanding, producing graduates who are well-versed in Islamic sciences and capable of addressing modern challenges while preserving authentic Islamic values.')}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Leadership Team */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 variants={fadeIn} className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4">
              {t('programsPage.about.leadershipTitle', 'Leadership & Administration')}
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-gray-600">
              {t('programsPage.about.leadershipSubtitle', 'Experienced scholars and educators leading our institution')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((leader, index) => (
              <motion.div key={index} variants={fadeIn}>
                <motion.div whileHover={scaleOnHover}>
                  <Card className="border-0 shadow-card text-center">
                    <CardHeader className="pb-4">
                      <motion.div whileHover={rotateOnHover} className="w-20 h-20 bg-gradient-to-br from-[#1F7A53] to-[#1E5FA8] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-10 h-10 text-white" />
                      </motion.div>
                      <CardTitle className="text-lg">{leader.name}</CardTitle>
                      <p className="text-[#1F7A53] font-medium">{leader.position}</p>
                    </CardHeader>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Campus & Facilities */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-6">
                {t('programsPage.about.campusTitle', 'Campus & Facilities')}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {t('programsPage.about.campusSubtitle', 'Our modern campus provides an ideal environment for learning, worship, and community life, equipped with state-of-the-art facilities.')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {facilities.map((facility, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
                    className="flex items-start space-x-3 p-4 rounded-lg transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-[#1F7A53] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Building className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0B0D0E] mb-1">
                        {facility.name}
                      </h4>
                      <p className="text-gray-600 text-sm">{facility.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden"
            >
              <ImageWithFallback
                src="/assets/h4.png"
                alt={t('programsPage.about.campusImageAlt', 'Modern Islamic campus')}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-0 left-0 right-0 p-6 text-white"
              >
                <h3 className="text-xl font-bold mb-2">{t('programsPage.about.tour.title', 'Visit Our Madarsa')}</h3>
                <p className="text-white/90">{t('programsPage.about.tour.description', 'Explore our Madarsa facilities')}</p>
                <Button
                  className="mt-4 bg-white text-[#1F7A53] hover:bg-white/90"
                  onClick={handleStartTour}
                >
                  {t('programsPage.about.tour.button', 'Start Tour')}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Affiliations & Accreditations */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 variants={fadeIn} className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4">
              {t('programsPage.about.affiliatedTitle', 'Affiliated')}
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-gray-600">
              {t('programsPage.about.affiliatedText', 'DARUL ULOOM NADWATUL ULAMA, LUCKNOW (U.P), INDIA')}
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Gallery Strip with Auto Scroll */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 flex items-center justify-center">
            <h2 className="text-3xl font-bold text-[#0B0D0E] mb-4 mr-4">
              {t('programsPage.about.campusLifeTitle', 'Campus Life')}
            </h2>
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              size="sm"
              variant="outline"
              className="mb-4"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>

          <div
            ref={galleryRef}
            className="flex overflow-x-hidden gap-4 py-4 cursor-grab active:cursor-grabbing"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className={`flex-shrink-0 rounded-xl overflow-hidden shadow-lg w-80 h-48`}
              >
                <ImageWithFallback
                  src={image}
                  alt={t('programsPage.about.campusLife.imageAlt', { index: index + 1 }) || `Campus life ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}

            {/* Duplicate images for seamless looping */}
            {galleryImages.map((image, index) => (
              <motion.div
                key={`dup-${index}`}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className={`flex-shrink-0 rounded-xl overflow-hidden shadow-lg w-80 h-48`}
              >
                <ImageWithFallback
                  src={image}
                  alt={t('programsPage.about.campusLife.imageAlt', { index: index + 1 }) || `Campus life ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Brochure Download CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-16 bg-gradient-to-r from-[#1F7A53] to-[#1E5FA8] text-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div animate={pulseAnimation}>
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-white/80" />
          </motion.div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t('programsPage.about.brochureTitle', 'Download Our Brochure')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('programsPage.about.brochureDescription', 'Get detailed information about our programs, facilities, admission procedures, and everything you need to know about joining our institution.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-[#1F7A53] hover:bg-white/90"
              >
                <Download className="w-5 h-5 mr-2" />
                {t('programsPage.about.downloadPDF', 'Download PDF')}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-[#1F7A53] hover:bg-white/90"
                onClick={() => onPageChange('contact')}
              >
                {t('programsPage.about.contactAdmissions', 'Contact Admissions')}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;