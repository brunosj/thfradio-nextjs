import React from 'react';

interface SidePanelProps {
  sortedTags: string[];
  selectedTag: string | null;
  handleTagClick: (tag: string) => void;
}

const SidePanel = ({
  sortedTags,
  selectedTag,
  handleTagClick,
}: SidePanelProps) => {
  return (
    <div className='sticky top-32 w-1/5 rounded-xl bg-white'>
      <div className='bg-orange-500 py-2 rounded-t-xl text-white'>
        <h3 className='font-semibold mb-2 font-mono text-center'>Tags</h3>
      </div>
      <div className='py-4 max-h-screen overflow-auto'>
        <div className='flex flex-wrap space-x-2 px-4'>
          {sortedTags.map((tag, index) => (
            <button
              key={index}
              className={`border-blue-800 border text-sm font-mono rounded-xl px-2 py-1 mt-2 ${
                tag === selectedTag ? 'bg-orange-500 text-white' : ''
              }`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
