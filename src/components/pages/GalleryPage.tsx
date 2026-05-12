import { motion } from "framer-motion";
import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const GalleryPage: React.FC = () => {
  const { t } = useLanguage();

  const images = [
    "/assets/c1.webp",
    "/assets/c2.webp",
    "/assets/c3.webp",
    "/assets/c4.webp",
    "/assets/c5.webp",
    "/assets/c6.webp",
    "/assets/g1.webp",
    "/assets/g2.webp",
    "/assets/g3.webp",
    "/assets/g4.webp",
    "/assets/g5.webp",
    "/assets/g6.webp",
    "/assets/g7.webp",
    "/assets/g8.webp",
    "/assets/g9.webp",
    "/assets/g10.webp",
    "/assets/g11.webp",
    "/assets/g12.webp",
    "/assets/g13.webp",
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-green-100 via-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-8 text-[#1F7A53]">
          {t("nav.gallery")}
        </h1>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative w-full h-64 overflow-hidden rounded-xl shadow-md bg-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.05,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(31, 122, 83, 0.3)",
              }}
            >
              <img
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300"
                style={{
                  transform: image.includes("/assets/g")
                    ? "scale(1.28)"
                    : undefined,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
