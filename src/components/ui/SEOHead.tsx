/**
 * SEO 최적화 헤드 컴포넌트
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'service';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export default function SEOHead({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime
}: SEOHeadProps) {
  const { i18n } = useTranslation();
  const location = useLocation();

  // 기본값 설정
  const defaultTitle = "신뢰할 수 있는 돌봄 서비스 | 요양보호 전문센터";
  const defaultDescription = "전문적이고 안전한 요양보호 서비스로 어르신들의 건강하고 행복한 일상을 지원합니다. 24시간 안전 관리, 맞춤형 돌봄, 전문 요양보호사가 함께합니다.";
  const defaultKeywords = "요양보호, 돌봄서비스, 요양보호사, 재가요양, 방문요양, 장기요양보험, 노인돌봄, 케어서비스, 안전관리, 맞춤형돌봄";
  const defaultImage = "/images/og-image.jpg";
  const siteUrl = "https://careservice.co.kr";
  
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalImage = image || defaultImage;
  const finalUrl = url || `${siteUrl}${location.pathname}`;

  // 언어별 제목 및 설명
  const getLocalizedContent = () => {
    switch (i18n.language) {
      case 'en':
        return {
          title: title || "Trusted Care Services | Professional Long-term Care Center",
          description: description || "Supporting healthy and happy daily lives for seniors with professional and safe long-term care services. 24/7 safety management, customized care, and professional caregivers.",
          keywords: keywords || "long-term care, care services, caregiver, home care, visiting care, care insurance, elderly care, care service, safety management, customized care"
        };
      case 'ja':
        return {
          title: title || "信頼できる介護サービス | 専門介護保護センター",
          description: description || "専門的で安全な介護保護サービスで、高齢者の健康で幸せな日常を支援します。24時間安全管理、オーダーメイド介護、専門介護士が一緒にいます。",
          keywords: keywords || "介護保護, 介護サービス, 介護士, 在宅介護, 訪問介護, 介護保険, 高齢者介護, ケアサービス, 安全管理, オーダーメイド介護"
        };
      default:
        return {
          title: finalTitle,
          description: finalDescription,
          keywords: finalKeywords
        };
    }
  };

  const localizedContent = getLocalizedContent();

  React.useEffect(() => {
    // 동적으로 메타 태그 업데이트
    document.title = localizedContent.title;
    
    // 기본 메타 태그
    updateMetaTag('description', localizedContent.description);
    updateMetaTag('keywords', localizedContent.keywords);
    updateMetaTag('author', author || '요양보호 전문센터');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    
    // 언어 설정
    document.documentElement.lang = i18n.language;
    
    // Open Graph 메타 태그
    updateMetaProperty('og:title', localizedContent.title);
    updateMetaProperty('og:description', localizedContent.description);
    updateMetaProperty('og:type', type);
    updateMetaProperty('og:url', finalUrl);
    updateMetaProperty('og:image', finalImage);
    updateMetaProperty('og:image:width', '1200');
    updateMetaProperty('og:image:height', '630');
    updateMetaProperty('og:locale', i18n.language === 'ko' ? 'ko_KR' : i18n.language === 'ja' ? 'ja_JP' : 'en_US');
    updateMetaProperty('og:site_name', '요양보호 전문센터');
    
    // Twitter Card 메타 태그
    updateMetaName('twitter:card', 'summary_large_image');
    updateMetaName('twitter:title', localizedContent.title);
    updateMetaName('twitter:description', localizedContent.description);
    updateMetaName('twitter:image', finalImage);
    updateMetaName('twitter:site', '@careservice');
    updateMetaName('twitter:creator', '@careservice');
    
    // Article 전용 메타 태그
    if (type === 'article') {
      if (publishedTime) updateMetaProperty('article:published_time', publishedTime);
      if (modifiedTime) updateMetaProperty('article:modified_time', modifiedTime);
      if (author) updateMetaProperty('article:author', author);
    }
    
    // 추가 SEO 메타 태그
    updateMetaName('theme-color', '#2563eb');
    updateMetaName('msapplication-TileColor', '#2563eb');
    updateMetaName('application-name', '요양보호 전문센터');
    updateMetaName('apple-mobile-web-app-title', '요양보호센터');
    updateMetaName('apple-mobile-web-app-capable', 'yes');
    updateMetaName('apple-mobile-web-app-status-bar-style', 'default');
    
    // 구조화된 데이터 (JSON-LD)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: '요양보호 전문센터',
      description: localizedContent.description,
      url: siteUrl,
      logo: `${siteUrl}/images/logo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+82-1588-0000',
        contactType: 'customer service',
        availableLanguage: ['ko', 'en', 'ja']
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'KR',
        addressRegion: '서울특별시',
        addressLocality: '강남구'
      },
      sameAs: [
        'https://www.facebook.com/careservice',
        'https://www.instagram.com/careservice',
        'https://blog.naver.com/careservice'
      ]
    };
    
    updateStructuredData('organization', structuredData);
    
    // 서비스 구조화된 데이터
    const serviceData = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: '전문 요양보호 서비스',
      description: localizedContent.description,
      provider: {
        '@type': 'Organization',
        name: '요양보호 전문센터'
      },
      areaServed: {
        '@type': 'Country',
        name: '대한민국'
      },
      serviceType: '요양보호서비스',
      category: '헬스케어'
    };
    
    updateStructuredData('service', serviceData);
    
  }, [localizedContent.title, localizedContent.description, localizedContent.keywords, finalUrl, finalImage, i18n.language, type, author, publishedTime, modifiedTime]);

  return null; // 이 컴포넌트는 헤드 태그만 조작하므로 렌더링할 내용 없음
}

// 유틸리티 함수들
function updateMetaTag(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function updateMetaProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function updateMetaName(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function updateStructuredData(id: string, data: any) {
  let script = document.querySelector(`script[data-schema="${id}"]`);
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-schema', id);
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}