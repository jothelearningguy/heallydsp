import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="hero-content slide-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary text-transparent bg-clip-text">
                Connect with the Perfect DSP Match
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Find your ideal Direct Support Professional match using our advanced AI-powered platform.
                Experience personalized care that understands your unique needs.
              </p>
              <div className="flex gap-4 mb-12">
                <button onClick={() => navigate('/register')} className="btn btn-primary">
                  Get Started
                </button>
                <button onClick={() => navigate('/about')} className="btn btn-outline">
                  Learn More
                </button>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-primary mb-2">500+</span>
                  <span className="text-sm text-gray-600">Active DSPs</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl font-bold text-primary mb-2">98%</span>
                  <span className="text-sm text-gray-600">Match Rate</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl font-bold text-primary mb-2">24/7</span>
                  <span className="text-sm text-gray-600">Support</span>
                </div>
              </div>
            </div>
            <div className="hero-image slide-up" style={{ animationDelay: '0.2s' }}>
              <img 
                src="/hero-illustration.svg" 
                alt="Connection Illustration" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose HeallyDSP?</h2>
            <p className="text-lg text-gray-600">
              Our platform combines advanced technology with human-centered care to create perfect matches.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Matching</h3>
              <p className="text-gray-600">
                Our advanced algorithm ensures perfect compatibility between DSPs and clients, considering personality, skills, and preferences.
              </p>
            </div>
            <div className="card slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-3">Real-time Chat</h3>
              <p className="text-gray-600">
                Communicate seamlessly with your matches through our integrated chat system. Stay connected and coordinated.
              </p>
            </div>
            <div className="card slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-semibold mb-3">Verified Profiles</h3>
              <p className="text-gray-600">
                All DSPs undergo thorough background checks and verification to ensure the highest quality of care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600">
              Real stories from people who found their perfect match on HeallyDSP.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card slide-up" style={{ animationDelay: '0.1s' }}>
              <p className="text-lg mb-6">
                "HeallyDSP helped me find the perfect support professional who understands my needs. The matching process was seamless!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full mr-4"></div>
                <div>
                  <strong className="block">Sarah M.</strong>
                  <span className="text-gray-600">Client</span>
                </div>
              </div>
            </div>
            <div className="card slide-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-lg mb-6">
                "As a DSP, this platform has connected me with amazing clients who match my expertise and working style perfectly."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full mr-4"></div>
                <div>
                  <strong className="block">John D.</strong>
                  <span className="text-gray-600">Direct Support Professional</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="card bg-gradient-primary text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Match?</h2>
            <p className="text-lg mb-8">
              Join our platform today and experience the future of DSP matching.
            </p>
            <button 
              onClick={() => navigate('/register')} 
              className="btn"
              style={{ background: 'white', color: 'var(--primary)' }}
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;