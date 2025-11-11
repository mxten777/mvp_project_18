import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import { useForm } from '../../hooks/useForm';
import { isValidEmail, isValidPhone } from '../../utils/validation';

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  [key: string]: string; // 인덱스 시그니처 추가
}

export interface ContactFormProps {
  /**
   * 폼 제출 핸들러
   */
  onSubmit?: (data: ContactFormData) => void | Promise<void>;
  /**
   * 초기 폼 데이터
   */
  initialData?: Partial<ContactFormData>;
}

/**
 * 상담 신청 폼 컴포넌트
 * @description 사용자 정보를 입력받는 폼
 */
const ContactForm: React.FC<ContactFormProps> = React.memo(({ onSubmit, initialData }) => {
  const { t } = useTranslation();
  
  const validate = useCallback((values: ContactFormData) => {
    const errors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!values.name.trim()) {
      errors.name = t('contact.form.name') + ' ' + t('common.error');
    }

    if (!values.phone.trim()) {
      errors.phone = t('contact.form.phone') + ' ' + t('common.error');
    } else if (!isValidPhone(values.phone)) {
      errors.phone = t('contact.form.phone') + ' ' + t('common.error');
    }

    if (values.email && !isValidEmail(values.email)) {
      errors.email = t('contact.form.email') + ' ' + t('common.error');
    }

    return errors;
  }, [t]);

  const handleSubmitForm = useCallback(async (values: ContactFormData) => {
    if (onSubmit) {
      await onSubmit(values);
    } else {
      console.log('Form submitted:', values);
      alert(t('contact.form.success'));
    }
  }, [onSubmit, t]);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm<ContactFormData>({
    initialValues: {
      name: initialData?.name || '',
      phone: initialData?.phone || '',
      email: initialData?.email || '',
      service: initialData?.service || '',
      message: initialData?.message || '',
    },
    validate,
    onSubmit: handleSubmitForm,
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-secondary-800 rounded-3xl p-8 shadow-large border border-secondary-100 dark:border-secondary-700"
    >
      <h3 className="text-2xl font-bold font-heading text-secondary-900 dark:text-white mb-6">
        💬 {t('contact.form.submit')}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label={t('contact.form.name')}
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name ? errors.name : undefined}
          placeholder={t('contact.form.namePlaceholder')}
          required
        />
        
        <Input
          label={t('contact.form.phone')}
          type="tel"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phone ? errors.phone : undefined}
          placeholder={t('contact.form.phonePlaceholder')}
          required
        />
        
        <Textarea
          label={t('contact.form.message')}
          name="message"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={4}
          placeholder={t('contact.form.messagePlaceholder')}
        />
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full text-lg py-4 font-bold shadow-large"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            <span className="text-xl mr-2">📩</span>
            {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
          </Button>
        </motion.div>
      </form>
      
      <motion.p 
        className="text-sm text-secondary-600 dark:text-secondary-400 mt-6 text-center bg-secondary-50 dark:bg-secondary-700/50 py-3 px-4 rounded-xl font-medium"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-lg mr-2">✨</span>
        개인정보는 상담 목적으로만 사용되며 안전하게 보호됩니다
      </motion.p>
    </motion.div>
  );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;
