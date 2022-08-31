import { ReactElement } from 'react';
import FacebookPost from './FacebookPost';
import styles from './StylesFeed.module.css';

type Props = {
  feed: any;
};

const FacebookPosts: React.FC<Props> = ({ feed }) => {
  let feedDisplay: ReactElement;
  if (feed && feed.content && feed.content.length > 0) {
    let displayedPosts = 0, undisplayedPosts = 0;
    const feedArray = JSON.parse(feed.content);
    feedDisplay = feedArray.map((fbPost:any, index:number) => {
      if (displayedPosts < 4){
        let displayPost = true;
        if (undisplayedPosts < 4 && fbPost.attachments){
          fbPost.attachments.data.forEach(function(att:any){
            if (att.title == "This content isnt available right now"){
              displayPost = false;
              undisplayedPosts += 1;
            }
          })
        }
        if (displayPost){
          displayedPosts += 1;
          return <FacebookPost key={index} post={fbPost} />;
        }
      }
    });
  }

  return <div className={styles.facebookPosts}>{feedDisplay}</div>;
};

export default FacebookPosts;
