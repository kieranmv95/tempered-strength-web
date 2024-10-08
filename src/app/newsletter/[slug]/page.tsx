import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RichTextRenderer } from '@/components';
import { formatDate } from '@/helpers';
import paths from '@/app/pathHelper';

import type { Metadata } from 'next';
import type { Newsletter } from '@/types';

type NewsletterProps = { params: { slug: string } };

const fetchNewsLetterBySlug = async (
  slug: string
): Promise<Newsletter | undefined> => {
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`;

  const query = `
    query {
      newsLetterCollection (preview: ${process.env.CONTENTFUL_PREVIEW}, where: { slug: "${slug}" }) {
        items {
          sys {
            id
          }
          title
          slug
          episode
          date
          shortDescription
          newsLetterBody {
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

  return json.data.newsLetterCollection.items[0] as Newsletter | undefined;
};

export async function generateMetadata({
  params,
}: NewsletterProps): Promise<Metadata> {
  const data = await fetchNewsLetterBySlug(params.slug);

  if (!data) {
    return {
      title: `Newsletter | Tempered Strength`,
    };
  }

  return {
    title: `${data.episode}. ${data.title} | Tempered Strength`,
    description: data.shortDescription,
    openGraph: {
      title: `${data.title} | Tempered Strength`,
      description: data.shortDescription,
      type: 'article',
    },
  };
}

const Newsletter = async ({ params }: NewsletterProps) => {
  const data = await fetchNewsLetterBySlug(params.slug);

  if (!data) notFound();

  return (
    <main className="p-4 lg:p-8 max-w-3xl mx-auto">
      <Link
        href={paths.newsletter.route}
        className="text-amber-300 hover:underline mb-4 block"
      >
        Back to {paths.newsletter.friendlyName}
      </Link>
      <div>
        <h1 className="text-2xl font-bold mb-3">
          {data.episode}. {data.title}
        </h1>
        <p className="mb-8">{formatDate(data.date)}</p>

        <RichTextRenderer json={data.newsLetterBody.json} />
      </div>
    </main>
  );
};

export default Newsletter;
