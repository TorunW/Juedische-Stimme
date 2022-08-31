import React, { Suspense} from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import styles from 'components/forms/Styles.module.css';
import dynamic from 'next/dynamic';
const DynamicTiptapEditor =  dynamic(() => import('../tiptap/TipTapEditor'), {
    suspense:true
})

const TagForm = ({tag}) => {

    const formik = useFormik({
        initialValues: {
            term_id: tag ? tag.term_id : '',
            name: tag ? tag.name : '',
            slug: tag ? tag.slug : '',
            description: tag ? tag.description : '',
            count: tag ? tag.count : ''
        },
        onSubmit: values => {
            console.log(values)
            axios({
                method: tag ? 'put' : 'post',
                url: `/api/tags/tag/${tag ? "/" + tag.term_id : ''}`,
                data: { 
                    ...values,
                    slug: values.name.toLowerCase().split(' ').join('-')
                }
            }).then((response) => {
                console.log(response,"response on tag (put or post)");
                if (tag) window.location.href = `/admin/tags/${tag.term_id}`
                else window.location.href = `/admin/tags`
            }, (error) => {
                console.log(error, "ERROR on post / put tag");
            });
        },
    });

    return (
        <div className={styles.container}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles['form-row']}>
                    <label htmlFor="name">TAG NAME</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                </div>
                <div className={styles['form-row']}>
                    <label htmlFor="name">TAG DESCRIPTION</label>
                    <Suspense fallback={"LOADING..."}>
                        <DynamicTiptapEditor
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

export default TagForm