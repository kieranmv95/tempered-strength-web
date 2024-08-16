import Link from 'next/link';
import { NewsletterShort } from '@/types/NewsLetterShort';
import { formatDate } from '@/helpers/dateFormatting';
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

  return json.data.newsLetterCollection.items as NewsletterShort[];
};

const Newsletter = async () => {
  const entries = await fetchNewsLetters();

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <Link
        href={paths.home.route}
        className="text-amber-300 hover:underline mb-4 block"
      >
        Back to home
      </Link>
      <h1 className="text-2xl font-bold mb-3">Newsletters</h1>
      <ul>
        {entries.map((newsletter) => (
          <li key={newsletter.sys.id}>
            <Link
              href={paths.newsletter.slug.route(newsletter.slug)}
              className="text-amber-300 hover:underline"
            >
              <div className="text-xs text-white">
                {formatDate(newsletter.date)}
              </div>
              <div>{newsletter.title}</div>
              <div className="text-white">{newsletter.shortDescription}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Newsletter;
