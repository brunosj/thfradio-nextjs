import Link from 'next/link';
import Image from 'next/image';
import { navLinks } from './menu';

const Header = () => {
  return (
    <header className='bg-thfBlue'>
      <nav className='flex'>
        <div></div>
        {navLinks.map((item, key) => (
          <Link key={key} href={item.path}>
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
