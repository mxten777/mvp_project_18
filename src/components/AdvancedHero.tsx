import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Button from './common/Button';

interface AdvancedHeroProps {
  className?: string;
}

const AdvancedHero: React.FC<AdvancedHeroProps> = ({ className = '' }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        duration: 0.8,
        bounce: 0.3
      }
    }
  };

  const floatAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  return (
    <motion.section 
      className={`relative py-20 md:py-32 bg-mesh-primary dark:bg-mesh-dark flex flex-col items-center justify-center overflow-hidden shadow-2xl w-full ${className}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* ?¸í„°?™í‹°ë¸?ë°°ê²½ */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-10 left-10 w-20 h-20 bg-primary-200/30 dark:bg-primary-800/30 rounded-full"
          animate={floatAnimation}
        />
        <motion.div 
          className="absolute top-32 right-20 w-16 h-16 bg-warm-200/40 dark:bg-warm-800/40 rounded-full"
          animate={floatAnimation}
          transition={{ delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-24 h-24 bg-secondary-200/20 dark:bg-secondary-700/30 rounded-full"
          animate={floatAnimation}
          transition={{ delay: 2 }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* ë¡œê³  */}
        <motion.div 
          className="inline-flex items-center justify-center w-28 h-28 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 shadow-2xl mb-8 border-4 border-white/50 dark:border-secondary-800/50"
          variants={itemVariants}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="56" height="56" viewBox="0 0 48 48" fill="none" className="text-white">
            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M16 28c4-8 16-8 20 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="19" cy="20" r="2.5" fill="currentColor"/>
            <circle cx="29" cy="20" r="2.5" fill="currentColor"/>
            <path d="M14 35h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </motion.div>

        {/* ë©”ì¸ ?€?´í? */}
        <motion.h1 
          className="text-5xl md:text-7xl font-heading font-bold text-secondary-800 dark:text-secondary-100 mb-8 leading-[1.1]"
          variants={itemVariants}
        >
          <motion.span 
            className="block mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            ë¶€ëª¨ë‹˜ ?Œë³´?œëŠ” ë¶„ë“¤?ê²Œ
          </motion.span>
          <motion.span 
            className="block gradient-text font-extrabold text-4xl md:text-6xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            ë§ˆìŒ??ì§ì„ ?œì–´?œë¦¬ê² ìŠµ?ˆë‹¤
          </motion.span>
        </motion.h1>

        {/* ?œíƒ ì¹´ë“œ */}
        <motion.div 
          className="bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl rounded-3xl p-8 mb-10 border border-primary-200/50 dark:border-primary-700/50 shadow-2xl max-w-4xl mx-auto"
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                êµ?? ì§€?ê¸ˆ 85% ?´ìƒ
              </motion.h2>
              <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
                ?„í™” ???µìœ¼ë¡?ë°©ë¬¸?”ì–‘, ë°©ë¬¸ê°„í˜¸, ë°©ë¬¸ëª©ìš• ???µí•© ?œë¹„?¤ë? ? ì²­?˜ì„¸??
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: "? ", text: "ì§‘ì—??ë°›ëŠ”\n?„ë¬¸ ì¼€?? },
                { icon: "?’", text: "24?œê°„\n?ë‹´ ê°€?? },
                { icon: "??, text: "ë¹ ë¥¸ ?œë¹„??n?œì‘" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="text-center p-4 bg-primary-50/50 dark:bg-primary-900/30 rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-sm font-medium text-secondary-700 dark:text-secondary-300 whitespace-pre-line">
                    {item.text}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA ë²„íŠ¼??*/}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="primary"
              size="xl"
              className="px-10 py-5 text-xl font-bold shadow-2xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
              leftIcon={
                <motion.svg 
                  width="24" 
                  height="24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                </motion.svg>
              }
            >
              ë¬´ë£Œ ?ë‹´ ? ì²­
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="secondary"
              size="xl"
              className="px-10 py-5 text-xl font-bold"
              leftIcon={
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              }
            >
              ?œë¹„???ë£Œ ë°›ê¸°
            </Button>
          </motion.div>
        </motion.div>

        {/* ? ë¢°??ì§€??*/}
        <motion.div 
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          {[
            { number: "1,200+", label: "ë§Œì¡± ê°€ì¡?, color: "text-primary-500" },
            { number: "95%", label: "ë§Œì¡±??, color: "text-accent-500" },
            { number: "24?œê°„", label: "?‘ë‹µ ?œê°„", color: "text-warm-500" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center p-6 bg-white/60 dark:bg-secondary-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-secondary-700/20"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <motion.div 
                className={`text-3xl font-bold ${stat.color} mb-2`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AdvancedHero;
