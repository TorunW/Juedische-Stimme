import menuTypes from "lib/menuTypes.json";

const selectMenuItemsSnippet = `SELECT wp_term_taxonomy.taxonomy, wp_term_taxonomy.description as title, wp_term_taxonomy.term_id, wp_termmeta.meta_value as link, wp_term_relationships.term_order,
                                (
                                    SELECT wp_termmeta.meta_value
                                    FROM wp_termmeta
                                    WHERE wp_terms.term_id=wp_termmeta.term_id AND wp_termmeta.meta_key='_menuitem_image'
                                    LIMIT 1
                                ) as term_image,
                                (
                                    SELECT wp_termmeta.meta_value
                                    FROM wp_termmeta
                                    WHERE wp_terms.term_id=wp_termmeta.term_id AND wp_termmeta.meta_key='_menuitem_translation_en_US'
                                    LIMIT 1
                                ) as title_en_US
                                FROM wp_terms
                                INNER JOIN wp_term_taxonomy ON wp_term_taxonomy.term_id=wp_terms.term_id
                                LEFT JOIN wp_termmeta ON wp_terms.term_id=wp_termmeta.term_id AND wp_termmeta.meta_key='_menuitem_link'
                                LEFT JOIN wp_term_relationships ON wp_terms.term_id=wp_term_relationships.term_taxonomy_id`;

export function selectMenuItems() {
  let menuNames = ``;
  menuTypes.forEach(function (mt, index) {
    menuNames += `'${mt}'${index == menuTypes.length - 1 ? "" : ","}`;
  });

  const query = `${selectMenuItemsSnippet}
                    WHERE wp_term_taxonomy.taxonomy IN (${menuNames})
                    ORDER BY wp_term_relationships.term_order`;
  return query;
}

export function selectMenuItemById(termId) {
  const query = `${selectMenuItemsSnippet} WHERE wp_term_taxonomy.term_id='${termId}'`;
  return query;
}
