import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { CMS_URL } from '@/utils/constants';
import Button from '@/common/ui/UIButton';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import clsx from 'clsx';
import type { AboutSection } from '@/types/ResponsesInterface';

const AboutSection = ({ title, description, button, links }: AboutSection) => {
  const { t } = useTranslation();

  return (
    <section className='layout bg-darkBlue sectionPy space-y-12'>
      <h1 className='text-white'>{title}</h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-12 '>
        <div className='space-y-12'>
          <div className='text-white markdown'>
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
          {button && (
            <div className='flex space-x-6 pb-12'>
              {button.map((button, i) => (
                <Button
                  path={button.path}
                  key={i}
                  color={button.color}
                  ariaLabel={`Navigate to ${button.text}`}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          )}
        </div>

        <div>
          {links && (
            <div className='grid grid-cols-1 lg:grid-cols-2 w-full lg:w-2/3 m-auto space-y-12 lg:space-y-0'>
              {links.data.map((link, i) => (
                <div key={i} className='text-white markdown space-y-6'>
                  <h3 className=''>{link.attributes.title}</h3>
                  <ReactMarkdown>{link.attributes.links}</ReactMarkdown>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
