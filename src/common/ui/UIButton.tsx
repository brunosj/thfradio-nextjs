import Link from 'next/link';
import { Button } from '@/types/uiInterface';
import clsx from 'clsx';

const Button = ({ children, path, color, className }: Button) => {
  const isExternal = path.slice(0, 4) === 'http';

  return (
    <button
      className={clsx(
        'flex font-mono rounded-xl text-sm shadow-sm border border-blue-800 px-4 py-2',
        className,
        color === 'white'
          ? 'bg-white  duration-300 hover:bg-blue-100 '
          : 'bg-blue-500 text-white duration-300 hover:bg-white hover:text-blue-500'
      )}
    >
      <>
        {isExternal ? (
          <Link href={path} rel='noopener noreferrer' target='_blank'>
            {children}
          </Link>
        ) : (
          <Link href={path}>{children}</Link>
        )}
      </>
    </button>
  );
};
export default Button;
