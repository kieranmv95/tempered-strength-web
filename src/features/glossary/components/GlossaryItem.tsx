import type { GlossaryTerm } from '@/features/glossary/types/GlossaryTerm';

const GlossaryItem = ({
  id,
  term,
  open,
  onClick,
}: {
  id: string;
  term: GlossaryTerm;
  open: boolean;
  onClick: (id: string) => void;
}) => {
  return (
    <div className="bg-zinc-700 rounded p-4">
      <div className="flex gap-2 items-center">
        <h2 id={term.id} className="font-bold text-lg lg:text-xl flex-1">
          {term.abbreviation}
        </h2>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => onClick(id)}
        >
          {open ? 'Close' : 'Open'}
        </button>
      </div>
      <div className={`bg-zinc-700 rounded mt-2 ${!open && 'hidden'}`}>
        <p className="font-bold">{term.fullName}</p>
        <p className="mb-2">{term.description}</p>
        <a
          href={term.moreInfoUrl}
          className="text-amber-300 hover:underline mb-2 block"
        >
          More Info
        </a>
      </div>
    </div>
  );
};

export default GlossaryItem;
