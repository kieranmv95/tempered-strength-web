import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RichTextRenderer } from '@/components';
import { formatDate } from '@/helpers';
import paths from '@/app/pathHelper';

import type { Metadata } from 'next';
import type { BlogPost } from '@/types';

type BlogPostProps = { params: { slug: string } };

const fetchBlogBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`;

  const query = `
    query {
      blogPostCollection (preview: ${process.env.CONTENTFUL_PREVIEW}, where: { slug: "${slug}" }) {
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
            slug
            profilePicture {
              url
              title
              description
            }
          }
          body {
            json
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

  return json.data.blogPostCollection.items[0] as BlogPost | undefined;
};

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const data = await fetchBlogBySlug(params.slug);

  if (!data) {
    return {
      title: '${data?.title} | Tempered Strength',
    };
  }

  return {
    title: `${data.title} | Tempered Strength`,
    description: data.summary,
    openGraph: {
      title: `${data.title} | Tempered Strength`,
      description: data.summary,
      images: [
        {
          url: data.featuredImage.url,
          alt: data.featuredImage.title,
        },
      ],
      type: 'article',
    },
  };
}

const BlogPost = async ({ params }: BlogPostProps) => {
  const data = await fetchBlogBySlug(params.slug);

  if (!data) notFound();

  return (
    <main className="p-4 lg:p-8 max-w-3xl mx-auto">
      <Link
        href={paths.blog.route}
        className="text-amber-300 hover:underline mb-4 block"
      >
        Back to {paths.blog.friendlyName.toLowerCase()}s
      </Link>
      <div>
        <h1 className="text-2xl font-bold mb-3">{data.title}</h1>
        <p className="mb-4">
          {formatDate(data.publishedDate)}, {data.readTime} minute read
        </p>
        <div className="w-full h-60 md:h-96 mb-4">
          <img
            alt={data.featuredImage.description}
            className="w-full h-full object-cover rounded overflow-hidden"
            src={data.featuredImage.url}
          />
        </div>

        <RichTextRenderer json={data.body.json} />

        <Link
          className="mb-4 flex gap-3 items-center hover:underline mt-4"
          href={paths.author.slug.route(data.author.slug)}
        >
          <img
            className="rounded-full overflow-hidden w-12 h-12"
            src={data.author.profilePicture.url}
            alt={data.author.profilePicture.description}
          />

          <p>By {data.author.name}</p>
        </Link>
      </div>
    </main>
  );
};

export default BlogPost;
