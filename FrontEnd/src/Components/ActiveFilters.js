import React from 'react';

const ActiveFilters = ({ filters, onClearFilters }) => {
  const hasActiveFilters = filters.searchQuery || filters.jobTypes.length > 0 || filters.location || filters.tags.length > 0;

  if (!hasActiveFilters) return null;

  return (
    <div className="mb-6 p-4 bg-white rounded-lg border border-[#4BCA7B]/20">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Active Filters:</span>
        <button 
          onClick={onClearFilters}
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
  );
};

export default ActiveFilters;