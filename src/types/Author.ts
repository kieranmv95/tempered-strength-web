import type { AuthorShort } from '@/types/AuthorShort';
import type { ContentfulImage } from '@/types/ContentfulImage';

export type Author = AuthorShort & {
  profilePicture: ContentfulImage;
  bio: {
    json: any;
  };
  links: {
    instagram: string;
    youtube: string;
    threads: string;
  };
  topics: string[];
};
