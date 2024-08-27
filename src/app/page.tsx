import Link from 'next/link';
import paths from '@/app/pathHelper';
import { sortByDate } from '@/helpers';
import { BlogPostBlock } from '@/components';

import type { Metadata } from 'next';
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
      newsLetterCollection (preview: ${process.env.CONTENTFUL_PREVIEW}) {
        items {
          sys {
            id
          }
          date
          title
          slug
          shortDescription
          episode
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
      <h1 className="text-2xl font-bold mb-4">Latest Blog Posts</h1>
      {blogs && (
        <div className="grid gap-4 mb-6 grid-cols-2 md:gap-6">
          {blogs
            .sort((a, b) => sortByDate(a, b, 'publishedDate'))
            .map((blog) => (
              <BlogPostBlock key={blog.title} blog={blog} />
            ))}
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">Latest Newsletters</h1>
      {newsletters && (
        <ul className="grid gap-3 mb-6">
          {newsletters
            .sort((a, b) => sortByDate(a, b))
            .map((newsletter) => (
              <li key={newsletter.sys.id}>
                <Link
                  href={paths.newsletter.slug.route(newsletter.slug)}
                  className="hover:underline grid grid-cols-[auto_1fr] gap-2"
                >
                  <span className="text-amber-300">{newsletter.episode}.</span>
                  {newsletter.title}
                </Link>
              </li>
            ))}
        </ul>
      )}
      <h1 className="text-2xl font-bold mb-4">Tools</h1>
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
    </main>
  );
};

export default Home;
