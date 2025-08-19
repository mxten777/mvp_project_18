import NotFound from "./components/NotFound";
import MyPage from "./components/MyPage";
import DownloadList from "./components/DownloadList";
import NoticeList from "./components/NoticeList";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className="max-w-7xl mx-auto px-4 py-8 min-h-[80vh]">{children}</main>
);



import Hero from "./components/Hero";
import Features from "./components/Features";
import Steps from "./components/Steps";
import TestimonialList from "./components/TestimonialList";
import FAQList from "./components/FAQList";

const Home = () => (
  <>
    <Hero />
    <Features />
    <Steps />
    <TestimonialList />
    <FAQList />
  </>
);

const About = () => <div>센터소개 페이지</div>;
import ServiceDetailList from "./components/ServiceDetailList";
const Services = () => (
  <>
    <div>서비스소개 페이지</div>
    <ServiceDetailList />
  </>
);
const Pricing = () => <div>서비스비용 페이지</div>;
const Reviews = () => <div>고객후기 페이지</div>;
const FAQ = () => <div>FAQ 페이지</div>;
import ContactInfo from "./components/ContactInfo";
import MapSection from "./components/MapSection";
const Contact = () => (
  <div className="py-8 space-y-8">
    <ContactInfo />
    <MapSection />
  </div>
);
import ContactForm from "./components/ContactForm";
const Apply = () => (
  <div className="py-8">
    <ContactForm />
  </div>
);
import LoginPage from "./components/Login";
import DashboardPage from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import AdminNotice from "./components/AdminNotice";
import AdminDownload from "./components/AdminDownload";
import AdminUser from "./components/AdminUser";
import SignUp from "./components/SignUp";
import AdminApplication from "./components/AdminApplication";
const Login = () => (
  <LoginPage />
);
const Dashboard = () => (
  <DashboardPage />
);

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/application" element={<AdminApplication />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/notice" element={<AdminNotice />} />
          <Route path="/admin/download" element={<AdminDownload />} />
          <Route path="/admin/user" element={<AdminUser />} />
          <Route path="/notices" element={<NoticeList />} />
          <Route path="/downloads" element={<DownloadList />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
