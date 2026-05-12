import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Clock,
  ExternalLink,
  Heart,
  Mail,
  MapPin,
  Phone,
  Send
} from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from "tailwind-merge";
import ArticleView from './news/ArticleView';
import CategoryTabs from './news/CategoryTabs';
import NewsCard from './news/NewsCard';
import Pagination from './news/Pagination';
import { ITEMS_PER_PAGE } from './news/constants';

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

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

interface ContactPageProps {
  onPageChange: (page: string) => void;
}

interface NewsItem {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  content?: string;
  author?: string;
  category?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Animation variants
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

const ContactPage: React.FC<ContactPageProps> = ({ onPageChange }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Assalamu Alaikum, my name is ${formData.name}. 
    Subject: ${formData.subject}
    ${formData.message ? `Message: ${formData.message}` : ''}
    Contact me at: ${formData.email} ${formData.phone ? `or ${formData.phone}` : ''}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919452463669?text=${encodedMessage}`, '_blank');
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const handleMapClick = () => {
    window.open('https://maps.app.goo.gl/a4mLk2aSqVi9q7Uq5', '_blank');
  };

  return (
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t('contactPage.header.title')}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t('contactPage.header.subtitle')}
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Information and Form */}
      <motion.section
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-[#0B0D0E] mb-8">
                {t('contactPage.info.title')}
              </h2>

              <div className="space-y-6 mb-8">
                {[
                  {
                    icon: MapPin,
                    title: t('contactPage.info.address.title'),
                    content: [t('contactPage.info.address.line1'), t('contactPage.info.address.line2'), t('contactPage.info.address.line3')],
                    color: "#1F7A53"
                  },
                  {
                    icon: Phone,
                    title: t('contactPage.info.phone.title'),
                    content: [t('contactPage.info.phone.number1'), t('contactPage.info.phone.number2')],
                    color: "#1E5FA8"
                  },
                  {
                    icon: Mail,
                    title: t('contactPage.info.email.title'),
                    content: [t('contactPage.info.email.address1'), t('contactPage.info.email.address2')],
                    color: "#1F7A53"
                  }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-[#0B0D0E] mb-1">{item.title}</h3>
                        {item.content.map((line, i) => (
                          <p key={i} className="text-gray-600">{line}</p>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Map Preview */}
              <motion.div
                className="rounded-lg h-64 relative overflow-hidden cursor-pointer group"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={handleMapClick}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.162799307399!2d80.4543818!3d25.021086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39833f600f2a7453%3A0x845346b3ee64c093!2sMadarsa%20arabia%20tajveedul%20quran!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>

                {/* Overlay with button */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white px-4 py-2 rounded-full shadow-lg flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <ExternalLink className="w-4 h-4 text-[#1F7A53] mr-2" />
                    <span className="text-sm font-medium text-[#1F7A53]">{t('contactPage.map.openText')}</span>
                  </motion.div>
                </div>

                {/* Location pin indicator */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg" fill="red" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-card hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#0B0D0E]">{t('contactPage.form.title')}</CardTitle>
                  <p className="text-gray-600">
                    {t('contactPage.form.subtitle')}
                  </p>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="w-16 h-16 text-[#1F7A53] mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-[#1F7A53] mb-2">
                        {t('contactPage.form.successTitle')}
                      </h3>
                      <p className="text-gray-600">
                        {t('contactPage.form.successText')}
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants} whileFocus={{ scale: 1.02 }}>
                          <Label htmlFor="name">{t('contactPage.form.nameLabel')}</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="transition-all duration-300 focus:ring-2 focus:ring-[#1F7A53]/50 focus:border-[#1F7A53] hover:border-[#1F7A53]/50"
                          />
                        </motion.div>
                        <motion.div variants={itemVariants} whileFocus={{ scale: 1.02 }}>
                          <Label htmlFor="email">{t('contactPage.form.emailLabel')}</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="transition-all duration-300 focus:ring-2 focus:ring-[#1F7A53]/50 focus:border-[#1F7A53] hover:border-[#1F7A53]/50"
                          />
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants} whileFocus={{ scale: 1.02 }}>
                          <Label htmlFor="phone">{t('contactPage.form.phoneLabel')}</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="transition-all duration-300 focus:ring-2 focus:ring-[#1F7A53]/50 focus:border-[#1F7A53] hover:border-[#1F7A53]/50"
                          />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <Label htmlFor="subject">{t('contactPage.form.subjectLabel')}</Label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F7A53]/50 focus:border-[#1F7A53] hover:border-[#1F7A53]/50 transition-all duration-300"
                            required
                          >
                            <option value="">{t('contactPage.form.selectSubject')}</option>
                            <option value="admissions">{t('contactPage.form.subjects.admissions')}</option>
                            <option value="programs">{t('contactPage.form.subjects.programs')}</option>
                            <option value="facilities">{t('contactPage.form.subjects.facilities')}</option>
                            <option value="donation">{t('contactPage.form.subjects.donation')}</option>
                            <option value="general">{t('contactPage.form.subjects.general')}</option>
                          </select>
                        </motion.div>
                      </div>

                      <motion.div variants={itemVariants} whileFocus={{ scale: 1.02 }}>
                        <Label htmlFor="message">{t('contactPage.form.messageLabel')}</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={6}
                          placeholder={t('contactPage.form.messagePlaceholder')}
                          required
                          className="transition-all duration-300 focus:ring-2 focus:ring-[#1F7A53]/50 focus:border-[#1F7A53] hover:border-[#1F7A53]/50"
                        />
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex items-center justify-center w-full bg-[#1F7A53] hover:bg-[#1F7A53]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70"
                        >
                          {isSubmitting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2" />
                              {t('contactPage.form.submitButton')}
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Donation Information Section */}
      <motion.section
        className="py-16 bg-gradient-to-r from-[#E8F5EF] to-[#EAF2FB]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('contactPage.donation.title')}
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('contactPage.donation.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t('contactPage.donation.zakatCard.title'),
                description: t('contactPage.donation.zakatCard.description'),
                details: [
                  t('contactPage.donation.zakatCard.detail1'),
                  t('contactPage.donation.zakatCard.detail2'),
                  t('contactPage.donation.zakatCard.detail3'),
                  t('contactPage.donation.zakatCard.detail4'),
                  t('contactPage.donation.zakatCard.detail5')
                ]
              }
            ].map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-card hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-[#1F7A53] mb-2">{method.title}</h3>
                  <p className="text-gray-600">{method.description}</p>
                </div>
                <ul className="space-y-2">
                  {method.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#1F7A53] mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-lg text-gray-700 mb-6">
              {t('contactPage.donation.ctaText')}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-[#1F7A53] hover:bg-[#1F7A53]/90 text-white"
                onClick={() => window.open(`https://wa.me/919452463669?text=${encodeURIComponent(t('contactPage.donation.whatsappMessage'))}`, '_blank')}
              >
                <Heart className="w-5 h-5 mr-2" />
                {t('contactPage.donation.whatsappButton')}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Actions */}
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
            background: "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.05) 0%, transparent 50%)"
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                {t('contactPage.quickActions.title')}
              </h2>
              <p className="text-xl text-white/90">
                {t('contactPage.quickActions.subtitle')}
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-white text-[#1F7A53] hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => onPageChange('departments')}
                >
                  {t('contactPage.quickActions.viewPrograms')}
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => onPageChange('about')}
                >
                  {t('contactPage.quickActions.learnMore')}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

// This is the parent component.
const NoticePage: React.FC<ContactPageProps> = ({ onPageChange }) => {
  const { t } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/data/news.json');
        if (response.ok) {
          const data = await response.json();
          setNews(data);
          setFilteredNews(data);
        } else {
          throw new Error('Failed to fetch news');
        }
      } catch (error) {
        console.error('Error loading news:', error);
        const fallbackData = getFallbackNewsData();
        setNews(fallbackData);
        setFilteredNews(fallbackData);
      }
      setIsLoading(false);
    };

    loadNews();
  }, []);

  useEffect(() => {
    let filtered = news;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item =>
        item.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        item.tag?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredNews(filtered);
    setCurrentPage(1);
  }, [news, selectedCategory, searchTerm]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleReadMore = (article: NewsItem) => {
    setSelectedArticle(article);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (selectedArticle) {
    return (
      <ArticleView
        article={selectedArticle}
        onBack={handleBackToList}
        onPageChange={onPageChange}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.section
        className="bg-gradient-to-r from-[#E8F5EF] via-white to-[#EAF2FB] py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="text-4xl lg:text-5xl font-bold text-[#0B0D0E] mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t('noticePage.header.title')}
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t('noticePage.header.subtitle')}
            </motion.p>

            {/* Search Bar */}
            <motion.div
              className="max-w-md mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder={t('noticePage.search.placeholder')}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 bg-white border-gray-200 focus:border-[#1F7A53] focus:ring-[#1F7A53]/20"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Category Tabs and Filters */}
      <motion.section
        className="py-8 bg-white border-b"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants}>
            <CategoryTabs
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </motion.div>

          {/* Results Summary */}
          <motion.div
            className="flex flex-wrap items-center justify-between mt-6 gap-4"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Filter className="w-4 h-4" />
                <span>
                  {t('noticePage.summary.resultsCount', {
                    count: filteredNews.length
                  })}
                </span>
              </div>
              {searchTerm && (
                <Badge variant="outline" className="border-[#1F7A53] text-[#1F7A53]">
                  {t('noticePage.summary.searchTerm', { term: searchTerm })}
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge variant="outline" className="border-[#1E5FA8] text-[#1E5FA8]">
                  {t('noticePage.summary.categoryTerm', { category: selectedCategory })}
                </Badge>
              )}
            </div>

            {(searchTerm || selectedCategory !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-gray-500 hover:text-[#1F7A53]"
              >
                {t('noticePage.summary.clearFilters')}
              </Button>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* News Grid */}
      <motion.section
        className="py-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <motion.div
              className="text-center py-12"
              variants={itemVariants}
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F7A53] mx-auto mb-4"></div>
              <p className="text-gray-500">{t('noticePage.states.loading')}</p>
            </motion.div>
          ) : filteredNews.length === 0 ? (
            <motion.div
              className="text-center py-12"
              variants={itemVariants}
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noticePage.states.noNoticesTitle')}</h3>
              <p className="text-gray-500 mb-4">
                {t('noticePage.states.noNoticesText')}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="border-[#1F7A53] text-[#1F7A53] hover:bg-[#1F7A53] hover:text-white"
              >
                {t('noticePage.states.viewAllNotices')}
              </Button>
            </motion.div>
          ) : (
            <>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                variants={containerVariants}
              >
                {paginatedNews.map((item, index) => (
                  <motion.div
                    key={`${item.slug}-${currentPage}`}
                    variants={cardVariants}
                    whileHover={{
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <NewsCard
                      article={item}
                      onReadMore={handleReadMore}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {totalPages > 1 && (
                <motion.div variants={itemVariants}>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        className="py-16 bg-white"
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
            <h2 className="text-3xl font-bold text-[#0B0D0E] mb-4">
              {t('noticePage.stats.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('noticePage.stats.subtitle')}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Calendar,
                title: t('noticePage.updateMethods.monthlyTitle'),
                description: t('noticePage.updateMethods.monthlyDesc'),
                count: t('noticePage.updateMethods.monthlyCount')
              },
              {
                icon: Tag,
                title: t('noticePage.eventMethods.eventTitle'),
                description: t('noticePage.eventMethods.eventDesc'),
                count: t('noticePage.eventMethods.eventCount')
              },
              {
                icon: Clock,
                title: t('noticePage.urgentMethods.urgentTitle'),
                description: t('noticePage.urgentMethods.urgentDesc'),
                count: t('noticePage.urgentMethods.urgentCount')
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="bg-gradient-to-tr from-white to-[#E8F5EF] p-8 rounded-2xl shadow-card text-center hover:shadow-xl transition-all duration-500">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-[#1F7A53] to-[#1E5FA8] rounded-full flex items-center justify-center mx-auto mb-6"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-[#0B0D0E] mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <Badge
                      variant="outline"
                      className="border-[#1F7A53] text-[#1F7A53] bg-white/50"
                    >
                      {item.count}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 bg-gradient-to-r from-[#1F7A53] to-[#1E5FA8] text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl lg:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('noticePage.cta.title')}
          </motion.h2>
          <motion.p
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('noticePage.cta.description')}
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
                className="bg-white text-[#1F7A53] hover:bg-white/90"
                onClick={() => onPageChange('contact')}
              >
                {t('noticePage.cta.contactOffice')}
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#1F7A53]"
                onClick={() => onPageChange('about')}
              >
                {t('noticePage.cta.learnMore')}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};


// This is the parent component.
const NoticePageContainer: React.FC<ContactPageProps> = ({ onPageChange }) => {
  const { t } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/data/news.json');
        if (response.ok) {
          const data = await response.json();
          setNews(data);
          setFilteredNews(data);
        } else {
          throw new Error('Failed to fetch news');
        }
      } catch (error) {
        console.error('Error loading news:', error);
        const fallbackData = getFallbackNewsData();
        setNews(fallbackData);
        setFilteredNews(fallbackData);
      }
      setIsLoading(false);
    };

    loadNews();
  }, []);

  useEffect(() => {
    let filtered = news;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item =>
        item.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        item.tag?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredNews(filtered);
    setCurrentPage(1);
  }, [news, selectedCategory, searchTerm]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleReadMore = (article: NewsItem) => {
    setSelectedArticle(article);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (selectedArticle) {
    return (
      <ArticleView
        article={selectedArticle}
        onBack={handleBackToList}
        onPageChange={onPageChange}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.section
        className="bg-gradient-to-r from-[#E8F5EF] via-white to-[#EAF2FB] py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="text-4xl lg:text-5xl font-bold text-[#0B0D0E] mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t('noticePage.header.title')}
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t('noticePage.header.subtitle')}
            </motion.p>

            {/* Search Bar */}
            <motion.div
              className="max-w-md mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder={t('noticePage.search.placeholder')}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 bg-white border-gray-200 focus:border-[#1F7A53] focus:ring-[#1F7A53]/20"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Category Tabs and Filters */}
      <motion.section
        className="py-8 bg-white border-b"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants}>
            <CategoryTabs
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </motion.div>

          {/* Results Summary */}
          <motion.div
            className="flex flex-wrap items-center justify-between mt-6 gap-4"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Filter className="w-4 h-4" />
                <span>
                  {t('noticePage.summary.resultsCount', {
                    count: filteredNews.length
                  })}
                </span>
              </div>
              {searchTerm && (
                <Badge variant="outline" className="border-[#1F7A53] text-[#1F7A53]">
                  {t('noticePage.summary.searchTerm', { term: searchTerm })}
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge variant="outline" className="border-[#1E5FA8] text-[#1E5FA8]">
                  {t('noticePage.summary.categoryTerm', { category: selectedCategory })}
                </Badge>
              )}
            </div>

            {(searchTerm || selectedCategory !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-gray-500 hover:text-[#1F7A53]"
              >
                {t('noticePage.summary.clearFilters')}
              </Button>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* News Grid */}
      <motion.section
        className="py-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <motion.div
              className="text-center py-12"
              variants={itemVariants}
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F7A53] mx-auto mb-4"></div>
              <p className="text-gray-500">{t('noticePage.states.loading')}</p>
            </motion.div>
          ) : filteredNews.length === 0 ? (
            <motion.div
              className="text-center py-12"
              variants={itemVariants}
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noticePage.states.noNoticesTitle')}</h3>
              <p className="text-gray-500 mb-4">
                {t('noticePage.states.noNoticesText')}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="border-[#1F7A53] text-[#1F7A53] hover:bg-[#1F7A53] hover:text-white"
              >
                {t('noticePage.states.viewAllNotices')}
              </Button>
            </motion.div>
          ) : (
            <>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                variants={containerVariants}
              >
                {paginatedNews.map((item, index) => (
                  <motion.div
                    key={`${item.slug}-${currentPage}`}
                    variants={cardVariants}
                    whileHover={{
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <NewsCard
                      article={item}
                      onReadMore={handleReadMore}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {totalPages > 1 && (
                <motion.div variants={itemVariants}>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        className="py-16 bg-white"
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
            <h2 className="text-3xl font-bold text-[#0B0D0E] mb-4">
              {t('noticePage.stats.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('noticePage.stats.subtitle')}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Calendar,
                title: t('noticePage.updateMethods.monthlyTitle'),
                description: t('noticePage.updateMethods.monthlyDesc'),
                count: t('noticePage.updateMethods.monthlyCount')
              },
              {
                icon: Tag,
                title: t('noticePage.eventMethods.eventTitle'),
                description: t('noticePage.eventMethods.eventDesc'),
                count: t('noticePage.eventMethods.eventCount')
              },
              {
                icon: Clock,
                title: t('noticePage.urgentMethods.urgentTitle'),
                description: t('noticePage.urgentMethods.urgentDesc'),
                count: t('noticePage.urgentMethods.urgentCount')
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="bg-gradient-to-tr from-white to-[#E8F5EF] p-8 rounded-2xl shadow-card text-center hover:shadow-xl transition-all duration-500">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-[#1F7A53] to-[#1E5FA8] rounded-full flex items-center justify-center mx-auto mb-6"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-[#0B0D0E] mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <Badge
                      variant="outline"
                      className="border-[#1F7A53] text-[#1F7A53] bg-white/50"
                    >
                      {item.count}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 bg-gradient-to-r from-[#1F7A53] to-[#1E5FA8] text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl lg:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('noticePage.cta.title')}
          </motion.h2>
          <motion.p
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('noticePage.cta.description')}
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
                className="bg-white text-[#1F7A53] hover:bg-white/90"
                onClick={() => onPageChange('contact')}
              >
                {t('noticePage.cta.contactOffice')}
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#1F7A53]"
                onClick={() => onPageChange('about')}
              >
                {t('noticePage.cta.learnMore')}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactPage;
