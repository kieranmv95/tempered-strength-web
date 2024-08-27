import Link from 'next/link';
import { sortByDate } from '@/helpers';
import { BlogPostBlock } from '@/components';
import paths from '@/app/pathHelper';

import type { Metadata } from 'next';
import type { BlogPost } from '@/types';

type BlogPostProps = { params: { slug: string } };

const fetchBlogPostsByCategory = async (slug: string): Promise<BlogPost[]> => {
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`;

  const query = `
    query {
      blogPostCollection (preview: ${process.env.CONTENTFUL_PREVIEW}, where: {category_contains_all: "${slug}"}) {
        items {
          sys {
            id
          }
          title
          slug
          summary
          publishedDate
          readTime
          featuredImage {
            url
            title
            description
          }
          category
          author {
            name
            profilePicture {
              url
              title
              description
            }
          }
        }
      }
    }
  `;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();

  return (json.data.blogPostCollection.items || []) as BlogPost[];
};

export const metadata: Metadata = {
  title: 'Blog Posts | Tempered Strength',
  description: 'All the latest blogs on anything and everything fitness',
};

const BlogPostByCategory = async ({ params }: BlogPostProps) => {
  const blogs = await fetchBlogPostsByCategory(params.slug);

  return (
    <main className="p-4 lg:p-8 max-w-3xl mx-auto">
      <Link
        href={paths.blog.route}
        className="text-amber-300 hover:underline mb-4 block"
      >
        Back to all {paths.blog.friendlyName.toLowerCase()}s
      </Link>
      <h1 className="text-2xl font-bold mb-2">Blog Posts</h1>
      <h2 className="text-xl font-bold mb-4">Category: {params.slug}</h2>
      {!blogs.length && <div>No articles found relating to {params.slug}</div>}
      {blogs && (
        <div className="grid gap-4 mb-6 grid-cols-2 md:gap-6">
          {blogs
            .sort((a, b) => sortByDate(a, b, 'publishedDate'))
            .map((blog) => (
              <BlogPostBlock key={blog.title} blog={blog} />
            ))}
        </div>
      )}
    </main>
  );
};

export default BlogPostByCategory;
