import Link from 'next/link';
import type { NewsletterShort } from '@/types/NewsLetterShort';
import { formatDate, sortByDate } from '@/helpers/dateFormatting';
import paths from '@/app/pathHelper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Newsletters | Tempered Strength',
  description:
    'Stay up to date with whats happening in the Tempered Strength world',
};

const fetchNewsLetters = async (): Promise<NewsletterShort[] | undefined> => {
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`;

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
          episode
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

  return json.data.newsLetterCollection.items as NewsletterShort[];
};

const Newsletter = async () => {
  const entries = await fetchNewsLetters();

  return (
    <main className="p-4 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-3">Newsletters</h1>
      {entries && (
        <ul className="grid gap-6">
          {entries
            .sort((a, b) => sortByDate(a, b))
            .map((newsletter) => (
              <li key={newsletter.sys.id}>
                <Link
                  href={paths.newsletter.slug.route(newsletter.slug)}
                  className="text-amber-300 hover:underline"
                >
                  <div className="text-xs text-white">
                    {formatDate(newsletter.date)}
                  </div>
                  <div>
                    {newsletter.episode}. {newsletter.title}
                  </div>
                  <div className="text-white">
                    {newsletter.shortDescription}
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      )}
    </main>
  );
};

export default Newsletter;
