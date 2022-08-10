import Link from 'next/link';
import FacebookPost from './FacebookPost';
import styles from 'styles/FacebookFeed.module.css';

type Props = {
  feed: any;
};

const FacebookPosts: React.FC<Props> = ({ feed }) => {
  let feedDisplay;
  if (feed && feed.content && feed.content.length > 0) {
    const feedArray = JSON.parse(feed.content);
    feedDisplay = feedArray.map((fbPost, index) => {
      return <FacebookPost key={index} post={fbPost} />;
    });
  }

  return <div className={styles.facebookPosts}>{feedDisplay}</div>;
};

export default FacebookPosts;
