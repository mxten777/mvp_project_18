import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";

const Hero: React.FC = () => {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      {/* 배경 애니메이션 */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute -bottom-32 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* 로고/아이콘 */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-2xl mb-8 border-4 border-white/50"
          >
            <span className="text-5xl sm:text-6xl text-white">💚</span>
          </motion.div>

          {/* 메인 헤딩 */}
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-8 tracking-tight leading-tight"
          >
            <motion.span 
              className="block mb-4 text-lg sm:text-xl md:text-2xl font-normal text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              부모님 돌보시는 분들에게
            </motion.span>
            <motion.span 
              className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-500 bg-clip-text text-transparent"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              마음의 짐을 덜어드리겠습니다
            </motion.span>
          </motion.h1>

          {/* 서브 헤딩 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl text-gray-600 mb-4 font-medium"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span 
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                국가 지원금 85% 이상
              </motion.span>
            </motion.p>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-normal leading-relaxed">
              전화 한 통으로 통합 방문요양/간호/목욕 서비스
            </p>
          </motion.div>

          {/* CTA 버튼들 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                variant="primary"
                size="lg"
                className="text-xl px-10 py-5 shadow-xl hover:shadow-2xl"
              >
                <span className="mr-2">📞</span>
                무료 상담 신청
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="text-xl px-10 py-5 shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">📋</span>
                서비스 안내
              </Button>
            </motion.div>
          </motion.div>

          {/* 신뢰 지표 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { number: "1,000+", label: "만족한 고객", icon: "👥" },
              { number: "24/7", label: "응급 대응", icon: "🚨" },
              { number: "5년+", label: "운영 경험", icon: "⭐" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <motion.div
                  className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1, type: "spring" }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* 플로팅 요소들 */}
          <motion.div
            className="absolute top-1/4 left-4 text-4xl opacity-20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            💊
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-8 text-3xl opacity-20"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            🏥
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 left-12 text-3xl opacity-20"
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            👨‍⚕️
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;