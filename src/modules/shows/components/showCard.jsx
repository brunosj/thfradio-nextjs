import Image from 'next/image';

const ShowCard = ({ show }) => {
  return (
    <div>
      <p>{show.name}</p>
      <div className='h-24 w-24'>
        <Image
          src={show.pictures.medium}
          height={600}
          width={600}
          layout='responsive'
        />
      </div>
    </div>
  );
};

export default ShowCard;
