import { notFound } from 'next/navigation';
import Link from 'next/link';
import { sortByDate } from '@/helpers';
import paths from '@/app/pathHelper';
import { BlogPostBlock, SocialIcon, RichTextRenderer } from '@/components';

import type { Metadata } from 'next';
import type { BlogPostShort, Author, SocialPlatforms } from '@/types';

type AuthorProps = { params: { slug: string } };

const fetchAuthorBySlug = async (slug: string): Promise<Author | undefined> => {
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`;

  const query = `
    query {
      authorCollection (preview: ${process.env.CONTENTFUL_PREVIEW}, where: { slug: "${slug}" }) {
        items {
          sys {
            id
          }
          name
          topics
          bio {
            json
          }
          links
          profilePicture {
            url
            title
            description
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

  return json.data.authorCollection.items[0] as Author | undefined;
};

const fetchBlogsByAuthorSlug = async (
  slug: string
): Promise<BlogPostShort[] | undefined> => {
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`;

  const query = `
    query {
      blogPostCollection (preview: ${process.env.CONTENTFUL_PREVIEW}, where: { author: { slug: "${slug}" } }) {
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
            slug,
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

  return json.data.blogPostCollection.items as BlogPostShort[] | undefined;
};

export async function generateMetadata({
  params,
}: AuthorProps): Promise<Metadata> {
  const data = await fetchAuthorBySlug(params.slug);

  if (!data) {
    return {
      title: 'Author Not Found | Tempered Strength',
    };
  }

  return {
    title: `${data.name} | Tempered Strength`,
    description: `Learn more about what makes ${data.name} tick!`,
  };
}

const BlogPost = async ({ params }: AuthorProps) => {
  const data = await fetchAuthorBySlug(params.slug);
  const blogs = await fetchBlogsByAuthorSlug(params.slug);

  if (!data) notFound();

  return (
    <main className="p-4 lg:p-8 max-w-3xl mx-auto">
      <Link
        href={paths.author.route}
        className="text-amber-300 hover:underline mb-4 block"
      >
        Back to {paths.author.friendlyName.toLowerCase()}
      </Link>
      <div>
        <div className="flex items-center gap-3 mb-6">
          <img
            alt={data.profilePicture.description}
            className="w-16 h-16 rounded-full"
            src={data.profilePicture.url}
          />
          <h1 className="text-2xl font-bold">{data.name}</h1>
        </div>
        <div className="mb-6 flex gap-4">
          {Object.keys(data.links).map((platform) => (
            <SocialIcon
              key={platform}
              platform={platform as SocialPlatforms}
              link={data.links[platform as SocialPlatforms]}
            />
          ))}
        </div>
        <RichTextRenderer json={data.bio.json} />
        <h1 className="text-xl font-bold mt-4 mb-4">
          {data.name}&apos;s blog posts
        </h1>
        {blogs && (
          <div className="grid gap-3 mb-6 grid-cols-2">
            {blogs
              .sort((a, b) => sortByDate(a, b, 'publishedDate'))
              .map((blog) => (
                <BlogPostBlock key={blog.title} blog={blog} />
              ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default BlogPost;
