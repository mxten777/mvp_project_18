import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1년
              },
              cacheKeyWillBeUsed: async ({ request }) => {
                return `${request.url}?v=1`;
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1년
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30일
              }
            }
          },
          {
            urlPattern: /^https:\/\/api\./i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 5 // 5분
              }
            }
          }
        ]
      },
      manifest: {
        name: '요양보호 전문센터',
        short_name: '요양보호센터',
        description: '전문적이고 안전한 요양보호 서비스',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    // 청크 크기 최적화
    rollupOptions: {
      output: {
        manualChunks: {
          // 벤더 라이브러리 분리
          vendor: ['react', 'react-dom'],
          ui: ['framer-motion', '@headlessui/react', '@heroicons/react'],
          utils: ['react-i18next', 'crypto-js'],
          charts: ['recharts']
        }
      }
    },
    // 압축 최적화
    minify: 'esbuild',
    target: 'esnext',
    // 소스맵 생성 (프로덕션에서는 false로 설정)
    sourcemap: true,
    // CSS 코드 분할
    cssCodeSplit: true,
    // 청크 크기 경고 임계값
    chunkSizeWarningLimit: 1000
  },
  // 개발 서버 최적화
  server: {
    hmr: {
      overlay: false
    }
  },
  // 최적화 설정
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      '@headlessui/react',
      '@heroicons/react/24/outline',
      '@heroicons/react/24/solid',
      'react-i18next',
      'crypto-js',
      'recharts'
    ]
  },
  // 환경 변수 설정
  define: {
    // 빌드 시간 정보
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    // 버전 정보
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0')
  }
})
