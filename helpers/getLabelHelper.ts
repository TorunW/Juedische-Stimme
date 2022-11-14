export function getLabel(labels, locale, name, def) {
  const label = labels?.find((label) => label.label_name === name);
  return label
    ? locale === 'en_US'
      ? label.label_title_en_US
      : label.label_title
    : def;
}
