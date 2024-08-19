import Link from 'next/link';
import paths from '@/app/pathHelper';
import Glossary from '@/features/glossary';
import type { GlossaryTerm } from '@/features/glossary/types/GlossaryTerm';

const healthTerms: GlossaryTerm[] = [
  {
    abbreviation: 'Vo2 Max',
    id: 'vo2-max',
    fullName: 'Maximal oxygen consumption',
    description: `VO2 max is the maximum amount of oxygen your body can use during intense exercise. It measures cardiovascular fitness and endurance.`,
    moreInfoUrl: 'https://en.wikipedia.org/wiki/VO2_max',
  },
  {
    abbreviation: 'RPE',
    id: 'rpe',
    fullName: 'Rate of Perceived Exertion',
    description: `is a scale that measures how hard you feel you're working during physical activity, typically ranging from 1 to 10, with higher numbers indicating more effort.`,
    moreInfoUrl: 'https://en.wikipedia.org/wiki/Rating_of_perceived_exertion',
  },
  {
    abbreviation: 'RM',
    id: 'rm',
    fullName: 'Repetition Maximum',
    description: `RM is the maximum amount of weight you can lift for a specific number of repetitions before fatigue. For example, 1RM is the heaviest weight you can lift once.`,
    moreInfoUrl: 'https://en.wikipedia.org/wiki/One-repetition_maximum',
  },
  {
    abbreviation: 'BMR',
    id: 'bmr',
    fullName: 'Basal Metabolic Rate',
    description: `Basal Metabolic Rate is the number of calories your body needs to maintain basic functions, like breathing and circulation, while at rest.`,
    moreInfoUrl: 'https://en.wikipedia.org/wiki/Basal_metabolic_rate',
  },
  {
    abbreviation: 'RHR',
    id: 'rhr',
    fullName: 'Resting Heart Rate',
    description: `Resting Heart Rate is the number of heartbeats per minute when you're at rest, indicating your basic heart function and overall cardiovascular health.`,
    moreInfoUrl: 'https://en.wikipedia.org/wiki/Heart_rate',
  },
  {
    abbreviation: 'HR',
    id: 'hr',
    fullName: 'Heart Rate',
    description: `hr is the number of heartbeats per minute, reflecting how fast your heart is pumping blood.`,
    moreInfoUrl: 'https://en.wikipedia.org/wiki/Heart_rate',
  },
];

const HealthTermGlossary = () => (
  <main className="p-8 max-w-3xl mx-auto">
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
