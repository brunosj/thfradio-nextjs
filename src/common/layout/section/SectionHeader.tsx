import ReactMarkdown from 'react-markdown';
import { ReactNode } from 'react';

type SectionHeaderProps = {
  title: string;
  text: string;
};

const SectionHeader = ({ title, text }: SectionHeaderProps) => {
  const components = {
    a: ({ ...props }) => (
      <a {...props} target='_blank' rel='noopener noreferrer' />
    ),
  };

  return (
    <div className='layout text-white text-center sectionPy max-w-4xl m-auto'>
      <h1 className='uppercase font-normal'>{title}</h1>
      <h4 className='font-mono font-light markdown'>
        <ReactMarkdown components={components}>{text}</ReactMarkdown>
      </h4>
    </div>
  );
};

export default SectionHeader;
