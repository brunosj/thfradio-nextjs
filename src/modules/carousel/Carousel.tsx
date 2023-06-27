import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
} from 'embla-carousel-react';
import { DotButton } from './CarouselNavigation';
import Image from 'next/image';
import { Pictures } from '@/types/ResponsesInterface';
import { CMS_URL } from '@/utils/constants';

type PropType = {
  options?: EmblaOptionsType;
  slides: Pictures;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
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

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  const imageByIndex = (pictures: Pictures, index: number): string => {
    if (pictures.data.length === 0) {
      return ''; // or throw an error, depending on your needs
    }
    return `${CMS_URL}${
      pictures.data[index % pictures.data.length].attributes.url
    }`;
  };


  return (
    <>
      <div className='embla'>
        <div className='embla__viewport' ref={emblaRef}>
          <div className='embla__container'>
            {slides.data.map((slide, index) => (
              <div className='embla__slide' key={index}>
                <div className='relative h-[30rem] w-full'>
                  <Image
                    className='object-cover lg:rounded-lg'
                    src={imageByIndex(slides, index)}
                    alt='Your alt text'
                    fill
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='embla__dots'>
          {scrollSnaps.length > 1 &&
            scrollSnaps.map((_, index) => (
              <DotButton
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

export default EmblaCarousel;
