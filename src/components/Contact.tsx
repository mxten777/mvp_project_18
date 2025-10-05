import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // 실제로는 서버로 전송
    alert('상담 신청이 접수되었습니다. 빠른 시간 내에 연락드리겠습니다.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">문의하기</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            궁금한 점이 있으시면 언제든지 연락해주세요. 전문 상담사가 친절하게 안내해드립니다.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* 연락처 정보 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">연락처 정보</h3>
            
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex items-center p-6 bg-blue-50 rounded-xl"
              >
                <div className="text-4xl mr-4">📞</div>
                <div>
                  <h4 className="font-semibold text-gray-800">전화 상담</h4>
                  <p className="text-2xl font-bold text-blue-600">1588-0000</p>
                  <p className="text-sm text-gray-600">평일 09:00 - 18:00</p>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex items-center p-6 bg-green-50 rounded-xl"
              >
                <div className="text-4xl mr-4">💬</div>
                <div>
                  <h4 className="font-semibold text-gray-800">카카오톡 상담</h4>
                  <p className="text-lg font-medium text-green-600">@돌봄서비스</p>
                  <p className="text-sm text-gray-600">24시간 상담 가능</p>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex items-center p-6 bg-purple-50 rounded-xl"
              >
                <div className="text-4xl mr-4">📧</div>
                <div>
                  <h4 className="font-semibold text-gray-800">이메일</h4>
                  <p className="text-lg text-purple-600">info@careservice.co.kr</p>
                  <p className="text-sm text-gray-600">24시간 접수</p>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex items-center p-6 bg-orange-50 rounded-xl"
              >
                <div className="text-4xl mr-4">🏢</div>
                <div>
                  <h4 className="font-semibold text-gray-800">본사 주소</h4>
                  <p className="text-gray-700">서울시 강남구 테헤란로 123</p>
                  <p className="text-sm text-gray-600">돌봄서비스빌딩 5층</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <h4 className="font-semibold text-gray-800 mb-3">⏰ 운영시간</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>평일: 09:00 - 18:00</p>
                <p>토요일: 09:00 - 15:00</p>
                <p>일요일·공휴일: 응급상담만</p>
              </div>
            </motion.div>
          </motion.div>

          {/* 상담 신청 폼 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">상담 신청</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이름 *
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="성함을 입력해주세요"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  연락처 *
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="010-0000-0000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  관심 서비스
                </label>
                <motion.select
                  whileFocus={{ scale: 1.02 }}
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">선택해주세요</option>
                  <option value="방문요양">방문 요양</option>
                  <option value="방문간호">방문 간호</option>
                  <option value="방문목욕">방문 목욕</option>
                  <option value="통합서비스">통합 서비스</option>
                </motion.select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  문의 내용
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="궁금한 점이나 요청사항을 자세히 알려주세요"
                />
              </div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full text-lg py-4"
                >
                  📩 상담 신청하기
                </Button>
              </motion.div>
            </form>
            
            <motion.p 
              className="text-sm text-gray-500 mt-4 text-center"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨ 개인정보는 상담 목적으로만 사용되며 안전하게 보호됩니다
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;