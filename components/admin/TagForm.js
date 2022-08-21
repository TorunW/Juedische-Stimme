import React, {useState, useEffect} from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import styles from 'components/forms/Styles.module.css';

const TagForm = ({tag}) => {

    console.log(tag, " TAG ")

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
                // window.location.href = '/admin/tags'
            }, (error) => {
                console.log(error, "ERROR on post / put tag");
            });
        },
    });

    console.log(formik.values)

    return (
        <div className={styles.container}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles['form-row']}>
                    <label htmlFor="name">TAG NAME</label>
                    <input
                        id="name"
                        name="name"
                        type="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                </div>
                <div className={styles['form-row']}>
                    <label htmlFor="name">TAG DESCRIPTION</label>
                    <textarea
                        id="description"
                        name="description"
                        type="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                </div>
                <div className={styles['form-row']}>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default TagForm