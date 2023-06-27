import ReactMarkdown from 'react-markdown';

type SectionHeaderProps = {
  title: string;
  subtitle: string;
  text?: string;
};

const SectionHeader = ({ title, text, subtitle }: SectionHeaderProps) => {
  return (
    <div className='layout text-white text-center sectionPy max-w-4xl m-auto'>
      <h1 className='uppercase font-normal'>{title}</h1>
      <h4 className='font-mono font-light markdown'>
        {text ? <ReactMarkdown>{text}</ReactMarkdown> : subtitle}
      </h4>
    </div>
  );
};

export default SectionHeader;
