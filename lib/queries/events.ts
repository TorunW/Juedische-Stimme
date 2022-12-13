export function getEvents() {
  return "SELECT * FROM js_events";
}

export function insertEvent(body) {
  const { title, description, date, location, link } = body;
  return `INSERT INTO js_events (title, description, date,  location, link) VALUES ('${title}', '${description}', '${date}',  '${location}', '${link}')`;
}
