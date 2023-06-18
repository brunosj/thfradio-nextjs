import Image from 'next/image';
import { useState } from 'react';
import ShowCards from './CloudShowsCards';
import { CloudShows } from '@/types/ResponsesInterface';

const CloudShowsArchive = ({ shows }: CloudShows) => {
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
      <ShowCards items={shows} onPlay={handlePlay} />
    </>
  );
};
export default CloudShowsArchive;
