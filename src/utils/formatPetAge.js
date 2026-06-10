/**
 * Format pet age stored as total months (e.g. 36 → "3 years").
 */
export const formatPetAge = (months) => {
  if (months === null || months === undefined || months === '') {
    return 'Age unknown';
  }

  const totalMonths = Number(months);
  if (Number.isNaN(totalMonths) || totalMonths < 0) {
    return 'Age unknown';
  }

  if (totalMonths < 12) {
    return `${totalMonths} ${totalMonths === 1 ? 'month' : 'months'}`;
  }

  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? 'year' : 'years'}`;
  }

  const yearLabel = years === 1 ? 'year' : 'years';
  const monthLabel = remainingMonths === 1 ? 'month' : 'months';
  return `${years} ${yearLabel}, ${remainingMonths} ${monthLabel}`;
};
