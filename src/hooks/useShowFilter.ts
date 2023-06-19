import { useState, useEffect } from 'react';
import { CloudShowTypes } from '@/types/ResponsesInterface';

interface UseShowFilterProps {
  items: CloudShowTypes[];
  selectedTag: string | null;
  displayCount: number;
}

const useShowFilter = ({
  items,
  selectedTag,
  displayCount,
}: UseShowFilterProps) => {
  const [filteredItems, setFilteredItems] = useState<CloudShowTypes[]>([]);

  useEffect(() => {
    let filteredItems = items;

    if (selectedTag) {
      filteredItems = filteredItems.filter((item) =>
        item.tags.some((tag) => tag.name === selectedTag)
      );
    }

    setFilteredItems(filteredItems.slice(0, displayCount));
  }, [items, selectedTag, displayCount]);

  return filteredItems;
};

export default useShowFilter;
