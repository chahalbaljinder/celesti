"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-black py-12 mt-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <Link href="/" className="flex items-center mb-8">
            <span className="font-semibold text-xl">
              &lt; <span className="text-black dark:text-white">Agencies</span>
            </span>
          </Link>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Home
            </Link>
            <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              About
            </Link>
            <Link href="/services" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Services
            </Link>
            <Link href="/testimonials" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Testimonials
            </Link>
            <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Blog
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Contact
            </Link>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
            <p>&copy; {new Date().getFullYear()} Agency. All rights reserved.</p>
            <p className="mt-1">A clone of the agency-aceternity website for educational purposes.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
