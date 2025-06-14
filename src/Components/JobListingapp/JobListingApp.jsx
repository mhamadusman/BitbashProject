
import React, { useState, useMemo } from 'react';
import FilterSidebar from '../FilterSideBar/FilterSidebar';
import Navbar from '../Navbar/Navbar';
import { Search, MapPin, Clock, Building, ChevronDown, Edit, Trash2 } from 'lucide-react';

const JobListingApp = () => {
  const [filters, setFilters] = useState({
    searchQuery: '',
    jobTypes: [],
    location: '',
    salaryRange: '',
    experienceLevel: '',
    tags: [],
    companySize: ''
  });
  const [sortBy, setSortBy] = useState('newest');

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      jobTypes: [],
      location: '',
      salaryRange: '',
      experienceLevel: '',
      tags: [],
      companySize: ''
    });
    setSortBy('newest');
  };

  const jobs = [
    {
      id: 1,
      title: 'Web Designer / Developer',
      company: 'Facebook',
      location: 'Australia',
      jobType: 'Full Time',
      postedDate: '2 days ago',
      tags: ['React', 'JavaScript', 'UI/UX'],
     
    },
    {
      id: 2,
      title: 'Marketing Director',
      company: 'Google',
      location: 'USA',
      jobType: 'Part Time',
      postedDate: '2 days ago',
      tags: ['Marketing', 'Strategy', 'Digital'],
      
    },
    {
      id: 3,
      title: 'Application Developer',
      company: 'Android',
      location: 'China',
      jobType: 'Remote',
      postedDate: '2 days ago',
      tags: ['Android', 'Java', 'Kotlin'],
      
    },
    {
      id: 4,
      title: 'Senior Product Designer',
      company: 'Lenovo',
      location: 'Dubai',
      jobType: 'WFH',
      postedDate: '2 days ago',
      tags: ['Design', 'Figma', 'Product'],
      
    },
    {
      id: 5,
      title: 'Frontend Developer',
      company: 'Microsoft',
      location: 'Canada',
      jobType: 'Full Time',
      postedDate: '3 days ago',
      tags: ['React', 'TypeScript', 'CSS'],
      
    },
    {
      id: 6,
      title: 'Data Scientist',
      company: 'Amazon',
      location: 'Remote',
      jobType: 'Full Time',
      postedDate: '1 day ago',
      tags: ['Python', 'Machine Learning', 'SQL'],
    
    }
  ];

  const filteredAndSortedJobs = useMemo(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = filters.searchQuery === '' || 
        job.company.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        job.title.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const matchesJobType = filters.jobTypes.length === 0 || 
        filters.jobTypes.includes(job.jobType);
      const matchesLocation = !filters.location || job.location === filters.location;
      const matchesTags = filters.tags.length === 0 || 
        filters.tags.some(tag => job.tags.includes(tag));
      return matchesSearch && matchesJobType && matchesLocation && matchesTags;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.postedDate) - new Date(b.postedDate);
        case 'company':
          return a.company.localeCompare(b.company);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'newest':
        default:
          return new Date(b.postedDate) - new Date(a.postedDate);
      }
    });

    return filtered;
  }, [jobs, filters, sortBy]);

const JobCard = ({ job }) => (
  <div className="bg-gradient-to-b from-[#4BCA7B]/5 to-white rounded-2xl shadow-sm border border-[#4BCA7B]/10 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative group">
    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <button 
        onClick={() => console.log('Edit job:', job.id)}
        className="p-2 bg-white rounded-full shadow-md hover:bg-[#4BCA7B]/10 transition-colors"
      >
        <Edit className="w-4 h-4 text-[#4BCA7B]" />
      </button>
      <button 
        onClick={() => console.log('Delete job:', job.id)}
        className="p-2 bg-white rounded-full shadow-md hover:bg-[#4BCA7B]/10 transition-colors"
      >
        <Trash2 className="w-4 h-4 text-[#4BCA7B]" />
      </button>
    </div>
    <h3 className="font-poppins font-medium text-base text-gray-800 mb-2 pr-16">{job.title}</h3>
    <div className="space-y-2 mb-4">
      <div className="flex items-center text-gray-600">
        <Building className="w-4 h-4 mr-2 text-[#4BCA7B]"/>
        <span className="font-poppins text-sm font-medium">{job.company}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <MapPin className="w-4 h-4 mr-2 text-[#4BCA7B]" />
        <span className="font-poppins text-sm">{job.location}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-poppins px-2 py-1 rounded-full text-xs font-medium bg-[#4BCA7B]/10 text-[#4BCA7B]">
          {job.jobType}
        </span>
        <div className="flex items-center text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          <span className="font-poppins text-xs">{job.postedDate}</span>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mb-6">
      {job.tags.map((tag, index) => (
        <span key={index} className="font-poppins px-2 py-1 bg-white border border-[#4BCA7B]/10 text-[#4BCA7B] text-xs rounded-full font-medium">
          {tag}
        </span>
      ))}
    </div>
    <div className="flex lg:justify-end space-x-3 justify-center">
      <button className="font-poppins px-3 py-1 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors duration-300">
        Apply Now
      </button>
      <button className="font-poppins px-3 py-2 border-2 border-green-500 text-green-500 rounded-lg font-medium hover:bg-green-500 hover:text-white transition-colors duration-300">
        View Details
      </button>
    </div>
  </div>
);

  return (
    <div className="min-h-screen">
      <Navbar 
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar (only on lg+) */}
          <div className="hidden lg:block lg:w-80">
            <FilterSidebar 
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Job Listings */}
          <div className="lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="font-bold text-3xl text-center text-gray-800 mb-2">
                  Find Your Dream Job
                </h1>
                <p className="text-gray-600 text-center">
                  Showing {filteredAndSortedJobs.length} jobs based on your preferences
                </p>
              </div>
            </div>

            {(filters.searchQuery || filters.jobTypes.length > 0 || filters.location || filters.tags.length > 0) && (
              <div className="mb-6 p-4 bg-white rounded-lg border border-[#4BCA7B]/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Active Filters:</span>
                  <button 
                    onClick={clearFilters}
                    className="text-xs text-[#4BCA7B] hover:underline"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.searchQuery && (
                    <span className="px-2 py-1 bg-[#4BCA7B]/10 text-[#4BCA7B] text-xs rounded-full">
                      Search: {filters.searchQuery}
                    </span>
                  )}
                  {filters.jobTypes.map(type => (
                    <span key={type} className="px-2 py-1 bg-[#4BCA7B]/10 text-[#4BCA7B] text-xs rounded-full">
                      Type: {type}
                    </span>
                  ))}
                  {filters.location && (
                    <span className="px-2 py-1 bg-[#4BCA7B]/10 text-[#4BCA7B] text-xs rounded-full">
                      Location: {filters.location}
                    </span>
                  )}
                  {filters.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-[#4BCA7B]/10 text-[#4BCA7B] text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredAndSortedJobs.length > 0 ? (
                filteredAndSortedJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-400 text-lg mb-2">No jobs found</div>
                  <p className="text-gray-500">Try adjusting your filters to see more results</p>
                </div>
              )}
            </div>

            {filteredAndSortedJobs.length > 0 && (
              <div className="text-center mt-8">
                <button className="px-6 py-3 bg-white border border-[#4BCA7B]/20 text-[#4BCA7B] rounded-lg font-medium hover:bg-[#4BCA7B]/10 transition-colors">
                  Load More Jobs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListingApp;