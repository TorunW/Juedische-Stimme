import React, {Suspense } from 'react';
import dynamic from 'next/dynamic'
import { useFormik } from 'formik';
import axios from 'axios';
import styles from 'components/forms/Styles.module.css';
import * as Yup from 'yup';

const TipTapEditor =  dynamic(() => import('../tiptap/TipTapEditor'), {
    suspense:true,
    loading: () => <p>Loading...</p>
})

const PostTranslationsForm = ({post,language}) => {

    const formik = useFormik({
        initialValues: {
            language,
            post_id:post.postId,
            title:post[`post_title_translation_${language}`] ? post[`post_title_translation_${language}`] : '',
            content:post[`post_content_translation_${language}`] ? post[`post_content_translation_${language}`] : '',
            excerpt:post[`post_excerpt_translation_${language}`] ? post[`post_excerpt_translation_${language}`] : '',
            content_2:post[`post_content_2_translation_${language}`] ? post[`post_content_2_translation_${language}`] : '',
            excerpt_2:post[`post_excerpt_2_translation_${language}`] ? post[`post_excerpt_2_translation_${language}`] : '',
        },
        // validationSchema:  Yup.object().shape({
        //     title:Yup.string().min(3,'Title must be at least 3 characters long!').required('Title is required!'),
        //     excerpt:Yup.string().required('Excerpt is required!'),
        //     content:Yup.string().required('Content is required!')
        // }),
        onSubmit: values => {
            axios({
                method: post[`post_title_translation_${language}`] ? 'put' : 'post',
                url: `/api/posts/${post.postId}/translation`,
                data: { 
                    ...values
                }
            }).then((response) => {
                console.log(response,"response on translation (put or post)");
                window.location.reload()
            }, (error) => {
                console.log(error, "ERROR on post / put translation");
            });
        },
    });
    
    const { errors } = formik;

    return (
        <div className={styles.container}>
            <form onSubmit={formik.handleSubmit}>

                <div className={styles['form-row']}>
                    <label htmlFor="name">Post Title ({language})</label>
                    <input
                        id={"title"}
                        name={"title"}
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    {errors && errors.title ? <div className={styles.error}>{errors.title.toString()}</div> : ""}
                </div>

                <div className={styles['form-row']}>
                    <label htmlFor='post_content'>Post Summary ({language})</label>
                    <Suspense>
                        <TipTapEditor
                            onChange={(val:string)  => formik.setFieldValue('excerpt',val,true)}
                            value={formik.values.excerpt}
                            itemType={'post'}
                            itemId={post.postId}
                            height={150}
                        />
                    </Suspense>
                    {errors && errors.excerpt ? <div className={styles.error}>{errors.excerpt.toString()}</div> : ""}
                </div>

                <div className={styles['form-row']}>
                    <label htmlFor='description'>Post Content ({language})</label>
                    <Suspense fallback={"LOADING..."}>
                        <TipTapEditor
                            onChange={val => formik.setFieldValue('content',val,true)}
                            value={formik.values.content}
                        />
                    </Suspense>
                    {errors && errors.content ? <div className={styles.error}>{errors.content.toString()}</div> : ""}
                </div>
                <div className={styles['form-row']}>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default PostTranslationsForm