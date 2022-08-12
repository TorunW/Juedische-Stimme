import React, { useEffect } from 'react';

import dateTimeHelper from 'helpers/dateTimeHelper';
import axios from 'axios';
import renderToString from 'helpers/renderToString';

import { setFeed } from 'store/fbdata/fbDataSlice';
import { useDispatch, useSelector } from 'store/hooks';

import styles from 'styles/FacebookFeed.module.css';
import { isUpdatedToday } from 'helpers/checkIfUpdatedToday';
import FacebookPosts from './FacbookPosts';

const FacebookFeed = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.fbData.token);
  const feed = useSelector((state) => state.fbData.feed);

  useEffect(() => {
    if (token) {
      initFacebookFeed();
      // fetchFacebookFeed()
    }
  }, [token]);

  async function initFacebookFeed() {
    if (!feed) {
      fetchFacebookFeed();
    } else {
      if (!isUpdatedToday(feed.date_updated)) fetchFacebookFeed();
    }
  }

  // each fbpost has a attachment.data => array, every data has a type, theres if its their photo its photo, if its a shared hen its smt else
  async function fetchFacebookFeed() {
    const fields =
      'id,likes,reactions,comments,shares,attachments,full_picture,message,from,permalink_url,created_time';
    const fbFetchUrl = `https://graph.facebook.com/998665673528998/feed?limit=21&fields=${fields}&access_token=${token}`;
    console.log(fields, ' FIELDS ');
    console.log(fbFetchUrl, ' FETCH URL');
    const res = await fetch(fbFetchUrl);
    const fetchedFeed = await res.json();

    // remove all the weird characters from the content to avoid mySql errors
    if (fetchedFeed.data && fetchedFeed.data.length > 0) {
      const renderedFeed = renderToString(fetchedFeed.data);

      axios({
        method: 'post',
        url: `/api/fbfeed`,
        data: {
          content: renderedFeed,
          date_updated: dateTimeHelper(new Date()),
          type: 'posts',
        },
      }).then(
        (response) => {
          dispatch(setFeed(fetchedFeed.data));
          console.log(response, 'response on create fb feed record');
          // window.location.href = "/admin/posts/page/1" // BETTER FETCH THE POSTS THEN REFRESH PAGE
        },
        (error) => {
          console.log(error, 'ERROR on create fb feed record');
          // console.log('NOW NEEDS TO DISPLAY ERRORS!')
        }
      );
    }
  }

  return (
    <div className={styles.facebookPage}>
      <h2>News from our facebook</h2>
      <FacebookPosts feed={feed} />
    </div>
  );
};

export default FacebookFeed;
