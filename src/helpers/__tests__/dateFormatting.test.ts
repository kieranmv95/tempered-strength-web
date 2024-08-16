import { formatDate } from '@/helpers/dateFormatting';

const params = [
  ['2024-08-16T00:00:00.000', '16th August 2024'],
  ['2023-08-01T00:00:00.000', '1st August 2023'],
  ['2025-02-02T00:00:00.000', '2nd February 2025'],
  ['2021-03-03T00:00:00.000', '3rd March 2021'],
];

describe.each(params)('dateFormatting with params %s, %s', (a, b) => {
  it(`${a}  should be ${b}`, () => {
    const formattedDate = formatDate(a);

    expect(formattedDate).toBe(b);
  });
});
