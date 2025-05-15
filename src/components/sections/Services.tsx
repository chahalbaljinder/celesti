"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ServiceCard = ({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string; 
  icon: string 
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="flex flex-col items-start p-4 bg-white border rounded-xl shadow-sm dark:bg-gray-950 dark:border-gray-800"
    >
      <div className="inline-flex items-center justify-center rounded-lg bg-gray-100 p-2 mb-4 dark:bg-gray-800">
        <Image 
          src={icon} 
          alt={title}
          width={24}
          height={24}
          className="h-6 w-6"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </motion.div>
  );
};

const ServicesSection = () => {
  console.log("ServicesSection rendered with ID: services");
  const services = [
    {
      title: "Modern Web Apps",
      description: "Fast, responsive, and accessible sites with a modern look that is designed to perform.",
      icon: "/window.svg"
    },
    {
      title: "Vetted design",
      description: "Vetted design, integrated at scale to create web apps that scale beyond your expectations.",
      icon: "/globe.svg"
    },
    {
      title: "Built-in wealth",
      description: "Applications that have both front-end and back-end components with good architecture.",
      icon: "/file.svg"
    }
  ];
  return (    <section id="services" className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >          <Link href="/work" className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300">
            Explore Work
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
