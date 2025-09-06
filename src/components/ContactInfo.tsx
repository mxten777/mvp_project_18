import React from "react";

const ContactInfo: React.FC = () => (
  <section className="py-10 max-w-xl mx-auto px-2">
    <h3 className="text-2xl font-bold text-center text-green-600 dark:text-gray-100 mb-7 tracking-tight select-none" style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}>연락처 및 센터 정보</h3>
    <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 space-y-5">
      <div className="flex items-center">
        <span className="font-semibold text-gray-800 dark:text-gray-100 w-28">센터 위치</span>
        <span className="ml-2 text-gray-700 dark:text-gray-300">서울특별시 강남구 테헤란로 123, 5층</span>
      </div>
      <div className="flex items-center">
        <span className="font-semibold text-gray-800 dark:text-gray-100 w-28">연락처</span>
        <span className="ml-2 text-gray-700 dark:text-gray-300">02-1234-5678</span>
      </div>
      <div className="flex items-center">
        <span className="font-semibold text-gray-800 dark:text-gray-100 w-28">운영 시간</span>
        <span className="ml-2 text-gray-700 dark:text-gray-300">월~금 09:00~18:00 (주말/공휴일 휴무)</span>
      </div>
      <div className="flex items-center">
        <span className="font-semibold text-gray-800 dark:text-gray-100 w-28">직원 구성</span>
        <span className="ml-2 text-gray-700 dark:text-gray-300">센터장(간호사), 사회복지사, 요양보호사 등</span>
      </div>
      <div className="flex items-center">
        <span className="font-semibold text-gray-800 dark:text-gray-100 w-28">이메일</span>
        <span className="ml-2 text-gray-700 dark:text-gray-300">info@100plus.co.kr</span>
      </div>
    </div>
  </section>
);

export default ContactInfo;
