import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ContactInfoCard from './ContactInfoCard';
import type { ContactInfoItem } from './ContactInfoCard';

export interface ContactInfoListProps {
  /**
   * 연락처 정보 배열
   */
  items?: ContactInfoItem[];
}

/**
 * 연락처 정보 목록 컴포넌트
 * @description 여러 연락처 정보를 목록으로 표시
 */
const ContactInfoList: React.FC<ContactInfoListProps> = React.memo(({ items }) => {
  const { t } = useTranslation();
  
  const defaultItems: ContactInfoItem[] = useMemo(() => [
    {
      icon: '📞',
      title: t('contact.info.phone.title'),
      main: t('contact.info.phone.value'),
      sub: t('contact.info.phone.description'),
      bgColor: 'bg-primary-50',
      link: 'tel:010-1234-5678'
    },
    {
      icon: '�',
      title: t('contact.info.email.title'),
      main: t('contact.info.email.value'),
      sub: t('contact.info.email.description'),
      bgColor: 'bg-accent-50',
      link: 'mailto:care@example.com'
    },
    {
      icon: '🏢',
      title: t('contact.info.address.title'),
      main: t('contact.info.address.value'),
      sub: t('contact.info.address.description'),
      bgColor: 'bg-secondary-50'
    }
  ], [t]);

  const contactItems = items || defaultItems;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <div className="space-y-6">
        {contactItems.map((item, index) => (
          <ContactInfoCard 
            key={index} 
            item={item} 
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
});

ContactInfoList.displayName = 'ContactInfoList';

export default ContactInfoList;
