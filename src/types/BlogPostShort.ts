import type { ContentfulImage } from '@/types/ContentfulImage';
import { AuthorShort } from '@/types/AuthorShort';

export type BlogPostShort = {
  sys: {
    id: number;
  };
  title: string;
  slug: string;
  summary: string;
  publishedDate: string;
  readTime: number;
  featuredImage: ContentfulImage;
  author: AuthorShort;
  category: string[];
};
