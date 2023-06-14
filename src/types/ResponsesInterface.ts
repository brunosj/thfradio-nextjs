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

export interface Section {
  title: string;
  subtitle: string;
  showListings?: ShowTypes[];
  calendarEntries?: CalendarEntry[];
  shows?: CloudShowTypes[];
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
    shows: Section;
    programme: Section;
    archive: Section;
  };
}