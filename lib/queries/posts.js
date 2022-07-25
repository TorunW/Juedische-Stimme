/* POSTS */

    const selectPostSubQueries =    `(
                                        SELECT wp_term_taxonomy.term_id
                                        FROM wp_term_relationships
                                        INNER JOIN wp_term_taxonomy ON wp_term_taxonomy.term_id=wp_term_relationships.term_taxonomy_id
                                        WHERE wp_term_relationships.object_id=wp_posts.ID AND wp_term_taxonomy.taxonomy='category'
                                        LIMIT 1
                                    ) as categoryId, (
                                        SELECT wp_terms.name 
                                        FROM wp_terms 
                                        WHERE wp_terms.term_id=categoryId
                                        LIMIT 1
                                    ) as categoryName, (
                                        SELECT GROUP_CONCAT(wp_terms.slug separator ',')
                                        FROM wp_term_relationships
                                        INNER JOIN wp_terms ON wp_terms.term_id = wp_term_relationships.term_taxonomy_id
                                        WHERE wp_term_relationships.object_id = wp_posts.ID AND wp_term_relationships.term_taxonomy_id != categoryId
                                    ) as tagNames, (
                                        SELECT GROUP_CONCAT(wp_terms.term_id separator ',')
                                        FROM wp_term_relationships
                                        INNER JOIN wp_terms ON wp_terms.term_id = wp_term_relationships.term_taxonomy_id
                                        WHERE wp_term_relationships.object_id = wp_posts.ID AND wp_term_relationships.term_taxonomy_id != categoryId
                                    ) as tagIds`

    // select posts by args
    export function selectPosts(body){

        const { numberOfPosts,pageNum,showUnpublished,postType,fieldsList } = body

        let postFields = ' wp_posts.* ,';
        if (fieldsList && fieldsList.length > 0){
            postFields = '';
            fieldsList.forEach(function(field,index){
                postFields += `wp_posts.${field} ,`
            })
        }

        let whereCondition = "", isAnd = false;
        if (!showUnpublished){
            whereCondition += `WHERE post_status='publish' `
            isAnd = true;
        }
        if (postType && postType !== null){
            whereCondition += `${isAnd ? "AND" : "WHERE"} post_type='${postType}'`
            isAnd = true;
        }

        const query =   `SELECT wp_posts.ID as postId, ${postFields} wp_users.user_nicename as username,
                        ${selectPostSubQueries}
                        FROM wp_posts 
                        LEFT JOIN wp_users ON wp_posts.post_author=wp_users.ID
                        ${whereCondition}
                        ORDER BY post_date DESC
                        LIMIT ${numberOfPosts}
                        OFFSET ${pageNum ? (pageNum - 1)  * numberOfPosts : 0}
                        `
        return query
    }

    // select a single post by name

    export function selectPostByName(body){

        const { name,showUnpublished } = body

        const query =   `SELECT wp_posts.ID as postId, wp_posts.*, wp_users.user_nicename as username,
                        ${selectPostSubQueries}, wp_postmeta.meta_value as galleryId
                        FROM wp_posts 
                        LEFT JOIN wp_users ON wp_posts.post_author=wp_users.ID
                        LEFT JOIN js_maxids ON js_maxids.table='posts'
                        LEFT JOIN wp_postmeta ON wp_postmeta.post_id=wp_posts.ID AND wp_postmeta.meta_key='_post_gallery'
                        WHERE post_name='${name}'
                        ${showUnpublished === true ? "" : "AND post_status='publish'"}
                        `

        return query
    }

    // select posts by tag slug

    export function selectPostsByTag(body){

        const { slug,numberOfPosts,pageNum,isCategory } = body
        
        const query =   `SELECT wp_posts.ID as postId, wp_posts.*, wp_users.user_nicename as username,
                        ${selectPostSubQueries}
                        FROM wp_terms
                        INNER JOIN wp_term_relationships ON wp_terms.term_id=wp_term_relationships.term_taxonomy_id
                        INNER JOIN wp_term_taxonomy ON wp_terms.term_id=wp_term_taxonomy.term_id
                        INNER JOIN wp_posts ON wp_term_relationships.object_id=wp_posts.ID
                        LEFT JOIN wp_users ON wp_posts.post_author=wp_users.ID
                        WHERE wp_terms.slug='${slug}' ${isCategory === true ? " AND wp_term_taxonomy.taxonomy='category' " : ""}
                        ORDER BY wp_posts.ID DESC
                        LIMIT ${numberOfPosts}
                        OFFSET ${pageNum ? (pageNum - 1)  * numberOfPosts : 0}
                        `
                        
        return query;
    }

    export function selectPostsBySearchPhrase(body){
        const { phrase,numberOfPosts,pageNum } = body
        const query =   `SELECT wp_posts.ID as postId, wp_posts.*, wp_users.user_nicename as username,
                        ${selectPostSubQueries}
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

    // insert into posts ( create new post)
    export function insertPost(body){

        const {
            post_author,
            post_date,
            post_date_gmt,
            post_content,
            post_title,
            post_excerpt,
            post_status,
            comment_status,
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
            comment_count,
            menu_type
        } = body;

        const query =   `INSERT INTO wp_posts 
                        (
                            post_author,
                            post_date,
                            post_title,
                            post_content,
                            post_excerpt,
                            post_name,
                            to_ping,
                            pinged,
                            post_content_filtered
                        )
                        VALUES 
                        (
                            '${post_author}',
                            '${post_date}',
                            '${post_title}',
                            '${post_content}',
                            '${post_excerpt}',
                            '${post_name}',
                            '${to_ping}',
                            '${pinged}',
                            '${post_content_filtered}'
                        );`

        return query;   
        
    }

    // insert gallery into post
    export function insertGalleryToPost(body){
        const { postId, galleryId } = body;
        const query = `INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('${postId}','_post_gallery','${galleryId}');`
        console.log(query, " QUERY ")
        return query
    }

    // update gallery to post
    export function updateGalleryToPost(body){
        const { postId, galleryId } = body;
        const query = `UPDATE wp_postmeta SET post_id='${postId}',meta_key='_post_gallery',meta_value='${galleryId}' WHERE post_id='${postId}'`
        console.log(query, " QUERY ")
        return query
    }

    // update post
    export function updatePost(body){
        console.log(body.postId)
        const {
            ID,
            post_author,
            post_date,
            post_date_gmt,
            post_content,
            post_title,
            post_excerpt,
            post_status,
            comment_status,
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
            comment_count,
            menu_type,
            postId
        } = body;
        
        const query =   `UPDATE wp_posts
                        SET post_title='${post_title}',
                            post_content='${post_content}',
                            post_excerpt='${post_excerpt}',
                            post_status='${post_status}',
                            comment_status='${comment_status}',
                            ping_status='${ping_status}',
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
                            menu_type='${menu_type}'
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