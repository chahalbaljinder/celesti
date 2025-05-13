"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface TestimonialProps {
  quote: string;
  name: string;
  position: string;
  company: string;
}

const Testimonial = ({ quote, name, position, company }: TestimonialProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center mx-auto max-w-3xl"
    >      <div className="mb-6">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image
            src="/placeholder-150.svg"
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <blockquote className="text-lg md:text-xl italic text-gray-700 dark:text-gray-300 mb-4">
        "{quote}"
      </blockquote>
      <p className="font-semibold">{name}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {position} at {company}
      </p>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <Testimonial
          quote="Agencies helped us build our website from scratch to production in a record 1 month time. They took our requirements and delivered a website we are proud of so much that we are thrilled."
          name="Tyler Durden"
          position="Founder"
          company="Fight Dragons"
        />
      </div>
    </section>
  );
};

export default Testimonials;
