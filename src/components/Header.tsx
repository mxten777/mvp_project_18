
import React, { useState } from "react";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const menuItems = [
    '센터소개', '서비스소개', '서비스비용', '공지사항', '자료실', '고객후기', 'FAQ', '연락처', '상담신청', '마이페이지', '로그인'
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
              <li key={item} style={{fontSize: 20, margin: '12px 0', textAlign: 'center'}}>{item}</li>
            ))}
          </ul>
          <button style={{fontSize: 24, padding: 12, background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8}} onClick={() => setOpen(false)}>닫기</button>
        </div>
      )}
    </header>
  );
};

export default Header;
