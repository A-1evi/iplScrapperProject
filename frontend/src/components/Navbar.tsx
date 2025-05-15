import React from "react";
import { Link } from "react-router";
import iplLogo from "../assets/iplLogo.svg"; 

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-300 to-indigo-700 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a
            className="text-white font-bold text-xl hover:text-indigo-200"
            href="/"
          >
            <img
              src={iplLogo}
              alt="IPL Logo"
              className="h-10 w-12 inline-block mr-2"
            />
            IPL 2025
          </a>

          <button
            className="md:hidden p-2 rounded-md text-white hover:bg-indigo-600 focus:outline-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="hidden md:block" id="navbarNav">
            <ul className="flex space-x-6">
              <li>
                <Link
                  className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium"
                  to="/"
                >
                  Points Table
                </Link>
              </li>

              <li>
                <Link
                  className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium"
                  to="/upcoming-matches"
                >
                  Upcoming Matches
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
