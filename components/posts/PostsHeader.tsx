import Image from 'next/image';
import React from 'react'
import styles from './Styles.module.css';
import postHeader from 'public/post-header.jpg';
import { useSelector } from 'store/hooks';

const PostsHeader = () => {
    const { category } = useSelector(state => state.categories)
    const { tag } = useSelector(state => state.tags)

    return (
        <div className={styles.header}>
            <div className={styles.imageWrapper}>
            <div className={styles.backgroundOverlay}></div>
            <Image
                src={postHeader}
                className={styles.headerImage}
                layout='fill'
                objectFit='cover'
            />
            </div>
            <h1>{category ? category.name : tag ? tag.name : ""}</h1>
            <div dangerouslySetInnerHTML={{__html:category.description}}></div>
        </div>
    )
}

export default PostsHeader
