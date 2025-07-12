import React from "react";
import {
  Search,
  X,
  ChevronDown,
  Sliders,
  MapPin,
  Briefcase,
  DollarSign,
  Tag,
} from "lucide-react";

const FilterSidebar = ({
  filters = {},
  onFilterChange = () => {},
  onClearFilters = () => {},
  jobsData = [], // Add jobsData prop to receive the fetched jobs
}) => {
  // Extract unique job types from real data
  const getUniqueJobTypes = () => {
    const types = jobsData.map((job) => job.job_type).filter(Boolean);
    return [...new Set(types)];
  };

  // Extract unique locations from real data
  const getUniqueLocations = () => {
    const locations = jobsData.map((job) => job.location).filter(Boolean);
    return [...new Set(locations)];
  };

  // Extract unique countries from real data
  const getUniqueCountries = () => {
    const countries = jobsData.map((job) => job.country).filter(Boolean);
    return [...new Set(countries)];
  };

  // Extract unique tags from real data
  const getUniqueTags = () => {
    const allTags = jobsData.flatMap((job) =>
      job.tags ? job.tags.map((tag) => tag.trim()) : []
    );
    return [...new Set(allTags)].filter(Boolean);
  };

  // Get count of jobs for each job type
  const getJobTypeCount = (type) => {
    return jobsData.filter((job) => job.job_type === type).length;
  };

  // Get count of jobs for each location
  const getLocationCount = (location) => {
    return jobsData.filter((job) => job.location === location).length;
  };

  // Get count of jobs for each tag
  const getTagCount = (tag) => {
    return jobsData.filter(
      (job) => job.tags && job.tags.some((jobTag) => jobTag.trim() === tag)
    ).length;
  };

  // Use real data if available, otherwise fallback to static data
  const jobTypes = getUniqueJobTypes();
  const locations = getUniqueLocations();
  const countries = getUniqueCountries();
  const popularTags = getUniqueTags();

  const handleTagToggle = (tag) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];
    onFilterChange("tags", newTags);
  };

  const handleJobTypeToggle = (type) => {
    const currentTypes = filters.jobTypes || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type];
    onFilterChange("jobTypes", newTypes);
  };

  return (
    <div className="hidden lg:block lg:w-80">
      <div className="bg-white rounded-2xl shadow-sm p-6 h-fit sticky top-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-[#4BCA7B]" />
            <h2 className="font-grotesk font-bold text-xl text-gray-800">
              Filters
            </h2>
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
              value={filters.searchQuery || ""}
              onChange={(e) => onFilterChange("searchQuery", e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-green-200  rounded-lg outline-none   transition-all duration-300 placeholder:text-sm placeholder:font-poppins"
            />
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <div className="relative">
            <select
              value={filters.location || ""}
              onChange={(e) => onFilterChange("location", e.target.value)}
              className="outline-none w-full p-3 border border-green-200 rounded-xl text-sm    appearance-none transition-all duration-300 text-gray-700 font-poppins hover:bg-[#4BCA7B]/5"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}{" "}
                  {jobsData.length > 0 && `(${getLocationCount(location)})`}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* Country Filter (if countries are available) */}
        {countries.length > 0 && (
          <div className="mb-6">
            <div className="relative">
              <select
                value={filters.country || ""}
                onChange={(e) => onFilterChange("country", e.target.value)}
                className="outline-none w-full p-3 border border-green-200 rounded-xl text-sm    appearance-none transition-all duration-300 text-gray-700 font-poppins hover:bg-[#4BCA7B]/5"
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Job Types */}
        <div className="mb-6 rounded-lg bg-black py-4 px-2 bg-gray-50 shadow-sm">
          <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
            <Briefcase className="w-4 h-4 mr-2 text-[#4BCA7B]" />
            Job Type
          </label>
          <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-[#4BCA7B] scrollbar-track-gray-50">
            {jobTypes.map((type) => (
              <label
                key={type}
                className="flex items-center justify-between cursor-pointer group hover:bg-[#4BCA7B]/5 p-1 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={(filters.jobTypes || []).includes(type)}
                    onChange={() => handleJobTypeToggle(type)}
                    className="w-4 h-4 text-[#4BCA7B] border-green-300 rounded-lg p-2 focus:ring-[#4BCA7B] transition-colors"
                  />
                  <span className="ml-3 text-sm text-gray-900 group-hover:text-[#4BCA7B] font-poppins">
                    {type}
                  </span>
                </div>
                <span className="text-xs text-gray-500 bg-[#4BCA7B]/10 px-2 py-1 rounded-full">
                  {jobsData.length > 0
                    ? getJobTypeCount(type)
                    : Math.floor(Math.random() * 50) + 1}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Skills & Tags */}
        <div className="mb-6 rounded-lg bg-black py-6 px-2 bg-gray-50 shadow-sm">
          <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
            <Tag className="w-4 h-4 mr-2 text-[#4BCA7B]" />
            Skills & Tags
          </label>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-[#4BCA7B] scrollbar-track-gray-50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full pr-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 border ${
                  (filters.tags || []).includes(tag)
                    ? "bg-[#4BCA7B] text-white border-[#4BCA7B] shadow-md transform scale-105"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-[#4BCA7B]/10 hover:border-[#4BCA7B]"
                }`}
              >
                {tag}
                {jobsData.length > 0 && (
                  <span className="ml-1 text-xs opacity-70">
                    ({getTagCount(tag)})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
