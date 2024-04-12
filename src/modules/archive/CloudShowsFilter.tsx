import type { TagTypes } from '@/types/ResponsesInterface';
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
      <div className='flex flex-wrap justify-center gap-x-2  max-w-6xl m-auto py-3 layout gap-y-3 '>
        {sortedTags.map((tag) => (
          <button
            key={tag.name}
            className={`border-darkBlue border text-xs font-mono rounded-xl px-2 hover:bg-blue-500 hover:text-white duration-300  ${
              tag.name === selectedTag?.name
                ? 'bg-blue-500 text-white'
                : 'bg-white'
            }`}
            onClick={() => handleTagClick(tag)}
            aria-label={`Select genre ${tag.name}`}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CloudShowsFilter;
