import React, { useEffect } from 'react';
import dateTimeHelper from 'helpers/dateTimeHelper';
import formateDate from 'helpers/formateDate';
import axios from 'axios';
import renderToString from 'helpers/renderToString';

import { setEvents } from 'store/fbdata/fbDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from 'styles/Events.module.css';

const FacebookEvents = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.fbData.token);
  const events = useSelector((state) => state.fbData.events);

  useEffect(() => {
    if (token) initFacebookEvents();
  }, [token]);

  async function initFacebookEvents() {
    if (!events) {
      fetchFacebookEvents();
    } else {
      if (!isUpdatedToday(events.date_updated)) fetchFacebookFeed();
    }
  }

  async function fetchFacebookEvents() {
    const res = await fetch(
      `https://graph.facebook.com/998665673528998/events?limit=4&access_token=${token}`
    );
    const fetchedEvents = await res.json();
    // remove all the weird characters from the content to avoid mySql errors
    if (fetchedEvents.data && fetchedEvents.data.length > 0) {
      const renderedEvents = renderToString(fetchedEvents.data);
      axios({
        method: 'post',
        url: `/api/fbfeed`,
        data: {
          content: renderedEvents,
          date_updated: dateTimeHelper(new Date()),
          type: 'events',
        },
      }).then(
        (response) => {
          console.log(fetchedEvents, ' FETCHED EVENTS');
          dispatch(setEvents(fetchedEvents.data));
          console.log(response, 'response on create fb feed record');
        },
        (error) => {
          console.log(error, 'ERROR on create fb feed record');
          // console.log('NOW NEEDS TO DISPLAY ERRORS!')
        }
      );
    }
  }

  let eventsDisplay;
  if (events && events.content && events.content.length > 0) {
    const eventsArray = JSON.parse(events.content);
    eventsDisplay = eventsArray.map((fbEvent, index) => {
      return (
        <div key={index} className={styles.event}>
          <div className={styles.info}>
            <p>{fbEvent.place ? fbEvent.place.name : ''}</p>
            <p>{fbEvent.start_time ? formateDate(fbEvent.start_time) : ''}</p>
          </div>
          <h2>{fbEvent.name}</h2>
        </div>
      );
    });
  }

  return (
    <div id='events' className={styles.eventsPage}>
      <hr />
      <div className={styles.contentContainer}>
        <h1>Aktivitäten</h1>
        <div className={styles.eventsContainer}>{eventsDisplay}</div>
      </div>

      <hr />
    </div>
  );
};

export default FacebookEvents;
