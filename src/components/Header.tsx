

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const menuItems = [
    { to: "/about", label: "센터소개" },
    { to: "/services", label: "서비스소개" },
    { to: "/pricing", label: "서비스비용" },
    { to: "/notices", label: "공지사항" },
    { to: "/downloads", label: "자료실" },
    { to: "/reviews", label: "고객후기" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "연락처" },
    { to: "/apply", label: "상담신청" },
    { to: "/mypage", label: "마이페이지" },
    { to: "/login", label: "로그인" },
  ];
  return (
    <header style={{padding: 16, background: '#f0fdf4', borderBottom: '2px solid #22c55e'}}>
      <span style={{fontWeight: 'bold', fontSize: 20}}>테스트 헤더</span>
      <button style={{marginLeft: 16, fontSize: 24}} onClick={() => setOpen(true)}>☰</button>
      {open && (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#fff', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{fontSize: 32, marginBottom: 24}}>메뉴</div>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, marginBottom: 32}}>
            {menuItems.map((item) => (
              <li key={item.to} style={{fontSize: 20, margin: '12px 0', textAlign: 'center'}}>
                <Link to={item.to} style={{color: '#222', textDecoration: 'none'}} onClick={() => setOpen(false)}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <button style={{fontSize: 24, padding: 12, background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8}} onClick={() => setOpen(false)}>닫기</button>
        </div>
      )}
    </header>
  );
};

export default Header;
