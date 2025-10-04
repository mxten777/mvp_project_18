import React from "react";

const Steps: React.FC = () => (
  <section className="py-16 bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 rounded-2xl shadow-xl mx-2 mt-6 mobile-safe">
    <div className="text-center mb-12">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-green-700 dark:text-gray-100 tracking-tight drop-shadow select-none elegant-heading relative inline-block">
        서비스 이용 절차
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-green-600 opacity-70"></div>
      </h3>
      <p className="text-sm text-green-600 dark:text-gray-400 mt-2 font-light elegant-accent">
        간편한 4단계로 시작하세요
      </p>
    </div>
    <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-0 max-w-4xl mx-auto mobile-container">
      {/* 연결선 (데스크탑) */}
  <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-200/40 via-green-100/60 to-green-200/40 dark:from-gray-700/40 dark:via-gray-800/60 dark:to-gray-700/40 z-0" style={{transform:'translateY(-50%)'}} />
      {[
        { num: 1, label: '상담 신청', icon: '📞' },
        { num: 2, label: '방문 상담', icon: '🏠' },
        { num: 3, label: '서비스 신청', icon: '📝' },
        { num: 4, label: '맞춤 케어 시작', icon: '�' },
      ].map((step) => (
        <div key={step.num} className="relative z-10 flex flex-col items-center md:w-1/4 group my-4 sm:my-6 md:my-0 mx-0 md:mx-4" style={{zIndex:20}}>
          <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-green-200 to-green-100 dark:from-gray-800 dark:to-gray-700 text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 shadow-xl border-4 border-green-200 dark:border-gray-700 group-hover:scale-105 transition-transform duration-200">
            <span>{step.icon}</span>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 border-2 border-green-200 dark:border-gray-700 text-lg sm:text-xl font-bold text-green-700 dark:text-gray-100 shadow mb-2 -mt-4 sm:-mt-6 z-20">{step.num}</div>
          <span className="font-medium text-base sm:text-lg md:text-xl text-green-700 dark:text-gray-100 text-center drop-shadow-sm group-hover:text-green-400 dark:group-hover:text-gray-300 transition-colors duration-200 elegant-text">{step.label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Steps;
