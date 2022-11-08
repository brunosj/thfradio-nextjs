import Marquee from 'react-fast-marquee';
import React from 'react';

export const LiveTicker = () => {
  // const { nowPlaying, nextPlaying } = useAllShows();

  // const message = nowPlaying
  //   ? `
  //     LIVE FROM AIRPORT BERLIN <b><i>NOW:&nbsp;&nbsp;&nbsp;&nbsp;</i></b>
  //     <i>${nowPlaying.summary}
  //     ${moment(nowPlaying.start).format('HH:mm')}-${moment(
  //       nowPlaying.end
  //     ).format('HH:mm')}
  //     &nbsp;&nbsp;&nbsp;&nbsp;
  //     <b>next show:</b>
  //     ${nextPlaying.summary}
  //     ${moment(nextPlaying.start).format('HH:mm')}-${moment(
  //       nextPlaying.end
  //     ).format('HH:mm')}
  //     </i>
  //   `
  //   : `
  //     <b>NOW PLAYING THF RADIO ARCHIVE</b> – <b>next show</b>
  //     on
  //     ${moment(nextPlaying.start).format('dddd, HH:mm')}
  //     <i>${nextPlaying.summary}</i>
  //     –
  //   `;

  return (
    <div className=''>
      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover={true}
        className='bg-white text-black'
      >
        <span>Live Radio</span>
      </Marquee>
    </div>
  );
};

export default LiveTicker;
