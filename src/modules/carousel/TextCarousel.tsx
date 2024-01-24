import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import AutoHeight from 'embla-carousel-auto-height';
import { DotButton, DotButtonText } from './CarouselNavigation';
import Image from 'next/image';
import { TextSlide } from '@/types/ResponsesInterface';
import { CMS_URL } from '@/utils/constants';
import ReactMarkdown from 'react-markdown';

type PropType = {
  options?: CarouselProps;
  slides: TextSlide[];
};

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
};

const TextCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
    AutoHeight(),
  ]);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: CarouselApi) => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList());
    }
  }, []);

  const onSelect = useCallback((emblaApi: CarouselApi) => {
    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setPrevBtnEnabled(emblaApi.canScrollPrev());
      setNextBtnEnabled(emblaApi.canScrollNext());
    }
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <>
      <div className='embla'>
        <div className='embla__viewport' ref={emblaRef}>
          <div className='embla__container embla__adjustHeight'>
            {slides.map((slide, index) => (
              <div className='embla__slide' key={index}>
                <div className='layout  w-full lg:w-1/2 m-auto space-y-6 markdown pb-6'>
                  <h2 className='font-bold'>{slide.heading}</h2>

                  <ReactMarkdown>{slide.text}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='textEmbla__dots'>
          {scrollSnaps.length > 1 &&
            scrollSnaps.map((_, index) => (
              <DotButtonText
                key={index}
                selected={index === selectedIndex}
                onClick={() => scrollTo(index)}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default TextCarousel;
