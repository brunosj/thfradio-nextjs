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
  const followMenu: MenuType = t('followMenu', { returnObjects: true });
  const contactMenu: MenuType = t('contactMenu', { returnObjects: true });

  return (
    <footer className='bg-blue-500 py-6 lg:py-12 layout'>
      <nav className='text-white grid grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-24 '>
        <div className='col-span-2 space-y-6'>
          <h4 className='font-mono'>THF RADIO</h4>
          <p className='text-sm lg:text-base'>{t('footerDescription')}</p>
        </div>
        <div>
          <h4 className='uppercase text-orange-500 pb-6'>{t('menuTitle')}</h4>
          {menu.map((item, i) => {
            const isExternal = item.path.slice(0, 4) === 'http';

            return (
              <Link
                href={item.path}
                rel={isExternal ? 'noopener noreferrer' : ''}
                target={isExternal ? '_blank' : ''}
                key={i}
              >
                <p className='py-1 textHover text-sm lg:text-base'>
                  {item.name}
                </p>
              </Link>
            );
          })}
        </div>
        <div>
          <h4 className='uppercase text-orange-500 pb-6'>Follow</h4>
          {followMenu.map((item, i) => {
            const isExternal = item.path.slice(0, 4) === 'http';

            return (
              <Link
                href={item.path}
                rel={isExternal ? 'noopener noreferrer' : ''}
                target={isExternal ? '_blank' : ''}
                key={i}
              >
                <p className='py-1 textHover text-sm lg:text-base'>
                  {item.name}
                </p>
              </Link>
            );
          })}
        </div>
        <div>
          <h4 className='uppercase text-orange-500 pb-6'>
            {t('contactTitle')}
          </h4>
          {contactMenu.map((item, i) => {
            const isExternal = item.path.slice(0, 4) === 'http';

            return (
              <Link
                href={item.path}
                rel={isExternal ? 'noopener noreferrer' : ''}
                target={isExternal ? '_blank' : ''}
                key={i}
              >
                <p className='py-1 textHover text-sm lg:text-base'>
                  {item.name}
                </p>
              </Link>
            );
          })}
        </div>
        <div>
          <h4 className='uppercase text-orange-500 pb-6'>Legal</h4>
          {extraMenu.map((item, i) => {
            const isExternal = item.path.slice(0, 4) === 'http';

            return (
              <Link
                href={item.path}
                rel={isExternal ? 'noopener noreferrer' : ''}
                target={isExternal ? '_blank' : ''}
                key={i}
              >
                <p className='py-1 textHover text-sm lg:text-base'>
                  {item.name}
                </p>
              </Link>
            );
          })}
        </div>
      </nav>
      {/* <div className='ml-auto text-right text-white text-sm'>
        <p>
          Built by{' '}
          <Link
            href='https://www.landozone.net/'
            target='_blank'
            className='textHover text-neutral-300 hover:text-neutral-500'
          >
            landozone
          </Link>
        </p>
        <p>
          Check out the code on{' '}
          <Link
            href='https://github.com/brunosj/thfradio-nextjs/'
            target='_blank'
            className='textHover text-neutral-300 hover:text-neutral-500'
          >
            Github
          </Link>
        </p>
      </div> */}
    </footer>
  );
};

export default Footer;
