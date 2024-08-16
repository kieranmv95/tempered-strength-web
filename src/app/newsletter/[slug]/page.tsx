import { notFound } from 'next/navigation';
import { Newsletter } from '@/types/Newsletter';
import RichTextRenderer from '@/components/RichTextRenderer';
import { formatDate } from '@/helpers/dateFormatting';
import Link from 'next/link';
import paths from '@/app/pathHelper';

const fetchNewsLetterBySlug = async (
  slug: string
): Promise<Newsletter | undefined> => {
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`;

  const query = `
    query {
      newsLetterCollection (where: { slug: "${slug}" }) {
        items {
          sys {
            id
          }
          title
          slug
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

const Newsletter = async ({ params }: { params: { slug: string } }) => {
  const data = await fetchNewsLetterBySlug(params.slug);

  if (!data) notFound();

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <Link
        href={paths.newsletter.route}
        className="text-amber-300 hover:underline mb-4 block"
      >
        Back to newsletters
      </Link>
      <div>
        <h1 className="text-2xl font-bold mb-3">{data.title}</h1>
        <p className="mb-8">{formatDate(data.date)}</p>

        <RichTextRenderer json={data.newsLetterBody.json} />
      </div>
    </main>
  );
};

export default Newsletter;
