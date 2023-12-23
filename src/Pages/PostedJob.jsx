import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer.jsx';

const PostedJob = () => {
  return (
    <>
      <Navbar />
      <div className="w-full py-20 flex items-center md:px-8 px-2 justify-center flex-co">
        <h1 className="mt-10 text-9xl">Coming Soon</h1>
      </div>
      <Footer />
    </>
  );
};

export default PostedJob;
