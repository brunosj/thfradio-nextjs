export function Wave() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      className='inline-block w-6 lg:w-[2rem] h-3'
    >
      <defs>
        <g>
          <rect id='square' x='0' y='0' width='9999' height='10' />
        </g>

        <pattern
          id='wave'
          x='0'
          y='0'
          width='10'
          height='10'
          patternUnits='userSpaceOnUse'
        >
          <path
            d='M 0 7.5 Q 2.5 7.5 2.5 5 Q 2.5 2.5 5 2.5 Q 7.5 2.5 7.5 5 Q 7.5 7.5 10 7.5'
            stroke='currentColor'
            fill='transparent'
            strokeWidth='1'
            strokeLinecap='square'
            strokeLinejoin='miter'
          />
        </pattern>
      </defs>

      <use xlinkHref='#square' transform='translate(0, 0)' fill='url(#wave)' />
    </svg>
  );
}
