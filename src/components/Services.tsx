import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: "🏥",
    title: "방문 요양",
    description: "전문 요양보호사가 직접 방문하여 일상생활을 지원합니다",
    features: ["신체활동 지원", "가사 지원", "정서적 돌봄", "안전 관리"],
    price: "월 50만원 → 7.5만원 (85% 지원)"
  },
  {
    icon: "💊",
    title: "방문 간호",
    description: "전문 간호사가 방문하여 의료적 케어를 제공합니다",
    features: ["건강상태 체크", "투약 관리", "상처 처치", "의료진 연계"],
    price: "월 80만원 → 12만원 (85% 지원)"
  },
  {
    icon: "🛁",
    title: "방문 목욕",
    description: "전문 목욕 서비스로 위생과 건강을 동시에 관리합니다",
    features: ["전문 목욕 서비스", "위생 관리", "안전한 목욕", "피부 관리"],
    price: "회당 15만원 → 2.2만원 (85% 지원)"
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">돌봄 서비스 안내</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            전문적이고 체계적인 돌봄 서비스로 가족의 부담을 덜어드립니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-6xl mb-6 text-center"
              >
                {service.icon}
              </motion.div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 text-center leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="flex items-center text-gray-700"
                  >
                    <span className="text-blue-500 mr-3">✓</span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-blue-50 rounded-xl p-4 text-center"
              >
                <div className="text-sm text-gray-600 mb-1">국가 지원금 적용</div>
                <div className="font-bold text-blue-600">{service.price}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;