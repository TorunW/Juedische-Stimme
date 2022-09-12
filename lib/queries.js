/* GALLERIES */

    export function selectGalleries(numberOfGalleries,pageNum){
        const query =   `SELECT * ,
                        (
                            SELECT GROUP_CONCAT(js_gallery_images.image_src separator ',')
                            FROM js_gallery_images
                            WHERE js_gallery_images.image_gallery = js_galleries.gallery_id
                        ) as imageSrcs,
                        (
                            SELECT GROUP_CONCAT(js_gallery_images.image_id separator ',')
                            FROM js_gallery_images
                            WHERE js_gallery_images.image_gallery = js_galleries.gallery_id
                        ) as imageIds
                        FROM js_galleries 
                        ORDER BY gallery_id DESC
                        LIMIT ${numberOfGalleries ? numberOfGalleries : "100"} 
                        OFFSET ${pageNum ? (pageNum - 1)  * numberOfGalleries : 0}
                        `
        return query
    }

    export function insertGallery(body){
        const { gallery_name, gallery_description, gallery_type } = body
        const query = `INSERT INTO js_galleries (gallery_name, gallery_description,gallery_type) VALUES ('${gallery_name}','${gallery_description}','${gallery_type}');`
        return query
    }

    export function selectGalleryById(id){
        const query =   `SELECT js_galleries.*, GROUP_CONCAT(js_gallery_images.image_src separator ',') as imageSrcs
                        FROM js_galleries 
                        LEFT JOIN js_gallery_images ON js_gallery_images.image_gallery=js_galleries.gallery_id
                        WHERE js_galleries.gallery_id='${id}'`
        return query
    }

    export function updateGallery(body,galleryId){
        const { gallery_name, gallery_description, gallery_type } = body
        const query =   `UPDATE js_galleries
                        SET gallery_name='${gallery_name}', gallery_description='${gallery_description}', gallery_type='${gallery_type}' WHERE gallery_id='${galleryId}'`
        return query;
    }

    export function deleteGallery(galleryId){
        const query = `DELETE FROM js_galleries WHERE js_galleries.gallery_id=${galleryId}`
        return query
    }

    export function inserGalleryImage(body){
        const {image_src, image_title, image_description, image_gallery} = body
        const query =   `INSERT INTO js_gallery_images (image_src,image_title,image_description,image_gallery) 
                        VALUES ('${image_src}','${image_title}','${image_description}','${image_gallery}');`
        return query
    }

    export function selectGalleryImagesByGalleryId(galleryId){
        const query =   `SELECT js_gallery_images.* FROM js_gallery_images WHERE js_gallery_images.image_gallery='${galleryId}'`
        return query
    }

    export function deleteGalleryImage(galleryImageId){
        const query = `DELETE FROM js_gallery_images WHERE js_gallery_images.image_id='${galleryImageId}'`
        return query
    }

/* /GALLERIES */

/* CATEGORIES */

    export function selectCategories(numberOfCategories,pageNum){
        const query =   `SELECT *, (
                            SELECT wp_termmeta.meta_value 
                            FROM wp_termmeta 
                            WHERE wp_termmeta.term_id=wp_terms.term_id 
                            AND wp_termmeta.meta_key='_category_main_image'
                            LIMIT 1
                        ) as category_image
                        FROM wp_terms
                        INNER JOIN wp_term_taxonomy ON wp_term_taxonomy.term_id=wp_terms.term_id
                        WHERE wp_term_taxonomy.taxonomy='category'
                        ORDER BY wp_terms.term_id DESC
                        LIMIT ${numberOfCategories}
                        OFFSET ${pageNum ? (pageNum - 1)  * numberOfCategories : 0}
                        `
        return query
    }

    export function selectCategory(body){
        const {categoryId,categoryName} = body;
        let whereClause = `WHERE wp_terms.term_id='${categoryId}'`
        if (categoryName){
            whereClause = `WHERE wp_terms.name='${categoryName}'`
        }
        const query =   `SELECT * , (
                            SELECT wp_termmeta.meta_value 
                            FROM wp_termmeta 
                            WHERE wp_termmeta.term_id=wp_terms.term_id 
                            AND wp_termmeta.meta_key='_category_main_image'
                            LIMIT 1
                        ) as category_image
                        FROM wp_terms 
                        INNER JOIN wp_term_taxonomy ON wp_term_taxonomy.term_id=wp_terms.term_id
                        ${whereClause}`
        return query;
    }

    export function updateTerm(body){
        const { termId, name, slug } = body
        const query =   `UPDATE wp_terms 
                        SET name='${name}', slug='${slug}'
                        WHERE term_id='${termId}'`
        return query;
    }

    export function updateTermTaxonomy(body){
        const { term_id, taxonomy, description, count } = body
        const query =   `UPDATE wp_term_taxonomy 
                        SET ${taxonomy ? " taxonomy='"+taxonomy+"' ," : ""} description='${description}', count='${count}'
                        WHERE term_id='${term_id}'`
        return query;
    }

    export function updateTermMeta(body){
        const { term_id, meta_key, meta_value } = body
        const query =   `UPDATE wp_termmeta SET meta_value='${meta_value}' WHERE term_id='${term_id}' AND meta_key='${meta_key}'`
        return query;
    }

    export function incrementTermTaxonomyCount(termId){
        const query = `UPDATE wp_term_taxonomy SET count=count+1 WHERE term_id='${termId}'`
        return query;
    }

    export function decreaseTermTaxonomyCount(termId){
        const query = `UPDATE wp_term_taxonomy SET count=count-1 WHERE term_id='${termId}'`
        return query
    }

    export function updateTermRelationship(catId,previousCatId,postId){
        const query = `UPDATE wp_term_relationships SET term_taxonomy_id='${catId}' WHERE object_id='${postId}' AND term_taxonomy_id='${previousCatId}'`
        return query
    }

    export function deleteTerm(termId){
        const query = `DELETE FROM wp_terms WHERE wp_terms.term_id='${termId}'`
        return query;
    }

    export function deleteTermTaxonomy(termId){
        const query = `DELETE FROM wp_term_taxonomy WHERE wp_term_taxonomy.term_id='${termId}'`
        return query;
    }


/* /CATEGORIES */

/* TAGS */

    export function selectTags(){
        const query =   `SELECT wp_terms.*, wp_term_taxonomy.*
                        FROM wp_terms
                        INNER JOIN wp_term_taxonomy ON wp_terms.term_id=wp_term_taxonomy.term_id
                        WHERE wp_term_taxonomy.taxonomy='post_tag'
                        `
        return query
    }

    export function selectTag(body){
        
        const {tagId,slug} = body;

        let whereClause;
        if (tagId) whereClause = `WHERE wp_terms.term_id=${tagId}`
        else if (slug) whereClause = `WHERE wp_terms.slug='${slug}'`
        
        const query =   `SELECT wp_terms.*, wp_term_taxonomy.*
                        FROM wp_terms
                        INNER JOIN wp_term_taxonomy ON wp_terms.term_id=wp_term_taxonomy.term_id
                        ${whereClause}`
        return query
    }

    export function updateTag(body){
        const { term_id, description } = body;
        const query = `UPDATE wp_term_taxonomy SET description="${description}" WHERE wp_term_taxonomy.term_id=${term_id}`
        return query;
    }

    export function updateTagSlug(body){
        const { term_id, name, slug } = body;
        const query = `UPDATE wp_terms SET name="${name}", slug="${slug}" WHERE wp_terms.term_id=${term_id}`
        return query;
    }

    export function decreaseTagCount(termId){
        const query = `UPDATE wp_term_taxonomy SET count=count-1 WHERE wp_term_taxonomy.term_id=${termId}`
        return query;
    }

    // select tags ( wp_terms table ) by search phrase. note that we need to varify that wp_terms row is in face a "post_tag", 
    // we achieve this by inner joining the wp_term_taxonomy table and check if its taxonomy column is "post_tag"
    export function selectTagsBySearchPhrase(phrase){
        const query =   `SELECT wp_terms.*
                        FROM wp_terms
                        INNER JOIN wp_term_taxonomy ON wp_terms.term_id=wp_term_taxonomy.term_id
                        WHERE wp_term_taxonomy.taxonomy='post_tag' AND wp_terms.name LIKE '%${phrase}%'
                        `
        return query
    }

    export function selectTagsByPostId(postId){
        const query =  `SELECT wp_terms.*
                        FROM wp_terms
                        INNER JOIN wp_term_taxonomy ON wp_terms.term_id=wp_term_taxonomy.term_id
                        INNER JOIN wp_term_relationships ON wp_term_relationships.term_taxonomy_id=wp_terms.term_id
                        WHERE wp_term_taxonomy.taxonomy='post_tag' AND wp_term_relationships.object_id='${postId}'
                        `
        return query;
    }

    export function insertTerm(body){
        const { name, slug } = body
        const query = `INSERT INTO wp_terms ( name, slug, term_group) VALUES ( '${name}', '${slug}', '0')`
        return query;
    }

    export function insertTermTaxonomy(body){
        const { term_id, taxonomy, description, parent, count } = body
        const query =  `INSERT INTO wp_term_taxonomy (term_taxonomy_id, term_id, taxonomy, description, parent, count ) VALUES ('${term_id}', '${term_id}','${taxonomy}','${description}','${parent}','${count}');`
        return query;
    }

    export function insertTermMeta(body){
        const { term_id, meta_key, meta_value } = body
        const query = `INSERT INTO wp_termmeta (term_id, meta_key, meta_value) VALUES ('${term_id}', '${meta_key}', '${meta_value}')`
        return query
    }

    // insert term relationship, IE add a tag to a post
    export function insertTermRelationship(termId,postId,order){
        const query = `INSERT INTO wp_term_relationships ( object_id, term_taxonomy_id, term_order ) VALUES ('${postId}','${termId}','${order ? order : '0'}');`
        return query;
    }

    export function deleteTermRelationship(termId,postId){
        const query = `DELETE FROM wp_term_relationships WHERE object_id='${postId}' AND term_taxonomy_id='${termId}'`
        return query
    }

    export function deleteTermRelationships(termId){
        const query = `DELETE FROM wp_term_relationships WHERE term_taxonomy_id='${termId}'`
        return query
    }

    export function deleteTermMeta(termId,metaKey){
        const query = `DELETE FROM wp_termmeta WHERE wp_termmeta.term_id='${termId}' AND meta_key='${metaKey}'`
        return query;
    }

/* /TAGS */

    // select menu items
    export function selectMenuItemById(termId){
        const query =   `${selectMenuItemsSnippet}
                        WHERE wp_term_taxonomy.term_id='${termId}'`
        return query
    }

    // select x number of media items
    export function selectMediaItems(numberOfMediaItems,pageNum){
        const query =   `SELECT wp_postmeta.meta_key, wp_postmeta.meta_value, wp_postmeta.post_id, wp_postmeta.meta_id, wp_posts.post_title, wp_posts.post_name
                        FROM wp_postmeta 
                        LEFT JOIN wp_posts ON wp_posts.ID=wp_postmeta.post_id
                        WHERE meta_key="_wp_attached_file"
                        ORDER BY meta_id DESC
                        LIMIT ${numberOfMediaItems}
                        OFFSET ${pageNum ? (pageNum - 1)  * numberOfMediaItems : 0}
                        `
        return query
    }

    export function insertMediaItem(body){
        const { post_id, meta_key, meta_value} = body
        const query = `INSERT INTO wp_postmeta ( post_id, meta_key, meta_value ) VALUES ('${post_id}', '${meta_key}', '${meta_value}' );`
        return query;
    }

    // select x number of users

    export function selectUsers(numberOfUsers,pageNum){
        const query =   `SELECT *
                        FROM wp_users 
                        ORDER BY ID DESC
                        LIMIT ${numberOfUsers}
                        OFFSET ${pageNum ? (pageNum - 1)  * numberOfUsers : 0}
                        `
        return query
    }

    // facebook feed

    export function insertFbFeed(body){
        const { content, date_updated, type } = body
        const query = `INSERT INTO fb_feed ( content, date_updated, type ) VALUES ('${content}', '${date_updated}', '${type}');`
        return query;
    }

    export function insertFbToken(body){
        const { token, date_updated } = body
        const query = `INSERT INTO fb_token ( token, date_updated ) VALUES ('${token}','${date_updated}');`
        return query;
    }

    export function updateFbToken(body,fbTokenId){
        const { token, date_updated } = body
        const query = `UPDATE fb_token SET token='${token}', date_updated='${date_updated}' WHERE ID='${fbTokenId}'`
        return query
    }