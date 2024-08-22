import Link from 'next/link';
import paths from '@/app/pathHelper';

import type { BlogPostShort } from '@/types/BlogPostShort';

const BlogPostBlock = ({ blog }: { blog: BlogPostShort }) => (
  <Link
    key={blog.title}
    href={paths.blog.slug.route(blog.slug)}
    className="rounded-md overflow-hidden bg-gray-700"
  >
    <div className="w-full h-52">
      <img
        alt={blog.featuredImage.description}
        src={blog.featuredImage.url}
        className="w-full h-full object-cover"
      />
    </div>

    <div className="p-4">
      <div>{blog.title}</div>
      <div className="flex gap-2 mt-2">
        {blog.category.map((category) => (
          <div key={category} className="text-xs p-2 rounded bg-zinc-800">
            {category}
          </div>
        ))}
      </div>
      <div className="text-sm mt-2">By {blog.author.name}</div>
    </div>
  </Link>
);

export default BlogPostBlock;
