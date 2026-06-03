/**
 * Format pet age stored as total months (e.g. 36 → "36 months").
 */
export const formatPetAge = (months) => {
  if (months === null || months === undefined || months === '') {
    return 'Age unknown';
  }

  const value = Number(months);
  if (Number.isNaN(value)) {
    return 'Age unknown';
  }

  return `${value} ${value === 1 ? 'month' : 'months'}`;
};
