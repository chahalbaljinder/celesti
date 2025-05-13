"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 lg:px-6 h-14 flex items-center justify-between fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="font-semibold text-xl">
            &lt; <span className="text-black dark:text-white">Agencies</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:text-gray-900 hover:underline">
            About
          </Link>
          <Link href="/services" className="text-sm font-medium hover:text-gray-900 hover:underline">
            Services
          </Link>
          <Link href="/testimonials" className="text-sm font-medium hover:text-gray-900 hover:underline">
            Testimonials
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-gray-900 hover:underline">
            Blog
          </Link>
        </nav>

        {/* Contact Button */}
        <div className="hidden md:block">
          <Link 
            href="/contact"
            className="inline-flex h-9 items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-14 left-0 right-0 bg-white dark:bg-gray-950 shadow-lg p-4 md:hidden"
        >
          <nav className="flex flex-col gap-4">
            <Link 
              href="/" 
              className="text-sm font-medium hover:text-gray-900 hover:underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/services" 
              className="text-sm font-medium hover:text-gray-900 hover:underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="/testimonials" 
              className="text-sm font-medium hover:text-gray-900 hover:underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link 
              href="/blog" 
              className="text-sm font-medium hover:text-gray-900 hover:underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/contact"
              className="inline-flex h-9 w-full items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
