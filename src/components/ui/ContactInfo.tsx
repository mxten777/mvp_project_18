import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../premium";
import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  UserGroupIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

/**
 * Premium ContactInfo Component
 * @description 글로벌 표준 탑클래스 연락처 정보 카드
 */
const ContactInfo: React.FC = () => {
  const contactItems = [
    {
      icon: MapPinIcon,
      label: "센터 위치",
      value: "서울특별시 강남구 테헤란로 123, 5층",
      gradient: "from-primary-500 to-emerald-500",
    },
    {
      icon: PhoneIcon,
      label: "연락처",
      value: "02-1234-5678",
      href: "tel:02-1234-5678",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: ClockIcon,
      label: "운영 시간",
      value: "월~금 09:00~18:00",
      sub: "주말/공휴일 응급상담 가능",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      icon: UserGroupIcon,
      label: "직원 구성",
      value: "센터장(간호사), 사회복지사, 요양보호사",
      gradient: "from-warm-500 to-orange-500",
    },
    {
      icon: EnvelopeIcon,
      label: "이메일",
      value: "info@100plus.co.kr",
      href: "mailto:info@100plus.co.kr",
      gradient: "from-accent-500 to-rose-500",
    },
  ];

  return (
    <div className="space-y-5">
      <h3 className="text-2xl font-bold font-display text-secondary-900 dark:text-white mb-6 tracking-tight">
        연락처 및 센터 정보
      </h3>

      {contactItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <GlassCard variant="default" size="sm" hover="lift" className="!p-4">
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider mb-1">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className={`text-lg font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-base font-semibold text-secondary-800 dark:text-secondary-200">
                      {item.value}
                    </div>
                  )}
                  {item.sub && (
                    <div className="text-sm text-secondary-500 dark:text-secondary-400 mt-0.5">
                      {item.sub}
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ContactInfo;
