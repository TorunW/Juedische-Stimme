import React, { useState, Suspense, ReactElement } from 'react';
import dynamic from 'next/dynamic'
import { useFormik } from 'formik';
import axios from 'axios';
import dateTimeHelper from 'helpers/dateTimeHelper';
import styles from 'styles/Form.module.css';
import { useDispatch, useSelector } from 'store/hooks'
import { v4 as uuidv4 } from 'uuid';
import PostTagForm from './PostTagForm';
import { generateFileName } from 'helpers/generateFileName'
import { generateImageUrl } from 'helpers/imageUrlHelper'
import PostTranslationsForm from './PostTranslationsForm';
import PostTranslations from './PostTranslations';

const TipTapEditor =  dynamic(() => import('../tiptap/TipTapEditor'), {
  suspense:true,
  loading: () => <p>Loading...</p>
})

interface PostFormProps {
  post?: any;
  nextPostId?: string | number;
}

const PostForm = ({post,nextPostId}: PostFormProps) => {
  
  const tabs = ['post','translations']
  const { categories } = useSelector(state => state.categories);
  const { locales, defaultLocale } = useSelector(state => state.languages)

  const [ currentTab, setCurrentTab ] = useState('post')
  const [ previewImage, setPreviewImage ] = useState(null)
  const [ previewImageFile, setPreviewImageFile ] = useState(null)

  const formik = useFormik({
    initialValues: {
        post_author: post ? post.post_author : 2, // '' --> CHANGE THIS BACK!!!!,
        post_date: post ? post.post_date : '',
        post_date_gmt:post ? post.post_date_gmt : '',
        post_content:post ? post.post_content.replace(/(?:\r\n|\r|\n)/g, '<br>') : '',
        post_title:post ? post.post_title : '',
        post_excerpt: post ? post.post_excerpt : '',
        post_status: post ? post.post_status : '',
        ping_status: post ? post.ping_status : '',
        post_password: post ? post.post_password : '',
        post_name: post ? post.post_name : '',
        to_ping: post ? post.to_ping : '',
        pinged: post ? post.pinged : '',
        post_modified: post ? post.post_modified : '',
        post_modified_gmt: post ? post.post_modified_gmt : '',
        post_content_filtered: post ? post.post_content_filtered : '',
        post_parent: post ? post.post_parent : '',
        guid: post ? post.guid : '',
        menu_order: post ? post.menu_order : '',
        post_type: post ? post.post_type : '',
        post_mime_type:  post ? post.post_mime_type : '',
        categoryId: post ? post.categoryId : 2,
        post_image: post ? post.post_image : ''
    },
    onSubmit: values => {
        const requestsArray = [];

        // POST
        const postUrl = `/api/posts${post ? "/" + post.postId : ''}`
        const postData = {
            ...values,
            post_date:post ? post.post_date : dateTimeHelper(new Date()),
            // post_date_gmt: like post_date but one hour less
            post_name:values.post_title.replace(/\s+/g, '-').toLowerCase().replace(),
            post_modified: dateTimeHelper(new Date()),
            previousCategoryId: post ? post.categoryId : null,
            nextPostId
        }
        const postRequest = post ? axios.put(postUrl,postData) : axios.post(postUrl,postData);
        requestsArray.push(postRequest)
        
        if (previewImageFile !== null){
          
          if (post.post_image){
            const deleteFileUrl = `http://${window.location.hostname}${window.location.port !== '80' ? ':'+window.location.port : ""}/media/${post.post_image.split('/').join('+++')}`;
            const deleteFileRequest = axios.delete(deleteFileUrl)
            requestsArray.push(deleteFileRequest)
          }

          let fileType = previewImageFile.name.split('.')[previewImageFile.name.split.length - 1]
          let fileName = previewImageFile.name.split(`.${fileType}`)[0] + `__${uuidv4()}.${fileType}`

          const postImageUrl = `/api/posts/${post ?  + post.postId : nextPostId}/image`
          const postImageData = {
            meta_value: generateFileName(fileName)
          }
          const postImageRequest = post && post.post_image ? axios.put(postImageUrl,postImageData) : axios.post(postImageUrl,postImageData)
          requestsArray.push(postImageRequest)

          // POST IMAGE FILE ( FILE UPLOAD )
          const config = {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress: (event) => {
                console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
            },
          };
          const formData = new FormData();
          formData.append("theFiles", previewImageFile, fileName);
          const postImageFileRequest = axios.post('/api/uploads', formData, config);
          requestsArray.push(postImageFileRequest)

        }

        axios.all([...requestsArray]).then(axios.spread((...responses) => {
          console.log(responses, " RESPONSES")
            window.location.href = `/admin/posts/${values.post_title.replace(/\s+/g, '-').toLowerCase().replace()}` 
        })).catch(errors => {
            console.log(errors, " ERRORS")
        })
    },
  });

  function onPostImageChange(event){
    // read file as data uri for preview, upload it on onSubmit
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setPreviewImage(reader.result)
    }, false);
    if (file){
      setPreviewImageFile(file)
      reader.readAsDataURL(file);
    }
  }

  let selectCategoriesDisplay: ReactElement[];
  if (categories){
    selectCategoriesDisplay = categories.map((category,index)=>(
      <option key={Date.now() + index} value={category.term_id}>{category.name}</option>
    ))
  }

  let formDisplay: ReactElement;
  if (currentTab === 'post'){
    formDisplay = (
      <div className='post-form-tab' id="post-form">
        {post ? <p><a target={"_blank"} rel="noreferrer" href={"/"+post.post_name}>view post on live site</a></p> : ""}
        <form onSubmit={formik.handleSubmit}>
          <div className={styles['form-row']}>
            <label htmlFor="post_title">POST TITLE</label>
            <input
              id="post_title"
              name="post_title"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.post_title}
            />
          </div>

          <div id="post-image" className={styles['form-row']}>

            {
              previewImage !== null ?
              <img width={200} src={previewImage}/> :
              post && post.post_image ?
              <img width={200} src={generateImageUrl(post.post_image)}/> :
              ''
            }

            <div className={styles['form-row']}>
              <label htmlFor="post_image">POST IMAGE</label>
              <input
                id="post_image"
                name="post_image"
                type="file"
                onChange={onPostImageChange}
              />
            </div>

          </div>

          <div className={styles['form-row']}>
            <label htmlFor="categoryId">CATEGORY</label>
            <select 
              id="categoryId"
              name="categoryId"
              value={formik.values.categoryId} 
              onChange={formik.handleChange}>
              {selectCategoriesDisplay}
            </select>
          </div>

          <div className={styles['form-row']}>
            <label htmlFor='post_content'>Post Summary (?)</label>
            <Suspense>
              <TipTapEditor
                  onChange={(val:string)  => formik.setFieldValue('post_excerpt',val,true)}
                  value={formik.values.post_excerpt}
                  itemType={'post'}
                  itemId={post ? post.postId : nextPostId}
                  height={150}
              />
            </Suspense>
          </div>

          <div className={styles['form-row']}>
            <label htmlFor='post_content'>Post Content</label>
            <Suspense>
              <TipTapEditor
                  onChange={(val:string)  => formik.setFieldValue('post_content',val,true)}
                  value={formik.values.post_content}
                  itemType={'post'}
                  itemId={post ? post.postId : nextPostId}   
              />
            </Suspense>
          </div>
          <div className={styles['form-row']}>
            <PostTagForm 
              postId={post ? post.postId : nextPostId}
            />          
          </div>
          <div className={styles['form-row']}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  } else if (currentTab === 'translations'){

    console.log('WHAT')



    formDisplay = (
      <div className='post-form-tab' id="translations-form">
        <h2> TRANSLATIONS FORMS</h2>
        <PostTranslations 
          post={post}
          locales={locales}
          defaultLocale={defaultLocale}
        />
      </div>
    )
  }

  let tabMenuDisplay: ReactElement;
  if (post){
    const tabMenu: ReactElement[] = tabs.map((tab,index)=>(
      <li key={Date.now() + index}><a onClick={() => setCurrentTab(tab)}>{tab}</a></li>
    ))
    tabMenuDisplay = <ul>{tabMenu}</ul>
  }

  return (
    <div className={styles.container}>
      {tabMenuDisplay}
      {formDisplay}
    </div>
  );
};

export default PostForm;