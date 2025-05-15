"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation, useInView, animate, stagger } from "framer-motion";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [activeStep, setActiveStep] = useState(0);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});
  const formRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef, { once: false, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleFocus = (field: string) => {
    setActiveField(field);
  };
  
  const handleBlur = () => {
    setActiveField(null);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, you'd use this:
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });
      // const data = await response.json();
      // if (!response.ok) {
      //   throw new Error(data.message || "Something went wrong");
      // }

      setSubmitStatus({
        success: true,
        message: "Your message has been sent successfully!",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      // Animate successful submission
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      
    } catch (error) {
      setSubmitStatus({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "There was an error sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };  const formVariants = {
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

  const inputVariants = {
    idle: { scale: 1, borderColor: "rgba(51, 65, 85, 0.3)" },
    active: { scale: 1.02, borderColor: "#D4AF37" }
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

  const floatingIconVariants = {
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

  return (
    <section className="w-full py-20 md:py-36 bg-gray-50 dark:bg-[#0F172A]/95 relative overflow-hidden">
      <div className="absolute inset-0 dark:bg-[url('/images/grid-pattern.png')] dark:opacity-5 pointer-events-none"></div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div 
          className="absolute top-10 left-[10%] text-[#D4AF37] opacity-30"
          variants={floatingIconVariants}
          custom={0}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" opacity="0.4"></path>
            <rect x="11" y="6" width="2" height="12"></rect>
          </svg>
        </motion.div>
        <motion.div 
          className="absolute top-1/4 right-[15%] text-[#D4AF37] opacity-20"
          variants={floatingIconVariants}
          custom={1}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </motion.div>
        <motion.div 
          className="absolute top-3/4 left-[20%] text-[#D4AF37] opacity-25"
          variants={floatingIconVariants}
          custom={2}
        >
          <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
            <rect width="24" height="24" rx="4" />
          </svg>
        </motion.div>
        <motion.div 
          className="absolute bottom-1/4 right-[25%] text-[#D4AF37] opacity-15"
          variants={floatingIconVariants}
          custom={3}
        >
          <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
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
        >
          <div className="inline-block mb-3 text-sm font-medium px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">Get in Touch</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 dark:text-[#D4AF37]">Let's Start a Conversation</h2>
          <p className="text-gray-600 dark:text-[#E2E8F0] max-w-2xl mx-auto text-lg">
            Tell us about your project and we'll get back to you within 24 hours with a personalized consultation.
          </p>
        </motion.div>
        
        <div className="max-w-xl mx-auto" ref={formRef}>
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate={controls}
            className="relative bg-white/80 dark:bg-[#1E293B]/90 p-8 md:p-10 rounded-2xl shadow-xl dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm border border-gray-100 dark:border-[#334155]/30"
          >            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6"
                  >
                    <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-2 dark:text-[#D4AF37]">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-[#E2E8F0] mb-6">
                    Thank you for reaching out. We'll get back to you shortly.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 text-sm border border-[#D4AF37]/30 rounded-md text-gray-800 dark:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  suppressHydrationWarning
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {submitStatus.message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 text-sm rounded-md mb-2 ${
                        submitStatus.success
                          ? "bg-[#0F172A]/30 text-[#D4AF37] dark:bg-[#D4AF37]/10 dark:text-[#D4AF37] border border-[#D4AF37]/20"
                          : "bg-red-100/30 text-red-700 dark:bg-red-900/20 dark:text-red-300 border border-red-300/20"
                      }`}
                    >
                      <div className="flex items-center">
                        {submitStatus.success ? (
                          <svg className="w-5 h-5 mr-2 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        )}
                        {submitStatus.message}
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="space-y-6">
                    {/* Name field with animation */}
                    <motion.div
                      variants={inputVariants}
                      animate={activeField === 'name' ? 'active' : 'idle'}
                      className="relative"
                    >
                      <label
                        htmlFor="name"
                        className={`absolute left-4 text-sm font-medium transition-all duration-200 ${
                          activeField === 'name' || formData.name 
                            ? '-top-2 text-xs bg-white dark:bg-[#1E293B] px-1 text-[#D4AF37]' 
                            : 'top-3 text-gray-500 dark:text-[#94A3B8]'
                        }`}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={handleBlur}
                        required
                        suppressHydrationWarning
                        className="w-full px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none dark:border-[#334155]/80 dark:bg-[#0F172A]/60 dark:text-white"
                      />
                      <motion.span 
                        className="absolute right-4 top-3 text-[#D4AF37]"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: activeField === 'name' ? 1 : 0,
                          scale: activeField === 'name' ? 1 : 0 
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </motion.span>
                    </motion.div>
                    
                    {/* Email field with animation */}
                    <motion.div
                      variants={inputVariants}
                      animate={activeField === 'email' ? 'active' : 'idle'}
                      className="relative"
                    >
                      <label
                        htmlFor="email"
                        className={`absolute left-4 text-sm font-medium transition-all duration-200 ${
                          activeField === 'email' || formData.email
                            ? '-top-2 text-xs bg-white dark:bg-[#1E293B] px-1 text-[#D4AF37]' 
                            : 'top-3 text-gray-500 dark:text-[#94A3B8]'
                        }`}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={handleBlur}
                        required
                        suppressHydrationWarning
                        className="w-full px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none dark:border-[#334155]/80 dark:bg-[#0F172A]/60 dark:text-white"
                      />
                      <motion.span 
                        className="absolute right-4 top-3 text-[#D4AF37]"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: activeField === 'email' ? 1 : 0,
                          scale: activeField === 'email' ? 1 : 0 
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </motion.span>
                    </motion.div>
                    
                    {/* Subject field with animation */}
                    <motion.div
                      variants={inputVariants}
                      animate={activeField === 'subject' ? 'active' : 'idle'}
                      className="relative"
                    >
                      <label
                        htmlFor="subject"
                        className={`absolute left-4 text-sm font-medium transition-all duration-200 ${
                          activeField === 'subject' || formData.subject
                            ? '-top-2 text-xs bg-white dark:bg-[#1E293B] px-1 text-[#D4AF37]' 
                            : 'top-3 text-gray-500 dark:text-[#94A3B8]'
                        }`}
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => handleFocus('subject')}
                        onBlur={handleBlur}
                        suppressHydrationWarning
                        className="w-full px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none dark:border-[#334155]/80 dark:bg-[#0F172A]/60 dark:text-white"
                      />
                      <motion.span 
                        className="absolute right-4 top-3 text-[#D4AF37]"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: activeField === 'subject' ? 1 : 0,
                          scale: activeField === 'subject' ? 1 : 0 
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                      </motion.span>
                    </motion.div>
                    
                    {/* Message field with animation */}
                    <motion.div
                      variants={inputVariants}
                      animate={activeField === 'message' ? 'active' : 'idle'}
                      className="relative"
                    >
                      <label
                        htmlFor="message"
                        className={`absolute left-4 text-sm font-medium transition-all duration-200 ${
                          activeField === 'message' || formData.message
                            ? '-top-2 text-xs bg-white dark:bg-[#1E293B] px-1 text-[#D4AF37]' 
                            : 'top-3 text-gray-500 dark:text-[#94A3B8]'
                        }`}
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={handleBlur}
                        rows={4}
                        required
                        suppressHydrationWarning
                        className="w-full px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none dark:border-[#334155]/80 dark:bg-[#0F172A]/60 dark:text-white"
                      />
                      <motion.span 
                        className="absolute right-4 top-3 text-[#D4AF37]"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: activeField === 'message' ? 1 : 0,
                          scale: activeField === 'message' ? 1 : 0 
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </motion.span>
                    </motion.div>
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    suppressHydrationWarning
                    className="w-full flex justify-center items-center py-3 px-6 mt-4 border border-transparent rounded-lg shadow-md text-base font-medium text-[#0F172A] bg-[#D4AF37] hover:bg-[#D4AF37]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0F172A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
            </form>            {/* Contact options */}
            <div className="absolute top-0 transform -translate-y-1/3 left-0 right-0 flex justify-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex space-x-3 md:space-x-6"
              >
                {[
                  { 
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21.959 10.2978C21.959 13.3978 20.439 16.0978 18.059 17.7978L19.799 21.1978C19.919 21.4978 19.859 21.8978 19.599 22.0978C19.339 22.3978 18.939 22.3978 18.699 22.1978L14.759 18.9978C13.879 19.2978 12.939 19.3978 11.939 19.3978C6.93896 19.3978 2.93896 15.3978 2.93896 10.3978C2.93896 5.39785 6.93896 1.39785 11.939 1.39785C16.939 1.39785 20.939 5.39785 20.939 10.3978"/>
                      </svg>
                    ), 
                    label: "Messenger" 
                  },
                  { 
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"/>
                      </svg>
                    ), 
                    label: "Discord" 
                  },
                  { 
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z"/>
                      </svg>
                    ), 
                    label: "GitHub" 
                  }
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="flex items-center justify-center rounded-full w-9 h-9 bg-white dark:bg-[#1E293B] shadow-md dark:text-[#D4AF37] hover:scale-110 transition-transform"
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Additional ornamental elements */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </section>
  );
};

export default ContactForm;
