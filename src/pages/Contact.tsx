import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const mailtoLink = `mailto:samdhav@unc.edu?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      )}`;
      window.location.href = mailtoLink;
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fade-in">
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-text">
                Contact Us
              </h1>
              <p className="text-lg text-gray-600">
                Have questions or want to learn more about HeallyDSP? We'd love to hear from you.
              </p>
            </div>

            <div className="card bg-white p-8 md:p-12 rounded-2xl shadow-lg">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <p className="text-gray-600 mb-6">
                  For all inquiries, please email:
                </p>
                <a 
                  href="mailto:samdhav@unc.edu"
                  className="text-xl font-semibold text-primary hover:text-primary-dark transition-colors"
                >
                  samdhav@unc.edu
                </a>
              </div>

              <div className="border-t border-gray-200 pt-8 mt-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-3">For DSP Professionals</h3>
                    <p className="text-gray-600">
                      Interested in joining our network? Contact us to learn about opportunities and requirements.
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-3">For Families & Individuals</h3>
                    <p className="text-gray-600">
                      Looking for support? Reach out to discover how we can help connect you with the right DSP.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Want to explore our services first?
              </p>
              <button 
                onClick={() => navigate('/about')} 
                className="btn btn-outline"
              >
                Learn More About Us
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="What is your message about?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input min-h-[150px]"
                    required
                    placeholder="Type your message here..."
                  />
                </div>

                <div className="flex flex-col items-center gap-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-full max-w-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>

                  {submitStatus === 'success' && (
                    <p className="text-green-600">
                      Your email client will open to send the message.
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-red-600">
                      There was an error sending your message. Please try again.
                    </p>
                  )}

                  <div className="text-center mt-6">
                    <p className="text-gray-600">
                      Or email us directly at:{' '}
                      <a
                        href="mailto:samdhav@unc.edu"
                        className="text-primary hover:underline font-medium"
                      >
                        samdhav@unc.edu
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 