import { Props } from '@/types/PropsInterface';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { MenuType } from '@/types/uiInterface';
import Link from 'next/link';
const Footer = ({ children }: Props) => {
  const router = useRouter();

  const { t } = useTranslation();
  const menu: MenuType = t('menu', { returnObjects: true });
  const extraMenu: MenuType = t('extraMenu', { returnObjects: true });

  return (
    <footer className='bg-blue-500 py-6 md:py-12 layout'>
      <nav className='text-white flex justify-between'>
        <div>
          {menu.map((item, i) => {
            const isExternal = item.path.slice(0, 4) === 'http';

            return (
              <>
                <Link
                  href={item.path}
                  rel={isExternal ? 'noopener noreferrer' : ''}
                  target={isExternal ? '_blank' : ''}
                >
                  <p className='py-1 textHover'>{item.name}</p>
                </Link>
              </>
            );
          })}
        </div>
        <div>
          {extraMenu.map((item, i) => {
            const isExternal = item.path.slice(0, 4) === 'http';

            return (
              <>
                <Link
                  href={item.path}
                  rel={isExternal ? 'noopener noreferrer' : ''}
                  target={isExternal ? '_blank' : ''}
                >
                  <p className='py-1 textHover'>{item.name}</p>
                </Link>
              </>
            );
          })}
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
