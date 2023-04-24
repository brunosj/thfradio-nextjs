import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { MenuType } from '@/types/MenuInterface';
import logo from '@/assets/logo_white.png';

const Header = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const menu: MenuType = t('menu', { returnObjects: true });

  return (
    <header className='bg-blue-500 text-white'>
      <div className='layout flex items-center justify-between'>
        <Link className='w-36' href='/' aria-label='logo'>
          <Image src={logo} alt='THF Radio Logo' />
        </Link>
        <div className='flex'>
          <nav className='flex items-center'>
            {menu.map((item, i) => (
              <Link
                key={i}
                href={item.path}
                className='border-t-2 border-l-2 p-6'
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={router.asPath}
              locale={router.locale === 'en' ? 'de' : 'en'}
              className='border-t-2 border-l-2 border-r-2 p-6'
            >
              <button aria-label='change language'>EN / DE</button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
