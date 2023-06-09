export interface PageTypes {
  attributes: {
    title: string;
    slug: string;
    description: string;
  };
  id: number;
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
