import React from 'react';

const LiveCircle: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    // stroke='currentColor'
  >
    <circle cx='12' cy='12' r='10' fill='#ff6314' />
  </svg>
);

export default LiveCircle;
