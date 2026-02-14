import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';

// Layouts
import { MainLayout } from './layouts';

// Components
import ScrollToTop from './components/ui/ScrollToTop';

// Pages
import { 
  HomePage, 
  ServicesPage, 
  FAQPage, 
  ContactPage, 
  NotFoundPage 
} from './pages';

// Contexts
import { AuthProvider } from "./contexts/AuthContext";
import SEOHead from "./components/ui/SEOHead";



// AI 대시보드 페이지
const AIDashboardPage: React.FC = () => (
  <div className="py-16">
    <SEOHead title="AI 대시보드 - 돌봄서비스" />
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">AI 대시보드</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* AI 상태 카드 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">AI 어시스턴트</h3>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <p className="text-3xl font-bold text-green-600 mb-2">활성화</p>
          <p className="text-sm text-gray-600">24시간 상담 지원 중</p>
        </div>
        
        {/* 분석 통계 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">상담 통계</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">오늘 상담</span>
              <span className="font-bold text-blue-600">24건</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">이번 주</span>
              <span className="font-bold text-blue-600">156건</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">만족도</span>
              <span className="font-bold text-green-600">98%</span>
            </div>
          </div>
        </div>
        
        {/* 빠른 액션 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">빠른 액션</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              AI 모델 업데이트
            </button>
            <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              학습 데이터 관리
            </button>
            <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              성능 분석 보고서
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 보안센터 페이지
const SecurityCenterPage: React.FC = () => (
  <div className="py-16">
    <SEOHead title="보안센터 - 돌봄서비스" />
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">보안센터</h1>
      
      {/* 보안 상태 대시보드 */}
      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">시스템 보안</span>
            <span className="text-2xl">🔒</span>
          </div>
          <div className="text-2xl font-bold text-green-600">안전</div>
          <div className="text-sm text-gray-500">최종 점검: 1시간 전</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">데이터 암호화</span>
            <span className="text-2xl">🛡️</span>
          </div>
          <div className="text-2xl font-bold text-green-600">활성</div>
          <div className="text-sm text-gray-500">AES-256 암호화</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">접근 로그</span>
            <span className="text-2xl">📊</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">247</div>
          <div className="text-sm text-gray-500">오늘 접근 건수</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">위험 알림</span>
            <span className="text-2xl">⚠️</span>
          </div>
          <div className="text-2xl font-bold text-green-600">0</div>
          <div className="text-sm text-gray-500">위험 요소 없음</div>
        </div>
      </div>
      
      {/* 보안 관리 메뉴 */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">접근 권한 관리</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">관리자 권한</div>
                <div className="text-sm text-gray-600">시스템 전체 접근</div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">직원 권한</div>
                <div className="text-sm text-gray-600">서비스 관련 기능</div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">사용자 권한</div>
                <div className="text-sm text-gray-600">개인정보 열람만</div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">보안 설정</h3>
          <div className="space-y-4">
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              비밀번호 정책 설정
            </button>
            <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              2단계 인증 관리
            </button>
            <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              IP 접근 제한
            </button>
            <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              보안 로그 다운로드
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 분석 페이지
const AnalyticsPage: React.FC = () => (
  <div className="py-16">
    <SEOHead title="데이터 분석 - 돌봄서비스" />
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">데이터 분석</h1>
      
      {/* 주요 지표 */}
      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">총 이용자</span>
            <span className="text-2xl">👥</span>
          </div>
          <div className="text-3xl font-bold text-blue-600">1,247</div>
          <div className="text-sm text-green-600">↗️ +12% 이번 달</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">월 매출</span>
            <span className="text-2xl">💰</span>
          </div>
          <div className="text-3xl font-bold text-green-600">8,420만원</div>
          <div className="text-sm text-green-600">↗️ +8% 전월 대비</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">서비스 만족도</span>
            <span className="text-2xl">⭐</span>
          </div>
          <div className="text-3xl font-bold text-yellow-600">4.8/5.0</div>
          <div className="text-sm text-gray-500">총 892개 리뷰</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">응답 시간</span>
            <span className="text-2xl">⚡</span>
          </div>
          <div className="text-3xl font-bold text-purple-600">1.2초</div>
          <div className="text-sm text-green-600">↗️ 30% 개선</div>
        </div>
      </div>
      
      {/* 상세 분석 */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* 서비스 이용 현황 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">서비스 이용 현황</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">방문요양</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-3 mr-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{width: '68%'}}></div>
                </div>
                <span className="font-bold">68%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">방문간호</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-3 mr-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{width: '52%'}}></div>
                </div>
                <span className="font-bold">52%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">방문목욕</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-3 mr-3">
                  <div className="bg-purple-600 h-3 rounded-full" style={{width: '34%'}}></div>
                </div>
                <span className="font-bold">34%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">주야간보호</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-3 mr-3">
                  <div className="bg-yellow-600 h-3 rounded-full" style={{width: '28%'}}></div>
                </div>
                <span className="font-bold">28%</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 지역별 통계 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">지역별 이용 현황</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">서울특별시</div>
                <div className="text-sm text-gray-600">342명 이용 중</div>
              </div>
              <div className="text-xl font-bold text-blue-600">27.4%</div>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">경기도</div>
                <div className="text-sm text-gray-600">298명 이용 중</div>
              </div>
              <div className="text-xl font-bold text-green-600">23.9%</div>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">부산광역시</div>
                <div className="text-sm text-gray-600">156명 이용 중</div>
              </div>
              <div className="text-xl font-bold text-purple-600">12.5%</div>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">기타 지역</div>
                <div className="text-sm text-gray-600">451명 이용 중</div>
              </div>
              <div className="text-xl font-bold text-gray-600">36.2%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 협업 페이지
const CollaborationPage: React.FC = () => (
  <div className="py-16">
    <SEOHead title="협업센터 - 돌봄서비스" />
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">협업센터</h1>
      
      {/* 협업 현황 */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">활성 프로젝트</span>
            <span className="text-2xl">📋</span>
          </div>
          <div className="text-3xl font-bold text-blue-600">12</div>
          <div className="text-sm text-gray-500">진행 중인 협업</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">팀 멤버</span>
            <span className="text-2xl">👤</span>
          </div>
          <div className="text-3xl font-bold text-green-600">48</div>
          <div className="text-sm text-green-600">+3명 이번 주</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">완료 작업</span>
            <span className="text-2xl">✅</span>
          </div>
          <div className="text-3xl font-bold text-purple-600">156</div>
          <div className="text-sm text-gray-500">이번 달 완료</div>
        </div>
      </div>
      
      {/* 협업 도구 */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* 실시간 협업 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">실시간 협업</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-gray-800">돌봄 서비스 개선 회의</div>
                <div className="text-sm text-gray-500">진행 중</div>
              </div>
              <div className="text-sm text-gray-600 mb-3">참여자: 김민수, 박영희, 이철수 외 5명</div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                회의 참여
              </button>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-gray-800">월간 성과 리뷰</div>
                <div className="text-sm text-gray-500">14:00 시작</div>
              </div>
              <div className="text-sm text-gray-600 mb-3">참여자: 관리팀 전체</div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                일정 확인
              </button>
            </div>
          </div>
        </div>
        
        {/* 파일 공유 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">공유 파일</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-xl mr-3">📄</span>
                <div>
                  <div className="font-medium">서비스 매뉴얼 v2.0</div>
                  <div className="text-sm text-gray-600">2시간 전 업데이트</div>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800">다운로드</button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-xl mr-3">📊</span>
                <div>
                  <div className="font-medium">월별 통계 보고서</div>
                  <div className="text-sm text-gray-600">1일 전 업로드</div>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800">다운로드</button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-xl mr-3">🎯</span>
                <div>
                  <div className="font-medium">개선 계획서</div>
                  <div className="text-sm text-gray-600">3일 전 공유</div>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800">다운로드</button>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              + 새 파일 업로드
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * PC용 메인 앱 컴포넌트
 * 데스크톱/태블릿 환경에서 사용되는 전체 기능 버전
 */
const AppPC: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              
              {/* Phase 5: 대시보드 페이지들 */}
              <Route path="/ai-dashboard" element={<AIDashboardPage />} />
              <Route path="/security-center" element={<SecurityCenterPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/collaboration" element={<CollaborationPage />} />
              
              {/* 404 페이지 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </MainLayout>
        </Router>
      </AuthProvider>
    </I18nextProvider>
  );
};

export default AppPC;