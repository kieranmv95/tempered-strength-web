'use client';

import { useState } from 'react';
import type { GlossaryTerm } from '../types/GlossaryTerm';
import GlossaryItem from './GlossaryItem';

const Glossary = ({ data }: { data: GlossaryTerm[] }) => {
  const [openId, setOpenId] = useState<null | string>(null);

  const triggerAccordion = (id: string) => {
    if (id === openId) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return (
    <div className="grid gap-4">
      {data.map((term) => (
        <GlossaryItem
          id={term.abbreviation}
          key={term.abbreviation}
          term={term}
          open={term.abbreviation === openId}
          onClick={triggerAccordion}
        />
      ))}
    </div>
  );
};

export default Glossary;
