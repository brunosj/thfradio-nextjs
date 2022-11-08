import Image from 'next/image';

const ShowCard = ({ show }) => {
  return (
    <button className='flex flex-row border border-gray-600 bg-white font-mono duration-200 lg:flex-col'>
      <div className='group relative flex h-full justify-around p-4 duration-200'>
        <div className='w-48 group-hover:opacity-20'>
          <Image
            src={show.pictures.extra_large}
            height={600}
            width={600}
            layout='responsive'
          />
        </div>
        <div className='absolute inset-0 m-auto flex w-1/3 items-center justify-center opacity-0 duration-300 group-hover:opacity-100'>
          Play Icon
        </div>
      </div>

      <div className='my-6 flex h-full w-2/3 flex-grow  flex-col items-stretch justify-around lg:mt-8 lg:mb-6 lg:w-full'>
        <div className='mb-6 px-4 text-left text-base font-bold leading-tight tracking-tight text-black'>
          {show.name}
        </div>
        <div className='px-4 text-left font-light opacity-70 lg:px-8 lg:text-center'>
          date
        </div>
      </div>
    </button>
  );
};

export default ShowCard;
