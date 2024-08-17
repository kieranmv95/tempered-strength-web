import type { NewsletterShort } from '@/types/NewsLetterShort';
import Link from 'next/link';
import paths from '@/app/pathHelper';

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
    <main className="p-8 w-full h-full grid items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-3">TEMPERED STRENGTH</h1>
        {entries && (
          <ul>
            {entries.map((newsletter) => (
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
      </div>
    </main>
  );
};

export default Home;
