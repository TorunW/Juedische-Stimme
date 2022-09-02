import React, { useEffect, useState } from 'react'
import styles from 'components/posts/ListStyles.module.css';
import Script from 'next/script';

const PostPageEmbededContent = ({script,html}) => {
    console.log(script,html)
    const [ scriptIsSet, setScriptIsSet ] = useState(false)

  useEffect(() => {
    // if (scriptIsSet === false){
    //     var s = document.createElement('script');
    //     s.setAttribute('src', script);
    //     (document.body || document.head).appendChild(s);
    //     setScriptIsSet(true)
    // }
  }, [scriptIsSet]);

    return (
        <div className={styles.contentContainer}>
            <Script strategy='lazyOnload' src={script}></Script>
            <div dangerouslySetInnerHTML={{__html:html}}></div>
        </div>
    )
}

export default PostPageEmbededContent