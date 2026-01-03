import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import DestinationsSection from './components/DestinationsSection';
import FeaturedProgramsSection from './components/FeaturedProgramsSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import SearchPage from './components/SearchPage';
import DestinationsPage from './components/DestinationsPage';
import DashboardPage from './components/DashboardPage';
import ResourcesPage from './components/ResourcesPage';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import UniversityDetailsPage from './components/UniversityDetailsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <StatsSection />
              <DestinationsSection />
              <FeaturedProgramsSection />
              <TestimonialsSection />
            </>
          } />
          {/* Routes */}
          <Route path="/search" element={<SearchPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/university/:id" element={<UniversityDetailsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
