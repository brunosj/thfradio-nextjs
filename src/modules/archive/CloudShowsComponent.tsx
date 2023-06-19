import React, { useState, useRef, useEffect, useContext } from 'react';
import Image from 'next/image';
import { CloudShowTypes, TagTypes, TagsList } from '@/types/ResponsesInterface';
import { format, parseISO } from 'date-fns';
import { Play } from '@/common/assets/PlayIcon';
import Button from '@/common/ui/UIButton';
import { useRouter } from 'next/router';
import useShowFilter from '@/hooks/useShowFilter';
import CloudShowCardList from './CloudShowsList';
import SidePanel from './SidePanel';
import { DataContext } from '@/context/DataContext';
import normalizeTagName from '@/utils/normalizeTagName';

interface ShowCardProps {
  items: CloudShowTypes[];
  onPlay: (url: string) => void;
  tagsList: TagsList;
}

const CloudShowsComponent = ({ items, onPlay, tagsList }: ShowCardProps) => {
  const router = useRouter();
  let locale = router.locale;
  const [displayCount, setDisplayCount] = useState(20);
  const [selectedTag, setSelectedTag] = useState<TagTypes | null>(null);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const topRef = useRef<HTMLDivElement | null>(null);
  const handleLoadMore = () => {
    setDisplayCount(displayCount + 20);
  };

  // Tagging system
  const getFilterButtonText = (locale: string) => {
    return locale === 'de' ? 'Nach Tag filtern' : 'Filter by tag';
  };

  const handleTagClick = (tag: TagTypes) => {
    setSelectedTag(tag === selectedTag ? null : tag);
    setDisplayCount(20);
  };

  const filteredItems = useShowFilter({
    items,
    selectedTag,
    displayCount,
  });

  const toggleSidePanel = () => {
    setShowSidePanel(!showSidePanel);
    setSelectedTag(null);
  };

  const sortedTags = tagsList.attributes.tag
    .map((tag) => ({
      name: tag.name,
      synonyms: tag.synonyms || [],
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const unnormalizedTags = tagsList.attributes.tag.map((tag) => tag.name);

  const scrollToTop = () => {
    if (topRef.current) {
      const elementPositionY = topRef.current.getBoundingClientRect().top;
      window.scrollTo({
        top: elementPositionY + window.scrollY - 160,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  useEffect(() => {
    if (selectedTag && pageLoaded) {
      scrollToTop();
    }
  }, [selectedTag, pageLoaded]);

  const isHomePage = router.pathname === '/';

  return (
    <div className='relative' ref={topRef}>
      {isHomePage && (
        <div className='hidden lg:flex justify-between mb-4 pb-12 -mt-8'>
          <div className=' m-auto'>
            <button
              className={`flex font-mono rounded-xl text-sm shadow-sm border-blue-800 px-4 py-2 text-white ${
                showSidePanel ? 'bg-orange-700 ' : 'bg-orange-500 '
              } duration-300 `}
              onClick={toggleSidePanel}
            >
              {getFilterButtonText(locale || 'en')}
            </button>
          </div>
        </div>
      )}

      <div className='flex items-start gap-6'>
        <div className={`w-${showSidePanel ? '4/5' : 'full'}`}>
          <CloudShowCardList items={filteredItems} onPlay={onPlay} />
        </div>
        {showSidePanel && (
          <SidePanel
            sortedTags={sortedTags}
            selectedTag={selectedTag}
            handleTagClick={handleTagClick}
          />
        )}
      </div>
      {(selectedTag && filteredItems.length > 20) ||
        (!selectedTag && displayCount < items.length && (
          <div className='pt-12 w-full flex justify-center'>
            <button
              className='flex font-mono rounded-xl text-sm shadow-sm border-blue-800 px-4 py-2 bg-white  duration-300 hover:bg-blue-100 '
              onClick={handleLoadMore}
            >
              Load More
            </button>
          </div>
        ))}
    </div>
  );
};

export default CloudShowsComponent;
