import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import {
  LogIn,
  LogOut,
  UserPlus,
  Menu,
  X,
  Filter,
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Tag,
  ChevronDown,
  Sliders,
} from "lucide-react";

const Navbar = ({
  filters = {},
  onFilterChange = () => {},
  onClearFilters = () => {},
  sortBy,
  setSortBy,
  jobsData = [], // Add jobsData prop to receive the fetched jobs
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [searchInputKey, setSearchInputKey] = useState(0); // Add key for search input

  // Enhanced search function for multiple keywords
  const matchesSearch = (job, searchQuery) => {
    if (!searchQuery || searchQuery.trim() === "") return true;
    
    // Split search query into individual keywords and filter out empty strings
    const keywords = searchQuery.toLowerCase().split(/\s+/).filter(keyword => keyword.length > 0);
    
    // Create searchable text from job properties
    const searchableText = [
      job.title,
      job.company,
      job.location,
      job.country,
      job.job_type,
      job.description,
      ...(job.tags || [])
    ].join(" ").toLowerCase();
    
    // Check if ALL keywords are found in the searchable text
    return keywords.every(keyword => searchableText.includes(keyword));
  };

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

  // Get count of jobs for each job type (considering current search)
  const getJobTypeCount = (type) => {
    return jobsData.filter((job) => 
      job.job_type === type && matchesSearch(job, filters.searchQuery)
    ).length;
  };

  // Get count of jobs for each location (considering current search)
  const getLocationCount = (location) => {
    return jobsData.filter((job) => 
      job.location === location && matchesSearch(job, filters.searchQuery)
    ).length;
  };

  // Get count of jobs for each tag (considering current search)
  const getTagCount = (tag) => {
    return jobsData.filter(
      (job) => job.tags && job.tags.some((jobTag) => jobTag.trim() === tag) && matchesSearch(job, filters.searchQuery)
    ).length;
  };

  // Use real data if available, otherwise fallback to empty arrays
  const jobTypes = getUniqueJobTypes();
  const locations = getUniqueLocations();
  const countries = getUniqueCountries();
  const popularTags = getUniqueTags();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isFilterMenuOpen) setIsFilterMenuOpen(false);
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsFilterMenuOpen(false);
  };

  useEffect(() => {
    if (isMobileMenuOpen || isFilterMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen, isFilterMenuOpen]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    onFilterChange("searchQuery", value);
  };

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

  // Filter Menu Content (updated with dynamic data and better styling)
  const FilterMenuContent = () => (
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#4BCA7B] scrollbar-track-gray-100">
      <div className="p-6">
        {/* Filters Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-[#4BCA7B]" />
            <h2 className="font-grotesk font-bold text-xl text-gray-800">
              Filters
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClearFilters}
              className="text-[#4BCA7B] text-sm font-medium hover:underline flex items-center"
            >
              <X className="w-4 h-4 mr-1" />
              Clear All
            </button>
            <button
              onClick={closeAllMenus}
              className="p-1.5 hover:bg-[#4BCA7B]/10 rounded-full transition-colors duration-200"
              aria-label="Close filters"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Job title, company, keywords... (e.g., 'react developer remote')"
              value={filters.searchQuery || ""}
              onChange={handleSearchChange}
              autoComplete="off"
              spellCheck="false"
              className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg outline-none transition-all duration-300 placeholder:text-sm placeholder:font-poppins"
            />
          </div>
          {filters.searchQuery && (
            <p className="text-xs text-gray-500 mt-1 ml-1 font-poppins">
              Tip: Use multiple keywords for better results (e.g., "react developer remote")
            </p>
          )}
        </div>

        {/* Location */}
        <div className="mb-6">
          <div className="relative">
            <select
              value={filters.location || ""}
              onChange={(e) => onFilterChange("location", e.target.value)}
              className="outline-none w-full p-3 border border-green-200 rounded-xl text-sm appearance-none transition-all duration-300 text-gray-700 font-poppins hover:bg-[#4BCA7B]/5"
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
                className="outline-none w-full p-3 border border-green-200 rounded-xl text-sm appearance-none transition-all duration-300 text-gray-700 font-poppins hover:bg-[#4BCA7B]/5"
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

        {/* Sort By */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
            <ChevronDown className="w-4 h-4 mr-2 text-[#4BCA7B]" />
            Sort By
          </label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="outline-none w-full p-3 border border-green-200 rounded-xl text-sm appearance-none transition-all duration-300 text-gray-700 font-poppins hover:bg-[#4BCA7B]/5"
            >
              <option value="newest">Date Posted: Newest First</option>
              <option value="oldest">Date Posted: Oldest First</option>
              <option value="company">Company A-Z</option>
              <option value="title">Job Title A-Z</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* Job Types */}
        {jobTypes.length > 0 && (
          <div className="mb-6 rounded-lg bg-gray-50 py-4 px-2 shadow-sm">
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
                    {getJobTypeCount(type)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Tags */}
        {popularTags.length > 0 && (
          <div className="mb-6 rounded-lg bg-gray-50 py-6 px-2 shadow-sm">
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
                  <span className="ml-1 text-xs opacity-70">
                    ({getTagCount(tag)})
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No Data Message */}
        {jobsData.length === 0 && (
          <div className="text-center py-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <Search className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 text-sm">
                No jobs data available. Load jobs to see filtering options.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50">
        <div className="mx-auto w-full relative">
          <nav
            className={`flex items-center px-4 sm:px-6 justify-between gap-4 duration-200 py-3 lg:h-16 ${
              scrolled ? "bg-background/25 backdrop-blur-lg" : "bg-transparent"
            }`}
          >
            {/* Logo */}
            <ScrollLink
              to="hero-section"
              smooth={true}
              duration={300}
              className="cursor-pointer"
              onClick={closeAllMenus}
            >
              <Link
                to="/"
                aria-label="Jobify Homepage"
                id="hero-section-from-logo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200 60"
                  className="w-28 sm:w-36 md:w-48 group"
                >
                  <text
                    x="100"
                    y="28"
                    fontFamily="'Space Grotesk', monospace"
                    fontSize="24"
                    fill="#1DD15E"
                    className="transition-all duration-500 ease-in-out group-hover:fill-gray-400"
                    textAnchor="middle"
                    fontWeight="700"
                    letterSpacing="7"
                  >
                    JOBIFY
                  </text>
                  <text
                    x="100"
                    y="45"
                    fontFamily="'Space Grotesk', monospace"
                    fontSize="10"
                    fill="#1DD15E"
                    className="transition-all duration-500 ease-in-out group-hover:fill-gray-400"
                    textAnchor="middle"
                    letterSpacing="6"
                  >
                    FIND YOUR WAY
                  </text>
                </svg>
              </Link>
            </ScrollLink>

            {/* Desktop Navigation Links */}
            <ul className="ml-3 hidden flex-grow gap-4 lg:flex">
              <li>
                <ScrollLink
                  to="hero-section"
                  smooth={true}
                  duration={300}
                  className="mono-tag px-3 py-1.5 text-sm text-gray-600 hover:text-[#52d1a7] transition-colors duration-200 cursor-pointer"
                >
                  Home
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="find-job-post-section"
                  smooth={true}
                  duration={300}
                  className="mono-tag px-3 py-1.5 text-sm text-gray-600 hover:text-[#52d1a7] transition-colors duration-200 cursor-pointer"
                >
                  PostJob
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="jobs-section"
                  smooth={true}
                  duration={300}
                  className="mono-tag px-3 py-1.5 text-sm text-gray-600 hover:text-[#52d1a7] transition-colors duration-200 cursor-pointer"
                >
                  GO TO JOBS
                </ScrollLink>
              </li>
            </ul>

            {/* Mobile Menu and Filter Buttons */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={toggleFilterMenu}
                className="p-2 rounded-lg hover:bg-[#4BCA7B]/10 transition-colors duration-200 relative"
                aria-label="Toggle filters"
              >
                <Filter className="w-6 h-6 text-gray-600 hover:text-[#4BCA7B]" />
                {/* Active filter indicator */}
                {(filters.searchQuery || filters.location || filters.country || 
                  (filters.jobTypes && filters.jobTypes.length > 0) || 
                  (filters.tags && filters.tags.length > 0)) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#4BCA7B] rounded-full"></div>
                )}
              </button>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg hover:bg-[#4BCA7B]/10 transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                <Menu className="w-6 h-6 text-gray-600 hover:text-[#4BCA7B]" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {(isMobileMenuOpen || isFilterMenuOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeAllMenus}
        />
      )}

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto scrollbar-thin scrollbar-thumb-[#4BCA7B] scrollbar-track-gray-100 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          {/* Menu Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Menu className="w-5 h-5 text-[#4BCA7B]" />
              <h2 className="font-grotesk font-bold text-lg text-gray-800">
                Menu
              </h2>
            </div>
            <button
              onClick={closeAllMenus}
              className="p-1.5 hover:bg-[#4BCA7B]/10 rounded-full transition-colors duration-200"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <ScrollLink
                  to="hero-section"
                  smooth={true}
                  duration={300}
                  onClick={closeAllMenus}
                  className="flex items-center px-3 py-2.5 text-gray-700 hover:text-[#4BCA7B] hover:bg-[#4BCA7B]/10 rounded-lg transition-all duration-200 cursor-pointer mono-tag text-sm"
                >
                  Home
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="find-job-post-section"
                  smooth={true}
                  duration={300}
                  onClick={closeAllMenus}
                  className="flex items-center px-3 py-2.5 text-gray-700 hover:text-[#4BCA7B] hover:bg-[#4BCA7B]/10 rounded-lg transition-all duration-200 cursor-pointer mono-tag text-sm"
                >
                  PostJob
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="jobs-section"
                  smooth={true}
                  duration={300}
                  onClick={closeAllMenus}
                  className="flex items-center px-3 py-2.5 text-gray-700 hover:text-[#4BCA7B] hover:bg-[#4BCA7B]/10 rounded-lg transition-all duration-200 cursor-pointer mono-tag text-sm"
                >
                  GO TO JOBS
                </ScrollLink>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full flex items-center px-3 py-2.5 text-gray-700 hover:text-[#4BCA7B] hover:bg-[#4BCA7B]/10 rounded-lg transition-all duration-200 text-sm">
                <LogIn className="w-4 h-4 mr-3 text-[#4BCA7B]" />
                Sign In
              </button>
              <button className="w-full flex items-center px-3 py-2.5 text-gray-700 hover:text-[#4BCA7B] hover:bg-[#4BCA7B]/10 rounded-lg transition-all duration-200 text-sm">
                <UserPlus className="w-4 h-4 mr-3 text-[#4BCA7B]" />
                Sign Up
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              © 2025 Jobify. Find Your Way.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Filters Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isFilterMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <FilterMenuContent />
      </div>

      {/* Styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;700&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

        .mono-tag {
          font-family: "Space Mono", monospace;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-weight: 500;
        }

        .font-grotesk {
          font-family: "Space Grotesk", sans-serif;
        }

        .font-poppins {
          font-family: "Poppins", sans-serif;
        }

        /* Custom scrollbar styles */
        .scrollbar-thin {
          scrollbar-width: thin;
        }

        .scrollbar-thumb-rounded-full::-webkit-scrollbar-thumb {
          border-radius: 9999px;
        }

        .scrollbar-track-rounded-full::-webkit-scrollbar-track {
          border-radius: 9999px;
        }

        .scrollbar-thumb-\[#4BCA7B\]::-webkit-scrollbar-thumb {
          background-color: #4BCA7B;
        }

        .scrollbar-track-gray-50::-webkit-scrollbar-track {
          background-color: #f9fafb;
        }

        .scrollbar-track-gray-100::-webkit-scrollbar-track {
          background-color: #f3f4f6;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f3f4f6;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #4BCA7B;
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #3ba769;
        }
      `}</style>
    </>
  );
};

export default Navbar;