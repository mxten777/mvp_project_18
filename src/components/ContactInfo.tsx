import React from "react";

const ContactInfo: React.FC = () => (
  <section className="py-8 max-w-xl mx-auto">
    <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">연락처 및 센터 정보</h3>
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <div>
        <span className="font-semibold">센터 위치:</span>
        <span className="ml-2">서울특별시 강남구 테헤란로 123, 5층</span>
      </div>
      <div>
        <span className="font-semibold">연락처:</span>
        <span className="ml-2">02-1234-5678</span>
      </div>
      <div>
        <span className="font-semibold">운영 시간:</span>
        <span className="ml-2">월~금 09:00~18:00 (주말/공휴일 휴무)</span>
      </div>
      <div>
        <span className="font-semibold">직원 구성:</span>
        <span className="ml-2">센터장(간호사), 사회복지사, 요양보호사 등</span>
      </div>
      <div>
        <span className="font-semibold">이메일:</span>
        <span className="ml-2">info@100plus.co.kr</span>
      </div>
    </div>
  </section>
);

export default ContactInfo;
