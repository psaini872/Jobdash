import Navbar from '../components/Navbar.jsx';
import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Footer from '../components/Footer.jsx';

const CreateJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user: '',
    user_name: '',
    title: '',
    salary: 0,
    email: '',
    company: '',
    description: '',
    job_category: '',
    job_type: '',
    job_experience: '',
    job_vacancy: 0,
    job_deadline: '',
  });
  const [error, setError] = useState({
    user: '',
    title: '',
    salary: '',
    email: '',
    company: '',
    description: '',
    job_category: '',
    job_type: '',
    job_experience: '',
    job_vacancy: '',
    job_deadline: '',
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({
          ...formData,
          user: user.uid,
          user_name: user.displayName,
        });
      } else {
        toast.success('First Loggin');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title) {
      setError({ ...error, title: 'title Field is required' });
      return;
    }

    if (!formData.salary) {
      setError({ ...error, salary: 'salary Field is required' });
      return;
    }

    if (!formData.email) {
      setError({ ...error, email: 'Email Field is Required' });
      return;
    }

    if (!formData.company) {
      setError({ ...error, company: 'company Field is required' });
      return;
    }
    if (!formData.description) {
      setError({ ...error, description: 'description Field is required' });
      return;
    }
    if (!formData.job_category) {
      setError({ ...error, job_category: 'job_category Field is required' });
      return;
    }
    if (!formData.job_type) {
      setError({ ...error, job_type: 'job_type Field is required' });
      return;
    }
    if (!formData.job_experience) {
      setError({
        ...error,
        job_experience: 'job_experience Field is required',
      });
      return;
    }
    if (!formData.job_vacancy) {
      setError({ ...error, job_vacancy: 'job_vacancy Field is required' });
      return;
    }
    if (!formData.job_deadline) {
      setError({ ...error, job_deadline: 'job_deadline Field is required' });
      return;
    }

    if (formData.user == null) {
      return toast.error('Please Login First');
    }

    console.log(formData);

    try {
      await addDoc(collection(db, 'jobs'), formData);
      toast.success('Successful Created');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const options = [
    { value: 'fulltime', label: 'Full Time' },
    { value: 'parttime', label: 'Part Time' },
    { value: 'internship', label: 'Internship' },
    { value: 'contract', label: 'Contract' },
  ];

  return (
    <>
      <Navbar />
      <div className="w-full  py-20 flex items-center  justify-center flex-col">
        <h1 className="text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl">
          Enter Job Details
        </h1>
        <form
          onSubmit={handleSubmit}
          className="sm:w-1/2 w-full px-4 mx-4  h-full"
        >
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label htmlFor="title" className="mb-1 text-base font-semibold">
              Title :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              type="text"
              id="title"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter title of job"
            />
            {error.title && (
              <p className="text-sm text-red-500">{error.title}</p>
            )}
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label htmlFor="salary" className="mb-1 text-base font-semibold">
              Salary :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, salary: e.target.value })
              }
              type="number"
              id="salary"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="CTC Salary in Lakh"
            />
            {error.salary && (
              <p className="text-sm text-red-500">{error.salary}</p>
            )}
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label htmlFor="email" className="mb-1 text-base font-semibold">
              Email :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              id="email"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Email to be Contacted for this job"
            />
            {error.email && (
              <p className="text-sm text-red-500">{error.email}</p>
            )}
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label htmlFor="company" className="mb-1 text-base font-semibold">
              Company :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              type="text"
              id="company"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Company of job"
            />
            {error.company && (
              <p className="text-sm text-red-500">{error.company}</p>
            )}
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label
              htmlFor="description"
              className="mb-1 text-base font-semibold"
            >
              Description :
            </label>
            <textarea
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              // onResize={'none'}
              type="text"
              id="description"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter description of job"
            />
            {error.description && (
              <p className="text-sm text-red-500">{error.description}</p>
            )}
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label
              htmlFor="jobCategory"
              className="mb-1 text-base font-semibold"
            >
              Job Category :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, job_category: e.target.value })
              }
              type="text"
              id="jobCategory"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Category of job"
            />
            {error.job_category && (
              <p className="text-sm text-red-500">{error.job_category}</p>
            )}
          </div>
          <Select
            onChange={(e) => setFormData({ ...formData, job_type: e.value })}
            placeholder="Please Select Job type"
            options={options}
          />
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            {error.job_category && (
              <p className="text-sm text-red-500">{error.job_category}</p>
            )}
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label
              htmlFor="jobExperience"
              className="mb-1 text-base font-semibold"
            >
              Job Experience :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, job_experience: e.target.value })
              }
              type="text"
              id="jobExperience"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Experience Required for this job"
            />
            {error.job_experience && (
              <p className="text-sm text-red-500">{error.job_experience}</p>
            )}
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label htmlFor="jobva" className="mb-1 text-base font-semibold">
              Job Vacancy :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, job_vacancy: e.target.value })
              }
              type="number"
              id="jobva"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Number  of Vacancies"
            />
            {error.job_vacancy && (
              <p className="text-sm text-red-500">{error.job_vacancy}</p>
            )}
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label htmlFor="jobva" className="mb-1 text-base font-semibold">
              Job Deadline :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, job_deadline: e.target.value })
              }
              type="date"
              id="jobva"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Deadline of job"
            />
            {error.job_deadline && (
              <p className="text-sm text-red-500">{error.job_deadline}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-indigo-600 text-white font-semibold tracking-widest"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};
export default CreateJob;
