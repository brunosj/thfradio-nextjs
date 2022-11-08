import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/logo_white.png';
import { navLinks } from './menu';

const Header = () => {
  return (
    <header className='bg-thfBlue text-white'>
      <div className='layout flex items-center justify-between'>
        <div className='w-36'>
          <Image src={logo} alt='THF Radio Logo' />
        </div>
        <div className='flex'>
          <nav className='flex'>
            {navLinks.map((item, key) => (
              <Link
                key={key}
                href={item.path}
                className='border-t-2 border-l-2 p-6'
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className='border-t-2 p-6'>
            <p>Live Radio</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
