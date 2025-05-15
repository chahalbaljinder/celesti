"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (    <footer className="w-full bg-white dark:bg-[#CFD1EA] py-16 mt-12 border-t border-gray-200 dark:border-[#CCE2CB]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">          <Link href="/" className="flex items-center mb-10">
            <div className="flex items-center">              <Image 
                src="/celesti-gold-logo.svg" 
                alt="Celesti Logo"
                width={120}
                height={40}
                style={{ 
                  height: '40px',
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>
          </Link>          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 dark:text-[#333333] dark:hover:text-[#FAD4D8] transition-colors duration-300">
              Home
            </Link>
            <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 dark:text-[#333333] dark:hover:text-[#FAD4D8] transition-colors duration-300">
              About
            </Link>
            <Link href="/services" className="text-sm text-gray-600 hover:text-gray-900 dark:text-[#333333] dark:hover:text-[#FAD4D8] transition-colors duration-300">
              Services
            </Link>
            <Link href="/testimonials" className="text-sm text-gray-600 hover:text-gray-900 dark:text-[#333333] dark:hover:text-[#FAD4D8] transition-colors duration-300">
              Testimonials
            </Link>
            <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900 dark:text-[#333333] dark:hover:text-[#FAD4D8] transition-colors duration-300">
              Blog
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 dark:text-[#333333] dark:hover:text-[#FAD4D8] transition-colors duration-300">
              Contact
            </Link>
          </div>
          <div className="w-24 h-0.5 bg-[#FAD4D8] opacity-30 mb-10"></div>
          <div className="text-sm text-gray-500 dark:text-[#94A3B8] text-center">            <p>&copy; {new Date().getFullYear()} Celesti. All rights reserved.</p>
            <p className="mt-1">Premium web development & design services.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
