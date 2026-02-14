import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard, PremiumButton } from "../premium";
import {
  CheckCircleIcon,
  PaperAirplaneIcon,
  UserIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";

/**
 * Premium ContactForm Component
 * @description 글로벌 표준 탑클래스 상담 신청 폼
 */
const ContactForm: React.FC = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <GlassCard variant="primary" size="lg" hover="glow">
            <div className="flex flex-col items-center text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-success-400 to-success-600 flex items-center justify-center shadow-xl mb-6"
              >
                <CheckCircleIcon className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold font-display text-secondary-900 dark:text-white mb-3">
                상담 신청이 접수되었습니다
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed">
                빠른 시일 내 전문 상담사가 연락드리겠습니다.
                <br />
                감사합니다.
              </p>
            </div>
          </GlassCard>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <GlassCard variant="default" size="lg" hover="none" className="!p-0 overflow-hidden">
            {/* Top gradient bar */}
            <div className="h-1.5 bg-gradient-to-r from-primary-500 via-blue-500 to-primary-500" />
            
            <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-6">
              <h3 className="text-2xl font-bold font-display text-secondary-900 dark:text-white mb-2 tracking-tight">
                상담 신청
              </h3>
              <p className="text-secondary-500 dark:text-secondary-400 text-sm mb-6">
                아래 양식을 작성해주시면 빠르게 상담을 도와드리겠습니다
              </p>

              {/* Name Field */}
              <div className="relative">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focused === 'name' ? 'text-primary-500' : 'text-secondary-400'}`}>
                  <UserIcon className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  placeholder="이름"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary-50/80 dark:bg-secondary-800/50 border-2 border-secondary-200/50 dark:border-secondary-700/50 focus:border-primary-400 dark:focus:border-primary-500 focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30 text-lg text-secondary-900 dark:text-white placeholder-secondary-400 dark:placeholder-secondary-500 transition-all duration-200 outline-none backdrop-blur-sm"
                  aria-label="이름"
                />
              </div>

              {/* Phone Field */}
              <div className="relative">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focused === 'phone' ? 'text-primary-500' : 'text-secondary-400'}`}>
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  onFocus={() => setFocused('phone')}
                  onBlur={() => setFocused(null)}
                  placeholder="연락처"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary-50/80 dark:bg-secondary-800/50 border-2 border-secondary-200/50 dark:border-secondary-700/50 focus:border-primary-400 dark:focus:border-primary-500 focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30 text-lg text-secondary-900 dark:text-white placeholder-secondary-400 dark:placeholder-secondary-500 transition-all duration-200 outline-none backdrop-blur-sm"
                  aria-label="연락처"
                />
              </div>

              {/* Message Field */}
              <div className="relative">
                <div className={`absolute left-4 top-5 transition-colors duration-200 ${focused === 'message' ? 'text-primary-500' : 'text-secondary-400'}`}>
                  <ChatBubbleLeftIcon className="w-5 h-5" />
                </div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  placeholder="문의 내용 (선택)"
                  rows={4}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary-50/80 dark:bg-secondary-800/50 border-2 border-secondary-200/50 dark:border-secondary-700/50 focus:border-primary-400 dark:focus:border-primary-500 focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30 text-lg text-secondary-900 dark:text-white placeholder-secondary-400 dark:placeholder-secondary-500 transition-all duration-200 outline-none backdrop-blur-sm resize-none"
                  aria-label="문의 내용"
                />
              </div>

              {/* Submit Button */}
              <PremiumButton
                type="submit"
                variant="gradient"
                size="lg"
                fullWidth
                rightIcon={<PaperAirplaneIcon className="w-5 h-5" />}
                className="shadow-glow-lg !py-5 text-lg"
              >
                상담 신청하기
              </PremiumButton>
            </form>
          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;
