import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useContext } from 'react';
import Marquee from 'react-fast-marquee';
import { format, isWithinInterval, parseISO } from 'date-fns';
import { enUS, de } from 'date-fns/locale';
import { DataContext } from '@/context/DataContext';
import { ArrowRightLong } from '@/common/assets/ArrowRightLong';
import AudioPlayer from '@/modules/live-radio/AudioPlayer';
import LiveCircle from '@/common/assets/LiveCircle';
import { PlayerContext } from '@/context/PlayerContext';

export const LiveTicker = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const locale = router.locale || 'en';
  const localeModule = locale === 'de' ? de : enUS;
  const { calendarEntries, shows } = useContext(DataContext)!;
  const { playerState } = useContext(PlayerContext);

  const getCurrentShowName = (): JSX.Element => {
    const now = new Date();
    const currentShow = calendarEntries.find((entry) => {
      const showStart = new Date(entry.start);
      const showEnd = new Date(entry.end);
      return isWithinInterval(now, { start: showStart, end: showEnd });
    });

    const nextShow = calendarEntries.find((entry) => {
      const showStart = parseISO(entry.start);
      return showStart > now;
    });

    if (!currentShow && !nextShow) {
      return <span>...</span>;
    } else {
      if (currentShow) {
        const formattedStartHour = format(
          new Date(currentShow.start),
          'HH:mm',
          {
            locale: localeModule,
          }
        );
        const formattedEndHour = format(new Date(currentShow.end), 'HH:mm', {
          locale: localeModule,
        });
        const nextShowStart = nextShow
          ? format(parseISO(nextShow.start), 'EEEE, MMMM dd, yyyy', {
              locale: localeModule,
            })
          : '';
        const nextShowStartTime = nextShow
          ? format(parseISO(nextShow.start), 'HH:mm', {
              locale: localeModule,
            })
          : '';
        const nextShowEndTime = nextShow
          ? format(parseISO(nextShow.end), 'HH:mm', {
              locale: localeModule,
            })
          : '';
        return (
          <div className='italic text-sm space-x-3 flex items-center font-bold'>
            <LiveCircle className='w-6 h-6 animate-pulse' />
            <span className=''>
              {t('nowPlaying')}: {currentShow.summary}
            </span>
            <span className=''>
              {formattedStartHour}-{formattedEndHour}
            </span>
            {nextShow &&
              format(parseISO(nextShow.start), 'yyyy-MM-dd') ===
                format(new Date(currentShow.start), 'yyyy-MM-dd') && (
                <>
                  <span className='px-12'>
                    <ArrowRightLong />
                  </span>
                  <span>{t('nextShow')}:</span>
                  <span>{nextShow.summary}</span>
                  <span className=''>
                    {nextShowStartTime}-{nextShowEndTime}
                  </span>
                  <span className='px-12'>
                    <ArrowRightLong />
                  </span>
                </>
              )}
          </div>
        );
      } else {
        const nextShow = calendarEntries.find((entry) => {
          const showStart = new Date(entry.start);
          return showStart > now;
        });

        if (nextShow) {
          const formattedNextShowDate = format(
            parseISO(nextShow.start),
            'EEEE dd.MM.yyyy',
            { locale: localeModule }
          );
          const formattedNextShowStartTime = format(
            new Date(nextShow.start),
            'HH:mm'
          );
          const formattedNextShowEndTime = format(
            new Date(nextShow.end),
            'HH:mm'
          );
          return (
            <span className='text-sm italic px-6'>
              <span className='uppercase'>
                {t('archivePlaying')}
                {' // '}
              </span>
              <span className=''>
                {t('nextShow')} {t('on')}{' '}
              </span>
              {formattedNextShowDate}
            </span>
          );
        } else {
          return (
            <span className='text-xs lg:text-sm italic font-light'>
              NOW PLAYING THF RADIO ARCHIVE // Next show time not available
            </span>
          );
        }
      }
    }
  };
  const currentShowName = getCurrentShowName();

  return (
    <div className='lg:sticky top-0 z-50'>
      <div className='layout lg:h-12 border-blue-800 border-b font-mono flex items-center bg-white shadow-lg opacity-95 space-x-3 justify-between flex-col lg:flex-row'>
        <div className='hidden lg:block w-full lg:w-1/6 py-2 lg:py-0 space-x-2 text-xs lg:text-sm '>
          <span className='uppercase font-light'>Live from Airport Berlin</span>
        </div>
        <div className='w-full lg:w-4/6 py-3 mt-1 lg:mt-0'>
          <Marquee
            gradient={false}
            gradientWidth={25}
            speed={50}
            pauseOnHover={true}
            className='bg-white'
          >
            <div className=''>{currentShowName}</div>
          </Marquee>
        </div>
        <div className='hidden lg:block ml-auto'>
          {' '}
          <AudioPlayer
            iconClassName='w-6 h-6 lg:w-12 lg:h-12'
            iconFill='#1200ff'
          />
        </div>
      </div>
    </div>
  );
};

export default LiveTicker;