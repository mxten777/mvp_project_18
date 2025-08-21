
import React, { useState } from "react";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <header style={{padding: 16, background: '#f0fdf4', borderBottom: '2px solid #22c55e'}}>
      <span style={{fontWeight: 'bold', fontSize: 20}}>테스트 헤더</span>
      <button style={{marginLeft: 16, fontSize: 24}} onClick={() => setOpen(true)}>☰</button>
      {open && <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#fff', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontSize: 32, marginBottom: 24}}>메뉴</div>
        <button style={{fontSize: 24, padding: 12, background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8}} onClick={() => setOpen(false)}>닫기</button>
      </div>}
    </header>
  );
};

export default Header;
