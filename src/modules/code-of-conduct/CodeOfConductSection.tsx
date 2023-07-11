import TextCarousel from '../carousel/TextCarousel';
import { TextSlide } from '@/types/ResponsesInterface';

type Props = {
  textSlides: TextSlide[];
};

const CodeOfConductSection = ({ textSlides }: Props) => {
  return (
    <section className='sectionPy bg-orange-500'>
      <div className='text-white text-center'>
        <h1 className='text-blue-500 uppercase tracking-wider'>
          Code of Conduct
        </h1>
        <TextCarousel slides={textSlides} />
      </div>
    </section>
  );
};

export default CodeOfConductSection;
