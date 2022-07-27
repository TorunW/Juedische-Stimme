import React, {Suspense } from 'react';
import dynamic from 'next/dynamic'
import { useFormik } from 'formik';
import axios from 'axios';
import styles from 'styles/Form.module.css';
import * as Yup from 'yup';

const DynamicTiptapEditor =  dynamic(() => import('../tiptap/TipTapEditor'), {
    suspense:true
})
const PostTranslationsForm = ({post,language}) => {

    // console.log(category)

    const formik = useFormik({
        initialValues: {
            // name: category ? category.name : '',
            // description: category ? category.description : '',
            // parent: category ? category.parent : '',
            // count: category ? category.count : '',
            // taxonomy: category ? category.taxonomy : '',
            // term_group: category ? category.term_group : '',
            // term_id: category ? category.term_id : '',
            // term_taxonomy_id: category ? category.term_taxonomy_id : ''
        },
        onSubmit: values => {
            
        },
    });

    return (
        <div className={styles.container}>
            {/* <form onSubmit={formik.handleSubmit}>
                <div className={styles['form-row']}>
                    <label htmlFor="name">Post Title ({language})</label>
                    <input
                        id="name"
                        name="name"
                        type="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors && formik.errors.name ? <div className={styles.error}>{formik.errors.name}</div> : ""}
                </div>
                <div className={styles['form-row']}>
                    <label htmlFor='description'>Post Content ({language})</label>
                    <Suspense fallback={"LOADING..."}>
                        <DynamicTiptapEditor
                            id="description"
                            name="description"
                            type="description"
                            onChange={val => formik.setFieldValue('description',val,true)}
                            value={formik.values.description}
                        />
                    </Suspense>
                </div>
                <div className={styles['form-row']}>
                    <button type="submit">Submit</button>
                </div>
            </form> */}
        </div>
    )
}

export default PostTranslationsForm