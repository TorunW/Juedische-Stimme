import React, {useState, useEffect} from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import styles from 'styles/Form.module.css';

const MenuItemForm = ({menuItem}) => {

    const [ searchPhrase, setSearchPhrase ] = useState('')
    const [ postOptions , setPostOptions ] = useState([])
    const [ showPostOptions, setShowPostOptions ] = useState(false)

    const formik = useFormik({
        initialValues: {
            term_id: menuItem ? menuItem.term_id : '',
            post_title: menuItem ? menuItem.post_title : '',
            post_id: menuItem ? menuItem.ID : '',
            post_name: menuItem ? menuItem.post_name : '',
            taxonomy: menuItem ? menuItem.taxonomy : 'main_menu',
            previousTaxonomy: menuItem ? menuItem.taxonomy : '',
            title: menuItem ? menuItem.title : '',
            link: menuItem ? menuItem.link : '',
            term_order: menuItem ? menuItem.term_order : ''
        },
        onSubmit: values => {
            axios({
                method: menuItem ? 'put' : 'post',
                url: `/api/menus${menuItem ? "/" + menuItem.term_id : ''}`,
                data: { 
                    ...values
                }
            }).then((response) => {
                console.log(response,"response on menuItem (put or post)");
                window.location.href = '/admin/menus'
            }, (error) => {
                console.log(error, "ERROR on post / put menuItem");
            });
        },
    });

    useEffect(() => {
        if (searchPhrase && searchPhrase.length > 3){
            setShowPostOptions(true)
            getPostsBySearchPhrase()
        } else {
            setShowPostOptions(false)
            setPostOptions([])
        }
    },[searchPhrase])

    useEffect(() => {
        if (!menuItem){
            setSearchPhrase(formik.values.post_title)
        }
    },[formik.values.post_title])

    async function getPostsBySearchPhrase(){
        const res  = await fetch(`/api/search/posts/${searchPhrase}`)
        const data = await res.json();
        setPostOptions(data)
    }

    function onPostOptionClick(po){
        formik.setFieldValue('post_title',po.post_title); 
        formik.setFieldValue('post_name',po.post_name); 
        formik.setFieldValue('post_id',po.postId); 
        setPostOptions([]);
        setTimeout(() => {
            setShowPostOptions(false)                                    
        }, 50);
    }

    let postOptionsDisplay;
    if (postOptions && showPostOptions === true){
        postOptionsDisplay = postOptions.map((po,index)=>(
            <li key={index}>
                <a 
                    onClick={() => onPostOptionClick(po)}>
                    {po.post_title}
                </a>
            </li>
        ))
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
                    <label htmlFor="post_title">POST</label>
                    <input
                        id="post_title"
                        name="post_title"
                        type="post_title"
                        placeholder='Find post by title...'
                        onFocus={() => setShowPostOptions(true)}
                        onChange={formik.handleChange}
                        value={formik.values.post_title}
                        disabled={menuItem ? true : false}
                    />
                    <ul>{postOptionsDisplay}</ul>
                </div>
                <div className={styles['form-row']}>
                    <label htmlFor="taxonomy">Menu</label>
                    <select 
                        id="taxonomy"
                        name="taxonomy"
                        type="taxonomy"
                        value={formik.values.taxonomy} 
                        onChange={formik.handleChange}>
                        <option value={'main_menu'}>Main Menu</option>
                        <option value={'footer_menu'}>Footer Menu</option>
                        <option value={'socials_menu'}>Socials Menu</option>
                        <option value={'call_to_action_menu'}>Call to Action Menu</option>
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
                <div className={styles['form-row']}>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default MenuItemForm