import Link from 'next/link';
import paths from '@/app/pathHelper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tools | Tempered Strength',
  description:
    'All the tools to help yoju on your fitness journey, in one place.',
};

const HealthTermGlossary = () => {
  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-3">Tools</h1>

      <Link
        href={paths.tools.healthTermGlossary.route}
        className="text-amber-300 hover:underline py-4 pr-4"
      >
        {paths.tools.healthTermGlossary.friendlyName}
      </Link>
    </main>
  );
};

export default HealthTermGlossary;
