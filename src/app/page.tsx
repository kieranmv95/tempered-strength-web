import type { Metadata } from 'next';
import Link from 'next/link';
import paths from '@/app/pathHelper';
import { sortByDate } from '@/helpers/dateFormatting';
import type { NewsletterShort } from '@/types/NewsLetterShort';

export const metadata: Metadata = {
  title: 'Tempered Strength',
  description: 'Tempered Strength, Forging Fitness',
};

const fetchNewsLetters = async (): Promise<NewsletterShort[] | undefined> => {
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`;

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

const Home = async () => {
  const entries = await fetchNewsLetters();

  return (
    <main className="p-4 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-3">Latest Newsletters</h1>
      {entries && (
        <ul className="grid gap-3">
          {entries
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
