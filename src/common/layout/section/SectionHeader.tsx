import ReactMarkdown from 'react-markdown';

type SectionHeaderProps = {
  title: string;
  text: string;
};

const SectionHeader = ({ title, text }: SectionHeaderProps) => {
  return (
    <div className='layout text-white text-center sectionPy max-w-4xl m-auto'>
      <h1 className='uppercase font-normal'>{title}</h1>
      <h4 className='font-mono font-light markdown'>
        <ReactMarkdown>{text}</ReactMarkdown>
      </h4>
    </div>
  );
};

export default SectionHeader;
