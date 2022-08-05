import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import styles from 'styles/FacebookFeed.module.css';

function FacebookPost({ feed }) {
  let feedDisplay;
  if (feed && feed.content && feed.content.length > 0) {
    const feedArray = JSON.parse(feed.content);
    feedDisplay = feedArray.map((fbPost, index) => {
      let sharedPostDisplay;
      if (fbPost.attachments) {
        sharedPostDisplay = fbPost.attachments.data.map((attPost, index) => {
          return (
            <div key={index}>
              <img src={attPost.media.image.src} width={'300px'} />
              <h4>{attPost.title}</h4>
              <p>berliner-zeitung.de</p>
              <p>{attPost.description}</p>
            </div>
          );
        });
      }

      let sharesCount;
      if (fbPost.shares) {
        sharesCount = Object.values(fbPost.shares);
      }

      let commentsCount;
      if (fbPost.comments) {
        commentsCount = fbPost.comments.data.length;
      }

      return (
        <div key={index} className={styles.postContainer}>
          <h4>{fbPost.from.name}</h4>
          <div className={styles.imgContainer}>
            <img src={!fbPost.attachments ? fbPost.full_picture : ''} />
          </div>
          <p>
            {fbPost.message.length > 100
              ? `${fbPost.message.substring(0, 100)}[...]`
              : fbPost.message}
          </p>
          {sharedPostDisplay}

          <div>
            {sharesCount} {commentsCount}
          </div>
          <div>
            <Link href={fbPost.permalink_url}>
              <p>View on Facebook</p>
            </Link>
          </div>
        </div>
      );
    });
  }

  return <div className={styles.facebookPosts}>{feedDisplay}</div>;
}

export default FacebookPost;
