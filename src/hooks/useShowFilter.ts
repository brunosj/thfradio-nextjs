import { useState, useEffect } from 'react';
import {
  CloudShowTag,
  CloudShowTypes,
  TagTypes,
} from '@/types/ResponsesInterface';
import normalizeTagName from '@/utils/normalizeTagName';

interface UseShowFilterProps {
  items: CloudShowTypes[];
  selectedTag: TagTypes | null;
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
      const normalizedTag = normalizeTagName(selectedTag.name);
      filteredItems = items.filter((item) => {
        // Check if the show has tags and if it does, filter based on tags
        if (item.tags && item.tags.length > 0) {
          const matchingTags = item.tags.filter((tag) =>
            tagMatches(tag, selectedTag)
          );
          return matchingTags.length > 0;
        }
        return false; // If the show doesn't have tags, ignore it
      });
    }

    setFilteredItems(filteredItems.slice(0, displayCount));
  }, [items, selectedTag, displayCount]);

  // Check if a tag or its synonyms match the given value
  const tagMatches = (tag: CloudShowTag, selectedTag: TagTypes) => {
    const tagName = normalizeTagName(tag.name).toLowerCase().trim();
    const selectedTagName = normalizeTagName(selectedTag.name);
    if (!tagName) {
      return false;
    }
    const regex = new RegExp(tagName, 'i');

    if (regex.test(selectedTagName)) {
      return true;
    }

    if (selectedTag.synonyms && selectedTag.synonyms.length > 0) {
      const synonymMatches = selectedTag.synonyms.some((synonym) => {
        const normalizedSynonym = normalizeTagName(synonym.name); // Normalize the synonym name
        return regex.test(normalizedSynonym);
      });
      if (synonymMatches) {
        return true;
      }
    }

    return false;
  };
  return filteredItems;
};

export default useShowFilter;
