import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">JobDash</h2>
          </div>
          <div className="flex items-center">
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-700 my-6" />
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} JobDash. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
