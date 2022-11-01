export type ChannelInfo = {
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
  };
  localized: {
    title: string;
    description: string;
    country: string;
  };
};

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
