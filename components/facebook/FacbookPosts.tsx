import { ReactElement } from 'react';
import FacebookPost from './FacebookPost';
import styles from './StylesFeed.module.css';

type Props = {
  feed: any;
};

const FacebookPosts: React.FC<Props> = ({ feed }) => {
  let feedDisplay: ReactElement;
  if (feed && feed.content && feed.content.length > 0) {
    const feedArray = JSON.parse(feed.content);
    feedDisplay = feedArray.map((fbPost:any, index:number) => {
      // here we need to add some logic to filter
      return <FacebookPost key={index} post={fbPost} />;
    });
  }

  return <div className={styles.facebookPosts}>{feedDisplay}</div>;
};

export default FacebookPosts;
