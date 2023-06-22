import React, { useState, useRef, useEffect } from 'react';
import { CloudShowTypes, TagTypes, TagsList } from '@/types/ResponsesInterface';
import { useRouter } from 'next/router';
import useShowFilter from '@/hooks/useShowFilter';
import CloudShowsList from './CloudShowsList';
import CloudShowsFilter from './CloudShowsFilter';
import { useTranslation } from 'next-i18next';
import Pagination from '@/common/ui/Pagination';

interface ShowCardProps {
  items: CloudShowTypes[];
  tagsList: TagsList;
}

const ITEMS_PER_PAGE = 28;

const CloudShowsComponent = ({ items, tagsList }: ShowCardProps) => {
  // i18n
  const router = useRouter();
  const { t } = useTranslation();
  let locale = router.locale;

  // State variables
  const [selectedTag, setSelectedTag] = useState<TagTypes | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(items.length / ITEMS_PER_PAGE)
  );

  const topRef = useRef<HTMLDivElement | null>(null);

  // Use hook
  const allFilteredItems = useShowFilter({ items, selectedTag });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const itemsToDisplay = allFilteredItems.slice(startIndex, endIndex);

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
    setCurrentPage(1);
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
    if (selectedTag) {
      scrollToTop();
    }
  }, [selectedTag]);

  // Pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  useEffect(() => {
    if (selectedTag) {
      setTotalPages(Math.ceil(allFilteredItems.length / ITEMS_PER_PAGE));
    }
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [selectedTag, allFilteredItems, currentPage, totalPages]);

  return (
    <div className='relative w-full' ref={topRef}>
      <div className='block lg:sticky top-[7rem] z-50 opacity-100 lg:flex pb-12  '>
        <CloudShowsFilter
          sortedTags={sortedTags}
          selectedTag={selectedTag}
          handleTagClick={handleTagClick}
        />
      </div>
      <div className='layout'>
        <div className='flex items-start gap-6'>
          <CloudShowsList items={itemsToDisplay} />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          className='py-12'
        />
      </div>
    </div>
  );
};

export default CloudShowsComponent;
