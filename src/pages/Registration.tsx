import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  role: string;
  name: string;
  email: string;
  age: string;
  location: {
    city: string;
    state: string;
    zipCode: string;
  };
  availability: string[];
  communicationStyle: string;
  experienceYears?: string;
  specializations?: string[];
  supportNeeds?: string[];
  preferredGender?: string;
  transportationAvailable?: boolean;
  languagesSpoken: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  backgroundCheck?: boolean;
  certifications?: string[];
  preferredAgeGroup?: string[];
  medicalConditions?: string[];
  mobilityNeeds?: string[];
  schedulePreference: string[];
  willingToTravel: number; // miles
  behaviorManagement?: string[];
  sensoryExperience?: string[];
  sensoryNeeds?: string[];
  communicationPreferences?: string[];
  behavioralConsiderations?: string[];
  routinePreferences?: string;
  challengingSituations?: string;
  conflictResolution?: string;
  pastExperiences?: string;
  preferredSupportStyle?: string;
  pastMatchingIssues?: {
    communicationIssues: string[];
    schedulingIssues: string[];
    personalityConflicts: string[];
    skillGaps: string[];
    otherIssues: string;
  };
  matchPreferences?: {
    personalityTraits: string[];
    dealBreakers: string[];
    successfulExperiences: string;
  };
  phone: string;
  additionalNotes: string;
}

const Registration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    role: '',
    name: '',
    email: '',
    age: '',
    location: {
      city: '',
      state: '',
      zipCode: ''
    },
    availability: [],
    communicationStyle: '',
    languagesSpoken: ['English'],
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    schedulePreference: [],
    willingToTravel: 15,
    phone: '',
    additionalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const availabilityOptions = [
    'Weekday Mornings',
    'Weekday Afternoons',
    'Weekday Evenings',
    'Weekend Mornings',
    'Weekend Afternoons',
    'Weekend Evenings',
    'Overnight',
    'On-Call',
    'Flexible'
  ];

  const specializationOptions = [
    'Personal Care',
    'Medication Management',
    'Mobility Assistance',
    'Meal Preparation',
    'Transportation',
    'Companionship',
    'Behavioral Support',
    'Memory Care',
    'Physical Therapy Support',
    'Educational Support'
  ];

  const supportNeedsOptions = [
    'Activities of Daily Living (ADL)',
    'Mobility Assistance',
    'Medication Reminders',
    'Meal Preparation',
    'Transportation',
    'Companionship',
    'Behavioral Support',
    'Memory Care',
    'Educational Support',
    'Physical Therapy Exercises'
  ];

  const ageGroupOptions = [
    'Children (0-12)',
    'Teenagers (13-17)',
    'Young Adults (18-25)',
    'Adults (26-54)',
    'Seniors (55+)'
  ];

  const mobilityNeedsOptions = [
    'Independent',
    'Uses Walker',
    'Uses Wheelchair',
    'Bed Transfer Assistance',
    'Full Mobility Assistance'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleMultiSelect = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Format the registration data for email
      const formattedBody = `
New Registration Request:

Role: ${formData.role}
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Location: ${formData.location.city}, ${formData.location.state} ${formData.location.zipCode}

Availability:
${formData.availability.join(', ')}

${formData.role === 'dsp' ? `
Professional Details:
Specializations: ${formData.specializations?.join(', ')}
Communication Style: ${formData.communicationStyle}
Past Experience: ${formData.pastExperiences}
` : `
Support Requirements:
Support Needs: ${formData.supportNeeds?.join(', ')}
Communication Preferences: ${formData.communicationPreferences?.join(', ')}
Preferred Support Style: ${formData.preferredSupportStyle}
`}

Past Matching Issues:
${formData.pastMatchingIssues?.otherIssues || 'None specified'}

Additional Notes:
${formData.additionalNotes || 'None provided'}
`;

      // Create mailto link with registration data
      const mailtoLink = `mailto:samdhav@unc.edu?subject=New ${formData.role.toUpperCase()} Registration - ${formData.name}&body=${encodeURIComponent(formattedBody)}`;
      
      // Open email client with pre-filled data
      window.location.href = mailtoLink;
      
      setSubmitStatus('success');
      // Clear form after successful submission
      setFormData({
        role: '',
        name: '',
        email: '',
        phone: '',
        location: {
          city: '',
          state: '',
          zipCode: ''
        },
        availability: [],
        specializations: [],
        communicationStyle: '',
        pastExperiences: '',
        supportNeeds: [],
        communicationPreferences: [],
        preferredSupportStyle: '',
        pastMatchingIssues: {
          otherIssues: ''
        },
        additionalNotes: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <div className="card bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Join HeallyDSP</h1>
          
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="form-group">
                  <label className="form-label" htmlFor="role">I am a:</label>
                  <select
                    id="role"
                    name="role"
                    className="form-input"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="dsp">Direct Support Professional</option>
                    <option value="patient">Individual Seeking Support</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    min="18"
                    max="100"
                    className="form-input"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="form-group">
                    <label className="form-label" htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="location.city"
                      className="form-input"
                      value={formData.location.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="location.state"
                      className="form-input"
                      value={formData.location.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="zipCode">ZIP Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="location.zipCode"
                      className="form-input"
                      value={formData.location.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="form-group">
                  <h3 className="text-lg font-semibold mb-4">Schedule & Availability</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {availabilityOptions.map(option => (
                      <label key={option} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.availability.includes(option)}
                          onChange={() => handleMultiSelect('availability', option)}
                          className="form-checkbox mr-2"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.role === 'dsp' ? (
                  <>
                    <div className="form-group">
                      <h3 className="text-lg font-semibold mb-4">Professional Skills</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Specializations</label>
                          <div className="space-y-2">
                            {specializationOptions.slice(0, 5).map(option => (
                              <label key={option} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.specializations?.includes(option)}
                                  onChange={() => handleMultiSelect('specializations', option)}
                                  className="form-checkbox mr-2"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Support Areas</label>
                          <div className="space-y-2">
                            {specializationOptions.slice(5).map(option => (
                              <label key={option} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.specializations?.includes(option)}
                                  onChange={() => handleMultiSelect('specializations', option)}
                                  className="form-checkbox mr-2"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <h3 className="text-lg font-semibold mb-4">Experience & Approach</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Communication Style</label>
                          <select
                            name="communicationStyle"
                            className="form-input"
                            value={formData.communicationStyle}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select your style</option>
                            <option value="direct">Direct and Clear</option>
                            <option value="patient">Patient and Supportive</option>
                            <option value="visual">Visual Demonstrations</option>
                            <option value="collaborative">Collaborative Approach</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Past Support Experience</label>
                          <textarea
                            name="pastExperiences"
                            className="form-input h-24"
                            value={formData.pastExperiences}
                            onChange={handleChange}
                            placeholder="Briefly describe your experience working with individuals needing support"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <h3 className="text-lg font-semibold mb-4">Support Needs</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Primary Needs</label>
                          <div className="space-y-2">
                            {supportNeedsOptions.slice(0, 5).map(option => (
                              <label key={option} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.supportNeeds?.includes(option)}
                                  onChange={() => handleMultiSelect('supportNeeds', option)}
                                  className="form-checkbox mr-2"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Additional Support</label>
                          <div className="space-y-2">
                            {supportNeedsOptions.slice(5).map(option => (
                              <label key={option} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.supportNeeds?.includes(option)}
                                  onChange={() => handleMultiSelect('supportNeeds', option)}
                                  className="form-checkbox mr-2"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Preferred Support Style</label>
                          <textarea
                            name="preferredSupportStyle"
                            className="form-input h-24"
                            value={formData.preferredSupportStyle}
                            onChange={handleChange}
                            placeholder="Describe how you prefer to receive support"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Communication Preferences</label>
                          <div className="space-y-2">
                            {[
                              'Verbal Communication',
                              'Written Instructions',
                              'Visual Aids',
                              'Step-by-Step Guidance',
                              'Regular Check-ins'
                            ].map(option => (
                              <label key={option} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.communicationPreferences?.includes(option)}
                                  onChange={() => handleMultiSelect('communicationPreferences', option)}
                                  className="form-checkbox mr-2"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="form-group">
                  <label className="form-label">Emergency Contact</label>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="emergencyContact.name"
                      placeholder="Contact Name"
                      className="form-input"
                      value={formData.emergencyContact.name}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="emergencyContact.relationship"
                      placeholder="Relationship"
                      className="form-input"
                      value={formData.emergencyContact.relationship}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="tel"
                      name="emergencyContact.phone"
                      placeholder="Phone Number"
                      className="form-input"
                      value={formData.emergencyContact.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {formData.role === 'dsp' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Past Challenging Situations</label>
                      <textarea
                        name="challengingSituations"
                        className="form-input h-24"
                        value={formData.challengingSituations}
                        onChange={handleChange}
                        placeholder="Describe how you've handled challenging situations in past support roles"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Conflict Resolution Approach</label>
                      <textarea
                        name="conflictResolution"
                        className="form-input h-24"
                        value={formData.conflictResolution}
                        onChange={handleChange}
                        placeholder="Describe your approach to resolving conflicts or disagreements"
                      />
                    </div>
                  </>
                )}

                {formData.role === 'patient' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Past Support Experiences</label>
                      <textarea
                        name="pastExperiences"
                        className="form-input h-24"
                        value={formData.pastExperiences}
                        onChange={handleChange}
                        placeholder="Share what has worked well or not worked well with previous support professionals"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Preferred Support Style</label>
                      <textarea
                        name="preferredSupportStyle"
                        className="form-input h-24"
                        value={formData.preferredSupportStyle}
                        onChange={handleChange}
                        placeholder="Describe your ideal support professional and their approach"
                      />
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="willingToTravel">Maximum Travel Distance (miles)</label>
                  <input
                    type="range"
                    id="willingToTravel"
                    name="willingToTravel"
                    min="1"
                    max="50"
                    className="w-full"
                    value={formData.willingToTravel}
                    onChange={handleChange}
                  />
                  <div className="text-center mt-2">{formData.willingToTravel} miles</div>
                </div>

                {formData.role === 'dsp' && (
                  <div className="form-group">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="backgroundCheck"
                        checked={formData.backgroundCheck}
                        onChange={handleChange}
                        className="form-checkbox"
                      />
                      <span>I agree to undergo a background check</span>
                    </label>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="additionalNotes">Additional Notes</label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    className="form-input h-24"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    placeholder="Any additional notes or comments"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn btn-outline"
                >
                  Back
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary ml-auto"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary ml-auto"
                >
                  Complete Registration
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;