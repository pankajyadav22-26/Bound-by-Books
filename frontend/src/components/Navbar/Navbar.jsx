import React, { useState } from "react";
import { MdOutlineSegment } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About Us",
      link: "/about-us",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  if (isLoggedIn === false) {
    links.splice(3, 3);
  }
  if (isLoggedIn === true && role === "user") {
    links.splice(5, 1);
  }
  if (isLoggedIn === true && role === "admin") {
    links.splice(3, 2);
  }

  const [MobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className="z-50 relative flex items-center justify-between bg-zinc-800 text-white px-8 py-4 shadow-lg">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4 transform transition-transform duration-500 hover:rotate-12"
            src="/logo.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold tracking-wide hover:text-blue-500 transition-all duration-300">
            BookStore
          </h1>
        </Link>
        <div className="nav-links-bookstore block md:flex items-center gap-8">
          <div className="hidden md:flex gap-8">
            {links.map((item) => (
              <div className="flex items-center" key={item.title}>
                {item.title === "Profile" || item.title === "Admin Profile" ? (
                  <Link
                    to={item.link}
                    className="px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 transform hover:scale-105"
                  >
                    {item.title}
                    <span className="block h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Link>
                ) : (
                  <Link
                    to={item.link}
                    className="hover:text-blue-500  hover:underline transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
          {isLoggedIn === false && (
            <div className="hidden md:flex gap-4">
              <Link
                to="LogIn"
                className="px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 transform hover:scale-105"
              >
                LogIn
              </Link>
              <Link
                to="SignUp"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 transform hover:scale-105"
              >
                SignUp
              </Link>
            </div>
          )}
          <button
            className="block md:hidden text-white text-2xl hover:text-zinc-400"
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            <MdOutlineSegment />
          </button>
        </div>
      </nav>
      <div
        className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((item) => (
          <Link
            to={item.link}
            className={`${MobileNav} text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300 relative group`}
            key={item.title}
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            {item.title}
            <span className="block h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
        ))}
        {isLoggedIn === false && (
          <>
            <Link
              to="LogIn"
              className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 text-white transition-all duration-300 transform hover:scale-105`}
              onClick={() =>
                MobileNav === "hidden"
                  ? setMobileNav("block")
                  : setMobileNav("hidden")
              }
            >
              LogIn
            </Link>
            <Link
              to="SignUp"
              className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 text-white rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 transform hover:scale-105`}
              onClick={() =>
                MobileNav === "hidden"
                  ? setMobileNav("block")
                  : setMobileNav("hidden")
              }
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
