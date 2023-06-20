import CloudShowsComponent from './CloudShowsComponent';
import { CloudShowTypes, TagsList } from '@/types/ResponsesInterface';
import { processShows } from '@/utils/sortShows';

type CloudShowsArchiveProps = {
  shows: CloudShowTypes[];
  tagsList: TagsList;
};

const CloudShowsArchive = ({ shows, tagsList }: CloudShowsArchiveProps) => {
  const sortedShows = processShows(shows);

  const handlePlay = (url: string) => {
    document.dispatchEvent(
      new CustomEvent('mixcloud-show-change', {
        detail: { url },
      })
    );
  };

  return (
    <>
      <CloudShowsComponent items={sortedShows} tagsList={tagsList} />
    </>
  );
};
export default CloudShowsArchive;
