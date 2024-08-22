import Link from 'next/link';
import { formatDate, sortByDate } from '@/helpers/dateFormatting';
import paths from '@/app/pathHelper';
import type { Metadata } from 'next';
import type { BlogPostShort } from '@/types/BlogPostShort';

export const metadata: Metadata = {
  title: 'Blog Posts | Tempered Strength',
  description: 'All the latest blogs on anything and everything fitness',
};

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`;

const fetchBlogPosts = async (): Promise<BlogPostShort[] | undefined> => {
  const query = `
    query {
      blogPostCollection {
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

const Newsletter = async () => {
  const blogs = await fetchBlogPosts();

  return (
    <main className="p-4 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-3">Blog Posts</h1>
      {blogs && (
        <div className="grid gap-3 mb-6 md:grid-cols-2">
          {blogs
            .sort((a, b) => sortByDate(a, b, 'publishedDate'))
            .map((blog) => (
              <Link
                key={blog.title}
                href={paths.blog.slug.route(blog.slug)}
                className="rounded-md overflow-hidden bg-gray-700"
              >
                <div className="w-full h-40">
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
                      <div
                        key={category}
                        className="text-sm p-2 rounded bg-zinc-800"
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm mt-2">By {blog.author.name}</div>
                </div>
              </Link>
            ))}
        </div>
      )}
    </main>
  );
};

export default Newsletter;
