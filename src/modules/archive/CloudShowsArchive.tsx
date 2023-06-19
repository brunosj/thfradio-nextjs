import Image from 'next/image';
import { useState } from 'react';
import CloudShowsComponent from './CloudShowsComponent';
import { CloudShowTypes, TagsList } from '@/types/ResponsesInterface';

type CloudShowsArchiveProps = {
  shows: CloudShowTypes[];
  tagsList: TagsList;
};

const CloudShowsArchive = ({ shows, tagsList }: CloudShowsArchiveProps) => {
  const [selectedShowUrl, setSelectedShowUrl] = useState<string | null>(null);
  const [isWidgetVisible, setWidgetVisible] = useState(false);
  const handlePlay = (url: string) => {
    document.dispatchEvent(
      new CustomEvent('mixcloud-show-change', {
        detail: { url },
      })
    );
  };
  return (
    <>
      <CloudShowsComponent
        items={shows}
        onPlay={handlePlay}
        tagsList={tagsList}
      />
    </>
  );
};
export default CloudShowsArchive;
