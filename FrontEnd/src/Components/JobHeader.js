import React from 'react';

const JobHeader = ({ jobCount }) => {
  return (
    <div className="bg-green-50 sm:p-3  rounded-lg lg:py-5 py-1 lg:px-6 px-2 flex flex-col sm:flex-row justify-between lg:items-start  mb-6">
      <div>
        <h1 className="font-bold font-poppins lg:text-2xl text-xl text-start   text-gray-800 mb-2">
          Find Your Dream Job
        </h1>
        <p className="text-gray-600 text-center lg:text-md text-sm">
          Showing {jobCount} jobs based on your preferences
        </p>
      </div>
    </div>
  );
};

export default JobHeader;