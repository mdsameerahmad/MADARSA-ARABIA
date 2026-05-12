// src/contexts/LanguageContext.tsx
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import i18n from "../i18n";

interface LanguageContextType {
  language: "en" | "hi" | "ur";
  setLanguage: (lang: "en" | "hi" | "ur") => void;
  t: (key: string, fallback?: string) => string;
  isI18nReady: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<"en" | "hi" | "ur">("ur");
  const [isI18nReady, setIsI18nReady] = useState(false);

  useEffect(() => {
    const initializeI18n = async () => {
      try {
        // Wait for i18n to be initialized
        await i18n.init();
        
        if (typeof window !== "undefined") {
          const savedLang = localStorage.getItem("language") as "en" | "hi" | "ur" | null;
          const initialLang = savedLang || "ur";
          
          setLanguageState(initialLang);
          await i18n.changeLanguage(initialLang);
          
          document.documentElement.dir = initialLang === "ur" ? "rtl" : "ltr";
          document.documentElement.lang = initialLang;
        }
        
        setIsI18nReady(true);
      } catch (error) {
        console.error("Failed to initialize i18n:", error);
        setIsI18nReady(true); // Set to true even on error to avoid infinite loading
      }
    };

    initializeI18n();
  }, []);

  const setLanguage = async (lang: "en" | "hi" | "ur") => {
    try {
      setLanguageState(lang);
      localStorage.setItem("language", lang);
      await i18n.changeLanguage(lang);
      document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  const t = (key: string, fallback?: string): string => {
    try {
      const translation = i18n.t(key);
      
      // If translation is the same as the key, it means it wasn't found
      if (translation === key) {
        console.warn(`Translation missing for key: ${key}`);
        return fallback || key.split('.').pop() || key;
      }
      
      return translation;
    } catch (error) {
      console.error(`Translation error for key ${key}:`, error);
      return fallback || key.split('.').pop() || key;
    }
  };

  // Don't render children until i18n is ready
  if (!isI18nReady) {
    return <div>Loading translations...</div>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isI18nReady }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};