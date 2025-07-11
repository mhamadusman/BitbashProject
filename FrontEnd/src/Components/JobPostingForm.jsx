import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { X, Plus } from 'lucide-react';

const JobPostingForm = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      company: '',
      location: '',
      jobType: '',
      tags: ''
    }
  });

  const jobTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Freelance',
    'Internship',
    'Remote'
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const processedData = {
        ...data,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []
      };
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Job posting data:', processedData); // Debug log
      
      toast.success('Job posted successfully! 🎉', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#10B981',
          color: 'white',
          fontWeight: '600',
          padding: '16px',
          borderRadius: '12px'
        }
      });
      
      reset();
      if (onClose) onClose();
    } catch (error) {
      console.error('Error in submission:', error); // Debug error
      toast.error('Failed to post job. Please try again.', {
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* First Row: Title, Company, Location */}
                <div className="space-y-2">
                  <input
                    {...register('title', { 
                      required: 'Job title is required',
                      minLength: { value: 2, message: 'Title must be at least 2 characters' }
                    })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-sm sm:text-base placeholder-slate-400"
                    placeholder="Job title"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <input
                    {...register('company', { 
                      required: 'Company name is required',
                      minLength: { value: 2, message: 'Company name must be at least 2 characters' }
                    })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-sm sm:text-base placeholder-slate-400"
                    placeholder="Company"
                  />
                  {errors.company && (
                    <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
                      {errors.company.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <input
                    {...register('location', { 
                      required: 'Location is required',
                      minLength: { value: 2, message: 'Location must be at least 2 characters' }
                    })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-sm sm:text-base placeholder-slate-400"
                    placeholder="Location"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6 mt-4">
                {/* Second Row: Job Type (full width on desktop) */}
                <div className="space-y-2">
                  <select
                    {...register('jobType', { required: 'Job type is required' })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-sm sm:text-base bg-white"
                  >
                    <option value="">Select job type</option>
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.jobType && (
                    <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
                      {errors.jobType.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6 mt-4 mb-4">
                {/* Third Row: Tags (full width on desktop and mobile) */}
                <div className="space-y-2">
                  <input
                    {...register('tags')}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-sm sm:text-base placeholder-slate-400"
                    placeholder="Tags (comma-separated)"
                  />
                
                  {errors.tags && (
                    <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
                      {errors.tags.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 sm:py-3 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-[#4BCA7B] hover:from-green-600 hover:to-green-500 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Posting...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Post Job
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