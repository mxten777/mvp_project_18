/**
 * SEO 최적화 유틸리티
 */

// 메타 태그 관리
export class SEOManager {
  private static instance: SEOManager;
  private metaTags: Map<string, HTMLMetaElement> = new Map();
  private structuredData: Map<string, HTMLScriptElement> = new Map();

  static getInstance(): SEOManager {
    if (!SEOManager.instance) {
      SEOManager.instance = new SEOManager();
    }
    return SEOManager.instance;
  }

  // 페이지 제목 설정
  setTitle(title: string, separator: string = ' | ', siteName: string = '요양보호 전문센터'): void {
    document.title = `${title}${separator}${siteName}`;
  }

  // 메타 태그 설정
  setMeta(name: string, content: string, property?: boolean): void {
    const attribute = property ? 'property' : 'name';
    let meta = this.metaTags.get(name);

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
      this.metaTags.set(name, meta);
    }

    meta.setAttribute('content', content);
  }

  // Open Graph 메타 태그 설정
  setOpenGraph(data: {
    title?: string;
    description?: string;
    type?: string;
    url?: string;
    image?: string;
    siteName?: string;
    locale?: string;
  }): void {
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        this.setMeta(`og:${key}`, value, true);
      }
    });
  }

  // Twitter Card 메타 태그 설정
  setTwitterCard(data: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
    site?: string;
    creator?: string;
  }): void {
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        this.setMeta(`twitter:${key}`, value);
      }
    });
  }

  // 구조화된 데이터 설정
  setStructuredData(type: string, data: any): void {
    let script = this.structuredData.get(type);

    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', type);
      document.head.appendChild(script);
      this.structuredData.set(type, script);
    }

    script.textContent = JSON.stringify(data);
  }

  // 정식 URL 설정
  setCanonical(url: string): void {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    
    link.href = url;
  }

  // 언어 대체 URL 설정
  setAlternateLanguages(languages: { [key: string]: string }): void {
    // 기존 hreflang 링크 제거
    const existingLinks = document.querySelectorAll('link[hreflang]');
    existingLinks.forEach(link => link.remove());

    // 새로운 hreflang 링크 추가
    Object.entries(languages).forEach(([lang, url]) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = url;
      document.head.appendChild(link);
    });
  }

  // 로봇 메타 태그 설정
  setRobots(directives: string[]): void {
    this.setMeta('robots', directives.join(', '));
  }

  // 모든 메타 태그 제거
  clearAll(): void {
    this.metaTags.forEach(meta => meta.remove());
    this.metaTags.clear();
    
    this.structuredData.forEach(script => script.remove());
    this.structuredData.clear();
  }
}

// 브레드크럼 구조화된 데이터 생성
export function createBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

// FAQ 구조화된 데이터 생성
export function createFAQStructuredData(faqs: Array<{ question: string; answer: string }>): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// 서비스 구조화된 데이터 생성
export function createServiceStructuredData(service: {
  name: string;
  description: string;
  provider: string;
  areaServed: string;
  serviceType: string;
  url?: string;
  offers?: Array<{
    name: string;
    description: string;
    price?: string;
    currency?: string;
  }>;
}): any {
  const structuredData: any = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: service.provider
    },
    areaServed: {
      '@type': 'Place',
      name: service.areaServed
    },
    serviceType: service.serviceType
  };

  if (service.url) {
    structuredData.url = service.url;
  }

  if (service.offers && service.offers.length > 0) {
    structuredData.offers = service.offers.map(offer => ({
      '@type': 'Offer',
      name: offer.name,
      description: offer.description,
      ...(offer.price && {
        price: offer.price,
        priceCurrency: offer.currency || 'KRW'
      })
    }));
  }

  return structuredData;
}

// 조직 구조화된 데이터 생성
export function createOrganizationStructuredData(org: {
  name: string;
  description: string;
  url: string;
  logo: string;
  contactPoint: {
    telephone: string;
    contactType: string;
    availableLanguage: string[];
  };
  address: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  sameAs?: string[];
}): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    description: org.description,
    url: org.url,
    logo: org.logo,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: org.contactPoint.telephone,
      contactType: org.contactPoint.contactType,
      availableLanguage: org.contactPoint.availableLanguage
    },
    address: {
      '@type': 'PostalAddress',
      ...org.address
    },
    ...(org.sameAs && { sameAs: org.sameAs })
  };
}

// 리뷰 구조화된 데이터 생성
export function createReviewStructuredData(reviews: Array<{
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}>): any {
  return reviews.map(review => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished
  }));
}

// URL 슬러그 생성 (SEO 친화적)
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // 특수문자 제거
    .replace(/[\s_-]+/g, '-') // 공백과 언더스코어를 하이픈으로
    .replace(/^-+|-+$/g, ''); // 시작과 끝의 하이픈 제거
}

// 메타 설명 최적화 (길이 제한)
export function optimizeMetaDescription(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) {
    return description;
  }
  
  // 단어 단위로 자르기
  const words = description.split(' ');
  let result = '';
  
  for (const word of words) {
    if ((result + ' ' + word).length > maxLength - 3) {
      break;
    }
    result += (result ? ' ' : '') + word;
  }
  
  return result + '...';
}

// 키워드 밀도 계산
export function calculateKeywordDensity(content: string, keyword: string): number {
  const words = content.toLowerCase().split(/\s+/);
  const keywordOccurrences = words.filter(word => 
    word.includes(keyword.toLowerCase())
  ).length;
  
  return (keywordOccurrences / words.length) * 100;
}

// 제목 최적화 체크
export function optimizeTitle(title: string): {
  optimized: string;
  warnings: string[];
  score: number;
} {
  const warnings: string[] = [];
  let score = 100;
  
  // 길이 체크 (50-60자 권장)
  if (title.length < 30) {
    warnings.push('제목이 너무 짧습니다. 30자 이상 권장합니다.');
    score -= 20;
  } else if (title.length > 60) {
    warnings.push('제목이 너무 깁니다. 60자 이하 권장합니다.');
    score -= 15;
  }
  
  // 특수문자 과다 사용 체크
  const specialCharCount = (title.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length;
  if (specialCharCount > 3) {
    warnings.push('특수문자 사용을 줄이는 것이 좋습니다.');
    score -= 10;
  }
  
  // 대문자 과다 사용 체크
  const upperCaseCount = (title.match(/[A-Z]/g) || []).length;
  if (upperCaseCount > title.length * 0.3) {
    warnings.push('대문자 사용을 줄이는 것이 좋습니다.');
    score -= 10;
  }
  
  return {
    optimized: title,
    warnings,
    score: Math.max(0, score)
  };
}

// 사이트맵 항목 생성
export interface SitemapItem {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function generateSitemap(items: SitemapItem[]): string {
  const urlset = items.map(item => {
    let url = `  <url>\n    <loc>${item.url}</loc>`;
    
    if (item.lastmod) {
      url += `\n    <lastmod>${item.lastmod}</lastmod>`;
    }
    
    if (item.changefreq) {
      url += `\n    <changefreq>${item.changefreq}</changefreq>`;
    }
    
    if (item.priority !== undefined) {
      url += `\n    <priority>${item.priority}</priority>`;
    }
    
    url += '\n  </url>';
    return url;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`;
}

// robots.txt 생성
export function generateRobotsTxt(options: {
  userAgent?: string;
  disallow?: string[];
  allow?: string[];
  sitemapUrl?: string;
  crawlDelay?: number;
}): string {
  const { userAgent = '*', disallow = [], allow = [], sitemapUrl, crawlDelay } = options;
  
  let robotsTxt = `User-agent: ${userAgent}\n`;
  
  disallow.forEach(path => {
    robotsTxt += `Disallow: ${path}\n`;
  });
  
  allow.forEach(path => {
    robotsTxt += `Allow: ${path}\n`;
  });
  
  if (crawlDelay) {
    robotsTxt += `Crawl-delay: ${crawlDelay}\n`;
  }
  
  if (sitemapUrl) {
    robotsTxt += `\nSitemap: ${sitemapUrl}`;
  }
  
  return robotsTxt;
}