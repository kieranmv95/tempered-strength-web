import Link from 'next/link';
import paths from '@/app/pathHelper';

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
