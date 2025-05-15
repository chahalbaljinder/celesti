"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Image from "next/image";

const ProjectCard = ({ 
  title, 
  description, 
  subtitle, 
  images, 
  liveUrl 
}: { 
  title: string; 
  description: string;
  subtitle: string;
  images: string[];
  liveUrl: string;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-24"
    >
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">{description}</p>
      <p className="text-gray-500 mb-4 dark:text-gray-400">{subtitle}</p>
      
      <div className="flex flex-wrap items-center mb-4">
        <a 
          href={liveUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-4"
        >
          Live Preview
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-md">
            <Image
              src={image}
              alt={`${title} screenshot ${index + 1}`}
              width={1080}
              height={675}
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default function WorkPage() {
  const projects = [
    {
      title: "Algochurn",
      description: "Practice the most popular coding questions asked in a technical interview round.",
      subtitle: "Used by 1000+ registered users preparing for technical interviews.",
      images: [
        "/images/products/algochurn.png",
        "/images/products/algochurn2.png"
      ],
      liveUrl: "https://algochurn.com/"
    },
    {
      title: "Tailwind Master Kit",
      description: "Get beautiful, responsive, professionally developed Tailwind UI components and build your website quicker",
      subtitle: "Worry less about responsive and beautiful UI, let Tailwind Master Kit handle the complexity.",
      images: [
        "/images/products/tailwindmasterkit.png",
        "/images/products/tailwindmasterkit3.png"
      ],
      liveUrl: "https://tailwindmasterkit.com/"
    },
    {
      title: "Creme Digital",
      description: "Commonsense solutions that achieve marketing objectives and reach business goals",
      subtitle: "Since 2015, Creme Digital's solutions have supported brands from virtually every industry",
      images: [
        "/images/products/cremedigital3.png",
        "/images/products/cremedigital.png"
      ],
      liveUrl: "https://cremedigital.com/"
    },
    {
      title: "Invoker Labs",
      description: "Delivering magical Web3 experiences with a wide range of products and services.",
      subtitle: "Flagship products include Nearsend, Nearblocks, nKYC and Route ag.",
      images: [
        "/images/products/invoker.png",
        "/images/products/invoker2.png"
      ],
      liveUrl: "https://invoker.lol/"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-14">
        <section className="w-full py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h1 className="text-4xl font-bold mb-6">A glimpse into our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">projects</span></h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                A look at some of the amazing websites that we've built recently.
              </p>
            </motion.div>
            
            <div className="max-w-6xl mx-auto">
              {projects.map((project) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  subtitle={project.subtitle}
                  images={project.images}
                  liveUrl={project.liveUrl}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-full py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-6">Let's build your website today!</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Contact us and we will get back within 24 hours. We mean it. You saw the testimonials, right?
              </p>
              <a 
                href="mailto:youremail@yourgmail.com"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Contact Us
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
