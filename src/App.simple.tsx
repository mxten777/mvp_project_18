import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Steps from "./components/Steps";
import FAQList from "./components/FAQList";
import Footer from "./components/Footer";

// 모바일 호환성을 위한 간소화된 App 컴포넌트
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Steps />
        <FAQList />
      </main>
      <Footer />
    </div>
  );
};

export default App;