import ReactMarkdown from 'react-markdown';

type Props = {
  title: string;
  description: string;
};

const GenericPage = ({ title, description }: Props) => {
  return (
    <section>
      <div className='bg-blue-500 relative'>
        <div className='layout sectionPy'>
          <h1 className='text-white'>{title}</h1>
        </div>
        <div className='bg-white layout sectionPy '>
          <div className='markdown lg:max-w-5xl m-auto'>
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenericPage;
