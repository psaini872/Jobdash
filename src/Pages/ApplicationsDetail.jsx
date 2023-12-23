import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { GoLocation } from 'react-icons/go';
import { MdCategory, MdEmail } from 'react-icons/md';
import { BsBriefcaseFill, BsFillBookmarkCheckFill } from 'react-icons/bs';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { RiUserSearchFill } from 'react-icons/ri';
import { BsFillCalendar2DateFill } from 'react-icons/bs';
import { HiOutlineStar } from 'react-icons/hi';
import { FaUserAstronaut } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import Footer from '../components/Footer.jsx';

export default function JobDetails() {
  const navigate = useNavigate();

  const { jobid } = useParams();
  const [JobDetails, setJobDetails] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        toast.success('First Login ');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const q = query(
          collection(db, 'jobs'),
          where('__name__', '==', `${jobid}`)
        );
        const data = await getDocs(q);

        setJobDetails(data.docs[0]._document.data.value.mapValue.fields);
      } catch (error) {
        console.log(error);
      }
    };
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="w-full  py-20 flex items-center md:px-8 px-2  justify-center flex-col  ">
        <div className="w-full h-40 bg-gray-50 text-indigo-600 font-bold flex items-center justify-center flex-col">
          <h1 className="text-3xl">Job Details</h1>
        </div>
        <div className="flex items-center  justify-center w-full py-10">
          <div className="flex w-full px-8 md:px-20 items-start md:flex-row flex-col md:justify-between justify-center">
            <div className="flex mb-1 items-center justify-center">
              <img
                src={'https://xsgames.co/randomusers/avatar.php?g=male'}
                alt="no-img"
                className="rounded-full mb-2"
                width={100}
                height={100}
              />
              <div className="px-4 mx-2 flex flex-col items-start justify-center">
                <p className="font-semibold text-base mb-1">
                  {JobDetails?.title?.stringValue}
                </p>
                <p className=" text-sm text-gray-800 mb-1">
                  {JobDetails?.company?.stringValue}
                </p>
              </div>
            </div>
            <div className="md:px-4 mb-1 px-2 md:mx-2 flex flex-col items-start justify-center">
              <div className="flex items-center justify-center mb-1">
                <FaUserAstronaut className="text-xs font-semibold text-indigo-600" />
                <p className="font-semibold text-base mx-1">Job Poster </p>
                <p className=" text-sm text-gray-800 mx-1">
                  {JobDetails?.user_name?.stringValue}
                </p>
              </div>
              <div className="flex items-center justify-center mb-1">
                <MdEmail className="text-xs font-semibold text-indigo-600" />
                <p className="font-semibold text-base mx-1">Email </p>
                <p className=" text-sm text-gray-800 mx-1">
                  {JobDetails?.email?.stringValue}
                </p>
              </div>
            </div>
            <div className="md:px-4 mb-1 px-2 md:mx-2 flex flex-col items-start justify-center">
              <div className="flex items-center justify-center mb-1">
                <GoLocation className="text-xs font-semibold text-indigo-600" />
                <p className="font-semibold text-base mx-1">Location </p>
                <p className=" text-sm text-gray-800 mx-1">Rawalipindi</p>
              </div>
              <div className="flex items-center justify-center mb-1">
                <MdCategory className="text-xs font-semibold text-indigo-600" />
                <p className="font-semibold text-base mx-1">Category </p>
                <p className=" text-sm text-gray-800 mx-1">
                  {JobDetails?.job_category?.stringValue}
                </p>
              </div>
            </div>
            <div className="md:px-4 mb-1 px-2 md:mx-2 flex flex-col items-start justify-center">
              <div className="flex items-center justify-center mb-1">
                <BsBriefcaseFill className="text-xs font-semibold text-indigo-600" />
                <p className="font-semibold text-base mx-1">Job Type </p>
                <p className="text-sm text-gray-800 mx-1">
                  {JobDetails?.job_type?.stringValue}
                </p>
              </div>
              <div className="flex items-center justify-center mb-1">
                <AiOutlineDollarCircle className="text-xs font-semibold text-indigo-600" />
                <p className="font-semibold text-base mx-1">Salary </p>
                <p className=" text-sm text-gray-800 mx-1">
                  $ {JobDetails?.salary?.stringValue}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              {JobDetails?.user?.stringValue === user?.uid ? (
                <p className="text-xs text-red-500">
                  unable Apply to your Own jobs
                </p>
              ) : (
                <div className="flex items-center justify-center  ">
                  <BsFillBookmarkCheckFill
                    // onClick={handleBookMark}
                    className="text-indigo-600 text-4xl cursor-pointer  mx-2"
                  />
                  <button
                    // onClick={handleApply}
                    className="md:px-6 md:py-3 px-3 py-2 mt-2 md:mt-0 bg-indigo-500 rounded text-base tracking-widest uppercase transition-all duration-700 hover:bg-indigo-900 text-white  "
                  >
                    Apply Position
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:px-4 py-2 flex items-center md:items-start md:flex-row flex-col justify-start md:justify-center">
          <div className="md:w-8/12 w-full md:px-4 py-8 flex flex-col items-center content-start justify-center ">
            <h1 className="text-center lg:text-2xl font-semibold text-xl mb-4 uppercase border-b-2 border-indigo-600 py-2">
              Job Description
            </h1>
            <p className="px-4">{JobDetails?.description?.stringValue}</p>
          </div>
          <div className="md:w-4/12 w-full py-8 px-4 md:px-10">
            <h1 className=" text-2xl font-semibold mb-2">Job Summary</h1>
            <div className="flex items-center justify-start mb-3">
              <RiUserSearchFill className="text-base font-semibold text-indigo-600" />
              <p className="font-semibold text-base mx-1">Total Vacancies </p>
              <p className=" text-sm text-gray-800 mx-1">
                {JobDetails?.job_vacancy?.stringValue}
              </p>
            </div>
            <div className="flex items-center justify-start mb-3">
              <BsFillCalendar2DateFill className="text-base font-semibold text-indigo-600" />
              <p className="font-semibold text-base mx-1">Dead Line</p>
              <p className=" text-sm text-gray-800 mx-1">
                {new Date(
                  `${JobDetails?.job_deadline?.stringValue}`
                ).toLocaleDateString('en-GB')}
              </p>
            </div>
            <div className="flex items-center justify-start mb-3">
              <HiOutlineStar className="text-base font-semibold text-indigo-600" />
              <p className="font-semibold text-base mx-1">
                Experience Required
              </p>
              <p className=" text-sm text-gray-800 mx-1">
                {JobDetails?.job_experience?.stringValue}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
