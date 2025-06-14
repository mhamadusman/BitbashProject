
import React from 'react';
import { Search, X, ChevronDown, Sliders, MapPin, Briefcase, DollarSign, Tag } from 'lucide-react';

const FilterSidebar = ({ 
  filters = {}, 
  onFilterChange = () => {}, 
  onClearFilters = () => {}
}) => {
  const jobTypes = ['Full Time', 'Part Time', 'Remote', 'WFH', 'Freelancing', 'Contract', 'Internship'];
  const locations = ['USA', 'Canada', 'Australia', 'China', 'Dubai', 'Remote', 'New York', 'San Francisco', 'London'];
  const salaryRanges = [
    { label: '$0 - $25k', value: '0-25000' },
    { label: '$25k - $50k', value: '25000-50000' },
    { label: '$50k - $75k', value: '50000-75000' },
    { label: '$75k - $100k', value: '75000-100000' },
    { label: '$100k+', value: '100000+' }
  ];
  const popularTags = ['React', 'JavaScript', 'Python', 'UI/UX', 'Marketing', 'Design', 'Node.js', 'Java', 'SQL', 'AWS', 'TypeScript', 'Vue.js'];

  const handleTagToggle = (tag) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag) 
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    onFilterChange('tags', newTags);
  };

  const handleJobTypeToggle = (type) => {
    const currentTypes = filters.jobTypes || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    onFilterChange('jobTypes', newTypes);
  };

  const getJobTypeCount = (type) => {
    return Math.floor(Math.random() * 50) + 1;
  };

  return (
    <div className="hidden lg:block lg:w-80">
      <div className="bg-white rounded-2xl shadow-sm border border-[#4BCA7B]/20 p-6 h-fit sticky top-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-[#4BCA7B]" />
            <h2 className="font-grotesk font-bold text-xl text-gray-800">Filters</h2>
          </div>
          <button 
            onClick={onClearFilters}
            className="text-[#4BCA7B] text-sm font-medium hover:underline flex items-center"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
        
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Job title, company, or keywords..."
              value={filters.searchQuery || ''}
              onChange={(e) => onFilterChange('searchQuery', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4BCA7B] focus:border-[#4BCA7B] transition-all duration-300"
            />
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
         
          <div className="relative">
            <select 
              value={filters.location || ''}
              onChange={(e) => onFilterChange('location', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4BCA7B] focus:border-[#4BCA7B] appearance-none transition-all duration-300 text-gray-700 hover:bg-[#4BCA7B]/5"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* Job Types */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
            <Briefcase className="w-4 h-4 mr-2 text-[#4BCA7B]" />
            Job Type
          </label>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {jobTypes.map(type => (
              <label key={type} className="flex items-center justify-between cursor-pointer group hover:bg-[#4BCA7B]/5 p-2 rounded-lg transition-colors">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={(filters.jobTypes || []).includes(type)}
                    onChange={() => handleJobTypeToggle(type)}
                    className="w-4 h-4 text-[#4BCA7B] border-gray-300 rounded focus:ring-[#4BCA7B] transition-colors"
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-800 font-medium">
                    {type}
                  </span>
                </div>
                <span className="text-xs text-gray-500 bg-[#4BCA7B]/10 px-2 py-1 rounded-full">
                  {getJobTypeCount(type)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Salary Range */}
       

        {/* Experience Level */}
        

        {/* Skills & Tags */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
            <Tag className="w-4 h-4 mr-2 text-[#4BCA7B]" />
            Skills & Technologies
          </label>
          <div className="flex flex-wrap gap-2">
            {popularTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 border ${
                  (filters.tags || []).includes(tag)
                    ? 'bg-[#4BCA7B] text-white border-[#4BCA7B] shadow-md transform scale-105'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-[#4BCA7B]/10 hover:border-[#4BCA7B]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Company Size */}
        
      </div>
    </div>
  );
};

export default FilterSidebar;
