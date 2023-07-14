import React, { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
} from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { DotButton } from './CarouselNavigation';
import Image from 'next/image';
import { Pictures } from '@/types/ResponsesInterface';
import { CMS_URL } from '@/utils/constants';

type PropType = {
  options?: EmblaOptionsType;
  slides: Pictures;
};

const ImageCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const autoplay = useRef(
    Autoplay(
      { delay: 3000, stopOnInteraction: false }
      // (emblaRoot) => emblaRoot.parentElement
    )
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay.current]);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      autoplay.current.reset();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      autoplay.current.reset();
    }
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
        autoplay.current.reset();
      }
    },
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
                  <div className='absolute lg:hidden top-0 left-0 w-full h-full bg-black bg-opacity-30 z-50'></div>
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

export default ImageCarousel;
