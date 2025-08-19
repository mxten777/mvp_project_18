import React from "react";

const Steps: React.FC = () => (
  <section className="py-16 bg-gradient-to-br from-[#e0e7ff] via-[#fdf6e3] to-white">
    <h3 className="text-2xl md:text-3xl font-extrabold text-blue-800 mb-12 text-center font-serif tracking-tight drop-shadow">서비스 이용 절차</h3>
    <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0 max-w-4xl mx-auto px-4">
      {/* 연결선 (데스크탑) */}
      <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#b4b4e6]/30 via-[#fdf6e3]/60 to-[#b4b4e6]/30 z-0" style={{transform:'translateY(-50%)'}} />
      {[
        { num: 1, label: '상담 신청', icon: '📞' },
        { num: 2, label: '방문 상담', icon: '🏠' },
        { num: 3, label: '서비스 신청', icon: '📝' },
        { num: 4, label: '맞춤 케어 시작', icon: '💙' },
      ].map((step) => (
        <div key={step.num} className="relative z-10 flex flex-col items-center md:w-1/4 group my-6 md:my-0 mx-0 md:mx-4" style={{zIndex:20}}>
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#b4b4e6] to-[#fdf6e3] text-3xl md:text-4xl font-extrabold mb-3 shadow-xl border-4 border-[#b4b4e6] group-hover:scale-105 transition-transform duration-200">
            <span>{step.icon}</span>
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-[#b4b4e6] text-xl font-extrabold text-[#3b3b6d] shadow mb-2 -mt-6 z-20">{step.num}</div>
          <span className="font-bold text-lg md:text-xl text-blue-800 text-center drop-shadow-sm group-hover:text-[#b4b4e6] transition-colors duration-200">{step.label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Steps;
