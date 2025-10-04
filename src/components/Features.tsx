import React from "react";
import Card from "./Card";

const Features: React.FC = () => (
  <section className="py-20 bg-gradient-to-br from-primary-50/80 via-white to-secondary-50/80 dark:from-secondary-900 dark:via-secondary-950 dark:to-secondary-800 w-full">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 섹션 헤더 */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 dark:text-secondary-100 mb-4 font-heading">
          왜 바이칼을 선택하시나요?
        </h2>
        <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto leading-relaxed">
          전문적이고 신뢰할 수 있는 서비스로 어르신과 가족의 행복을 함께 만들어갑니다
        </p>
      </div>

      {/* 기능 카드들 */}
      <div className="grid gap-8 md:grid-cols-3">
        <Card variant="gradient" className="text-center p-8 hover:scale-105 transition-all duration-300">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 shadow-glow mb-6">
            <span className="text-4xl text-white">💸</span>
          </div>
          <h3 className="text-xl font-bold mb-4 text-secondary-800 dark:text-secondary-100 font-heading">
            국가 지원금 85% 이상
          </h3>
          <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
            국가에서 지원하는 장기요양보험으로 비용 부담을 크게 줄여드립니다. 합리적인 가격으로 전문 서비스를 받으세요.
          </p>
        </Card>

        <Card variant="gradient" className="text-center p-8 hover:scale-105 transition-all duration-300">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 dark:from-accent-400 dark:to-accent-500 shadow-glow mb-6">
            <span className="text-4xl text-white">📞</span>
          </div>
          <h3 className="text-xl font-bold mb-4 text-secondary-800 dark:text-secondary-100 font-heading">
            전화 한 통 통합 서비스
          </h3>
          <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
            방문요양, 방문간호, 방문목욕 등 모든 서비스를 한 번의 전화로 신청 가능합니다. 간편하고 빠른 상담을 경험하세요.
          </p>
        </Card>

        <Card variant="gradient" className="text-center p-8 hover:scale-105 transition-all duration-300">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-warm-500 to-warm-600 dark:from-warm-400 dark:to-warm-500 shadow-glow mb-6">
            <span className="text-4xl text-white">👩‍⚕️</span>
          </div>
          <h3 className="text-xl font-bold mb-4 text-secondary-800 dark:text-secondary-100 font-heading">
            전문 의료진 직접 방문
          </h3>
          <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
            간호사, 요양보호사 등 전문 의료진이 직접 방문하여 어르신의 상태를 정확히 파악하고 맞춤 케어를 제공합니다.
          </p>
        </Card>
      </div>
    </div>
  </section>
);

export default Features;
