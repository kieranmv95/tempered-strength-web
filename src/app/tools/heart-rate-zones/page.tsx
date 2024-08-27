import Link from 'next/link';
import HeartRateZonesCalc from '@/features/heart-rate-zones-calc';
import paths from '@/app/pathHelper';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HR Zones | Tempered Strength',
  description: 'Calculate your heart rate zones based off your age',
};

const HeartRateZones = () => {
  return (
    <main className="p-4 lg:p-8 max-w-3xl mx-auto">
      <Link
        href={paths.tools.route}
        className="text-amber-300 hover:underline mb-4 block"
      >
        Back to tools
      </Link>
      <h1 className="text-2xl font-bold mb-3">HR Zones</h1>
      <p>
        Calculate your{' '}
        <Link
          className="text-amber-300 hover:underline"
          href={`${paths.tools.healthTermGlossary.route}#hr`}
        >
          HR
        </Link>{' '}
        Zones using your age, to caluclate your Heart rate zones subtract your
        age from 220 and then calculate the eprcentage bands.
      </p>

      <HeartRateZonesCalc />
    </main>
  );
};

export default HeartRateZones;
