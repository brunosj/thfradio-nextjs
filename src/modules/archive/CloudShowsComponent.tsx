import React, { useState, useRef, useEffect } from 'react';
import { CloudShowTypes, TagTypes, TagsList } from '@/types/ResponsesInterface';
import { useRouter } from 'next/router';
import useShowFilter from '@/hooks/useShowFilter';
import CloudShowsList from './CloudShowsList';
import CloudShowsFilter from './CloudShowsFilter';
import { useTranslation } from 'next-i18next';

interface ShowCardProps {
  items: CloudShowTypes[];
  tagsList: TagsList;
}

const CloudShowsComponent = ({ items, tagsList }: ShowCardProps) => {
  // i18n
  const router = useRouter();
  const { t } = useTranslation();
  let locale = router.locale;

  // State variables
  const [displayCount, setDisplayCount] = useState(20);
  const [selectedTag, setSelectedTag] = useState<TagTypes | null>(null);
  const [pageLoaded, setPageLoaded] = useState(false);

  const topRef = useRef<HTMLDivElement | null>(null);

  // Use hook
  const filteredItems = useShowFilter({
    items,
    selectedTag,
    displayCount,
  });

  // Genre tags
  const sortedTags = tagsList.attributes.tag
    .map((tag) => ({
      name: tag.name,
      synonyms: tag.synonyms || [],
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleTagClick = (tag: TagTypes) => {
    setSelectedTag((prevTag) =>
      prevTag && prevTag.name === tag.name ? null : tag
    );
    setDisplayCount(20);
  };

  // A-Z scrolling
  const scrollToTop = () => {
    if (topRef.current) {
      const elementPositionY = topRef.current.getBoundingClientRect().top;
      window.scrollTo({
        top: elementPositionY + window.scrollY - 100,
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

  // Load more
  const handleLoadMore = () => {
    setDisplayCount(displayCount + 20);
  };

  return (
    <div className='relative w-full' ref={topRef}>
      <div className='hidden lg:sticky top-[7rem] z-50 opacity-100 lg:flex  mb-4 pb-12 -mt-8'>
        <div className=' m-auto'></div>
        <CloudShowsFilter
          sortedTags={sortedTags}
          selectedTag={selectedTag}
          handleTagClick={handleTagClick}
        />
      </div>

      <div className='layout flex items-start gap-6'>
        <div className='full'>
          <CloudShowsList items={filteredItems} />
        </div>
      </div>
      {displayCount <= filteredItems.length ? (
        <div className='pt-12 w-full flex justify-center'>
          <button
            className='flex font-mono rounded-xl text-sm shadow-sm border-blue-800 px-4 py-2 bg-white  duration-300 hover:bg-blue-100 '
            onClick={handleLoadMore}
          >
            {t('loadMore')}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default CloudShowsComponent;
