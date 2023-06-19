import { TagTypes } from '@/types/ResponsesInterface';
import React from 'react';

interface CloudShowsFilterProps {
  sortedTags: TagTypes[];
  selectedTag: TagTypes | null;
  handleTagClick: (tag: TagTypes) => void;
}

const CloudShowsFilter = ({
  sortedTags,
  selectedTag,
  handleTagClick,
}: CloudShowsFilterProps) => {
  return (
    <div className='w-full bg-orange-500 '>
      <div className='py-3 layout'>
        <div className='flex flex-wrap justify-center space-x-6'>
          {sortedTags.map((tag) => (
            <button
              key={tag.name}
              className={`border-blue-800 border text-sm font-mono rounded-xl px-2  ${
                tag.name === selectedTag?.name
                  ? 'bg-blue-500 text-white'
                  : 'bg-white'
              }`}
              onClick={() => handleTagClick(tag)}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CloudShowsFilter;
