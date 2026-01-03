import React, { useState, useEffect } from 'react';
import UniversityMap from '../components/UniversityMap';
import './HomePage.css';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');

  const [currentIndex, setCurrentIndex] = useState(0);

  const typingStrings = ["USA 🇺🇸", "UK 🇬🇧", "Canada 🇨🇦", "Germany 🇩🇪", "Australia 🇦🇺"];

  const [stats, setStats] = useState({
    countries: 0,
    universities: 0,
    scholarships: 0,
    students: 0
  });

  useEffect(() => {
    let currentString = typingStrings[currentIndex];
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId = null;

    const typeEffect = () => {
      if (!isDeleting && charIndex < currentString.length) {
        charIndex++;
        timeoutId = setTimeout(typeEffect, 250);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        timeoutId = setTimeout(typeEffect, 150);
      } else if (!isDeleting && charIndex === currentString.length) {
        timeoutId = setTimeout(() => {
          isDeleting = true;
          typeEffect();
        }, 5000);
      } else if (isDeleting && charIndex === 0) {
        setCurrentIndex((prev) => (prev + 1) % typingStrings.length);
      }
    };

    typeEffect();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentIndex]);

  useEffect(() => {
    const targetStats = {
      countries: 30,
      universities: 500,
      scholarships: 1000,
      students: 10000
    };

    const animateStats = () => {
      Object.keys(targetStats).forEach(key => {
        let count = 0;
        const target = targetStats[key];
        const increment = Math.ceil(target / 100);

        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          setStats(prev => ({ ...prev, [key]: count }));
        }, 40);
      });
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    alert(`Searching with: ${searchQuery || 'all universities'}`);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Study Abroad<br />
            <span className="typed-text">{typingStrings[currentIndex]}</span>
          </h1>
          <p className="hero-subtitle">
            Explore top universities, scholarships, and programs that match your goals. Your global education journey starts here.
          </p>
          <button
            className="hero-button"
            onClick={() => window.location.href = '/recommendations'}
          >
            Find My Match
          </button>
        </div>
      </section>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search universities, courses, scholarships..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button
          onClick={handleSearch}
          className="search-button"
        >
          🔍 Search
        </button>
      </div>

      {/* Stats Section */}
      <div className="stats-container">
        {[
          { value: stats.countries, label: 'Countries' },
          { value: stats.universities, label: 'Universities' },
          { value: stats.scholarships, label: 'Scholarships' },
          { value: stats.students, label: 'Students Placed' }
        ].map((stat, idx) => (
          <div key={idx} className="stat-item">
            <h3 className="stat-number">{stat.value}</h3>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <section className="section-white">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="features-grid">
          {[
            { icon: '💵', title: 'Scholarship Assistance', desc: 'Get guidance on thousands of scholarships tailored to your profile and needs.' },
            { icon: '🛂', title: 'Visa Support', desc: 'Expert assistance with visa applications and documentation for your study abroad journey.' },
            { icon: '🏠', title: 'Accommodation Help', desc: 'Find safe and affordable housing options near your university campus.' },
            { icon: '🎓', title: 'Career Guidance', desc: 'Connect with alumni and career counselors for post-study opportunities.' }
          ].map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Universities */}
      <section className="section">
        <h2 className="section-title">Top Universities</h2>
        <div className="cards-grid">
          {[
            { img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', name: 'Oxford University', desc: 'Top-ranked programs in Science & Arts with centuries of academic excellence.' },
            { img: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', name: 'Harvard University', desc: 'Global leader in Business & Law studies with unparalleled networking opportunities.' },
            { img: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', name: 'MIT', desc: 'World-class Engineering & Technology programs at the forefront of innovation.' }
          ].map((uni, idx) => (
            <div key={idx} className="card">
              <div className="card-image-container">
                <img src={uni.img} alt={uni.name} className="card-image" />
              </div>
              <div className="card-content">
                <h3 className="card-title">{uni.name}</h3>
                <p className="card-text">{uni.desc}</p>
                <button className="card-button">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filters */}
      <div className="filters-container">
        {[
          {
            value: selectedCountry, setter: setSelectedCountry, options: [
              { value: '', label: 'Choose Country' },
              { value: 'US', label: 'USA' },
              { value: 'UK', label: 'UK' },
              { value: 'CA', label: 'Canada' },
              { value: 'DE', label: 'Germany' },
              { value: 'AU', label: 'Australia' }
            ]
          },
          {
            value: selectedField, setter: setSelectedField, options: [
              { value: '', label: 'Field of Study' },
              { value: 'Engineering', label: 'Engineering' },
              { value: 'Business', label: 'Business' },
              { value: 'Medicine', label: 'Medicine' },
              { value: 'Arts', label: 'Arts' }
            ]
          },
          {
            value: selectedBudget, setter: setSelectedBudget, options: [
              { value: '', label: 'Budget Range' },
              { value: '0-10000', label: 'Under $10,000' },
              { value: '10000-30000', label: '$10,000 - $30,000' },
              { value: '30000+', label: '$30,000+' }
            ]
          },
          {
            value: selectedDegree, setter: setSelectedDegree, options: [
              { value: '', label: 'Degree Level' },
              { value: 'undergraduate', label: 'Undergraduate' },
              { value: 'graduate', label: 'Graduate' },
              { value: 'phd', label: 'PhD' }
            ]
          }
        ].map((filter, idx) => (
          <select
            key={idx}
            value={filter.value}
            onChange={(e) => filter.setter(e.target.value)}
            className="filter-select"
          >
            {filter.options.map((opt, i) => (
              <option key={i} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ))}
      </div>

      {/* University Map Section */}
      <section className="map-section">
        {/* Animated Background Elements */}
        <div className="map-blob map-blob-1"></div>
        <div className="map-blob map-blob-2"></div>

        <div className="map-container">
          {/* Section Header */}
          <div className="map-header">
            <div className="map-badge">
              <span>🌍 Interactive Map</span>
            </div>

            <h2 className="map-title">
              Explore Universities Worldwide
            </h2>

            <div className="map-divider"></div>

            <p className="map-description">
              {selectedCountry
                ? `📍 Showing universities in ${selectedCountry === 'US' ? 'USA' : selectedCountry === 'UK' ? 'United Kingdom' : selectedCountry === 'CA' ? 'Canada' : selectedCountry === 'AU' ? 'Australia' : selectedCountry}`
                : '🗺️ Discover universities worldwide - Use the filters above to narrow down by country'}
            </p>
          </div>

          {/* Map Container with Enhanced Styling */}
          <div className="map-card">
            {/* Map Info Bar */}
            <div className="map-info-bar">
              <div className="map-info-title">
                <span>🎓</span>
                <span style={{ color: '#3a0ca3', fontWeight: 600 }}>Interactive University Explorer</span>
              </div>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <div className="map-info-badge">
                  <span style={{ color: '#4361ee' }}>●</span>
                  <span>Click markers for details</span>
                </div>
                <div className="map-info-badge">
                  <span style={{ color: '#f72585' }}>●</span>
                  <span>Zoom & pan enabled</span>
                </div>
              </div>
            </div>

            {/* Map Component */}
            <div className="map-wrapper">
              <UniversityMap
                selectedCountry={selectedCountry}
                height="600px"
                showControls={true}
              />
            </div>

            {/* Map Legend/Stats */}
            <div className="map-stats-grid">
              {[
                { icon: '🏫', label: 'Total Universities', value: '500+' },
                { icon: '🌎', label: 'Countries', value: '30+' },
                { icon: '💰', label: 'Scholarships', value: '1000+' },
                { icon: '✈️', label: 'Success Stories', value: '10K+' }
              ].map((item, idx) => (
                <div key={idx} className="map-stat-item">
                  <div className="map-stat-icon">{item.icon}</div>
                  <div className="map-stat-value">{item.value}</div>
                  <div className="map-stat-label">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="map-cta">
            <button className="map-cta-button">
              🚀 Get Personalized Recommendations
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;