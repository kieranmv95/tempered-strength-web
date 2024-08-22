import type { Metadata } from 'next';
import Link from 'next/link';
import paths from '@/app/pathHelper';
import { sortByDate } from '@/helpers/dateFormatting';
import type { NewsletterShort } from '@/types/NewsLetterShort';
import type { BlogPostShort } from '@/types/BlogPostShort';

export const metadata: Metadata = {
  title: 'Tempered Strength',
  description: 'Tempered Strength, Forging Fitness',
};

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`;

const fetchNewsLetters = async (): Promise<NewsletterShort[] | undefined> => {
  const query = `
    query {
      newsLetterCollection {
        items {
          sys {
            id
          }
          date
          title
          slug
          shortDescription
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

  return json.data.newsLetterCollection.items;
};

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
          author {
            name
          }
          category
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

const Home = async () => {
  const newsletters = await fetchNewsLetters();
  const blogs = await fetchBlogPosts();

  return (
    <main className="p-4 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-3">Latest Blog Posts</h1>
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
                        className="text-xs p-2 rounded bg-zinc-800"
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
      <h1 className="text-2xl font-bold mb-3">Tools</h1>
      <ul className="grid gap-3 mb-6">
        <li>
          <Link
            href={paths.tools.healthTermGlossary.route}
            className="text-amber-300 hover:underline"
          >
            {paths.tools.healthTermGlossary.friendlyName}
          </Link>
        </li>
        <li>
          <Link
            href={paths.tools.heartRateZones.route}
            className="text-amber-300 hover:underline"
          >
            {paths.tools.heartRateZones.friendlyName}
          </Link>
        </li>
      </ul>
      <h1 className="text-2xl font-bold mb-3">Latest Newsletters</h1>
      {newsletters && (
        <ul className="grid gap-3">
          {newsletters
            .sort((a, b) => sortByDate(a, b))
            .map((newsletter) => (
              <li key={newsletter.sys.id}>
                <Link
                  href={paths.newsletter.slug.route(newsletter.slug)}
                  className="text-amber-300 hover:underline"
                >
                  {newsletter.title}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </main>
  );
};

export default Home;
