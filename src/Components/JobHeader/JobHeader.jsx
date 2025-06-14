import React from 'react';
import { Filter, Grid, List, Search, SlidersHorizontal, Plus } from 'lucide-react';

const JobHeader = ({ 
  totalJobs, 
  viewMode, 
  onViewModeChange, 
  sortBy, 
  onSortChange, 
  onToggleFilters,
  showFilters,
  onAddJob 
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Date Posted: Newest First' },
    { value: 'oldest', label: 'Date Posted: Oldest First' },
    { value: 'company', label: 'Company A-Z' },
    { value: 'title', label: 'Job Title A-Z' },
    { value: 'salary_high', label: 'Salary: High to Low' },
    { value: 'salary_low', label: 'Salary: Low to High' },
    { value: 'relevance', label: 'Most Relevant' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      {/* Main Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h1 className="font-grotesk font-bold text-3xl text-darkGray mb-2">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600 flex items-center">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Showing <span className="font-semibold text-customBlue mx-1">{totalJobs}</span> 
            jobs • Updated just now
          </p>
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onAddJob}
            className="hidden lg:flex items-center px-4 py-2 bg-gradient-to-r from-gradientStart to-gradientEnd text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            Post Job
          </button>
          
          <button
            onClick={onToggleFilters}
            className={`lg:hidden flex items-center px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              showFilters 
                ? 'bg-customBlue text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-100">
        {/* Left Controls */}
        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="hidden lg:flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-white text-customBlue shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md transition-all duration-300 ${
                viewMode === 'list' 
                  ? 'bg-white text-customBlue shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Toggle for Desktop */}
          <button
            onClick={onToggleFilters}
            className={`hidden lg:flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              showFilters 
                ? 'bg-customBlue text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Filter className="w-4 h-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-4">
          {/* Quick Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Quick search..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customBlue focus:border-transparent text-sm"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select 
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-customBlue focus:border-transparent min-w-[200px]"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobHeader;