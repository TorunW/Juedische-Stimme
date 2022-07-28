import React, {Suspense } from 'react';
import dynamic from 'next/dynamic'
import { useFormik } from 'formik';
import styles from 'styles/Form.module.css';

const DynamicTiptapEditor =  dynamic(() => import('../tiptap/TipTapEditor'), {
    suspense:true
})
const PostTranslationsForm = ({post,language}) => {

    console.log(language, " LANGUAGE")

    const formik = useFormik({
        initialValues: {
            language,
            post_id:post.postId,
            title:post[`post_title_translation_${language}`] ? post[`post_title_translation_${language}`] : '',
            content:post[`post_content_translation_${language}`] ? post[`post_content_translation_${language}`] : '',
            excerpt:post[`post_excerpt_translation_${language}`] ? post[`post_excerpt_translation_${language}`] : '',
        },
        onSubmit: values => {
            
        },
    });

    return (
        <div className={styles.container}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles['form-row']}>
                    <label htmlFor="name">Post Title ({language})</label>
                    <input
                        id={`post_title_translation_${language}`}
                        name={`post_title_translation_${language}`}
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                </div>
                <div className={styles['form-row']}>
                    <label htmlFor='description'>Post Content ({language})</label>
                    <Suspense fallback={"LOADING..."}>
                        <DynamicTiptapEditor
                            onChange={val => formik.setFieldValue('content',val,true)}
                            value={formik.values.content}
                        />
                    </Suspense>
                </div>
                <div className={styles['form-row']}>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default PostTranslationsForm