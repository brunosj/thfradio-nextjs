import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button as ButtonProps } from '@/types/uiInterface';
import clsx from 'clsx';

const Button = ({
  children,
  path,
  color,
  className,
  ariaLabel,
  onClick,
}: ButtonProps & {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  const isExternal = path.slice(0, 4) === 'http';
  const isAnchor = path.startsWith('/#');
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    } else if (!isExternal && !isAnchor) {
      e.preventDefault();
      router.push(path);
    }
  };

  return (
    <button
      className={clsx(
        'flex font-mono rounded-xl text-sm shadow-sm border border-darkBlue px-4 py-2',
        className,
        {
          'bg-white duration-300 hover:bg-orange-500 hover:text-white':
            color === 'white-orange',
          'bg-white duration-300 hover:bg-blue-500 hover:text-white':
            color === 'white-blue',
          'bg-blue-500 text-white duration-300 hover:bg-white hover:text-blue-500':
            color === 'blue',
        }
      )}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {isExternal ? (
        <Link href={path} rel='noopener noreferrer' target='_blank'>
          {children}
        </Link>
      ) : isAnchor ? (
        children
      ) : (
        <Link href={path}>{children}</Link>
      )}
    </button>
  );
};
export default Button;
