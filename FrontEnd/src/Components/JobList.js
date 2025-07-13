import React, { useState } from 'react';
import JobCard from './JobCard';
import JobPostingForm from './JobPostingForm';
import { useEffect } from 'react';
const JobList = ({ jobs, j }) => {
  const [showForm, setShowForm] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);

  useEffect (() =>{
    console.log("printing data from jonlist" , j)
  }, []);

  const handleEdit = (job) => {
    setJobToEdit(job);
    setShowForm(true);
  };


  const handleCloseForm = () => {
    setJobToEdit(null);
    setShowForm(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} onEdit={handleEdit} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No jobs found</div>
            <p className="text-gray-500">Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>

      {showForm &&  (
        <JobPostingForm onClose={handleCloseForm} jobToEdit={jobToEdit} Alljobs={j} />
      )}
    </>
  );
};

export default JobList;
