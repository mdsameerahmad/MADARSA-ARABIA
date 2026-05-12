import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Filter,
  Search,
  Tag
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
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

interface NoticePageProps {
  onPageChange: (page: string) => void;
}

interface NewsItem {
  slug: string;
  date: string;
}

// Constants
const ITEMS_PER_PAGE = 6;

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

// Fallback data function
const getFallbackNewsData = (): NewsItem[] => [
  {
    slug: "shasmahi-ke-imtihaan-2025",
    date: "2025-08-25"
  }
];

// Helper function to determine badge styling based on translated tag
const getBadgeClass = (tag: string, t: (key: string) => string) => {
  switch (tag) {
    case t('noticePage.filters.announcement'):
      return 'border-[#1F7A53] text-[#1F7A53]';
    case t('noticePage.filters.event'):
      return 'border-[#1E5FA8] text-[#1E5FA8]';
    default:
      return 'border-gray-400 text-gray-600';
  }
};

// Category Tabs Component
const CategoryTabs: React.FC<{
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}> = ({ selectedCategory, onCategoryChange }) => {
  const { t } = useTranslation();
  const categories = [
    { key: 'all', label: t('noticePage.filters.all') },
    { key: 'announcement', label: t('noticePage.filters.announcement') },
    { key: 'event', label: t('noticePage.filters.event') },
    { key: 'general', label: t('noticePage.filters.general') },
    { key: 'academics', label: t('noticePage.filters.academics') }
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <motion.button
          key={category.key}
          onClick={() => onCategoryChange(category.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === category.key
              ? 'bg-[#1F7A53] text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.label}
        </motion.button>
      ))}
    </div>
  );
};

// News Card Component
const NewsCard: React.FC<{
  article: NewsItem;
  onReadMore: (article: NewsItem) => void;
}> = ({ article, onReadMore }) => {
  const { t } = useTranslation();
  const articleKey = `noticePage.articles.${article.slug}`;
  return (
    <Card className="group h-full hover:shadow-xl transition-all duration-500 border-0 shadow-card hover:bg-gradient-to-tr from-[#E8F5EF] to-[#EAF2FB] cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge
            variant="outline"
            className={`${getBadgeClass(t(`${articleKey}.tag`), t)} group-hover:scale-105 transition-transform duration-300`}
          >
            {t(`${articleKey}.tag`)}
          </Badge>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(article.date).toLocaleDateString(t('locale'), {
              month: 'short',
              day: 'numeric'
            })}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-3 group-hover:text-[#1F7A53] transition-colors duration-300">
          {t(`${articleKey}.title`)}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{t(`${articleKey}.excerpt`)}</p>
        <Button
          variant="ghost"
          className="p-0 h-auto text-[#1F7A53] hover:text-[#1F7A53]/80 group-hover:translate-x-2 transition-all duration-300"
          onClick={() => onReadMore(article)}
        >
          {t('noticePage.card.readMore')} <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

// Pagination Component
const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  const { t } = useTranslation();
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i as number);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-[#1F7A53] text-[#1F7A53] hover:bg-[#1F7A53] hover:text-white disabled:opacity-50"
      >
        {t('noticePage.pagination.previous')}
      </Button>

      {getVisiblePages().map((page, index) => (
        <Button
          key={index}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
          disabled={typeof page !== 'number'}
          className={
            currentPage === page
              ? 'bg-[#1F7A53] text-white'
              : typeof page === 'number'
              ? 'border-[#1F7A53] text-[#1F7A53] hover:bg-[#1F7A53] hover:text-white'
              : 'border-transparent text-gray-400'
          }
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-[#1F7A53] text-[#1F7A53] hover:bg-[#1F7A53] hover:text-white disabled:opacity-50"
      >
        {t('noticePage.pagination.next')}
      </Button>
    </div>
  );
};

// Article View Component
const ArticleView: React.FC<{
  article: NewsItem;
  onBack: () => void;
  onPageChange: (page: string) => void;
}> = ({ article, onBack, onPageChange }) => {
  const { t } = useTranslation();
  const articleKey = `noticePage.articles.${article.slug}`;
  return (
    <div className="min-h-screen bg-gray-50">
      <motion.section
        className="bg-gradient-to-r from-[#E8F5EF] via-white to-[#EAF2FB] py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            onClick={onBack}
            className="flex items-center text-[#1F7A53] hover:text-[#1F7A53]/80 mb-6 transition-colors duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('noticePage.article.back')}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <Badge
                variant="outline"
                className={getBadgeClass(t(`${articleKey}.tag`), t)}
              >
                {t(`${articleKey}.tag`)}
              </Badge>
              <div className="flex items-center text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(article.date).toLocaleDateString(t('locale'), {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-[#0B0D0E] mb-4">
              {t(`${articleKey}.title`)}
            </h1>

            {t(`${articleKey}.author`) && (
              <p className="text-gray-600 mb-8">
                {t('noticePage.article.byAuthor', { author: t(`${articleKey}.author`) })}
              </p>
            )}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-card p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed">
                {t(`${articleKey}.content`) || t(`${articleKey}.excerpt`)}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t">
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => onPageChange('contact')}
                    className="bg-[#1F7A53] hover:bg-[#1F7A53]/90 text-white"
                  >
                    {t('noticePage.article.contactInfo')}
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    onClick={onBack}
                    className="border-[#1F7A53] text-[#1F7A53] hover:bg-[#1F7A53] hover:text-white"
                  >
                    {t('noticePage.article.back')}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

const NoticePage: React.FC<NoticePageProps> = ({ onPageChange }) => {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Map filter labels to their keys for reverse lookup in filtering
  const filterKeyMap = {
    [t('noticePage.filters.all')]: 'all',
    [t('noticePage.filters.announcement')]: 'announcement',
    [t('noticePage.filters.event')]: 'event',
    [t('noticePage.filters.general')]: 'general',
    [t('noticePage.filters.academics')]: 'academics'
  };

  // Load news data and handle fallback
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

  // Filter and paginate news whenever dependencies change
  useEffect(() => {
    let filtered = news;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => {
        const articleKey = `noticePage.articles.${item.slug}`;
        const category = t(`${articleKey}.category`);
        const tag = t(`${articleKey}.tag`);
        const categoryKey = filterKeyMap[category] || category.toLowerCase();
        const tagKey = filterKeyMap[tag] || tag.toLowerCase();
        return (
          categoryKey === selectedCategory.toLowerCase() ||
          tagKey === selectedCategory.toLowerCase()
        );
      });
    }
    if (searchTerm) {
      filtered = filtered.filter(item => {
        const articleKey = `noticePage.articles.${item.slug}`;
        return (
          t(`${articleKey}.title`).toLowerCase().includes(searchTerm.toLowerCase()) ||
          t(`${articleKey}.excerpt`).toLowerCase().includes(searchTerm.toLowerCase()) ||
          t(`${articleKey}.tag`).toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    setFilteredNews(filtered);
    setCurrentPage(1);
  }, [news, selectedCategory, searchTerm, t, i18n.language]);

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
                  {t('noticePage.summary.categoryTerm', { category: t(`noticePage.filters.${selectedCategory}`) })}
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
                className="border-blue text-white bg-white text-[#1F7A53]"
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

export default NoticePage;