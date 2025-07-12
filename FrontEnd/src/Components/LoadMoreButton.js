import React from 'react';

const LoadMoreButton = ({ hasJobs, onLoadMore }) => {
  if (!hasJobs) return null;

  return (
    <div className="text-center mt-8">
      <button 
        onClick={onLoadMore}
        className="px-6 py-3 bg-white border border-[#4BCA7B]/20 text-[#4BCA7B] rounded-lg font-medium hover:bg-[#4BCA7B]/10 transition-colors"
      >
        Load More Jobs
      </button>
    </div>
  );
};

export default LoadMoreButton;