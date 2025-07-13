import React from 'react';
import { MapPin, Clock, Building, Edit, Trash2 } from 'lucide-react';
import jobService from '../Services/jobServices';
import toast from 'react-hot-toast';

const JobCard = ({ job, onEdit }) => {

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this job?');
    if (!confirm) return;

    try {
      const result = await jobService.deletePost(id);
      if (result) {
        toast.success('Job deleted successfully!', {
          duration: 4000,
          position: 'top-center',
          style: {
            background: '#EF4444',
            color: 'white',
            fontWeight: '600',
            padding: '16px',
            borderRadius: '12px'
          }
        });

        
      } else {
        toast.error('Failed to delete job. Try again.', {
          duration: 4000,
          position: 'top-center',
          style: {
            background: '#F87171',
            color: 'white',
            fontWeight: '600',
            padding: '16px',
            borderRadius: '12px'
          }
        });
      }
    } catch (error) {
      toast.error('Error deleting job. Please try again later.', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#DC2626',
          color: 'white',
          fontWeight: '600',
          padding: '16px',
          borderRadius: '12px'
        }
      });
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#4BCA7B]/5 to-white rounded-2xl shadow-sm border border-[#4BCA7B]/10 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative group">
      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onEdit(job)}
          className="p-2 bg-white rounded-full shadow-md hover:bg-[#4BCA7B]/10 transition-colors"
        >
          <Edit className="w-4 h-4 text-[#4BCA7B]" />
        </button>
        <button
          onClick={() => handleDelete(job.id)}
          className="p-2 bg-white rounded-full shadow-md hover:bg-[#4BCA7B]/10 transition-colors"
        >
          <Trash2 className="w-4 h-4 text-[#4BCA7B]" />
        </button>
      </div>

      <h3 className="font-poppins font-semibold text-base text-gray-900 mb-2 pr-16">{job.title}</h3>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-800">
          <Building className="w-4 h-4 mr-2 text-[#4BCA7B]" />
          <span className="font-poppins text-sm font-medium">{job.company}</span>
        </div>
        <div className="flex items-center text-gray-800">
          <MapPin className="w-4 h-4 mr-2 text-[#4BCA7B]" />
          <span className="font-poppins text-sm">{job.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-poppins px-2 py-1 rounded-full text-xs font-medium bg-[#4BCA7B]/10 text-gray-800 text-[#4BCA7B]">
            {job.job_type}
          </span>
          <div className="flex items-center text-gray-800">
            <Clock className="w-4 h-4 mr-1" />
            <span className="font-poppins text-xs">{job.posting_date}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {job.tags && job.tags.map((tag, index) => (
          <span key={index} className="font-poppins px-2 py-1 bg-white border border-[#4BCA7B]/10 text-[#4BCA7B] text-xs rounded-full font-medium">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex lg:justify-end space-x-3 justify-start">
        <button className="font-poppins px-3 py-1 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors duration-300">
          Apply Now
        </button>
        <button className="font-poppins px-3 py-2 border border-green-200 text-green-500 rounded-full font-medium hover:bg-green-600 hover:text-white transition-colors duration-300">
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
