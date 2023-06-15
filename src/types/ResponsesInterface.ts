export interface PageTypes {
  attributes: {
    title: string;
    slug: string;
    description: string;
  };
  id: number;
}

export interface CalendarEntry {
  start: string;
  end: string;
  summary: string;
}

export interface CloudShowTypes {
  name: string;
  url: string;
  pictures: {
    extra_large: string;
  };
  slug: string;
}

export interface CloudShows {
  shows: CloudShowTypes[];
}

export interface ShowTypes {
  attributes: {
    title: string;
    description: string;
    slug: string;
    teaserSentence: string;
    activeShow: boolean;
    locale: string;
    url: string;
    picture: {
      data: {
        id: number;
        attributes: {
          name: string;
          url: string;
        };
      };
    };
  };
  id: number;
}

export interface Shows {
  shows: ShowTypes[];
}

export interface HomepageSection {
  title: string;
  subtitle: string;
  showListings?: ShowTypes[];
  calendarEntries?: CalendarEntry[];
  shows?: CloudShowTypes[];
}

export interface AboutSection {
  title: string;
  description: string;
  button: Array<{
    id: number;
    text: string;
    path: string;
    color: 'white' | 'blue';
  }>;
  links: {
    data: Array<{
      id: number;
      attributes: {
        title: string;
        links: string;
      };
    }>;
  };
}

export interface PictureType {
  attributes: {
    url: string;
  };
}

export interface HomepageTypes {
  attributes: {
    heroText: string;
    heroPictures: {
      data: Array<{
        attributes: {
          url: string;
        };
      }>;
    };
    shows: HomepageSection;
    programme: HomepageSection;
    archive: HomepageSection;
    pictureGallery: {
      data: Array<{
        attributes: {
          url: string;
        };
      }>;
    };
  };
}

export interface AboutTypes {
  attributes: {
    page: PageComponent;
    heroText: string;
    heroPictures: {
      data: Array<{
        attributes: {
          url: string;
        };
      }>;
    };
    radioSection: AboutSection;
    torhausSection: AboutSection;
    imageBanner: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

export interface PageComponent {
  id: number;
  title: string;
  description: string;
  slug: string;
}