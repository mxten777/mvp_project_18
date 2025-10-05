import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-gradient-to-br from-white to-transparent"
          style={{
            backgroundSize: "200% 200%"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            지금 바로 상담받으세요
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            전화 한 통으로 전문 상담사가 맞춤형 돌봄 서비스를 안내해드립니다
          </motion.p>

          {/* 혜택 리스트 */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { icon: "📞", title: "무료 전화 상담", desc: "24시간 언제든지" },
              { icon: "🏠", title: "맞춤형 서비스", desc: "개인별 필요에 맞춤" },
              { icon: "💰", title: "국가 지원금", desc: "최대 85% 지원" }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-blue-100 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA 버튼들 */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="secondary"
                size="xl"
                className="bg-white text-blue-600 hover:bg-gray-100 text-xl px-10 py-5 shadow-2xl font-bold"
              >
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  📞 1588-0000
                </motion.span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="xl"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-xl px-10 py-5 font-bold"
              >
                💬 카카오톡 상담
              </Button>
            </motion.div>
          </motion.div>

          <motion.p 
            className="text-blue-200 text-sm mt-8"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⭐ 평일 09:00-18:00 / 주말·공휴일 응급상담 가능
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;