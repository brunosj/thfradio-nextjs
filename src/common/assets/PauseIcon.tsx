interface PauseProps {
  className: string;
  fill: string;
}

export function Pause({ className, fill }: PauseProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      id='pause'
      viewBox='0 0 24 24'
      strokeWidth={3}
      stroke={fill}
      className={className}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15.75 5.25v13.5m-7.5-13.5v13.5'
      />
    </svg>
  );
}
