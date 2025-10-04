import React from "react";
import Button from "./Button";

const Hero: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center justify-center overflow-hidden shadow-lg w-full max-w-full mt-4">
      {/* 단순화된 배경 */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* 로고/아이콘 */}
        <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg mb-6 sm:mb-8 border-4 border-white/50">
          <span className="text-4xl text-white">💚</span>
        </div>

        {/* 메인 헤딩 */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-800 mb-6 sm:mb-8 tracking-tight leading-tight max-w-4xl">
          <span className="block mb-2 sm:mb-3 text-base sm:text-lg md:text-xl font-normal">
            부모님 돌보시는 분들에게
          </span>
          <span className="block">
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              마음의 짐을 덜어드리겠습니다
            </span>
          </span>
        </h1>

        {/* 서브 헤딩 */}
        <div className="mb-6">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-3 sm:mb-4 font-medium max-w-3xl leading-relaxed">
            <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent font-semibold text-xl sm:text-2xl md:text-3xl">
              국가 지원금 85% 이상
            </span>
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 font-normal max-w-2xl leading-relaxed">
            전화 한 통으로 통합 방문요양/간호/목욕 서비스
          </p>
        </div>

        {/* CTA 버튼들 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button
            variant="primary"
            size="lg"
            className="text-lg px-8 py-4"
          >
            무료 상담 신청
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 py-4"
          >
            서비스 안내
          </Button>
        </div>

        {/* 신뢰 지표 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-sm text-gray-600 max-w-2xl">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-blue-600">1,000+</span>
            <span>만족한 고객</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-blue-600">24/7</span>
            <span>응급 대응</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-blue-600">5년+</span>
            <span>운영 경험</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;