import React from 'react'
import styles from 'components/posts/ListStyles.module.css';
import Script from 'next/script';

const PostPageEmbededContent = ({script,html}) => {
    return (
        <div className={styles.contentContainer}>
            <Script strategy='lazyOnload' src={script}></Script>
            <div dangerouslySetInnerHTML={{__html:html}}></div>
        </div>
    )
}

export default PostPageEmbededContent