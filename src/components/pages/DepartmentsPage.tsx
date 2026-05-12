import { Slot } from "@radix-ui/react-slot";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import {
  ArrowRight,
  BookOpen,
  Building,
  CheckCircle,
  Clock,
  GraduationCap,
  Heart,
  Home,
  Users,
  Utensils,
  Wifi
} from 'lucide-react';
import React, { useState } from 'react';
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
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

interface DepartmentsPageProps {
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

const DepartmentsPage: React.FC<DepartmentsPageProps> = ({ onPageChange }) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const departments: Department[] = Object.values(t('departmentsPage', { returnObjects: true }));

  const categories = {
    all: t('departmentsPage.categories.allPrograms'),
    academic: t('departmentsPage.categories.academicPrograms'),
    services: t('departmentsPage.categories.servicesFacilities')
  };

  const getCategory = (dept: Department): string => {
    if (['library', 'hostel', 'mosque'].includes(dept.slug)) {
      return 'services';
    }
    return 'academic';
  };

  const filteredDepartments = departments.filter(dept => 
    selectedCategory === 'all' || getCategory(dept) === selectedCategory
  );

  const getIcon = (slug: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      tajweed: BookOpen,
      hifz: Heart,
      hadith: BookOpen,
      fiqh: GraduationCap,
      arabic: BookOpen,
      library: BookOpen,
      hostel: Home,
      mosque: Building
    };
    return icons[slug] || BookOpen;
  };

  if (selectedDepartment) {
    const IconComponent = getIcon(selectedDepartment.slug);
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-br from-[#E8F5EF] via-white to-[#EAF2FB] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => setSelectedDepartment(null)}
                className="text-[#1F7A53] hover:text-[#1F7A53]/80"
              >
                {t('departmentsPage.backToDepartments')}
              </Button>
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1F7A53] to-[#1E5FA8] rounded-xl flex items-center justify-center">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-[#0B0D0E]">
                  {selectedDepartment.name}
                </h1>
                <p className="text-xl text-gray-600 mt-2">
                  {selectedDepartment.summary}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-card mb-8">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-[#0B0D0E] mb-4">{t('departmentsPage.programOverview')}</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {selectedDepartment.description}
                    </p>

                    {selectedDepartment.facilities && (
                      <div>
                        <h3 className="text-xl font-semibold text-[#0B0D0E] mb-4">{t('departmentsPage.facilitiesAvailable')}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedDepartment.facilities.map((facility, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <CheckCircle className="w-5 h-5 text-[#1F7A53] flex-shrink-0" />
                              <span className="text-gray-700">{facility}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="border-0 shadow-card mb-6">
                  <CardHeader>
                    <CardTitle className="text-[#1F7A53]">{t('departmentsPage.programDetails')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedDepartment.duration && (
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{t('departmentsPage.duration')}</p>
                          <p className="text-gray-600">{selectedDepartment.duration}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedDepartment.prerequisites && (
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{t('departmentsPage.prerequisites')}</p>
                          <p className="text-gray-600">{selectedDepartment.prerequisites}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{t('departmentsPage.classSize')}</p>
                        <p className="text-gray-600">{t('departmentsPage.classSizeValue')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-[#0B0D0E] mb-4">{t('departmentsPage.readyToApplyTitle')}</h3>
                    <p className="text-gray-600 mb-4">
                      {t('departmentsPage.readyToApplyDescription')}
                    </p>
                    <Button 
                      className="w-full bg-[#1F7A53] hover:bg-[#1F7A53]/90 text-white"
                      onClick={() => onPageChange('contact')}
                    >
                      {t('departmentsPage.applyNow')}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#E8F5EF] via-white to-[#EAF2FB] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#0B0D0E] mb-4">
            {t('departmentsPage.pageTitle')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('departmentsPage.pageSubtitle')}
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-12">
              {Object.entries(categories).map(([key, label]) => (
                <TabsTrigger key={key} value={key} className="text-sm">
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDepartments.map((dept) => {
                const IconComponent = getIcon(dept.slug);
                const isService = getCategory(dept) === 'services';
                
                return (
                  <Card 
                    key={dept.slug} 
                    className="group hover:shadow-lg transition-all duration-300 border-0 shadow-card cursor-pointer"
                    onClick={() => setSelectedDepartment(dept)}
                  >
                    <CardHeader className="pb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                        isService 
                          ? 'bg-gradient-to-br from-[#1E5FA8] to-[#1F7A53]'
                          : 'bg-gradient-to-br from-[#1F7A53] to-[#1E5FA8]'
                      }`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl group-hover:text-[#1F7A53] transition-colors leading-tight">
                          {dept.name}
                        </CardTitle>
                        <Badge 
                          variant="outline" 
                          className={isService ? 'text-[#1E5FA8] border-[#1E5FA8]' : 'text-[#1F7A53] border-[#1F7A53]'}
                        >
                          {isService ? t('departmentsPage.card.service') : t('departmentsPage.card.academic')}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 line-clamp-3">{dept.summary}</p>
                      
                      {dept.duration && (
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Clock className="w-4 h-4 mr-2" />
                          {dept.duration}
                        </div>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        className="p-0 h-auto text-[#1F7A53] hover:text-[#1F7A53]/80 group-hover:translate-x-1 transition-transform"
                      >
                        {t('departmentsPage.card.learnMore')} <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </Tabs>
        </div>
      </section>

      {/* Additional Services Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4">
              {t('departmentsPage.supportingJourneyTitle')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('departmentsPage.beyondAcademics')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#1F7A53] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Wifi className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B0D0E] mb-4">{t('departmentsPage.digitalResourcesTitle')}</h3>
                <p className="text-gray-600">
                  {t('departmentsPage.digitalResourcesDescription')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#1E5FA8] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Utensils className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B0D0E] mb-4">{t('departmentsPage.diningServicesTitle')}</h3>
                <p className="text-gray-600">
                  {t('departmentsPage.diningServicesDescription')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1F7A53] to-[#1E5FA8] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B0D0E] mb-4">{t('departmentsPage.studentWelfareTitle')}</h3>
                <p className="text-gray-600">
                  {t('departmentsPage.studentWelfareDescription')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#1F7A53] to-[#1E5FA8] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t('departmentsPage.readyToBeginJourney')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('departmentsPage.joinCommunity')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="secondary"
              className="bg-white text-[#1F7A53] hover:bg-white/90"
              onClick={() => onPageChange('contact')}
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              {t('departmentsPage.applyNow')}
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#1F7A53]"
              onClick={() => onPageChange('about')}
            >
              {t('departmentsPage.learnMoreAboutUs')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DepartmentsPage;