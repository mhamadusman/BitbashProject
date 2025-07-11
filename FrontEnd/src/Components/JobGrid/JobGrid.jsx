import React, { useState } from 'react';
import { Search, Plus, ArrowRight } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import JobPostingForm from '../JobPostingForm';

export default function JobGrid() {
  const [showJobPostingForm, setShowJobPostingForm] = useState(false);

  const handleSearchJob = () => {
    console.log('Search Job clicked');
  };

  const handlePostJob = () => {
    setShowJobPostingForm(true);
  };

  const handleCloseForm = () => {
    setShowJobPostingForm(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center lg:mb-16 mb-6">
      <Toaster /> {/* Moved Toaster here to persist across renders */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Search Job Column */}
        <div
          className="relative h-96 lg:h-[500px] flex flex-col items-center justify-center text-center p-8"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="z-10 space-y-6">
            <div className="text-green-500 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white font-grotesk">
              Find Your Dream Job
            </h2>
            <p className="text-gray-300 text-lg max-w-md font-inter leading-relaxed">
              Discover thousands of opportunities from top companies. Search by location,
              skills, and salary to find the perfect match for your career goals.
            </p>
            <button
              onClick={handleSearchJob}
              className="relative group w-full py-3 bg-transparent uppercase rounded-full text-gray-100 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 font-grotesk text-sm hover:text-green-600 font-light flex justify-center items-center"
            >
              Search Jobs
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center transition-all duration-300 group-hover:translate-x-1 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 hover:bg-white transition-all duration-300">
                  <ArrowRight size={20} className="text-4xl font-bold" />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Post Job Column */}
        <div
          className="relative h-96 lg:h-[500px] flex flex-col items-center justify-center text-center p-8"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="z-10 space-y-6">
            <div className="text-green-500 mb-4">
              <Plus size={48} className="mx-auto" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white font-grotesk">
              Post a Job Opening
            </h2>
            <p className="text-gray-300 text-lg max-w-md font-inter leading-relaxed">
              Connect with talented professionals and grow your team. Post your job
              openings and reach qualified candidates actively seeking new opportunities.
            </p>
            <button
              onClick={handlePostJob}
              className="relative group w-full py-3 bg-transparent uppercase rounded-full text-gray-100 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 font-grotesk text-sm hover:text-green-600 font-light flex justify-center items-center"
            >
              Post Job
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center transition-all duration-300 group-hover:translate-x-1 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 hover:bg-white transition-all duration-300">
                  <ArrowRight size={20} className="text-4xl font-bold" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {showJobPostingForm && (
        <JobPostingForm onClose={handleCloseForm} />
      )}
    </div>
  );
}