const CALENDAR_YEAR_PADDING = 9;

export default function getCalendarYearWidth(monthSize) {
  return (7 * (monthSize + 1)) + (2 * (CALENDAR_YEAR_PADDING + 1));
}
