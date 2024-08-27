import Link from 'next/link';
import paths from '@/app/pathHelper';

import type { BlogPostShort } from '@/types/BlogPostShort';

export const BlogPostBlock = ({ blog }: { blog: BlogPostShort }) => (
  <div>
    <Link
      key={blog.title}
      href={paths.blog.slug.route(blog.slug)}
      className="overflow-hidden"
    >
      <div className="w-full h-36 sm:h-48 md:h-52">
        <img
          alt={blog.featuredImage.description}
          src={blog.featuredImage.url}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="py-2">
        <div className="sm:text-md md:text-lg">{blog.title}</div>
      </div>
    </Link>
    <div className="flex gap-2">
      {blog.category.map((category) => (
        <Link key={category} href={paths.blog.category.route(category)}>
          <div className="text-xs px-2 py-1 rounded bg-zinc-700">
            {category}
          </div>
        </Link>
      ))}
    </div>
  </div>
);
