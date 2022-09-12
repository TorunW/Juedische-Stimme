import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic'
import { useFormik } from 'formik';
import axios from 'axios';
import styles from 'components/admin/Forms.module.css';
import { useDispatch, useSelector } from 'store/hooks'

const TiptapEditor =  dynamic(() => import('components/tiptap/TipTapEditor'), {
    suspense:true
})

const AboutInfoForm = ({aboutInfo}) => {
    
    const { galleries } = useSelector(state => state.galleries)
    const [ selectedGalleryId, setSelectedGalleryId ] = useState(aboutInfo.about_gallery_id)

    const formik = useFormik({
        initialValues: {
            ...aboutInfo
        },
        onSubmit: values => {
            axios({
                method: 'put',
                url: `/api/aboutinfo`,
                data: { 
                    ...values,
                }
            }).then((response) => {
                console.log(response,"response on aboutinfo (put)");
            }, (error) => {
                console.log(error, "ERROR on put aboutinfo");
            });
        },
    });

    return (
        <div className={styles.container}>
            <form onSubmit={formik.handleSubmit}>
                <h2>HEADER SLOGAN</h2>
                <div className={styles['form-row']}>
                    <Suspense fallback={"LOADING..."}>
                        <TiptapEditor
                            onChange={val => formik.setFieldValue('header_slogan',val,true)}
                            value={formik.values.header_slogan}
                            height={200}
                        />
                    </Suspense>
                </div>

                <h2>ABOUT SECTION</h2>
                <div className={styles['form-row']}>
                    <label htmlFor="text_top">Top Text</label>
                    <Suspense fallback={"LOADING..."}>
                        <TiptapEditor
                            onChange={val => formik.setFieldValue('text_top',val,true)}
                            value={formik.values.text_top}
                        />
                    </Suspense>
                </div>
                
                <div className={styles['form-row']}>
                    <label htmlFor="about_gallery_id">Gallery</label>
                    <Suspense fallback={"LOADING..."}>
                        <input
                            id="about_gallery_id"
                            name="about_gallery_id"
                            type="about_gallery_id"
                            onChange={formik.handleChange}
                            value={formik.values.about_gallery_id}
                        />
                    </Suspense>
                </div>

                <select value={selectedGalleryId} onChange={e => setSelectedGalleryId(e.target.value)}>
                    <option value={null}>Select Gallery</option>
                    {galleries.map((gallery,index) => (
                        <option key={Date.now() + index} value={gallery.gallery_id}>{gallery.gallery_name}</option>
                    ))}
                </select>

                <div className={styles['form-row']}>
                    <label htmlFor="text_bottom">Bottom Text</label>
                    <Suspense fallback={"LOADING..."}>
                        <TiptapEditor
                            onChange={val => formik.setFieldValue('text_bottom',val,true)}
                            value={formik.values.text_bottom}
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

export default AboutInfoForm