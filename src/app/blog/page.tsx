import Link from 'next/link';
import { formatDate, sortByDate } from '@/helpers/dateFormatting';
import paths from '@/app/pathHelper';
import type { Metadata } from 'next';
import type { BlogPostShort } from '@/types/BlogPostShort';
import BlogPostBlock from '@/components/BlogPostBlock';

export const metadata: Metadata = {
  title: 'Blog Posts | Tempered Strength',
  description: 'All the latest blogs on anything and everything fitness',
};

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`;

const fetchBlogPosts = async (): Promise<BlogPostShort[] | undefined> => {
  const query = `
    query {
      blogPostCollection (preview: ${process.env.CONTENTFUL_PREVIEW}) {
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

  return json.data.blogPostCollection.items;
};

const BlogPosts = async () => {
  const blogs = await fetchBlogPosts();

  return (
    <main className="p-4 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
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

export default BlogPosts;
