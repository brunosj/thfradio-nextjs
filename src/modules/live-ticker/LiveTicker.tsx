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

export const LiveTicker = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const locale = router.locale || 'en';
  const localeModule = locale === 'de' ? de : enUS;
  const { calendarEntries, shows } = useContext(DataContext)!;

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

    if (currentShow) {
      const formattedStartHour = format(new Date(currentShow.start), 'HH:mm', {
        locale: localeModule,
      });
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
        <div className='italic text-sm space-x-3 flex items-center'>
          <LiveCircle className='w-6 h-6 animate-pulse' />
          <span className=''>{currentShow.summary}</span>
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
          'EEEE dd.MM.yyyy'
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
          <p className='text-sm italic'>
            <span className='uppercase'>
              {t('nowPlaying')}
              {' // '}
            </span>
            <span className=''>
              {t('nextShow')} {t('on')}{' '}
            </span>
            {formattedNextShowDate}
          </p>
        );
      } else {
        return (
          <p>NOW PLAYING THF RADIO ARCHIVE // next show time not available</p>
        );
      }
    }
  };
  const currentShowName = getCurrentShowName();

  return (
    <div className='layout py-0 border-blue-800 border font-mono flex items-center bg-white shadow-lg opacity-95 space-x-3 justify-between flex-col md:flex-row'>
      <div className='w-full md:w-1/6 py-2 md:py-0 space-x-2 text-xs md:text-sm '>
        <span className='uppercase font-light'>Live from Airport Berlin</span>
      </div>
      <div className='w-5/6 md:w-4/6'>
        <Marquee
          gradient={true}
          gradientWidth={25}
          speed={50}
          pauseOnHover={true}
          className='bg-white text-black'
        >
          {currentShowName ? (
            <div className=''>{currentShowName}</div>
          ) : (
            <span>Live Radio</span>
          )}
        </Marquee>
      </div>
      <div className='hidden md:block ml-auto'>
        <AudioPlayer
          shows={shows}
          calendarEntries={calendarEntries}
          iconClassName='w-6 h-6 md:w-12 md:h-12'
          iconFill='#1200ff'
        />
      </div>
    </div>
  );
};

export default LiveTicker;
