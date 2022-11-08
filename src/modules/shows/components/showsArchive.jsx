import Image from 'next/image';
import ShowCard from './showCard';

const ShowsArchive = ({ shows }) => {
  return (
    <div className=''>
      {shows.data.map((show, i) => (
        <ShowCard show={show} key={i} />
      ))}
    </div>
  );
};
export default ShowsArchive;
