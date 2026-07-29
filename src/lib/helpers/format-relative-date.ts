const SECOND = 1_000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const rtf = new Intl.RelativeTimeFormat('en', {
  numeric: 'auto',
});

export function formatRelativeDate(date: Date | string | number, now = Date.now()): string {
  const timestamp = new Date(date).getTime();
  const diff = timestamp - now;
  const absDiff = Math.abs(diff);

  if (absDiff < 30 * SECOND) {
    return 'Now';
  }

  if (absDiff < HOUR) {
    return rtf.format(Math.round(diff / MINUTE), 'minute');
  }

  if (absDiff < DAY) {
    return rtf.format(Math.round(diff / HOUR), 'hour');
  }

  if (absDiff < 7 * DAY) {
    return rtf.format(Math.round(diff / DAY), 'day');
  }

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(timestamp);
}
