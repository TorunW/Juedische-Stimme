import React, {useState, Suspense } from 'react';
import dynamic from 'next/dynamic'
import { useFormik } from 'formik';
import axios from 'axios';
import styles from 'components/admin/Forms.module.css';

import * as Yup from 'yup';
import Image from 'next/image';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import { generateFileName } from 'helpers/generateFileName';
import { uuidv4 } from '@firebase/util';

const DynamicTiptapEditor =  dynamic(() => import('../tiptap/TipTapEditor'), {
    suspense:true
})
const CategoryForm = ({category}) => {

    const [ previewImage, setPreviewImage ] = useState(null)
    const [ previewImageFile, setPreviewImageFile ] = useState(null)

    const formik = useFormik({
        initialValues: {
            name: category ? category.name : '',
            description: category ? category.description : '',
            parent: category ? category.parent : '',
            count: category ? category.count : '',
            taxonomy: category ? category.taxonomy : '',
            term_group: category ? category.term_group : '',
            term_id: category ? category.term_id : '',
            term_taxonomy_id: category ? category.term_taxonomy_id : '',
            category_image: category ? category.category_image : '',
            hasImage:category && category.category_image !== null ? true : false
        },
        validationSchema:  Yup.object().shape({
            name:Yup.string().required('Name is required!')
        }),
        onSubmit: values => {

            const requestsArray = []

            // POST IMAGE FILE ( FILE UPLOAD )
            const config = {
                headers: { 'content-type': 'multipart/form-data' },
                onUploadProgress: (event) => {
                    console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
                },
            };
    
            let categoryImageFileName = null;
            if (previewImageFile !== null){
                if (category){
                    if (category.category_image && category.category_image !== null){
                        const deleteFileUrl = `http://${window.location.hostname}${window.location.port !== '80' ? ':'+window.location.port : ""}/media/${category.category_image.split('/').join('+++')}`;
                        const deleteFileRequest = axios.delete(deleteFileUrl)
                        requestsArray.push(deleteFileRequest)
                    }
                }
                let fileType = previewImageFile.name.split('.')[previewImageFile.name.split.length - 1]
                categoryImageFileName = previewImageFile.name.split(`.${fileType}`)[0] + `__${uuidv4()}.${fileType}`
                const formData = new FormData();
                formData.append("theFiles", previewImageFile, categoryImageFileName);
                const categoryImageFileRequest = axios.post('/api/uploads', formData, config);
                requestsArray.push(categoryImageFileRequest)
            }

            const categoryRequest = axios({
                method: category ? 'put' : 'post',
                url: `/api/categories${category ? "/" + category.term_id : ''}`,
                data: { 
                    ...values,
                    slug:values.name.split(' ').join('-').toLowerCase(),
                    category_image:generateFileName(categoryImageFileName)

                }
            })

            requestsArray.push(categoryRequest)

            axios.all([...requestsArray]).then(axios.spread((...responses) => {
                let response = responses[responses.length - 1]
                console.log(response,"response on category (put or post)");
                if (response.data){
                    window.location.href = `/admin/categories/${category ? category.term_id : response.data.insertId}`
                }
            })).catch(errors => {
                console.log(errors, " ERRORS")
            })

        },
    });

    function onCategoryImageChange(event){
        // read file as data uri for preview, upload it on onSubmit
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setPreviewImage(reader.result)
        }, false);
        if (file){
          setPreviewImageFile(file)
        //   formik.setFieldValue('category_image', generateFileName(file.name))
          reader.readAsDataURL(file);
        }
      }
    

    console.table(formik.values)

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
                    {formik.errors && formik.errors.name ? <div className={styles.error}>{formik.errors.name.toString()}</div> : ""}
                </div>

                <div id="category_image" className={styles['form-row']}>
                    <div className={styles['form-row']}>
                        <label htmlFor="category_image">CATEGORY IMAGE</label>
                        <div>
                            <input
                                id="category_image"
                                name="category_image"
                                type="file"
                                onChange={onCategoryImageChange}
                            />

                            {
                            previewImage !== null ?
                                <Image layout='fixed' width={320} height={180} src={previewImage}/> :
                                category && category.category_image ?
                                <Image layout='fixed' width={320} height={180}  src={generateImageUrl(category.category_image)}/> :
                            ''
                            }
                        </div>
                    </div>
                </div>

                <div className={styles['form-row']}>
                    <label htmlFor='description'>CATEGORY DESCRIPTION</label>
                    <Suspense fallback={"LOADING..."}>
                        <DynamicTiptapEditor
                            onChange={val => formik.setFieldValue('description',val,true)}
                            value={formik.values.description}
                        />
                    </Suspense>
                </div>
                <div className={styles['form-row']}>
                    <button type="submit">{category ? "update category" : "create category"}</button>
                </div>
            </form>
        </div>
    )
}

export default CategoryForm