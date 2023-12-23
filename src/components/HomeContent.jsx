import React from 'react';
import Img from '../Images/intro.png';

const HomeContent = () => {
  return (
    <>
      <div className="w-full  h-full flex items-center lg:justify-start py-24 justify-center flex-wrap  bg-gray-200">
        <div className="lg:w-3/6 w-full sm:p-2 h-full my-2 flex items-center justify-center px-4 md:items-start md:justify-start md:p-20 flex-col ">
          <h1 className="md:text-6xl text-2xl sm:text-2xl font-extrabold mb-4 text-black ">
            To Choose <span className="text-purple-600">Right Jobs.</span>
          </h1>
          <p className="md:text-lg sm:text-sm text-xs mb-20 text-gray-400">
            2400 Peoples are daily search in this portal, 100 user added job
            portal!
          </p>
        </div>
        <div className="w-3/6 my-2 h-full bg-gray-200 hidden items-center justify-center flex-col p-20 lg:flex">
          <img width={600} height={700} src={Img} alt="no-found" />
        </div>
      </div>
    </>
  );
};

export default HomeContent;
