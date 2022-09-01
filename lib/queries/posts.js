/* POSTS */

    const postCategoryId =  `(
                                SELECT wp_term_taxonomy.term_id
                                FROM wp_term_relationships
                                INNER JOIN wp_term_taxonomy ON wp_term_taxonomy.term_id=wp_term_relationships.term_taxonomy_id
                                WHERE wp_term_relationships.object_id=wp_posts.ID AND wp_term_taxonomy.taxonomy='category'
                                LIMIT 1
                            ) as categoryId `

    const postCategoryName = `(
                                SELECT wp_terms.name 
                                FROM wp_terms 
                                WHERE wp_terms.term_id=categoryId
                                LIMIT 1
                            ) as categoryName `

    const postTagNames =    `(
                                SELECT GROUP_CONCAT(wp_terms.slug separator ',')
                                FROM wp_term_relationships
                                INNER JOIN wp_terms ON wp_terms.term_id = wp_term_relationships.term_taxonomy_id
                                WHERE wp_term_relationships.object_id = wp_posts.ID AND wp_term_relationships.term_taxonomy_id != categoryId
                            ) as tagNames `

    const postTagIds =      `(
                                SELECT GROUP_CONCAT(wp_terms.term_id separator ',')
                                FROM wp_term_relationships
                                INNER JOIN wp_terms ON wp_terms.term_id = wp_term_relationships.term_taxonomy_id
                                WHERE wp_term_relationships.object_id = wp_posts.ID AND wp_term_relationships.term_taxonomy_id != categoryId
                            ) as tagIds`

    const postImage =       `(
                                SELECT wp_postmeta.meta_value
                                FROM wp_postmeta
                                WHERE wp_postmeta.post_id=wp_posts.ID AND wp_postmeta.meta_key='_post_main_image'
                                LIMIT 1
                            ) as post_image`


    const selectTranslations = ({locale}) => {
        const query =   `, (
                            SELECT wp_postmeta.meta_value
                            FROM wp_postmeta
                            WHERE wp_postmeta.post_id=wp_posts.ID AND wp_postmeta.meta_key='_post_title_translation_${locale}'
                            LIMIT 1
                        ) as post_title_translation_${locale}, (
                            SELECT wp_postmeta.meta_value
                            FROM wp_postmeta
                            WHERE wp_postmeta.post_id=wp_posts.ID AND wp_postmeta.meta_key='_post_excerpt_translation_${locale}'
                            LIMIT 1
                        ) as post_excerpt_translation_${locale}, (
                            SELECT wp_postmeta.meta_value
                            FROM wp_postmeta
                            WHERE wp_postmeta.post_id=wp_posts.ID AND wp_postmeta.meta_key='_post_content_translation_${locale}'
                            LIMIT 1
                        ) as post_content_translation_${locale} `
        return query;
    }

    const selectPostSubQueries = ({locale,locales}) => {
        let subQueries = `${postCategoryId} , ${postCategoryName} , ${postTagNames} , ${postTagIds} , ${postImage}`
        if (locales){
            locales.forEach(function(locale,index){
                subQueries += selectTranslations({locale})
            })
        } else if (locale){
            subQueries += selectTranslations({locale})
        }
        return subQueries
    }

    const generateFileds = (fieldsList, locale, locales) => {

        let postFields = '';
        fieldsList.forEach(function(field,index){
            if (field === "categoryId") postFields += postCategoryId
            else if (field === "categoryName") postFields += postCategoryName
            else if (field === "postImage") postFields += postImage
            else postFields += `wp_posts.${field}`
            if (index + 1 < fieldsList.length) postFields += " ,"
        })

        if (locales){
            locales.forEach(function(locale,index){
                postFields += selectTranslations({locale})
            })
        } else if (locale){
            postFields += selectTranslations({locale})
        }

        return postFields;
    }

    // select posts by args
    export function selectPosts(body){

        const { slug, isCategory, numberOfPosts,pageNum,showUnpublished,postType,fieldsList, exclude, locale } = body

        let postFields = ` wp_posts.*, wp_users.user_nicename as username , ${selectPostSubQueries({locale})}`;
        if (fieldsList && fieldsList.length > 0) postFields = generateFileds(fieldsList, locale)

        let whereClause = "", isAnd = false;
        if (!showUnpublished){
            whereClause += `WHERE post_status='publish' `
            isAnd = true;
        }
        if (postType && postType !== null){
            whereClause += `${isAnd ? "AND" : "WHERE"} post_type='${postType}'`
            isAnd = true;
        }

        if (slug && slug !== null){
            whereClause += `${isAnd ? "AND" : "WHERE"} wp_terms.slug='${slug}' ${isCategory === true ? " AND wp_term_taxonomy.taxonomy='category' " : ""}`
            isAnd = true;
        }

        if (exclude && exclude.category){
            whereClause += `${isAnd ? "AND" : "WHERE"} wp_terms.term_id!=${exclude.category}`
            isAnd = true;
        }

        const query =   `SELECT wp_posts.ID as postId, ${postFields}
                        FROM wp_posts 
                        LEFT JOIN wp_term_relationships ON wp_term_relationships.object_id=wp_posts.ID
                        LEFT JOIN wp_terms ON wp_term_relationships.term_taxonomy_id=wp_terms.term_id
                        LEFT JOIN wp_term_taxonomy ON wp_terms.term_id=wp_term_taxonomy.term_id
                        LEFT JOIN wp_users ON wp_posts.post_author=wp_users.ID
                        ${whereClause}
                        ORDER BY post_date DESC
                        LIMIT ${numberOfPosts}
                        OFFSET ${pageNum ? (pageNum - 1)  * numberOfPosts : 0}
                        `
        return query
    }

    // select a single post by name
    export function selectPostByName(body){

        const { name, showUnpublished, locale, locales } = body

        const query =   `SELECT wp_posts.ID as postId, wp_posts.*, wp_users.user_nicename as username,
                        ${selectPostSubQueries({locale,locales})},
                        (
                            SELECT wp_postmeta.meta_value
                            FROM wp_postmeta
                            WHERE wp_postmeta.post_id=wp_posts.ID AND wp_postmeta.meta_key='_post_main_image_2'
                            LIMIT 1
                        ) as post_image_2
                        FROM wp_posts 
                        LEFT JOIN wp_users ON wp_posts.post_author=wp_users.ID
                        LEFT JOIN js_maxids ON js_maxids.table='posts'
                        WHERE post_name='${name}'
                        ${showUnpublished === true ? "" : "AND post_status='publish'"}
                        `

        return query
    }

    export function countPostsByTag(body){

        const { slug ,isCategory, termId } = body

        let whereClause = ``;
        if (slug && slug !== null){
            whereClause = `WHERE wp_terms.slug='${slug}' ${isCategory === true ? " AND wp_term_taxonomy.taxonomy='category' " : ""}`
        } else if (termId && termId !== null){
            whereClause = `WHERE wp_terms.term_id='${termId}'`
        }

        const query =   `SELECT COUNT(*)
                        FROM wp_terms
                        INNER JOIN wp_term_relationships ON wp_terms.term_id=wp_term_relationships.term_taxonomy_id
                        INNER JOIN wp_term_taxonomy ON wp_terms.term_id=wp_term_taxonomy.term_id
                        INNER JOIN wp_posts ON wp_term_relationships.object_id=wp_posts.ID
                        ${whereClause}
                        ORDER BY wp_posts.ID DESC`
                        
        return query;
    }

    export function selectPostsBySearchPhrase(body){
        const { phrase,numberOfPosts,pageNum, locale } = body
        const query =   `SELECT wp_posts.ID as postId, wp_posts.*, wp_users.user_nicename as username,
                        ${selectPostSubQueries(locale)}
                        FROM wp_posts 
                        LEFT JOIN wp_users ON wp_posts.post_author=wp_users.ID
                        WHERE post_status='publish' AND wp_posts.post_content LIKE '%${phrase}%'
                        OR post_status='publish' AND wp_posts.post_title LIKE '%${phrase}%'
                        ORDER BY post_date DESC
                        LIMIT ${numberOfPosts}
                        OFFSET ${pageNum ? (pageNum - 1)  * numberOfPosts : 0}`

        return query
    }

    export function selectPostNamesBySearchPhrase(body){
        const { phrase } = body
        const query = `SELECT wp_posts.ID as postId, wp_posts.post_title, wp_posts.post_name FROM wp_posts WHERE post_status='publish' AND wp_posts.post_title LIKE '%${phrase}%'`
        return query;
    }

    export function selectNextPostInCategoryById({postId,categoryId,isPrevious}){
        let delimiter = ">", orderBy = "ASC";
        if (isPrevious === true){
            delimiter = "<"
            orderBy = "DESC"
        }
        const query =   `SELECT wp_posts.post_name, wp_posts.post_title
                        FROM wp_term_taxonomy 
                        INNER JOIN wp_term_relationships ON wp_term_taxonomy.term_id=wp_term_relationships.term_taxonomy_id
                        INNER JOIN wp_posts ON wp_term_relationships.object_id=wp_posts.ID
                        WHERE wp_term_taxonomy.term_id=${categoryId} AND wp_posts.ID ${delimiter} ${postId} 
                        ORDER BY wp_posts.ID ${orderBy} 
                        LIMIT 1`
        return query;
    }

    // insert into posts ( create new post)
    export function insertPost(body){

        const {
            post_author,
            post_date,
            post_title,
            post_content,
            post_excerpt,
            post_content_2,
            post_excerpt_2,
            post_status,
            post_layout,
            post_embed_script,
            post_embed_html,
            ping_status,
            post_password,
            post_name,
            to_ping,
            pinged,
            post_modified,
            post_content_filtered,
            post_parent,
            guid,
            menu_order,
            post_type,
            post_mime_type,
        } = body;

        const query =   `INSERT INTO wp_posts 
                        (
                            post_author,
                            post_date,
                            post_title,
                            post_status,
                            post_content,
                            post_excerpt,
                            post_content_2,
                            post_excerpt_2,
                            post_name,
                            to_ping,
                            pinged,
                            post_content_filtered,
                            post_layout
                        )
                        VALUES 
                        (
                            '${post_author}',
                            '${post_date}',
                            '${post_title}',
                            '${post_content}',
                            '${post_excerpt}',
                            '${post_content_2}',
                            '${post_excerpt_2}',
                            '${post_name}',
                            '${to_ping}',
                            '${pinged}',
                            '${post_content_filtered}',
                            '${post_status}',
                            '${post_layout}',
                            '${post_embed_script}',
                            '${post_embed_html}'
                        );`

        return query;   
        
    }

    // insert gallery into post
    export function insertGalleryToPost(body){
        const { postId, galleryId } = body;
        const query = `INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('${postId}','_post_gallery','${galleryId}');`
        return query
    }

    // update gallery to post
    export function updateGalleryToPost(body){
        const { postId, galleryId } = body;
        const query = `UPDATE wp_postmeta SET post_id='${postId}',meta_key='_post_gallery',meta_value='${galleryId}' WHERE post_id='${postId}'`
        return query
    }

    // update post
    export function updatePost(body){
        const {
            ID,
            post_author,
            post_date,
            post_date_gmt,
            post_title,
            post_content,
            post_excerpt,
            post_content_2,
            post_excerpt_2,
            post_status,
            post_layout,
            post_embed_script,
            post_embed_html,
            ping_status,
            post_password,
            post_name,
            to_ping,
            pinged,
            post_modified,
            post_modified_gmt,
            post_content_filtered,
            post_parent,
            guid,
            menu_order,
            post_type,
            post_mime_type,
            postId
        } = body;
        
        const query =   `UPDATE wp_posts
                        SET post_title='${post_title}',
                            post_content='${post_content}',
                            post_excerpt='${post_excerpt}',
                            post_content_2='${post_content_2}',
                            post_excerpt_2='${post_excerpt_2}',
                            post_status='${post_status}',
                            post_layout='${post_layout}',
                            post_name='${post_name}',
                            to_ping='${to_ping}',
                            pinged='${pinged}',
                            post_modified='${post_modified}',
                            post_content_filtered='${post_content_filtered}',
                            post_parent='${post_parent}',
                            guid='${guid}',
                            menu_order='${menu_order}',
                            post_type='${post_type}',
                            post_mime_type='${post_mime_type}',
                            post_embed_script='${post_embed_script}',
                            post_embed_html='${post_embed_html}'
                        WHERE ID='${postId}'
                        `
        return query
    }

    // delete post 
    export function deletePost(postId){
        const query = `DELETE FROM wp_posts WHERE ID='${postId}';`
        return query
    }

/* /POSTS */