import React from "react";

const MapSection: React.FC = () => (
  <section className="py-8 max-w-2xl mx-auto">
    <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">오시는 길</h3>
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
      <iframe
        title="센터 위치 지도"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.915123456789!2d127.031767!3d37.498095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca158b1b1b1b1%3A0x123456789abcdef!2z7ISc7Jq47Yq567OE7IucIOyEnOyauO2KuOuzuOq1rCDshJzsmqjtirjsnY0!5e0!3m2!1sko!2skr!4v1690000000000!5m2!1sko!2skr"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded w-full"
      ></iframe>
      <div className="text-gray-600 text-sm mt-2">서울특별시 강남구 테헤란로 123, 5층</div>
    </div>
  </section>
);

export default MapSection;
