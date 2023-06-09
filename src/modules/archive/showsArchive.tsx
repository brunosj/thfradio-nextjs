import Image from 'next/image';
import { useState } from 'react';
import ShowCards from './showCards';
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
    <section className='bg-blue-900'>
      <div className='layout'>
        <div className='justify-between gap-12 lg:mt-20 lg:grid lg:grid-cols-3 xl:grid-cols-4'>
          <ShowCards items={shows} onPlay={handlePlay} />
        </div>
      </div>
    </section>
  );
};
export default ShowsArchive;
