const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const ordinalSuffixes = ['th', 'st', 'nd', 'rd'];

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  let suffix = ordinalSuffixes[0]; // Default to 'th'
  if (day % 10 === 1 && day !== 11) suffix = ordinalSuffixes[1];
  else if (day % 10 === 2 && day !== 12) suffix = ordinalSuffixes[2];
  else if (day % 10 === 3 && day !== 13) suffix = ordinalSuffixes[3];

  return `${day}${suffix} ${months[month]} ${year}`;
};

// Array method for sorting by date
export const sortByDate = (a: { date: string }, b: { date: string }) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
};
