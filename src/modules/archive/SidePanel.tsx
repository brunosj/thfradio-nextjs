import { TagTypes } from '@/types/ResponsesInterface';
import React from 'react';

interface SidePanelProps {
  sortedTags: TagTypes[];
  selectedTag: TagTypes | null;
  handleTagClick: (tag: TagTypes) => void;
}

const SidePanel = ({
  sortedTags,
  selectedTag,
  handleTagClick,
}: SidePanelProps) => {
  return (
    <div className='sticky top-32 w-1/5 rounded-xl bg-white'>
      <div className='bg-orange-500 py-2 rounded-t-xl text-white'>
        <h3 className='font-semibold my-1 font-mono text-center'>Tags</h3>
      </div>
      <div className='py-4 max-h-screen overflow-auto'>
        <div className='flex flex-wrap space-x-2   justify-evenly jupx-4'>
          {sortedTags.map((tag) => (
            <button
              key={tag.name}
              className={`border-darkBlue border text-sm font-mono rounded-xl px-2 py-1 mt-2 ${
                tag.name === selectedTag?.name ? 'bg-orange-500 text-white' : ''
              }`}
              onClick={() => handleTagClick(tag)}
              aria-label={`Navigate to ${tag.name}`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
