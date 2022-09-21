import React, { useEffect } from 'react';

import dateTimeHelper from 'helpers/dateTimeHelper';
import axios from 'axios';
import renderToString from 'helpers/renderToString';

import { setFeed } from 'store/fbdata/fbDataSlice';
import { useDispatch, useSelector } from 'store/hooks';

import styles from './StylesFeed.module.css';
import { isUpdatedToday } from 'helpers/checkIfUpdatedToday';
import FacebookPosts from './FacbookPosts';

const FacebookFeed = ({fbt}) => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.fbData.feed);

  useEffect(() => {
    fetchFacebookFeedFromDb()
    // fetchFacebookFeedFromFb()
  },[])

  useEffect(() => {
    if (fbt && fbt !== null) {
      if (!feed || !isUpdatedToday(feed.date_updated)) fetchFacebookFeedFromFb();
    }
  }, [fbt]);

  async function fetchFacebookFeedFromDb(){
    const res = await fetch('/api/fbfeed')
    const feedRes = await res.json()
    dispatch(setFeed(feedRes[0]));
  }

  // each fbpost has a attachment.data => array, every data has a type, theres if its their photo its photo, if its a shared hen its smt else
  async function fetchFacebookFeedFromFb() {
    const fields =
      'id,likes.summary(true).limit(0),comments.summary(true).limit(0),reactions,shares,attachments,full_picture,message,from,permalink_url,created_time';
    const fbFetchUrl = `https://graph.facebook.com/998665673528998/feed?limit=8&fields=${fields}&access_token=${fbt}`;
    const res = await fetch(fbFetchUrl);
    const fetchedFeed = await res.json();

    // remove all the weird characters from the content to avoid mySql errors
    if (fetchedFeed.data && fetchedFeed.data.length > 0) {
      const renderedFeed = renderToString(fetchedFeed.data);
      const data = {
        content: renderedFeed,
        date_updated: dateTimeHelper(new Date()),
        type: 'posts',
      };

      axios({
        method: 'post',
        url: `/api/fbfeed`,
        data,
      }).then(
        (response) => {
          console.log(data, ' DATA ');
          dispatch(setFeed(data));
        },
        (error) => {
          console.log(error, 'ERROR on create fb feed record');
        }
      );
    }
  }

  return (
    <section className={styles.facebookPage}>
      <h2>News from our facebook</h2>
      <FacebookPosts feed={feed} />
    </section>
  );
};

export default FacebookFeed;
