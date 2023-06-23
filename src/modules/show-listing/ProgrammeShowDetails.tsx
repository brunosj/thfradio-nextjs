import React from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';
import { CiMail } from 'react-icons/ci';
import { SlSocialSoundcloud } from 'react-icons/sl';
import Link from 'next/link';

interface ShowDetailsProps {
  currentContent: {
    attributes: {
      title: string;
      frequency?: string;
      day?: string;
      startTime?: string;
      endTime?: string;
      instagram?: string;
      mail?: string;
      soundcloud?: string;
    };
  };
}

const ShowDetails: React.FC<ShowDetailsProps> = ({ currentContent }) => {
  const getGermanDay = (day: string): string => {
    switch (day) {
      case 'monday':
        return 'Montag';
      case 'tuesday':
        return 'Dienstag';
      case 'wednesday':
        return 'Mittwoch';
      case 'thursday':
        return 'Donnerstag';
      case 'friday':
        return 'Freitag';
      case 'saturday':
        return 'Samstag';
      case 'sunday':
        return 'Sonntag';
      default:
        return day;
    }
  };

  const getGermanFrequency = (frequency: string): string => {
    switch (frequency) {
      case 'bi-weekly':
        return 'Zweiwöchentlich';
      case 'weekly':
        return 'Wöchentlich';
      case 'monthly':
        return 'Monatlich';
      case 'bi-monthly':
        return 'Zweimonatlich';
      case 'occasionally':
        return 'Gelegentlich';
      default:
        return frequency;
    }
  };

  const formatTime = (time: string): string => {
    return time ? time.slice(0, 5) : '';
  };

  return (
    <div className='bg-orange-500 rounded-xl text-white h-32 lg:h-56 flex items-center absolute -bottom-12 py-3'>
      <div className='layout'>
        <span className='text-3xl font-bold lg:text-4xl'>
          {currentContent.attributes.title}
        </span>
        <div className=' text-white z-0' id='showDetails'>
          {currentContent.attributes.frequency &&
            currentContent.attributes.day &&
            currentContent.attributes.startTime &&
            currentContent.attributes.endTime && (
              <div className='mt-6'>
                <p>
                  {getGermanFrequency(currentContent.attributes.frequency)},{' '}
                  {getGermanDay(currentContent.attributes.day)}{' '}
                  {formatTime(currentContent.attributes.startTime)} -{' '}
                  {formatTime(currentContent.attributes.endTime)}
                </p>
                <div className='flex space-x-3 mt-1'>
                  {currentContent.attributes.instagram && (
                    <Link
                      href={currentContent.attributes.instagram}
                      target='_blank'
                    >
                      <AiOutlineInstagram className='w-6 h-6 textHover' />
                    </Link>
                  )}
                  {currentContent.attributes.mail && (
                    <Link
                      href={`mailto:${currentContent.attributes.mail}`}
                      target='_blank'
                    >
                      <CiMail className='w-6 h-6 textHover' />
                    </Link>
                  )}
                  {currentContent.attributes.soundcloud && (
                    <Link
                      href={currentContent.attributes.soundcloud}
                      target='_blank'
                    >
                      <SlSocialSoundcloud className='w-6 h-6 textHover' />
                    </Link>
                  )}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
