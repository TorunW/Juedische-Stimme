import React, {Suspense } from 'react';
import dynamic from 'next/dynamic'
import { useFormik } from 'formik';
import axios from 'axios';
import dateTimeHelper from 'helpers/dateTimeHelper';
import styles from 'styles/Form.module.css';
// import TipTapEditor from '../tiptap/TipTapEditor';

const TipTapEditor =  dynamic(() => import('../tiptap/TipTapEditor'), {
  suspense:true,
  // loading: () => <p>Loading...</p>
})

import PostTagForm from './PostTagForm';

const PostForm = ({post,nextPostId,categories}) => {

  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
        post_author: post ? post.post_author : 2, // '' --> CHANGE THIS BACK!!!!,
        post_date: post ? post.post_date : '',
        post_date_gmt:post ? post.post_date_gmt : '',
        post_content:post ? post.post_content.replace(/(?:\r\n|\r|\n)/g, '<br>') : '',
        post_title:post ? post.post_title : '',
        post_excerpt: post ? post.post_excerpt : '',
        post_status: post ? post.post_status : '',
        comment_status: post ? post.comment_status : '',
        ping_status: post ? post.ping_status : '',
        post_password: post ? post.post_password : '',
        post_name: post ? post.post_name : '',
        to_ping: post ? post.to_ping : '',
        pinged: post ? post.pinged : '',
        post_modified: post ? post.post_modified : '',
        post_modified_gmt: post ? post.post_modified_gmt : '',
        post_content_filtered: post ? post.post_content_filtered : '',
        post_parent: post ? post.post_parent : '',
        guid: post ? post.guid : '',
        menu_order: post ? post.menu_order : '',
        post_type: post ? post.post_type : '',
        post_mime_type:  post ? post.post_mime_type : '',
        comment_count: post ? post.comment_count : '',
        menu_type: post ? post.menu_type : '',
        categoryId: post ? post.categoryId : 2
    },
    onSubmit: values => {

        axios({
            method: post ? 'put' : 'post',
            url: `/api/posts${post ? "/" + post.postId : ''}`,
            data: {
                ...values,
                post_date:post ? post.post_date : dateTimeHelper(new Date()),
                // post_date_gmt: like post_date but one hour less
                post_name:values.post_title.replace(/\s+/g, '-').toLowerCase().replace(),
                post_modified: dateTimeHelper(new Date()),
                previousCategoryId: post ? post.categoryId : null,
                nextPostId
            }
        }).then((response) => {
            if (!post) window.location.href = `/admin/posts/${values.post_title.replace(/\s+/g, '-').toLowerCase().replace()}` // BETTER FETCH THE POSTS THEN REFRESH PAGE
            else window.location.reload()
        }, (error) => {
            console.log(error, "ERROR on post");
            console.log('NOW NEEDS TO DISPLAY ERRORS!')
        });

    },
  });

  let selectCategoriesDisplay;
  if (categories){
    selectCategoriesDisplay = categories.map((category,index)=>(
      <option key={index} value={category.term_id}>{category.name}</option>
    ))
  }

  /* 
    TO DO: add translation forms per language in locales.
    translation will be a record in the wp_post_meta table in the db
  */

  return (
    <div className={styles.container}>
      {post ? <p><a target={"_blank"} rel="noreferrer" href={"/"+post.post_name}>view post on live site</a></p> : ""}
      <form onSubmit={formik.handleSubmit}>
        <div className={styles['form-row']}>
          <label htmlFor="post_title">POST TITLE</label>
          <input
            id="post_title"
            name="post_title"
            type="post_title"
            onChange={formik.handleChange}
            value={formik.values.post_title}
          />
        </div>
        <div className={styles['form-row']}>
          <label htmlFor="categoryId">CATEGORY</label>
          <select 
            id="categoryId"
            name="categoryId"
            type="categoryId"
            value={formik.values.categoryId} 
            onChange={formik.handleChange}>
            {selectCategoriesDisplay}
          </select>
        </div>
        <div className={styles['form-row']}>
          <label htmlFor='post_content'>Post Content</label>
          <Suspense fallback={`Loading...`}>
            <TipTapEditor
                id="post_content"
                name="post_content"
                type="post_content"
                onChange={val => formik.setFieldValue('post_content',val,true)}
                value={formik.values.post_content}
                itemType={'post'}
                itemId={post ? post.postId : nextPostId}   
            />
          </Suspense>
        </div>
        <div className={styles['form-row']}>
          <PostTagForm 
            postId={post ? post.postId : nextPostId}
          />          
        </div>
        <div className={styles['form-row']}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;