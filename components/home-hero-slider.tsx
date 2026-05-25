"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type HeroSlide = {
  title: string;
  caption: string;
  image: string;
};

export function HomeHeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const openSidebar = () => {
    window.dispatchEvent(new Event("batter-days:open-sidebar"));
  };

  useEffect(() => {
    if (slides.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#f5ede3]">
      <div className="relative aspect-[16/11] w-full sm:aspect-[16/10]">
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 overflow-hidden"
            exit={{ opacity: 0, scale: 1.03 }}
            initial={{ opacity: 0, scale: 1.03 }}
            key={slides[activeIndex]?.title ?? activeIndex}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Image alt={slides[activeIndex].title} className="h-full w-full object-cover" fill priority={activeIndex === 0} src={slides[activeIndex].image} sizes="(max-width: 768px) 100vw, 448px" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(62,33,14,0.18)_0%,rgba(62,33,14,0.12)_42%,rgba(62,33,14,0.48)_100%)]" />
            <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
              <div className="flex items-start justify-between">
                <motion.p
                  animate={{ opacity: 1, y: 0 }}
                  className="font-serif text-[1.15rem] italic tracking-wide text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)]"
                  initial={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                >
                  Batter Days
                </motion.p>
                <motion.button
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.85 }}
                  onClick={openSidebar}
                  transition={{ duration: 0.3, delay: 0.08 }}
                  type="button"
                >
                  <span className="material-symbols-outlined text-xl">menu</span>
                </motion.button>
              </div>
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="pb-8 text-center"
                initial={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.35, delay: 0.12 }}
              >
                <h1 className="font-serif text-[2.5rem] italic leading-none text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.42)] sm:text-[3rem]">
                  {slides[activeIndex].title}
                </h1>
                <p className="mt-2 text-xs uppercase tracking-[0.34em] text-white/80 drop-shadow-sm">{slides[activeIndex].caption}</p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 right-4 z-10 flex gap-1.5">
        {slides.map((slide, index) => (
          <motion.button
            aria-label={`Buka slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-5 bg-white" : "w-1.5 bg-white/40"}`}
            key={slide.title}
            onClick={() => goToSlide(index)}
            animate={{ scale: index === activeIndex ? 1 : 0.95 }}
            transition={{ duration: 0.2 }}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
