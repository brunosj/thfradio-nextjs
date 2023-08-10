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
import { Bars2Icon } from '@/common/assets/Bars2Icon';
import { Bars3Icon } from '@/common/assets/Bars3Icon';
import { XMarkIcon } from '@/common/assets/XMarkIcon';
import { handleAnchorLink } from '@/utils/handleAnchorLink';
import JoinChatMobile from '@/modules/chat/JoinChatMobile';

interface HeaderProps {
  cloudShows?: CloudShowTypes[];
  calendarEntries?: CalendarEntry[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const menu: MenuType = t('menu', { returnObjects: true });
  const { cloudShows, calendarEntries } = useContext(DataContext)!;

  // Anchor links smooth behaviour
  const handleAnchorLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    handleAnchorLink(e, href, router);
  };

  // Mobile menu events
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

  const [menuWidth, setMenuWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (menuRef.current) {
        setMenuWidth(menuRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menuWidth]);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLocaleChange = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    locale: string
  ) => {
    e.preventDefault();

    router.push(router.asPath, undefined, {
      locale: locale,
      scroll: false,
    });
  };

  return (
    <header className='sticky w-full z-50 top-0 pt-4  bg-blue-500 text-white pb-4 lg:pb-0 opacity-100 h-16'>
      <div className={`layout flex items-center justify-between `}>
        <Link className='w-24 lg:w-32 pb-2 lg:pb-4' href='/' aria-label='logo'>
          <Image src={logo} alt='THF Radio Logo' />
        </Link>
        <div className=''>
          {/* Desktop Menu */}
          <nav className='hidden lg:flex items-center border-t  '>
            {menu.map((item, i) => {
              const isExternal = item.path.slice(0, 4) === 'http';
              return (
                <Link
                  key={i}
                  href={item.path}
                  onClick={(e) => handleAnchorLinkClick(e, item.path)}
                  rel={isExternal ? 'noopener noreferrer' : ''}
                  target={isExternal ? '_blank' : ''}
                  className={`  border-l hover:bg-white hover:text-neutral-900 duration-300  ${
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
              onClick={(e) =>
                handleLocaleChange(e, router.locale === 'en' ? 'de' : 'en')
              }
              className='hover:bg-white hover:text-neutral-900 duration-300 border-r border-l'
            >
              <button aria-label='change language'>
                <p className='py-3 px-6'>
                  <span
                    className={
                      router.locale === 'en'
                        ? 'underline underline-offset-4'
                        : ''
                    }
                  >
                    EN
                  </span>{' '}
                  /{' '}
                  <span
                    className={
                      router.locale === 'de'
                        ? 'underline underline-offset-4'
                        : ''
                    }
                  >
                    DE
                  </span>
                </p>
              </button>
            </Link>
          </nav>
          {/* Mobile Menu */}
          <nav className={'block lg:hidden '}>
            <div className='flex space-x-3'>
              <AudioPlayer iconFill='white' iconClassName='w-6 h-6' />
              <button
                onClick={handleToggleMenu}
                className='text-white'
                aria-label='Menu'
              >
                {isOpen ? <XMarkIcon /> : <Bars3Icon />}{' '}
              </button>
            </div>
          </nav>
        </div>
      </div>
      <div
        ref={menuRef}
        className={`fixed top-12 right-0 h-full bg-blue-500 text-white w-4/5 overflow-auto  transform  duration-700 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : `translate-x-full`
        } transition-transform`}
      >
        <div className='flex flex-col items-center justify-center h-full space-y-3'>
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
          <JoinChatMobile />
          <Link
            href={router.asPath}
            onClick={(e) => {
              handleLocaleChange(e, router.locale === 'en' ? 'de' : 'en');
              setIsOpen(false);
            }}
            className='border-t border-white block  text-xl textHover '
          >
            <p className='px-4 py-6'>
              <span
                className={
                  router.locale === 'en' ? 'underline underline-offset-4' : ''
                }
              >
                EN
              </span>{' '}
              /{' '}
              <span
                className={
                  router.locale === 'de' ? 'underline underline-offset-4' : ''
                }
              >
                DE
              </span>
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
