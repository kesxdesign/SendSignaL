import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import './Onboarding.css';

const STEPS = [
  "Workspace Setup",
  "Connect WhatsApp",
  "Define Goals",
  "Choose Template",
  "Import Leads",
  "Review & Finalize"
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(v => v + 1);
    else navigate('/dashboard');
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(v => v - 1);
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <div className="stepper-header">
           {STEPS.map((step, idx) => (
             <div key={idx} className={`step-item ${currentStep === idx ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}>
               <div className="step-circle">
                 {idx < currentStep ? <Check size={16} /> : idx + 1}
               </div>
               <span className="step-label hidden-mobile">{step}</span>
             </div>
           ))}
        </div>
        
        <div className="step-content">
          <h2>{STEPS[currentStep]}</h2>
          <p className="step-description">Please provide details to configure your SendSignal environment properly.</p>
          
          <div className="mock-form-area">
             {/* Dynamic content would render here based on currentStep */}
             <div className="input-group">
                <label>Mock Input Field for {STEPS[currentStep]}</label>
                <input type="text" placeholder="Enter value..." />
             </div>
          </div>
        </div>

        <div className="onboarding-footer">
          <button className="secondary-btn" onClick={handlePrev} disabled={currentStep === 0}>
            <ArrowLeft size={16} /> Back
          </button>
          <button className="primary-btn" onClick={handleNext}>
            {currentStep === STEPS.length - 1 ? 'Complete Setup' : 'Next Step'} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
