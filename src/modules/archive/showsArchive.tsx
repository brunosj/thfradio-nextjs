import Image from 'next/image';
import ShowCards from './showCards';
import { CloudShows } from '@/types/ResponsesInterface';

const ShowsArchive = ({ shows }: CloudShows) => {
  return (
    <section className='bg-blue-900'>
      <div className='layout'>
        <div className='justify-between gap-12 lg:mt-20 lg:grid lg:grid-cols-3 xl:grid-cols-4'>
          <ShowCards items={shows} />
        </div>
      </div>
    </section>
  );
};
export default ShowsArchive;
