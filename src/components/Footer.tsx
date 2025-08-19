import React from "react";

const Footer: React.FC = () => (
  <footer className="w-full bg-gray-100 border-t mt-12">
    <div className="max-w-7xl mx-auto py-6 px-4 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} 백세플러스 재가복지센터. All rights reserved.
    </div>
  </footer>
);

export default Footer;
