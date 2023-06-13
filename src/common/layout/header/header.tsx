import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { MenuType } from '@/types/MenuInterface';
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
    <header className='bg-blue-500 text-white'>
      <div className='layout flex items-center justify-between py-2 md:py-1'>
        <Link className='w-24 md:w-36' href='/' aria-label='logo'>
          <Image src={logo} alt='THF Radio Logo' />
        </Link>
        <div className='my-3'>
          <nav className='hidden md:flex items-center space-x-12 '>
            {menu.map((item, i) => (
              <Link key={i} href={item.path} className='textHover'>
                {item.name}
              </Link>
            ))}
            <Link
              href={router.asPath}
              locale={router.locale === 'en' ? 'de' : 'en'}
              className=''
            >
              <button aria-label='change language' className='textHover'>
                EN / DE
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
