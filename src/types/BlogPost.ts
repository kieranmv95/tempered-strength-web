import type { BlogPostShort } from '@/types/BlogPostShort';
import { Author } from '@/types/Author';

export type BlogPost = BlogPostShort & {
  author: Author;
  body: {
    json: any;
  };
};
