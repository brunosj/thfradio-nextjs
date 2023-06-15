import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { MenuType } from '@/types/uiInterface';
import logo from '@/assets/logo_white.png';
import AudioPlayer from '@/modules/live-radio/AudioPlayer';
import { CalendarEntry, CloudShowTypes } from '@/types/ResponsesInterface';
import { DataContext } from '@/context/DataContext';
import { useContext } from 'react';
import { Bars3Icon } from '@/common/assets/Bars3Icon';
import { MouseEvent } from 'react';
import { XMarkIcon } from '@/common/assets/XMarkIcon';

interface HeaderProps {
  shows?: CloudShowTypes[];
  calendarEntries?: CalendarEntry[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const menu: MenuType = t('menu', { returnObjects: true });
  const { shows, calendarEntries } = useContext(DataContext)!;
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);
  return (
    <header className='relative top-0 pt-4 z-50 bg-blue-500 text-white pb-4 lg:pb-0'>
      <div className='layout flex items-center justify-between'>
        <Link className='w-24 lg:w-32 pb-2 lg:pb-4' href='/' aria-label='logo'>
          <Image src={logo} alt='THF Radio Logo' />
        </Link>
        <div className=''>
          {/* Desktop mMenu */}
          <nav className='hidden lg:flex items-center border-t  '>
            {menu.map((item, i) => {
              const isExternal = item.path.slice(0, 4) === 'http';
              return (
                <Link
                  key={i}
                  href={item.path}
                  rel={isExternal ? 'noopener noreferrer' : ''}
                  target={isExternal ? '_blank' : ''}
                  className={`  border-l hover:bg-white hover:text-neutral-900  ${
                    router.pathname === item.path
                      ? 'bg-white text-neutral-900'
                      : 'textHover'
                  }`}
                >
                  <p className='py-3 px-6'>{item.name}</p>
                </Link>
              );
            })}
            <Link
              href={router.asPath}
              locale={router.locale === 'en' ? 'de' : 'en'}
              className='textHover border-r border-l'
            >
              <button aria-label='change language'>
                <p className='py-3 px-6'>EN / DE</p>
              </button>
            </Link>
          </nav>
          {/* Mobile mMenu */}
          <nav className={'block lg:hidden '}>
            <div className='flex space-x-3'>
              <AudioPlayer
                shows={shows}
                calendarEntries={calendarEntries}
                iconFill='white'
                iconClassName='w-6 h-6'
              />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className='text-white'
                aria-label='Menu'
              >
                <Bars3Icon />
              </button>
            </div>

            {isOpen && (
              <div
                ref={menuRef}
                className='fixed top-0 right-0 h-full bg-blue-500 text-white w-4/5 overflow-auto z-50'
              >
                <div className='flex justify-end'>
                  <button
                    className='px-6 pt-5'
                    onClick={() => setIsOpen(false)}
                    aria-label='Close menu'
                  >
                    <XMarkIcon />
                  </button>
                </div>
                <div className='flex flex-col items-center justify-center -mt-5 h-full space-y-3'>
                  {menu.map((item, i) => {
                    const isExternal = item.path.slice(0, 4) === 'http';

                    return (
                      <Link
                        key={i}
                        href={item.path}
                        rel={isExternal ? 'noopener noreferrer' : ''}
                        target={isExternal ? '_blank' : ''}
                        className='block px-4 py-2 text-xl textHover '
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                  <Link
                    href={router.asPath}
                    locale={router.locale === 'en' ? 'de' : 'en'}
                    className='border-t border-white block px-4 py-6 text-xl textHover '
                    onClick={() => setIsOpen(false)}
                  >
                    EN / DE
                  </Link>
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
