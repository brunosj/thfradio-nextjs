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

interface HeaderProps {
  shows: CloudShowTypes[];
  calendarEntries: CalendarEntry[];
}

const Header = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const menu: MenuType = t('menu', { returnObjects: true });
  const { shows, calendarEntries } = useContext(DataContext)!;

  return (
    <header className='sticky md:relative top-0 pt-2 z-50 bg-blue-500 text-white'>
      <div className='layout flex items-center justify-between'>
        <Link className='w-24 md:w-32 pb-2' href='/' aria-label='logo'>
          <Image src={logo} alt='THF Radio Logo' />
        </Link>
        <div className=''>
          <nav className='hidden md:flex items-center border-t  '>
            {menu.map((item, i) => (
              <Link
                key={i}
                href={item.path}
                className={`textHover  border-l   ${
                  router.pathname === item.path
                    ? 'bg-white text-neutral-900'
                    : 'textHover'
                }`}
              >
                <p className='py-3 px-6'>{item.name}</p>
              </Link>
            ))}
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
          <div className='block md:hidden'>
            <AudioPlayer
              shows={shows}
              calendarEntries={calendarEntries}
              iconFill='white'
              iconClassName='w-6 h-6'
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
