import Image from 'next/image';
import { useState } from 'react';
import ShowCards from './ShowCards';
import { CloudShows } from '@/types/ResponsesInterface';

const ShowsArchive = ({ shows }: CloudShows) => {
  const [selectedShowUrl, setSelectedShowUrl] = useState<string | null>(null);
  const [isWidgetVisible, setWidgetVisible] = useState(false);
  const handlePlay = (url: string) => {
    // Dispatch a custom event to notify the MixcloudWidget component of the show change
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
export default ShowsArchive;
