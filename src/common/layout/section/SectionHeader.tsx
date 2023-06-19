type SectionHeaderProps = {
  title: string;
  subtitle: string;
};

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <div className='layout text-white text-center sectionPy max-w-4xl m-auto'>
      <h1 className='uppercase font-normal'>{title}</h1>
      <h4 className='font-mono font-light'>{subtitle}</h4>
    </div>
  );
};

export default SectionHeader;
