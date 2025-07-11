import React from 'react';
import { MapPin, Clock, Building, Bookmark } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="font-grotesk font-bold text-xl text-darkGray mb-2 group-hover:text-customBlue transition-colors duration-300">
              {job.title}
            </h3>
            <div className="flex items-center space-x-4 text-sm">
              <span className="flex items-center font-medium" style={{ color: '#4BCA7B' }}>
                <Building className="w-4 h-4 mr-2" />
                {job.company}
              </span>
              <span className="flex items-center text-gray-500">
                <MapPin className="w-4 h-4 mr-1" />
                {job.location}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors group">
              <Bookmark className="w-5 h-5 text-gray-400 group-hover:text-customBlue" />
            </button>
            <span className="text-xs text-gray-500 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {job.postedDate}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
            job.jobType === 'Full Time' ? 'bg-green-100 text-green-700 border border-green-200' :
            job.jobType === 'Part Time' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
            job.jobType === 'Remote' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
            'bg-orange-100 text-orange-700 border border-orange-200'
          }`}>
            {job.jobType}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {job.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-gray-50 text-gray-700 text-xs rounded-lg font-medium border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex space-x-3">
          <button className="flex-1 bg-customBlue text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center group">
            Apply Now
          </button>
          <button className="px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:border-customBlue hover:text-customBlue transition-all duration-300 hover:scale-105">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;