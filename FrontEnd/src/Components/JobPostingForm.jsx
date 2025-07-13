import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { X, Plus } from "lucide-react";
import jobService from "../Services/jobServices";

const JobPostingForm = ({ onClose, jobToEdit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      company: "",
      location: "",
      jobType: "",
      tags: "",
      country: "",
      posting_date: "",
    },
  });

  const isEditMode = !!jobToEdit;

  useEffect(() => {
    if (jobToEdit) {
      setValue("title", jobToEdit.title);
      setValue("company", jobToEdit.company);
      setValue("location", jobToEdit.location);
      setValue("country", jobToEdit.country);
      setValue("posting_date", jobToEdit.posting_date);
      setValue("jobType", jobToEdit.job_type);
      setValue("tags", jobToEdit.tags.join(", "));
    }
  }, [jobToEdit, setValue]);

  const jobTypes = [
    "Full Time",
    "Part Time",
    "Contract",
    "Freelance",
    "Internship",
    "Remote",
  ];

  const fetchJobs = async () => {
    try {
      const jobs = await jobService.getAllJobs();
      return jobs || [];
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return [];
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const jobs = await fetchJobs(); 

    const processedData = {
      title: data.title.trim(),
      company: data.company.trim(),
      location: data.location.trim(),
      country: data.country.trim(),
      posting_date: data.posting_date,
      job_type: data.jobType,
      tags: data.tags
        ? data.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    };

    if (!isEditMode) {
      const isDuplicate = jobs.some(
        (job) =>
          job.title.toLowerCase() === processedData.title.toLowerCase() &&
          job.company.toLowerCase() === processedData.company.toLowerCase() &&
          job.location === processedData.location &&
          job.country === processedData.country &&
          job.posting_date === processedData.posting_date
      );

      if (isDuplicate) {
        toast.error("Job cannot be posted. It is a duplicate job.", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#EF4444",
            color: "white",
            fontWeight: "600",
            padding: "16px",
            borderRadius: "12px",
          },
        });
        setIsSubmitting(false);
        return;
      }
    }

    if (isEditMode) processedData.id = jobToEdit.id;

    try {
      const response = isEditMode
        ? await jobService.editJob(processedData)
        : await jobService.postJob(processedData);

      if (response) {
        toast.success(
          `Job ${isEditMode ? "updated" : "posted"} successfully! 🎉`,
          {
            duration: 4000,
            position: "top-center",
            style: {
              background: "#10B981",
              color: "white",
              fontWeight: "600",
              padding: "16px",
              borderRadius: "12px",
            },
          }
        );
        reset();
        if (onClose) onClose();
      } else {
        throw new Error("No response from server");
      }
    } catch (error) {
      let errorMessage = "Failed to post job. Please try again.";
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
      }

      toast.error(errorMessage, {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#EF4444",
          color: "white",
          fontWeight: "600",
          padding: "16px",
          borderRadius: "12px",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
    if (onClose) onClose();
  };

  return (
    <div className="min-h-screen font-inter">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
          <div className="sticky top-0 bg-white border-b border-slate-200 p-4 sm:p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-4 sm:p-6">
              {/* Input Fields */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Title */}
                <div className="space-y-2">
                  <input
                    {...register("title", {
                      required: "Job title is required",
                    })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none text-sm placeholder-slate-400"
                    placeholder="Job title"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs">{errors.title.message}</p>
                  )}
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <input
                    {...register("company", {
                      required: "Company name is required",
                    })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none text-sm placeholder-slate-400"
                    placeholder="Company"
                  />
                  {errors.company && (
                    <p className="text-red-500 text-xs">{errors.company.message}</p>
                  )}
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <input
                    {...register("location", {
                      required: "Location is required",
                    })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none text-sm placeholder-slate-400"
                    placeholder="Location"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs">{errors.location.message}</p>
                  )}
                </div>
              </div>

              {/* Country & Date */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4">
                <div className="space-y-2">
                  <input
                    {...register("country", {
                      required: "Country is required",
                    })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none text-sm placeholder-slate-400"
                    placeholder="Country"
                  />
                  {errors.country && (
                    <p className="text-red-500 text-xs">{errors.country.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <input
                    type="date"
                    {...register("posting_date", {
                      required: "Posting date is required",
                    })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none text-sm"
                  />
                  {errors.posting_date && (
                    <p className="text-red-500 text-xs">
                      {errors.posting_date.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Job Type */}
              <div className="mt-4 space-y-2">
                <select
                  {...register("jobType", {
                    required: "Job type is required",
                  })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none text-sm"
                >
                  <option value="">Select job type</option>
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.jobType && (
                  <p className="text-red-500 text-xs">{errors.jobType.message}</p>
                )}
              </div>

              {/* Tags */}
              <div className="mt-4 space-y-2">
                <input
                  {...register("tags")}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none text-sm placeholder-slate-400"
                  placeholder="Tags (comma-separated)"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-[#4BCA7B] hover:from-green-600 hover:to-green-500 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {isEditMode ? "Updating..." : "Posting..."}
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      {isEditMode ? "Update Job" : "Post Job"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobPostingForm;
