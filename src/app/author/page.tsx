import Link from 'next/link';
import paths from '@/app/pathHelper';

import type { Metadata } from 'next';
import type { Author } from '@/types';

export const metadata: Metadata = {
  title: 'Authors | Tempered Strength',
  description: 'Check out all of our authors!',
};

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`;

const fetchAuthors = async (): Promise<Author[] | undefined> => {
  const query = `
    query {
      authorCollection (preview: ${process.env.CONTENTFUL_PREVIEW}) {
        items {
          sys {
            id
          }
          name
          slug
          topics
          profilePicture {
            url
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

  return json.data.authorCollection.items;
};

const Authors = async () => {
  const authors = await fetchAuthors();

  return (
    <main className="p-4 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-3">Authors</h1>
      <p className="mb-6">
        Check out our authors! click into the authors profile and check out what
        makes them tick
      </p>

      {authors && (
        <div className="grid gap-3 mb-6 md:grid-cols-2">
          {authors.map((author) => (
            <Link
              key={author.name}
              href={paths.author.slug.route(author.slug)}
              className="rounded-md overflow-hidden flex gap-4 items-center"
            >
              <img
                alt={author.profilePicture.description}
                src={author.profilePicture.url}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <div className="font-bold text-lg">{author.name}</div>
                <div className="flex gap-3">
                  {author.topics.map((topic) => (
                    <div className="text-sm" key={topic}>
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default Authors;
