import React from 'react';

const JobHeader = ({ jobCount }) => {
  return (
    <div className="bg-green-50   rounded-lg p-6 flex flex-col sm:flex-row justify-between items-start  mb-6">
      <div>
        <h1 className="font-bold font-poppins lg:text-2xl text-xl text-start   text-gray-800 mb-2">
          Find Your Dream Job
        </h1>
        <p className="text-gray-600  lg:text-md text-sm">
          Showing {jobCount} jobs based on your preferences
        </p>
      </div>
    </div>
  );
};

export default JobHeader;