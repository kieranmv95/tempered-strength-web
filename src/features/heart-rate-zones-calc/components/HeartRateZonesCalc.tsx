'use client';

import { useState } from 'react';
import { zones } from '../data';

const HeartRateZonesCalc = () => {
  const [age, setAge] = useState<undefined | number>(undefined);
  const [simpleView, setSimpleView] = useState(true);
  const minAge = 14;
  const maxAge = 100;

  const setAgeHandler = (value: string) => {
    if (!value.length) {
      setAge(undefined);
    } else {
      setAge(Number(value));
    }
  };

  return (
    <div>
      <div className="mt-4 p-4 rounded bg-zinc-700">
        <label htmlFor="age" className="block mb-2 font-medium">
          Age:
        </label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAgeHandler(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Insert Age"
          required
        />
      </div>

      {age && (
        <div className="mt-4">
          {(age <= minAge || age >= maxAge || !age) && (
            <div>
              Please enter an age between {minAge} and {maxAge} to continue
            </div>
          )}
          {age > minAge && age < maxAge && (
            <div className="grid gap-3 mt-3">
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setSimpleView(!simpleView)}
                >
                  {simpleView ? 'Show detailed view' : 'Show simple view'}
                </button>
              </div>
              {simpleView && (
                <p>
                  Max HR: <span className="font-bold">{220 - age}</span>
                </p>
              )}
              {!simpleView && (
                <p>
                  Based off the age entered above age your max heart rate (HR)
                  is <span className="font-bold">{220 - age}</span>. to
                  calculate this we do the calculation 220 - age
                </p>
              )}
              <div className={`grid ${simpleView ? 'gap-1' : 'gap-3'}`}>
                {zones.map((zone) => (
                  <div
                    className={`grid ${simpleView ? 'gap-3' : 'gap-3 p-4 rounded bg-zinc-700'}`}
                    key={zone.title}
                  >
                    {!simpleView && (
                      <h2 className="text-lg">
                        <span className="font-bold">{zone.title}:</span>{' '}
                        {zone.description}
                      </h2>
                    )}
                    {!simpleView && <p>{zone.longDescription}</p>}
                    <div
                      className={`inline-grid ${zone.color} w-full rounded items-center justify-center font-bold text-lg p-4 text-black text-center`}
                    >
                      {simpleView && <div>{zone.title}</div>}
                      {Math.round((220 - age) * zone.min)}bpm -{' '}
                      {Math.round((220 - age) * zone.max)}bpm
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeartRateZonesCalc;
