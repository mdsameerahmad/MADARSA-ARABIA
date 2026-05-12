import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { motion } from "framer-motion";
import { Heart, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useLanguage } from "../contexts/LanguageContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navigation = [
    { name: t("nav.home"), key: "home" },
    { name: t("nav.about"), key: "about" },
    { name: t("nav.programs"), key: "programs" },
    { name: t("nav.resources"), key: "resources" },
    { name: t("nav.notice"), key: "notice" },
    { name: t("nav.gallery"), key: "gallery" },
    { name: t("nav.contact"), key: "contact" },
  ];

  const handlePageChange = (page: string) => {
    onPageChange(page);
    setIsMenuOpen(false);
  };

  const handleDonateClick = () => {
    const message = encodeURIComponent(t("cta.donateNowMessage"));
    window.open(`https://wa.me/919452463669?text=${message}`, "_blank");
  };

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handlePageChange("home")}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <ImageWithFallback
              src="/assets/lo.webp"
              alt="Madarsa Arabia Logo"
              className="w-13 h-12 rounded-lg object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-[#0B0D0E]">{t("hero.title")}</h1>
              <p className="text-sm text-[#1F7A53]">{t("hero.tagline")}</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-1">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Button
                    variant={currentPage === item.key ? "default" : "ghost"}
                    onClick={() => handlePageChange(item.key)}
                    className={`relative px-4 py-2 transition-all duration-300 ${
                      currentPage === item.key
                        ? "bg-[#1F7A53] text-white shadow-lg"
                        : "text-gray-700 hover:text-[#1F7A53] hover:bg-[#E8F5EF]"
                    }`}
                  >
                    {item.name}
                  </Button>
                </motion.div>
              ))}
            </nav>

            {/* Language Switcher */}
    <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" size="sm" className="ml-2">
      {t("common.language")} ({language.toUpperCase()})
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
    <DropdownMenuItem onClick={() => setLanguage("ur")}>اردو</DropdownMenuItem>
    <DropdownMenuItem onClick={() => setLanguage("hi")}>हिन्दी</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>



            {/* Donate Now */}
            <Button
              onClick={handleDonateClick}
              className="bg-[#1F7A53] hover:bg-[#1F7A53]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Heart className="w-4 h-4 mr-2" />
              {t("common.donateNow")}
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Language Selector */}
          <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" size="sm" className="ml-2">
      {/* Mobile: Language (Selected) | Desktop: Languages */}
      <span className="block sm:hidden">{t("common.language")} ({language.toUpperCase()})</span>
      <span className="hidden sm:block">{t("common.language")}</span>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
    <DropdownMenuItem onClick={() => setLanguage("ur")}>اردو</DropdownMenuItem>
    <DropdownMenuItem onClick={() => setLanguage("hi")}>हिन्दी</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>


            {/* Mobile Donate */}
            <Button size="sm" onClick={handleDonateClick} className="bg-[#1F7A53] text-white">
              <Heart className="w-4 h-4" />
            </Button>

            {/* Hamburger */}
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            {navigation.map((item) => (
              <Button
                key={item.key}
                variant={currentPage === item.key ? "default" : "ghost"}
                onClick={() => handlePageChange(item.key)}
                className="w-full justify-start"
              >
                {item.name}
              </Button>
            ))}
          </nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;