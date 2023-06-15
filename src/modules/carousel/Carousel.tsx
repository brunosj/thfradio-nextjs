import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { PrevButton, NextButton } from './CarouselNavigation';
import Image from 'next/image';

type PropType = {
  options?: EmblaOptionsType;
  slides: [
    {
      image: string;
      clientOrganisation: string;
      clientOrganisationLink: string;
      text: string;
      clientOrganisationLogo: {
        sourceUrl: string;
      };
    }
  ];
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

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  const groupTestimonials = (slides: any[]) => {
    const groupedSlides = [];
    let group = [];
    for (let i = 0; i < slides.length; i++) {
      group.push(slides[i]);
      if (group.length === 3) {
        groupedSlides.push(group);
        group = [];
      }
    }
    if (group.length > 0) {
      groupedSlides.push(group);
    }
    return groupedSlides;
  };

  const groupedSlides = groupTestimonials(slides);

  return (
    <>
      <div className='testimonial_embla relative'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='testimonial_embla__container '>
            {groupedSlides.map((group, i) => (
              <div
                className='lg:grid grid-cols-3 layout w-full dark lg:w-5/6 gap-12  '
                key={i}
              >
                {group.map((slide, j) => (
                  <div
                    className='mt-3 flex flex-col space-y-6 bg-ateneTaupe-100 rounded-md p-6'
                    key={j}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>
    </>
  );
};

export default EmblaCarousel;
