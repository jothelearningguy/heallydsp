import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="fade-in">
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-text">
              About HeallyDSP
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing the way Direct Support Professionals connect with those who need their services,
              using advanced AI technology to create perfect matches.
            </p>
          </div>

          {/* Mission Section */}
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To transform the healthcare support industry by creating meaningful connections between
              Direct Support Professionals and those who need their services, powered by innovative
              technology and a deep understanding of healthcare needs.
            </p>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
            
            {/* Core Team */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Keshav Saxena */}
              <div className="card team-card slide-up">
                <div className="flex flex-col items-center text-center">
                  <div className="team-avatar mb-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                      KS
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Keshav Saxena</h3>
                    <p className="text-primary font-semibold mb-3">Lead Engineer & Project Leader</p>
                    <p className="text-gray-600 mb-4">
                      Leading the technical vision and development of HeallyDSP.
                    </p>
                    <a 
                      href="https://www.linkedin.com/in/keshav-saxena-9494b6206/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      LinkedIn Profile →
                    </a>
                  </div>
                </div>
              </div>

              {/* Joseph Ayinde */}
              <div className="card team-card slide-up">
                <div className="flex flex-col items-center text-center">
                  <div className="team-avatar mb-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                      JA
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Joseph Ayinde</h3>
                    <p className="text-primary font-semibold mb-3">Project Assistant & Frontend Lead</p>
                    <p className="text-gray-600 mb-4">
                      Spearheading the frontend development and user experience design.
                    </p>
                    <a 
                      href="https://www.linkedin.com/in/josephayinde/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      LinkedIn Profile →
                    </a>
                  </div>
                </div>
              </div>

              {/* Shruti Madhav */}
              <div className="card team-card slide-up">
                <div className="flex flex-col items-center text-center">
                  <div className="team-avatar mb-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                      SM
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Shruti Madhav</h3>
                    <p className="text-primary font-semibold mb-3">HDFS / DSP Project Lead</p>
                    <p className="text-gray-600 mb-4">
                      Leading human development and family studies initiatives.
                    </p>
                    <a 
                      href="https://www.linkedin.com/in/shruti-madhav-546386298/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      LinkedIn Profile →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Supervisors Section */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-8">Clinical Supervision</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Dr. Robert Christian */}
                <div className="card team-card slide-up">
                  <div className="flex flex-col items-center text-center">
                    <div className="team-avatar mb-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                        RC
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Dr. Robert Christian</h3>
                      <p className="text-primary font-semibold mb-3">Site Supervisor</p>
                      <ul className="text-gray-600 mb-4 space-y-2">
                        <li>Pediatrics and Adult/Child and Adolescent Psychiatry</li>
                        <li>Co-leads BMC – Behavioral Health Medicine Clinic</li>
                        <li>LEND Advisor</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Dr. Jennifer Diliberto */}
                <div className="card team-card slide-up">
                  <div className="flex flex-col items-center text-center">
                    <div className="team-avatar mb-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                        JD
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Dr. Jennifer Diliberto</h3>
                      <p className="text-primary font-semibold mb-3">Faculty Supervisor</p>
                      <ul className="text-gray-600 mb-4 space-y-2">
                        <li>Clinical Associate Professor</li>
                        <li>Council for Exceptional Children Board</li>
                        <li>Educators with Disabilities</li>
                        <li>Working with Families</li>
                        <li>Inclusive Classroom</li>
                        <li>Curriculum Development</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Advisors Section */}
            <div>
              <h3 className="text-2xl font-bold text-center mb-8">Community Advisors</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Jacklyn Boheler */}
                <div className="card team-card slide-up">
                  <div className="flex flex-col items-center text-center">
                    <div className="team-avatar mb-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                        JB
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Jacklyn Boheler</h3>
                      <ul className="text-gray-600 mb-4 space-y-2">
                        <li>B3 Co-Founder</li>
                        <li>SPACE Lab Research Coordinator</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Barbra Levin */}
                <div className="card team-card slide-up">
                  <div className="flex flex-col items-center text-center">
                    <div className="team-avatar mb-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                        BL
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Barbra Levin</h3>
                      <ul className="text-gray-600 mb-4 space-y-2">
                        <li>The G Day Foundation</li>
                        <li>Employee of Record</li>
                        <li>Parent Advocate</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Pascarelli's */}
                <div className="card team-card slide-up">
                  <div className="flex flex-col items-center text-center">
                    <div className="team-avatar mb-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                        P
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Pascarelli's</h3>
                      <ul className="text-gray-600 mb-4 space-y-2">
                        <li>Community Advocates</li>
                        <li>Parents</li>
                        <li>Connected through Arc of Triangle / ASNC</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-primary text-white rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8">
              Join our community today and experience the future of support services.
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => navigate('/register')} 
                className="btn"
                style={{ background: 'white', color: 'var(--primary)' }}
              >
                Sign Up Now
              </button>
              <button 
                onClick={() => navigate('/contact')} 
                className="btn"
                style={{ background: 'transparent', border: '2px solid white', color: 'white' }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 