export default function formateDate(value: any) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(value).toLocaleDateString('de-DE', options);
}
