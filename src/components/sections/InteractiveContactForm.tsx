"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const InteractiveContactForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const progressRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  const steps = [
    { id: "name", label: "What's your name?", placeholder: "Enter your full name" },
    { id: "email", label: "What's your email?", placeholder: "Enter your email address" },
    { id: "subject", label: "What's your project about?", placeholder: "Enter subject/project type" },
    { id: "message", label: "Tell us about your project", placeholder: "Describe your project in detail..." },
  ];

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    const currentField = steps[activeStep].id;
    if (!formData[currentField as keyof typeof formData]) return;
    
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && activeStep < steps.length - 1) {
      e.preventDefault();
      nextStep();
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Make actual API call to our backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      // Reset the form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setActiveStep(0);
      
      // Show success state
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      // Could add error handling UI here
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      }
    }
  };

  const floatingElementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: custom * 0.2,
        duration: 0.5
      }
    })
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.4 } }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
  };
  return (
    <section className="w-full py-20 md:py-32 bg-gray-50 dark:bg-[#CFD1EA]/95 relative overflow-hidden">
      <div className="absolute inset-0 dark:bg-[url('/images/grid-pattern.png')] dark:opacity-5 pointer-events-none"></div>
      
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial="hidden"
        animate="visible"
      >        <motion.div 
          className="absolute top-20 left-[10%] text-[#FAD4D8] opacity-20"
          variants={floatingElementVariants}
          custom={0}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="11" strokeWidth="1" stroke="currentColor" fill="none" />
          </svg>
        </motion.div>
        <motion.div 
          className="absolute top-1/3 right-[15%] text-[#FAD4D8] opacity-15"
          variants={floatingElementVariants}
          custom={1}
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" opacity="0.2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </motion.div>
        <motion.div 
          className="absolute bottom-1/4 left-[20%] text-[#CCE2CB] opacity-10"
          variants={floatingElementVariants}
          custom={2}
        >
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect width="20" height="20" x="2" y="2" rx="4" strokeWidth="1" />
          </svg>
        </motion.div>
        <motion.div 
          className="absolute bottom-1/3 right-[25%] text-[#D4AF37] opacity-15"
          variants={floatingElementVariants}
          custom={3}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"/>
          </svg>
        </motion.div>
      </motion.div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >          <div className="inline-block mb-3 text-sm font-medium px-3 py-1 rounded-full bg-[#FAD4D8]/20 text-[#333333]">Get in Touch</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 dark:text-[#333333]">Let's Start a Conversation</h2>
          <p className="text-gray-600 dark:text-[#333333] max-w-2xl mx-auto text-lg">
            Complete this interactive form and we'll get back to you within 24 hours with a personalized consultation.
          </p>
        </motion.div>
        
        <div className="max-w-xl mx-auto">
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate={controls}
            className="relative bg-white/80 dark:bg-[#F2F0D5]/90 p-8 md:p-10 rounded-2xl shadow-xl dark:shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-sm border border-gray-100 dark:border-[#CCE2CB]/30"
          >
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-gray-500 dark:text-[#94A3B8] mb-2">
                <span>Step {activeStep + 1} of {steps.length}</span>
                <span>{((activeStep + 1) / steps.length * 100).toFixed(0)}% Complete</span>
              </div>              <div className="h-2 bg-gray-100 dark:bg-[#CFD1EA] rounded-full overflow-hidden">
                <div 
                  ref={progressRef}
                  className="h-full bg-gradient-to-r from-[#FAD4D8] to-[#CCE2CB] transition-all duration-300 ease-out"
                  style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col items-center justify-center text-center py-10 px-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}                    className="w-20 h-20 rounded-full bg-[#FAD4D8]/20 flex items-center justify-center mb-6"
                  >
                    <svg className="w-10 h-10 text-[#FAD4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-2 dark:text-[#333333]">Message Sent!</h3>                  <p className="text-gray-600 dark:text-[#333333] mb-8">
                    Thank you for reaching out. Our team will review your message and respond within 24 hours.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 text-sm border border-[#FAD4D8]/50 rounded-md text-gray-800 dark:text-[#333333] hover:bg-[#FAD4D8]/10 transition-colors"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="mb-8 min-h-[200px]"
                    >                      <label className="block text-2xl font-medium text-gray-800 dark:text-[#333333] mb-6">
                        {steps[activeStep].label}
                      </label>
                      
                      {steps[activeStep].id === 'message' ? (
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
                          placeholder={steps[activeStep].placeholder}
                          rows={5}
                          autoFocus
                          required
                          suppressHydrationWarning
                          className="w-full px-4 py-3 text-lg border-b-2 border-gray-300 dark:border-[#CCE2CB] bg-transparent focus:border-[#FAD4D8] focus:ring-0 focus:outline-none transition-colors dark:text-[#333333] resize-none"
                        />
                      ) : (
                        <input
                          type={steps[activeStep].id === 'email' ? 'email' : 'text'}
                          name={steps[activeStep].id}
                          value={formData[steps[activeStep].id as keyof typeof formData]}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
                          placeholder={steps[activeStep].placeholder}
                          autoFocus
                          required
                          suppressHydrationWarning
                          className="w-full px-4 py-3 text-lg border-b-2 border-gray-300 dark:border-[#CCE2CB] bg-transparent focus:border-[#FAD4D8] focus:ring-0 focus:outline-none transition-colors dark:text-[#333333]"
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                  
                  <div className="flex justify-between mt-12">
                    <motion.button
                      type="button"
                      onClick={prevStep}
                      disabled={activeStep === 0}
                      whileHover={activeStep > 0 ? { scale: 1.02 } : {}}
                      whileTap={activeStep > 0 ? { scale: 0.98 } : {}}
                      className={`flex items-center px-4 py-2 rounded-md ${
                        activeStep === 0
                          ? "opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-600"
                          : "text-gray-700 dark:text-[#333333] hover:bg-gray-100 dark:hover:bg-[#CCE2CB]/30"
                      } transition-colors`}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                      </svg>
                      Back
                    </motion.button>
                    
                    {activeStep < steps.length - 1 ? (
                      <motion.button
                        type="button"
                        onClick={nextStep}
                        disabled={!formData[steps[activeStep].id as keyof typeof formData]}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center px-6 py-2 rounded-md ${
                          !formData[steps[activeStep].id as keyof typeof formData]
                            ? "opacity-50 cursor-not-allowed bg-gray-300 dark:bg-[#334155] text-gray-600 dark:text-gray-400"
                            : "bg-[#D4AF37] text-white hover:bg-[#D4AF37]/90"
                        } transition-colors`}
                      >
                        Next
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={isSubmitting || !formData.message}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center px-6 py-2 rounded-md ${
                          isSubmitting || !formData.message
                            ? "opacity-50 cursor-not-allowed bg-gray-300 dark:bg-[#334155] text-gray-600 dark:text-gray-400"
                            : "bg-[#D4AF37] text-white hover:bg-[#D4AF37]/90"
                        } transition-colors`}
                      >
                        {isSubmitting ? "Sending..." : "Submit"}
                        {!isSubmitting && (
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 12h15"></path>
                          </svg>
                        )}
                      </motion.button>
                    )}
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Form footer with additional contact options */}
          <div className="mt-8 flex flex-col items-center">
            <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500 dark:text-[#94A3B8]">
              <span className="w-10 h-px bg-gray-300 dark:bg-[#334155]"></span>
              <span>Or contact us directly</span>
              <span className="w-10 h-px bg-gray-300 dark:bg-[#334155]"></span>
            </div>
            <div className="flex space-x-4">
              <a href="mailto:contact@celesti.com" className="text-gray-600 dark:text-[#E2E8F0] hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors">
                <span className="sr-only">Email</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
                </svg>
              </a>
              <a href="tel:+1234567890" className="text-gray-600 dark:text-[#E2E8F0] hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors">
                <span className="sr-only">Phone</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-600 dark:text-[#E2E8F0] hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-600 dark:text-[#E2E8F0] hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveContactForm;
