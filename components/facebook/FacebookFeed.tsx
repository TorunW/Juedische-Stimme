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
    if (!feed || !isUpdatedToday(feed.date_updated)) fetchFacebookFeed();
  }

  // each fbpost has a attachment.data => array, every data has a type, theres if its their photo its photo, if its a shared hen its smt else
  async function fetchFacebookFeed() {
    const fields =
      'id,likes,reactions,comments,shares,attachments,full_picture,message,from,permalink_url,created_time';
    const fbFetchUrl = `https://graph.facebook.com/998665673528998/feed?limit=21&fields=${fields}&access_token=${token}`;
    const res = await fetch(fbFetchUrl);
    const fetchedFeed = await res.json();
    console.log(fetchedFeed, " FETCHED FEED ")

    // remove all the weird characters from the content to avoid mySql errors
    if (fetchedFeed.data && fetchedFeed.data.length > 0) {
      const renderedFeed = renderToString(fetchedFeed.data);
      console.log('*** RENDERED FEED ***')
      console.log(renderedFeed)
      console.log('*** /RENDERED FEED ***')

      const data = {
        content: renderedFeed,
        date_updated: dateTimeHelper(new Date()),
        type: 'posts',
      }

      axios({
        method: 'post',
        url: `/api/fbfeed`,
        data,
      }).then(
        (response) => {
          dispatch(setFeed(data));
        },
        (error) => {
          console.log(error, 'ERROR on create fb feed record');
        }
      );
    }
  }

  console.log(feed, " FEED IN FACEBOOKFEED")

  return (
    <section className={styles.facebookPage}>
      <h2>News from our facebook</h2>
      <FacebookPosts feed={feed} />
    </section>
  );
};

export default FacebookFeed;
