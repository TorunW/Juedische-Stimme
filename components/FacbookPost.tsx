import { useDispatch, useSelector } from 'react-redux';

import styles from 'styles/FacebookFeed.module.css';

function FacebookPost({ feed }) {
  let feedDisplay;
  if (feed && feed.content && feed.content.length > 0) {
    const feedArray = JSON.parse(feed.content);
    feedDisplay = feedArray.map((fbPost, index) => {
      return (
        <div key={index} className={styles.postContainer}>
          <div className={styles.imgContainer}>
            <img src={fbPost.full_picture} />
          </div>
          <p style={{ color: 'red' }}>
            {fbPost.message.length > 100
              ? `${fbPost.message.substring(0, 100)}[...]`
              : fbPost.message}
          </p>
        </div>
      );
    });
  }

  return <div>{feedDisplay}</div>;
}

export default FacebookPost;
