import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 언어 리소스
const resources = {
  ko: {
    translation: {
      // 네비게이션
      nav: {
        about: "센터소개",
        services: "서비스소개", 
        pricing: "서비스비용",
        notices: "공지사항",
        downloads: "자료실",
        reviews: "고객후기",
        faq: "FAQ",
        contact: "연락처",
        apply: "상담신청",
        privacy: "개인정보보호",
        security: "보안대시보드",
        mypage: "마이페이지",
        login: "로그인",
        logout: "로그아웃"
      },
      // 홈페이지
      hero: {
        title: "신뢰할 수 있는",
        subtitle: "돌봄 서비스",
        description: "전문적이고 안전한 요양보호 서비스로 어르신들의 건강하고 행복한 일상을 지원합니다.",
        cta: "무료 상담 신청",
        videoTitle: "서비스 소개 영상"
      },
      // 기능
      features: {
        title: "전문 돌봄 서비스",
        subtitle: "믿을 수 있는 전문가들이 제공하는 맞춤형 요양보호 서비스",
        professional: {
          title: "전문 요양보호사",
          description: "국가자격을 보유한 전문 요양보호사가 안전하고 전문적인 돌봄을 제공합니다."
        },
        customized: {
          title: "맞춤형 돌봄",
          description: "개인의 건강 상태와 생활 패턴에 맞춘 개별화된 돌봄 서비스를 제공합니다."
        },
        safety: {
          title: "24시간 안전 관리",
          description: "응급상황 대응 시스템과 24시간 모니터링으로 안전을 보장합니다."
        },
        technology: {
          title: "IT 기반 관리",
          description: "최신 IT 기술을 활용한 체계적이고 효율적인 돌봄 서비스를 제공합니다."
        },
        family: {
          title: "가족 소통",
          description: "실시간 돌봄 현황 공유와 정기적인 상담을 통해 가족과의 소통을 강화합니다."
        },
        insurance: {
          title: "보험 연계",
          description: "장기요양보험 및 각종 보험 서비스와 연계하여 경제적 부담을 줄입니다."
        }
      },
      // 단계
      steps: {
        title: "서비스 이용 과정",
        subtitle: "간단한 4단계로 최적의 돌봄 서비스를 받으세요",
        step1: {
          title: "상담 신청",
          description: "온라인 또는 전화로 무료 상담을 신청하세요."
        },
        step2: {
          title: "방문 상담",
          description: "전문 상담사가 직접 방문하여 맞춤 상담을 진행합니다."
        },
        step3: {
          title: "서비스 계획",
          description: "개인 맞춤형 돌봄 서비스 계획을 수립합니다."
        },
        step4: {
          title: "서비스 시작",
          description: "전문 요양보호사가 안전하고 전문적인 돌봄을 시작합니다."
        }
      },
      // 보안
      security: {
        title: "보안 및 개인정보보호",
        subtitle: "최고 수준의 보안 기술로 고객님의 소중한 정보를 안전하게 보호합니다.",
        reliability: "보안 신뢰도",
        monitoring: "실시간 모니터링",
        encryption: "AES 암호화",
        incidents: "보안 사고",
        privacy_protection: {
          title: "개인정보 보호",
          description: "고급 암호화 기술로 개인정보를 안전하게 보호합니다."
        },
        secure_auth: {
          title: "보안 인증",
          description: "2단계 인증과 생체 인식으로 계정을 보호합니다."
        },
        real_time_monitoring: {
          title: "실시간 모니터링",
          description: "24시간 보안 위협을 모니터링하고 즉시 대응합니다."
        },
        data_backup: {
          title: "데이터 백업",
          description: "정기적 백업으로 데이터 손실을 방지합니다."
        }
      },
      // 접근성
      accessibility: {
        skip_to_content: "본문으로 바로가기",
        menu_toggle: "메뉴 열기/닫기",
        language_selector: "언어 선택",
        font_size: "글자 크기",
        high_contrast: "고대비 모드",
        screen_reader: "스크린 리더 모드",
        keyboard_navigation: "키보드 네비게이션 도움말",
        zoom_in: "확대",
        zoom_out: "축소",
        reset_zoom: "확대/축소 초기화"
      },
      // 공통
      common: {
        loading: "로딩 중...",
        error: "오류가 발생했습니다",
        success: "성공적으로 완료되었습니다",
        cancel: "취소",
        confirm: "확인",
        save: "저장",
        edit: "수정",
        delete: "삭제",
        submit: "제출",
        reset: "초기화",
        search: "검색",
        filter: "필터",
        more: "더보기",
        less: "접기",
        prev: "이전",
        next: "다음",
        close: "닫기",
        open: "열기"
      }
    }
  },
  en: {
    translation: {
      // Navigation
      nav: {
        about: "About Us",
        services: "Services",
        pricing: "Pricing",
        notices: "Notices", 
        downloads: "Downloads",
        reviews: "Reviews",
        faq: "FAQ",
        contact: "Contact",
        apply: "Apply",
        privacy: "Privacy",
        security: "Security",
        mypage: "My Page",
        login: "Login",
        logout: "Logout"
      },
      // Homepage
      hero: {
        title: "Trusted",
        subtitle: "Care Services",
        description: "Supporting healthy and happy daily lives for seniors with professional and safe long-term care services.",
        cta: "Free Consultation",
        videoTitle: "Service Introduction Video"
      },
      // Features
      features: {
        title: "Professional Care Services",
        subtitle: "Customized long-term care services provided by trusted professionals",
        professional: {
          title: "Professional Caregivers",
          description: "Licensed professional caregivers provide safe and expert care."
        },
        customized: {
          title: "Customized Care",
          description: "Personalized care services tailored to individual health conditions and lifestyle patterns."
        },
        safety: {
          title: "24/7 Safety Management",
          description: "Emergency response system and 24-hour monitoring ensure safety."
        },
        technology: {
          title: "IT-Based Management",
          description: "Systematic and efficient care services using the latest IT technology."
        },
        family: {
          title: "Family Communication",
          description: "Strengthening family communication through real-time care status sharing and regular consultations."
        },
        insurance: {
          title: "Insurance Integration",
          description: "Reduces financial burden by linking with long-term care insurance and various insurance services."
        }
      },
      // Steps
      steps: {
        title: "Service Process",
        subtitle: "Get optimal care services in 4 simple steps",
        step1: {
          title: "Apply for Consultation",
          description: "Apply for a free consultation online or by phone."
        },
        step2: {
          title: "Home Visit Consultation",
          description: "A professional consultant visits you for personalized consultation."
        },
        step3: {
          title: "Service Planning",
          description: "Establish a personalized care service plan."
        },
        step4: {
          title: "Service Start",
          description: "Professional caregivers begin safe and expert care."
        }
      },
      // Security
      security: {
        title: "Security & Privacy Protection",
        subtitle: "Protecting your valuable information safely with the highest level of security technology.",
        reliability: "Security Reliability",
        monitoring: "Real-time Monitoring",
        encryption: "AES Encryption",
        incidents: "Security Incidents",
        privacy_protection: {
          title: "Privacy Protection",
          description: "Safely protecting personal information with advanced encryption technology."
        },
        secure_auth: {
          title: "Secure Authentication",
          description: "Protecting accounts with two-factor authentication and biometric recognition."
        },
        real_time_monitoring: {
          title: "Real-time Monitoring",
          description: "24-hour security threat monitoring and immediate response."
        },
        data_backup: {
          title: "Data Backup",
          description: "Preventing data loss through regular backups."
        }
      },
      // Accessibility
      accessibility: {
        skip_to_content: "Skip to main content",
        menu_toggle: "Toggle menu",
        language_selector: "Language selector",
        font_size: "Font size",
        high_contrast: "High contrast mode",
        screen_reader: "Screen reader mode",
        keyboard_navigation: "Keyboard navigation help",
        zoom_in: "Zoom in",
        zoom_out: "Zoom out",
        reset_zoom: "Reset zoom"
      },
      // Common
      common: {
        loading: "Loading...",
        error: "An error occurred",
        success: "Successfully completed",
        cancel: "Cancel",
        confirm: "Confirm",
        save: "Save",
        edit: "Edit",
        delete: "Delete",
        submit: "Submit",
        reset: "Reset",
        search: "Search",
        filter: "Filter",
        more: "More",
        less: "Less",
        prev: "Previous",
        next: "Next",
        close: "Close",
        open: "Open"
      }
    }
  },
  ja: {
    translation: {
      // ナビゲーション
      nav: {
        about: "センター紹介",
        services: "サービス紹介",
        pricing: "サービス料金",
        notices: "お知らせ",
        downloads: "資料室",
        reviews: "お客様の声",
        faq: "よくある質問",
        contact: "お問い合わせ",
        apply: "相談申込",
        privacy: "個人情報保護",
        security: "セキュリティ",
        mypage: "マイページ",
        login: "ログイン",
        logout: "ログアウト"
      },
      // ホームページ
      hero: {
        title: "信頼できる",
        subtitle: "介護サービス",
        description: "専門的で安全な介護保護サービスで、高齢者の健康で幸せな日常を支援します。",
        cta: "無料相談申込",
        videoTitle: "サービス紹介動画"
      },
      // 機能
      features: {
        title: "専門介護サービス",
        subtitle: "信頼できる専門家が提供するオーダーメイドの介護保護サービス",
        professional: {
          title: "専門介護士",
          description: "国家資格を持つ専門介護士が安全で専門的な介護を提供します。"
        },
        customized: {
          title: "オーダーメイド介護",
          description: "個人の健康状態と生活パターンに合わせた個別化された介護サービスを提供します。"
        },
        safety: {
          title: "24時間安全管理",
          description: "緊急事態対応システムと24時間モニタリングで安全を保障します。"
        },
        technology: {
          title: "IT基盤管理",
          description: "最新のIT技術を活用した体系的で効率的な介護サービスを提供します。"
        },
        family: {
          title: "家族コミュニケーション",
          description: "リアルタイムの介護状況共有と定期的な相談を通じて家族とのコミュニケーションを強化します。"
        },
        insurance: {
          title: "保険連携",
          description: "介護保険および各種保険サービスと連携して経済的負担を軽減します。"
        }
      },
      // Steps
      steps: {
        title: "サービス利用過程",
        subtitle: "簡単な4ステップで最適な介護サービスを受けられます",
        step1: {
          title: "相談申込",
          description: "オンラインまたは電話で無料相談をお申込みください。"
        },
        step2: {
          title: "訪問相談",
          description: "専門相談員が直接訪問してオーダーメイド相談を行います。"
        },
        step3: {
          title: "サービス計画",
          description: "個人オーダーメイドの介護サービス計画を策定します。"
        },
        step4: {
          title: "サービス開始",
          description: "専門介護士が安全で専門的な介護を開始します。"
        }
      },
      // セキュリティ
      security: {
        title: "セキュリティ・個人情報保護",
        subtitle: "最高レベルのセキュリティ技術でお客様の大切な情報を安全に保護します。",
        reliability: "セキュリティ信頼度",
        monitoring: "リアルタイムモニタリング",
        encryption: "AES暗号化",
        incidents: "セキュリティ事故",
        privacy_protection: {
          title: "個人情報保護",
          description: "高度な暗号化技術で個人情報を安全に保護します。"
        },
        secure_auth: {
          title: "セキュア認証",
          description: "2段階認証と生体認識でアカウントを保護します。"
        },
        real_time_monitoring: {
          title: "リアルタイムモニタリング",
          description: "24時間セキュリティ脅威をモニタリングし、即座に対応します。"
        },
        data_backup: {
          title: "データバックアップ",
          description: "定期的なバックアップでデータ損失を防止します。"
        }
      },
      // アクセシビリティ
      accessibility: {
        skip_to_content: "メインコンテンツへスキップ",
        menu_toggle: "メニューの開閉",
        language_selector: "言語選択",
        font_size: "文字サイズ",
        high_contrast: "ハイコントラストモード",
        screen_reader: "スクリーンリーダーモード",
        keyboard_navigation: "キーボードナビゲーションヘルプ",
        zoom_in: "拡大",
        zoom_out: "縮小",
        reset_zoom: "拡大/縮小リセット"
      },
      // 共通
      common: {
        loading: "読み込み中...",
        error: "エラーが発生しました",
        success: "正常に完了しました",
        cancel: "キャンセル",
        confirm: "確認",
        save: "保存",
        edit: "編集",
        delete: "削除",
        submit: "送信",
        reset: "リセット",
        search: "検索",
        filter: "フィルター",
        more: "もっと見る",
        less: "閉じる",
        prev: "前へ",
        next: "次へ",
        close: "閉じる",
        open: "開く"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ko',
    debug: import.meta.env.DEV,
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;