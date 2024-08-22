import Link from 'next/link';
import paths from '@/app/pathHelper';
import Glossary from '@/features/glossary';
import type { Metadata } from 'next';
import { healthTerms } from '@/app/tools/health-term-glossary/healthTerms';

export const metadata: Metadata = {
  title: 'Health Term Glossary | Tempered Strength',
  description:
    'Theres too much jargon in fitness, a definitive list of health terms to help you do some jargon busting',
};

const HealthTermGlossary = () => (
  <main className="p-4 lg:p-8 max-w-3xl mx-auto">
    <Link
      href={paths.tools.route}
      className="text-amber-300 hover:underline mb-4 block"
    >
      Back to tools
    </Link>

    <h1 className="text-2xl font-bold mb-4">Health Term Glossary</h1>

    <Glossary data={healthTerms} />
  </main>
);

export default HealthTermGlossary;
