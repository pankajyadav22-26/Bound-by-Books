import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative h-[75vh] flex items-center justify-center overflow-hidden">
      <img
        src="./hero.png"
        alt="hero"
        className="w-screen h-full object-cover absolute opacity-30"
      />
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 animate-fadeIn motion-safe:animate-bounce">
          Unlock Your Next Adventure in Reading
        </h1>
        <p className="mt-4 text-xl text-white animate-fadeIn delay-200 motion-safe:animate-pulse">
          Dive into a world of mesmerizing stories, valuable insights, and
          boundless inspiration with our handpicked selection of books
        </p>
        <div className="mt-8 animate-fadeIn delay-400">
          <Link
            to="/all-books"
            className="text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-orange-900 rounded-full motion-safe:animate-pulse"
          >
            Discover Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
