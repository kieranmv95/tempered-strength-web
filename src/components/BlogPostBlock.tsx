import Link from 'next/link';
import paths from '@/app/pathHelper';

import type { BlogPostShort } from '@/types/BlogPostShort';

const BlogPostBlock = ({ blog }: { blog: BlogPostShort }) => (
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

    <div className="py-2 sm:py-3">
      <div className="sm:text-md md:text-lg">{blog.title}</div>
      <div className="flex gap-2 mt-2 md:mt-3">
        {blog.category.map((category) => (
          <div key={category} className="text-xs px-2 py-1 rounded bg-zinc-700">
            {category}
          </div>
        ))}
      </div>
    </div>
  </Link>
);

export default BlogPostBlock;
