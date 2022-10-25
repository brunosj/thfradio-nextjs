import Image from 'next/image';
import ShowCard from './showCard';

export default function ShowsArchive({ shows }) {
  console.log(shows);
  return (
    <main className=''>
      {shows.data.map((show, i) => (
        <div>
          <ShowCard show={show} key={i} />
          {/* <div>
            {show.name}
            <div className='h-24 w-24'>
              <Image
                src={show.pictures.extra_large}
                height={600}
                width={600}
                layout='responsive'
              />
            </div>
          </div> */}
        </div>
      ))}
    </main>
  );
}
