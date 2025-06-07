import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaBookOpen,
  FaUserPlus,
  FaMapMarkerAlt,
  FaHome,
  FaInfoCircle,
  FaSignInAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-white sm:px-6 md:px-0 pt-3 pb-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-center lg:text-left">
        <div className="flex flex-col items-center text-center">
          <img
            src="/logo.png"
            alt="BookStore"
            className="h-12 w-auto mb-2 transform transition-transform duration-500 hover:rotate-12"
          />
          <h1 className="text-xl sm:text-2xl font-semibold">Bound By Books</h1>
        </div>

        {/* Explore Links */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Explore</h2>
          <nav className="flex flex-col items-center lg:items-start space-y-1">
            <a
              href="/"
              className="flex items-center hover:underline hover:text-blue-500"
            >
              <FaHome className="mr-2" /> Home
            </a>
            <a
              href="/about-us"
              className="flex items-center hover:underline hover:text-blue-500"
            >
              <FaInfoCircle className="mr-2" /> About Us
            </a>
            <a
              href="/all-books"
              className="flex items-center hover:underline hover:text-blue-500"
            >
              <FaBookOpen className="mr-2" /> All Books
            </a>
          </nav>
        </div>

        {/* Account Links */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Account</h2>
          <nav className="flex flex-col items-center lg:items-start space-y-1">
            <a
              href="/signup"
              className="flex items-center hover:underline hover:text-blue-500"
            >
              <FaUserPlus className="mr-2" /> Sign Up
            </a>
            <a
              href="/LogIn"
              className="flex items-center hover:underline hover:text-blue-500"
            >
              <FaSignInAlt className="mr-2" /> Log In
            </a>
            <a
              href="https://maps.app.goo.gl/fF9Jo2t1ArGikeR27"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:underline hover:text-blue-500"
            >
              <FaMapMarkerAlt className="mr-2" /> Locate Store
            </a>
          </nav>
        </div>

        {/* Social Media Links */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <nav className="flex flex-col items-center lg:items-start space-y-2">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-blue-500"
            >
              <FaFacebook className="mr-2" /> Facebook
            </a>
            <a
              href="https://www.twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-blue-500"
            >
              <FaXTwitter className="mr-2" /> Twitter
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-blue-500"
            >
              <FaInstagram className="mr-2" /> Instagram
            </a>
          </nav>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2 underline">Contact Us</h2>
          <address className="not-italic text-sm text-center lg:text-left">
            Bound By Books
            <br />
            Dwarka Sector - 29
            <br />
            New Delhi, 110079
            <br />
            Email:{" "}
            <a
              href="mailto:bookstore@gmail.com"
              className="hover:text-blue-500"
            >
              bookstore@gmail.com
            </a>
          </address>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Bound By Books. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
