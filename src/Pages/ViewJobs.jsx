import Navbar from '../components/Navbar';
import React, { useEffect, useState } from 'react';
import JobsCard from '../components/JobsCard.jsx';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import Footer from '../components/Footer.jsx';

const ViewJobs = () => {
  const [jobData, setJobData] = useState();

  useEffect(() => {
    const getJobs = async () => {
      try {
        const data = await getDocs(collection(db, 'jobs'));

        setJobData(data.docs);
      } catch (error) {
        console.log(error);
      }
    };
    getJobs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full  py-20 flex items-center md:px-8 px-2  justify-center flex-col">
        <h1 className="px-4 mx-2 py-2 uppercase tracking-wider border-b-2 border-b-indigo-600 text-3xl font-semibold">
          Available Jobs
        </h1>
        <div className="w-full h-full py-4 flex  overflow-y-auto  items-center justify-center flex-wrap">
          {/* map */}
          {Array.isArray(jobData) && jobData.length > 0 ? (
            jobData?.map((job) => {
              return (
                <JobsCard
                  job={job.data()}
                  jobId={job.id}
                  key={Math.random() * 100}
                />
              );
            })
          ) : (
            <p>No jobs found</p>
          )}
          {/* map */}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ViewJobs;
