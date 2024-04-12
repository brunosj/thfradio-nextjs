import CloudShowsComponent from './CloudShowsComponent';
import type { CloudShowTypes, TagsList } from '@/types/ResponsesInterface';
import { processShows } from '@/utils/showUtils';

type CloudShowsArchiveProps = {
  shows: CloudShowTypes[];
  tagsList: TagsList;
};

const CloudShowsArchive = ({ shows, tagsList }: CloudShowsArchiveProps) => {
  const sortedShows = processShows(shows);

  return (
    <>
      <CloudShowsComponent items={sortedShows} tagsList={tagsList} />
    </>
  );
};
export default CloudShowsArchive;
