import Image from 'next/image';
import React from 'react'
import styles from './Styles.module.css';
import postHeader from 'public/post-header.jpg';
import { useSelector } from 'store/hooks';
import { generateImageUrl } from 'helpers/imageUrlHelper';

const PostsHeader = () => {
    const { category } = useSelector(state => state.categories)
    const { tag } = useSelector(state => state.tags)

    let title: string,
        description: string;

    if (category){
        title = category.name;
        description = category.description;
    } else if (tag) {
        title = tag.name;
        description = tag.description;
    }

    return (
        <div className={styles.header}>
            <div className={styles.imageWrapper}>
            <div className={styles.backgroundOverlay}></div>
            <Image
                src={category && category.category_image ? generateImageUrl(category.category_image) : postHeader}
                className={styles.headerImage}
                layout='fill'
                objectFit='cover'
            />
            </div>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{__html:description}}></div>
        </div>
    )
}

export default PostsHeader
