import Image from 'next/image';
import ShowCard from './showCard';

const ShowsArchive = ({ shows }) => {
  return (
    <section className='bg-thfDarkBlue'>
      <div className='layout'>
        <div className='justify-between gap-12 lg:mt-20 lg:grid lg:grid-cols-3 xl:grid-cols-4'>
          {shows.data.map((show, i) => (
            <ShowCard show={show} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default ShowsArchive;
