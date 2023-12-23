import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const NavBar = () => {
  const [scrolled, isScrolled] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        isScrolled(true);
      } else {
        isScrolled(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {
        if (window.scrollY > 20) {
          isScrolled(true);
        } else {
          isScrolled(false);
        }
      });
    };
  }, [scrolled]);

  return (
    <>
      <div
        className={`w-full ${
          scrolled ? 'bg-purple-600/70' : 'bg-purple-600'
        } px-6 h-20 bg-purple-600 text-white flex items-center justify-between fixed top-0 left-0 z-50 rounded-md`}
      >
        <div className="px-2 h-full flex items-center justify-center">
          <p className="uppercase font-semibold tracking-widest text-lg">
            JobDash
          </p>
        </div>
        <div className="px-2 h-full hidden items-center justify-center lg:flex">
          <Link
            to="/"
            className="px-3 mx-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase"
          >
            Home
          </Link>
          <Link
            to="/createjob"
            className="px-3 mx-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase"
          >
            Create Job
          </Link>
          <Link
            to="/viewjobs"
            className="px-3 mx-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase"
          >
            View Jobs
          </Link>
          <Link
            to="/postedJob"
            className="px-3 mx-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase"
          >
            Posted Jobs
          </Link>
          <Link
            to="/dashboard"
            className="px-3 mx-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase"
          >
            Dashboard
          </Link>
          <Link
            to="/"
            className="px-3 mx-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase"
          >
            Contact
          </Link>
        </div>
        <div className="px-2 h-full hidden items-center justify-center lg:flex ">
          {user !== null ? (
            <>
              <BiLogOut
                onClick={() => {
                  signOut(auth);
                }}
                className=" cursor-pointer text-3xl hover:text-red-500 transition-all duration-700"
              />
              <p className="text-lg px-4 font-semibold">{user?.displayName}</p>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="px-4 py-2 border border-white rounded uppercase tracking-widest mx-4   transition-all duration-700 hover:bg-white font-semibold text-base hover:text-purple-600"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="px-4 py-2 border border-white rounded uppercase tracking-widest mx-4   text-purple-600 bg-white transition-all duration-700 hover:bg-transparent font-semibold text-base hover:text-white"
              >
                REGISTER
              </Link>
            </>
          )}
        </div>
      </div>
    </>

    
  );
};
export default NavBar;
