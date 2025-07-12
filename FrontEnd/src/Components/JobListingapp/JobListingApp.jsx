import React, { useState, useMemo, useEffect } from "react";
import FilterSidebar from "../FilterSideBar/FilterSidebar";
import Navbar from "../Navbar/Navbar";
import JobHeader from "../JobHeader";
import ActiveFilters from "../ActiveFilters";
import JobList from "../JobList";
import jobService from "../../Services/jobServices";

const JobListingApp = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    searchQuery: "",
    jobTypes: [],
    location: "",
    country: "",
    salaryRange: "",
    experienceLevel: "",
    tags: [],
    companySize: "",
  });
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await jobService.getAllJobs();
        if (jobs.length > 0) {
          console.log("jobs fetched in app");
          console.log(jobs.length);
          setData(jobs);
        } else {
          console.log("not fetched in app");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      jobTypes: [],
      location: "",
      country: "",
      salaryRange: "",
      experienceLevel: "",
      tags: [],
      companySize: "",
    });
    setSortBy("newest");
  };

  const filteredAndSortedJobs = useMemo(() => {
    let filtered = data.filter((job) => {
      const matchesSearch =
        filters.searchQuery === "" ||
        job.company.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        job.title.toLowerCase().includes(filters.searchQuery.toLowerCase());

      const matchesJobType =
        filters.jobTypes.length === 0 ||
        filters.jobTypes.includes(job.job_type || job.jobType);

      const matchesLocation =
        !filters.location || job.location === filters.location;

      const matchesCountry =
        !filters.country || job.country === filters.country;

      const matchesTags =
        filters.tags.length === 0 ||
        filters.tags.some(
          (tag) => job.tags && job.tags.some((jobTag) => jobTag.trim() === tag)
        );

      return (
        matchesSearch &&
        matchesJobType &&
        matchesLocation &&
        matchesCountry &&
        matchesTags
      );
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return (
            new Date(a.posting_date || a.postedDate) -
            new Date(b.posting_date || b.postedDate)
          );
        case "company":
          return a.company.localeCompare(b.company);
        case "title":
          return a.title.localeCompare(b.title);
        case "newest":
        default:
          return (
            new Date(b.posting_date || b.postedDate) -
            new Date(a.posting_date || a.postedDate)
          );
      }
    });

    return filtered;
  }, [data, filters, sortBy]);

  return (
    <div className="min-h-screen">
      {/* ✅ Custom Scrollbar for lg only */}
      <style>
        {`
          @media (min-width: 1024px) {
            .jobs-scroll-container::-webkit-scrollbar {
              width: 6px;
            }

            .jobs-scroll-container::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 10px;
            }

            .jobs-scroll-container::-webkit-scrollbar-thumb {
              background: #22c55e;
              border-radius: 10px;
            }

            .jobs-scroll-container::-webkit-scrollbar-thumb:hover {
              background: #16a34a;
            }

            .jobs-scroll-container {
              scrollbar-width: thin;
              scrollbar-color: #22c55e #f1f1f1;
            }
          }
        `}
      </style>

      <Navbar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar only on large screens */}
          <div className="hidden lg:block lg:w-80">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              jobsData={data}
            />
          </div>

          {/* Job Listings */}
          <div className="lg:w-3/4">
            <JobHeader jobCount={filteredAndSortedJobs.length} />

            <ActiveFilters filters={filters} onClearFilters={clearFilters} />

            {/* ✅ Green scrollbar only on lg screens */}
            <div className="max-h-[119vh] overflow-y-auto scrollbar-none lg:scrollbar-thin lg:scrollbar-thumb-[#4BCA7B] lg:scrollbar-track-gray-100">
              <JobList jobs={filteredAndSortedJobs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListingApp;
