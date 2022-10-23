export function getLabels() {
  return `SELECT * FROM js_labels`;
}

export function getLabelById(id) {
  return `SELECT * FROM js_labels WHERE label_id='${id}' LIMIT 1`;
}

export function insertLabel(body) {
  const { label_name, label_title, label_title_en_US, label_type } = body;
  return `
    INSERT INTO js_labels ( 
        label_name, 
        label_title,
        label_title_en_US, 
        label_type
    ) VALUES (
        '${label_name}',
        '${label_title}',
        '${label_title_en_US}',
        '${label_type}'
    )`;
}

export function updateLabel(body) {
  const { label_id, label_name, label_title, label_title_en_US, label_type } =
    body;

  const query = `UPDATE js_labels 
    SET label_name='${label_name}',
        label_title='${label_title}',
        label_title_en_US='${label_title_en_US}',
        label_type='${label_type}'
         WHERE label_id=${label_id}`;

  return query;
}
