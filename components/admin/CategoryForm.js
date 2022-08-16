import React, {Suspense } from 'react';
import dynamic from 'next/dynamic'
import { useFormik } from 'formik';
import axios from 'axios';
import styles from 'styles/Form.module.css';
import * as Yup from 'yup';

const DynamicTiptapEditor =  dynamic(() => import('../tiptap/TipTapEditor'), {
    suspense:true
})
const CategoryForm = ({category}) => {

    const formik = useFormik({
        initialValues: {
            name: category ? category.name : '',
            description: category ? category.description : '',
            parent: category ? category.parent : '',
            count: category ? category.count : '',
            taxonomy: category ? category.taxonomy : '',
            term_group: category ? category.term_group : '',
            term_id: category ? category.term_id : '',
            term_taxonomy_id: category ? category.term_taxonomy_id : ''
        },
        validationSchema:  Yup.object().shape({
            name:Yup.string().required('Name is required!')
        }),
        onSubmit: values => {
            
            axios({
                method: category ? 'put' : 'post',
                url: `/api/categories${category ? "/" + category.term_id : ''}`,
                data: { 
                    ...values,
                    slug:values.name.split(' ').join('-').toLowerCase() 
                }
            }).then((response) => {
                console.log(response,"response on category (put or post)");
                if (response.data){
                    window.location.href = `/admin/categories/${category ? category.term_id : response.data.insertId}`
                }
            }, (error) => {
                console.log(error, "ERROR on post / put category");
            });

        },
    });

    return (
        <div className={styles.container}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles['form-row']}>
                    <label htmlFor="name">CATEGORY NAME</label>
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
                    <label htmlFor='description'>CATEGORY DESCRIPTION</label>
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
            </form>
        </div>
    )
}

export default CategoryForm