import { NextRouter } from 'next/router';

export const handleAnchorLink = (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  href: string,
  router: NextRouter
) => {
  const isExternal = href.slice(0, 4) === 'http';
  if (!isExternal) {
    e.preventDefault();

    if (href.startsWith('/#') && router.pathname === '/') {
      const element = document.getElementById(href.slice(2));

      if (element) {
        const elementPositionY = element.getBoundingClientRect().top;
        window.scrollTo({
          top: elementPositionY + window.scrollY - 100,
          behavior: 'smooth',
        });
      }
    } else {
      router.push(href);
    }
  }
};
