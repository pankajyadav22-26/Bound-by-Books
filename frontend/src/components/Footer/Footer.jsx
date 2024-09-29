import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoDiscord } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-white px-6 py-6 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0 flex flex-col items-center">
        <img
          src="/logo.png"
          alt="BookStore"
          className="h-12 transform transition-transform duration-500 hover:rotate-12"
        />
        <h1 className="ml-2 text-xl text-orange-300">BookStore</h1>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-6 mb-4 md:mb-0">
        <div className="flex flex-col items-center md:items-start">
          <a
            href="/"
            className="mx-2 my-1 hover:underline hover:text-blue-500 p-1"
          >
            Home
          </a>
          <a
            href="/about-us"
            className="mx-2 my-1 hover:underline hover:text-blue-500 p-1"
          >
            About Us
          </a>
          <a
            href="/all-books"
            className="mx-2 my-1 hover:underline hover:text-blue-500 p-1"
          >
            All Books
          </a>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <a
            href="/signup"
            className="mx-2 my-1 hover:underline hover:text-blue-500 p-1"
          >
            Sign Up
          </a>
          <a
            href="/login"
            className="mx-2 my-1 hover:underline hover:text-blue-500 p-1"
          >
            Log In
          </a>
          <a
            href="https://maps.app.goo.gl/fF9Jo2t1ArGikeR27"
            className="mx-2 my-1 hover:underline hover:text-blue-500 p-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Locate Store
          </a>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mx-2 my-2 hover:underline hover:text-blue-500"
            >
              <FaFacebook className="mx-2" />
              <span>Facebook</span>
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="https://www.twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mx-2 my-2 hover:underline hover:text-blue-500"
            >
              <FaXTwitter className="mx-2" />
              <span>Twitter</span>
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mx-2 my-2 hover:underline hover:text-blue-500"
            >
              <FaInstagram className="mx-2" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mx-2 my-2 hover:underline hover:text-blue-500"
            >
              <FaLinkedin className="mx-2" />
              <span>LinkedIn</span>
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="https://discord.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mx-2 my-2 hover:underline hover:text-blue-500"
            >
              <IoLogoDiscord className="mx-2" />
              <span>Discord</span>
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="https://telegram.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mx-2 my-2 hover:underline hover:text-blue-500"
            >
              <FaTelegramPlane className="mx-2" />
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center md:text-left">
        <h1 className="text-blue-300">
          <u>Contact Us</u> :
        </h1>
        <div className="mt-1">
          BookStore
          <br />
          Address: Dwarka Sector - 29
          <br />
          New Delhi, 110079
          <br />
          Email:{" "}
          <a href="mailto:bookstore@gmail.com" className="hover:text-blue-500">
            bookstore@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
