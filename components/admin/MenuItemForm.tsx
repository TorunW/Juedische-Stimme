import React, {useState, useEffect} from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import styles from 'components/forms/Styles.module.css';
import Image from 'next/image';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import menuTypes from 'lib/menuTypes.json'
import { uuidv4 } from '@firebase/util';
import { generateFileName } from 'helpers/generateFileName';

const MenuItemForm = ({menuItem}) => {

    // console.log(menuItem, " MENU ITEM ")

    const [ previewImage, setPreviewImage ] = useState(null)
    const [ previewImageFile, setPreviewImageFile ] = useState(null)

    const formik = useFormik({
        initialValues: {
            term_id: menuItem ? menuItem.term_id : '',
            taxonomy: menuItem ? menuItem.taxonomy : 'main_menu',
            previousTaxonomy: menuItem ? menuItem.taxonomy : '',
            title: menuItem ? menuItem.title : '',
            link: menuItem ? menuItem.link : '',
            term_order: menuItem ? menuItem.term_order : '',
            term_image: menuItem ? menuItem.term_image : ''
        },
        onSubmit: values => {

            console.log(values, " values ")

            let requestsArray = [];

            const menuItemUrl = `/api/menus${menuItem ? "/" + menuItem.term_id : ''}`;
            const menuItemData = { 
                ...values
            }
            const menuItemRequest =  menuItem ? axios.put(menuItemUrl,menuItemData) : axios.post(menuItemUrl,menuItemData);
            requestsArray.push(menuItemRequest)

            if (previewImageFile !== null){
                
                // POST IMAGE FILE ( FILE UPLOAD )
                const config = {
                  headers: { 'content-type': 'multipart/form-data' },
                  onUploadProgress: (event) => {
                      console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
                  },
                };
                const formData = new FormData();
                formData.append("theFiles", previewImageFile, values.term_image);
                const termImageFileRequest = axios.post('/api/uploads', formData, config);
                requestsArray.push(termImageFileRequest)
      
                if (menuItem && menuItem.term_image){
                    const deleteFileUrl = `http://${window.location.hostname}${window.location.port !== '80' ? ':'+window.location.port : ""}/media/${menuItem.term_image.split('/').join('+++')}`;
                    const deleteFileRequest = axios.delete(deleteFileUrl)
                    requestsArray.push(deleteFileRequest)
                }
            }
            
            axios.all([...requestsArray]).then(axios.spread((...responses) => {
                console.log(responses, " RESPONSES")
                if (menuItem) window.location.reload()
                else window.location.href = `/admin/menus/${responses[0].insertId}` 
            })).catch(errors => {
                console.log(errors, " ERRORS")
            })

            // axios({
            //     method: menuItem ? 'put' : 'post',
            //     url: `/api/menus${menuItem ? "/" + menuItem.term_id : ''}`,
            //     data: { 
            //         ...values
            //     }
            // }).then((response) => {
            //     console.log(response,"response on menuItem (put or post)");
            //     window.location.href = '/admin/menus'
            // }, (error) => {
            //     console.log(error, "ERROR on post / put menuItem");
            // });
        },
    });


    function onTermImageChange(event){
        // read file as data uri for preview, upload it on onSubmit
        
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.addEventListener("load", () => {
          setPreviewImage(reader.result)
        }, false);

        if (file){
          setPreviewImageFile(file)
          let fileType = file.name.split('.')[file.name.split.length - 1]
          let fileName = file.name.split(`.${fileType}`)[0] + `__${uuidv4()}.${fileType}`
          formik.setFieldValue('term_image',generateFileName(fileName),true)
          reader.readAsDataURL(file);
        }
    }    

    return (
        <div className={styles.container}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles['form-row']}>
                    <label htmlFor="title">TITLE</label>
                    <input
                        id="title"
                        name="title"
                        type="title"
                        placeholder='Menu Item Title...'
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                </div>

                <div className={styles['form-row']}>
                    <label htmlFor="link">Link</label>
                    <input
                        id="link"
                        name="link"
                        type="link"
                        placeholder='Menu Item link...'
                        onChange={formik.handleChange}
                        value={formik.values.link}
                    />
                </div>

                <div className={styles['form-row']}>
                    <label htmlFor="taxonomy">Menu</label>
                    <select 
                        id="taxonomy"
                        name="taxonomy"
                        value={formik.values.taxonomy} 
                        onChange={formik.handleChange}>
                        {menuTypes.map((mt,index)=>(
                            <option key={index+Date.now()} value={mt}>{mt.split('_').join(' ').toLocaleUpperCase()}</option>
                        ))}
                    </select>
                </div>

                <div className={styles['form-row']}>
                    <label htmlFor="term_order">Order</label>
                    <input
                        id="term_order"
                        name="term_order"
                        type="term_order"
                        placeholder='Menu Item Order...'
                        onChange={formik.handleChange}
                        value={formik.values.term_order}
                    />
                </div>


                <div id="term-image" className={styles['form-row']}>

                    {
                        previewImage !== null ?
                        <Image layout='fixed' width={320} height={180} src={previewImage}/> :
                        menuItem && menuItem.term_image ?
                        <Image layout='fixed' width={320} height={180}  src={generateImageUrl(menuItem.term_image)}/> :
                        ''
                    }

                    <div className={styles['form-row']}>
                        <label htmlFor="term_image">POST IMAGE</label>
                        <input
                            id="term_image"
                            name="term_image"
                            type="file"
                            onChange={onTermImageChange}
                        />
                    </div>
                </div>

                <div className={styles['form-row']}>
                    <button type="submit">{menuItem ? 'update menu item' : 'create menu item'}</button>
                </div>
            </form>
        </div>
    )
}

export default MenuItemForm