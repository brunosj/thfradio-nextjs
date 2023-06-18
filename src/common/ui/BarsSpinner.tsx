import React from 'react';

interface BarsSpinnerProps {
  color: string;
}

const BarsSpinner = ({ color }: BarsSpinnerProps) => (
  <div className='audio-spinner rotate-180 py-1'>
    <div className='bar' style={{ backgroundColor: color }}></div>
    <div className='bar' style={{ backgroundColor: color }}></div>
    <div className='bar' style={{ backgroundColor: color }}></div>
    <div className='bar' style={{ backgroundColor: color }}></div>
  </div>
);

export default BarsSpinner;
