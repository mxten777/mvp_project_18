/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // 🎨 글로벌 표준 프리미엄 컬러 팔레트
      colors: {
        // Primary Brand Colors (Green - 돌봄, 성장, 신뢰)
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Secondary Neutral Colors (Slate - 전문성, 안정감)
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Accent Colors (Red - 긴급, 중요)
        accent: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        // Warm Colors (Amber - 따뜻함, 친근함)
        warm: {
          50: '#fefdf8',
          100: '#fefbf0',
          200: '#fef7e0',
          300: '#feecbf',
          400: '#fed99b',
          500: '#fbbf24',
          600: '#f59e0b',
          700: '#d97706',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // Success Colors (Emerald)
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        // Warning Colors (Orange)
        warning: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        // Error Colors (Rose)
        error: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
        // Info Colors (Blue)
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
      
      // 🎭 프리미엄 타이포그래피 시스템
      fontFamily: {
        'display': ['Pretendard Variable', 'Pretendard', 'Inter', '-apple-system', 'sans-serif'],
        'heading': ['Pretendard Variable', 'Pretendard', 'Noto Sans KR', 'sans-serif'],
        'body': ['Pretendard', 'Noto Sans KR', 'Apple SD Gothic Neo', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      
      // 반응형 & 유동적 타이포그래피
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.01em' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0' }],
        'xl': ['1.25rem', { lineHeight: '1.875rem', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.025em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.04em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
      },
      
      // 📐 정교한 스페이싱 시스템 (8px 기반)
      spacing: {
        '18': '4.5rem',   // 72px
        '88': '22rem',    // 352px
        '128': '32rem',   // 512px
        '144': '36rem',   // 576px
        '160': '40rem',   // 640px
        '192': '48rem',   // 768px
      },
      
      // 🌈 고급 그라데이션 & 배경
      backgroundImage: {
        // Glassmorphism gradients
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
        'glass-gradient-dark': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
        
        // Mesh gradients
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-primary': 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 25%, #bbf7d0 50%, #86efac 75%, #22c55e 100%)',
        'mesh-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
        'mesh-warm': 'linear-gradient(135deg, #fef7e0 0%, #feecbf 25%, #fed99b 50%, #fbbf24 75%, #f59e0b 100%)',
        
        // Animated gradients
        'gradient-shimmer': 'linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)',
        
        // Hero backgrounds
        'hero-gradient': 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #f8fafc 100%)',
        'hero-gradient-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      },
      
      // 💎 프리미엄 박스 섀도우
      boxShadow: {
        // Soft shadows
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 4px 20px -4px rgba(0, 0, 0, 0.08), 0 12px 25px -5px rgba(0, 0, 0, 0.05)',
        
        // Medium shadows
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04)',
        'medium-lg': '0 8px 30px -6px rgba(0, 0, 0, 0.12), 0 15px 25px -5px rgba(0, 0, 0, 0.06)',
        
        // Large shadows
        'large': '0 10px 50px -12px rgba(0, 0, 0, 0.25)',
        'xl': '0 20px 60px -15px rgba(0, 0, 0, 0.3)',
        '2xl': '0 25px 70px -20px rgba(0, 0, 0, 0.35)',
        
        // Glow effects
        'glow': '0 0 20px rgba(34, 197, 94, 0.4)',
        'glow-sm': '0 0 10px rgba(34, 197, 94, 0.3)',
        'glow-lg': '0 0 30px rgba(34, 197, 94, 0.5)',
        'glow-warm': '0 0 20px rgba(251, 191, 36, 0.4)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.4)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.4)',
        
        // Inner shadows for depth
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'inner-lg': 'inset 0 4px 8px 0 rgba(0, 0, 0, 0.1)',
        
        // Glassmorphism shadows
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      },
      
      // ✨ 프리미엄 애니메이션
      animation: {
        // Fade animations
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'fade-in-left': 'fadeInLeft 0.6s ease-out',
        'fade-in-right': 'fadeInRight 0.6s ease-out',
        
        // Slide animations
        'slide-in': 'slideIn 0.6s ease-out',
        'slide-in-up': 'slideInUp 0.5s ease-out',
        'slide-in-down': 'slideInDown 0.5s ease-out',
        
        // Scale animations
        'scale-in': 'scaleIn 0.4s ease-out',
        'scale-in-bounce': 'scaleInBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        
        // Bounce animations
        'bounce': 'bounce 1s infinite',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'bounce-slow': 'bounceGentle 3s infinite',
        
        // Pulse animations
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-gentle': 'pulseGentle 3s infinite',
        'pulse-slow': 'pulseGentle 4s infinite',
        
        // Float animations
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        
        // Rotate animations
        'spin': 'spin 1s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        'spin-reverse': 'spinReverse 1s linear infinite',
        
        // Shimmer effect
        'shimmer': 'shimmer 2s infinite',
        
        // Wiggle effect
        'wiggle': 'wiggle 1s ease-in-out infinite',
        
        // Glow pulse
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        
        // Tilt effect
        'tilt': 'tilt 10s infinite linear',
      },
      
      // 🎬 키프레임 정의
      keyframes: {
        // Fade keyframes
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        
        // Slide keyframes
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        
        // Scale keyframes
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleInBounce: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        
        // Bounce keyframes
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
        
        // Pulse keyframes
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        
        // Float keyframes
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        
        // Spin keyframes
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        
        // Shimmer keyframes
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        
        // Wiggle keyframes
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        
        // Glow pulse keyframes
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(34, 197, 94, 0.8)' },
        },
        
        // Tilt keyframes
        tilt: {
          '0%, 50%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
      },
// 🎯 부드러운 트랜지션
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'smooth-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'smooth-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      // ⏱️ 트랜지션 지속 시간
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
      },
      
      // 🎨 백드롭 필터 (Glassmorphism)
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      
      // 🔲 Border Radius (프리미엄 곡선)
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        'full': '9999px',
      },
      
      // 📊 Z-Index 계층
      zIndex: {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        'auto': 'auto',
      },
      
      // 🎭 Opacity 스케일
      opacity: {
        '0': '0',
        '5': '0.05',
        '10': '0.1',
        '15': '0.15',
        '20': '0.2',
        '25': '0.25',
        '30': '0.3',
        '35': '0.35',
        '40': '0.4',
        '45': '0.45',
        '50': '0.5',
        '55': '0.55',
        '60': '0.6',
        '65': '0.65',
        '70': '0.7',
        '75': '0.75',
        '80': '0.8',
        '85': '0.85',
        '90': '0.9',
        '95': '0.95',
        '100': '1',
      },
      
      // 🔄 Scale 변환
      scale: {
        '0': '0',
        '25': '.25',
        '50': '.5',
        '75': '.75',
        '90': '.9',
        '95': '.95',
        '98': '.98',
        '100': '1',
        '102': '1.02',
        '105': '1.05',
        '110': '1.1',
        '125': '1.25',
        '150': '1.5',
        '200': '2',
      },
      
      // 🌈 Background Size (for gradient animations)
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '50%': '50%',
        '100%': '100%',
        '200%': '200% 200%',
        '300%': '300% 300%',
      },
      
      // 📍 Background Position (for gradient animations)
      backgroundPosition: {
        'bottom': 'bottom',
        'center': 'center',
        'left': 'left',
        'left-bottom': 'left bottom',
        'left-top': 'left top',
        'right': 'right',
        'right-bottom': 'right bottom',
        'right-top': 'right top',
        'top': 'top',
        '0': '0% 50%',
        '50': '50% 50%',
        '100': '100% 50%',
      },
    },
  },
  plugins: [],
};
