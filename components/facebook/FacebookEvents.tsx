import React, { useEffect } from 'react';
import dateTimeHelper from 'helpers/dateTimeHelper';
import formateDate from 'helpers/formateDate';
import axios from 'axios';
import renderToString from 'helpers/renderToString';

import { setEvents } from 'store/fbdata/fbDataSlice';
import { useDispatch, useSelector } from 'store/hooks';
import styles from 'styles/Events.module.css';
import { isUpdatedToday } from 'helpers/checkIfUpdatedToday';

const FacebookEvents = () => {
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
      if (!isUpdatedToday(events.date_updated)) fetchFacebookEvents();
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
        }
      );
    }
  }

  let eventsDisplay;
  if (events && events.content && events.content.length > 0) {
    const eventsArray = JSON.parse(events.content);
    eventsDisplay = eventsArray.map((fbEvent, index) => {
      return (
        <div key={index} className={styles.eventContainer}>
          <svg
            width='75'
            height='75'
            viewBox='0 0 70 70'
            // fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g id='User Interface / Date'>
              <path
                id='Vector'
                d='M55.4167 11.6666H49.5833V8.74992C49.5833 7.97637 49.276 7.2345 48.7291 6.68752C48.1821 6.14054 47.4402 5.83325 46.6667 5.83325C45.8931 5.83325 45.1512 6.14054 44.6043 6.68752C44.0573 7.2345 43.75 7.97637 43.75 8.74992V11.6666H26.25V8.74992C26.25 7.97637 25.9427 7.2345 25.3957 6.68752C24.8487 6.14054 24.1069 5.83325 23.3333 5.83325C22.5598 5.83325 21.8179 6.14054 21.2709 6.68752C20.724 7.2345 20.4167 7.97637 20.4167 8.74992V11.6666H14.5833C12.2627 11.6666 10.0371 12.5885 8.39614 14.2294C6.7552 15.8703 5.83333 18.0959 5.83333 20.4166V55.4166C5.83333 57.7372 6.7552 59.9628 8.39614 61.6038C10.0371 63.2447 12.2627 64.1666 14.5833 64.1666H55.4167C57.7373 64.1666 59.9629 63.2447 61.6038 61.6038C63.2448 59.9628 64.1667 57.7372 64.1667 55.4166V20.4166C64.1667 18.0959 63.2448 15.8703 61.6038 14.2294C59.9629 12.5885 57.7373 11.6666 55.4167 11.6666ZM58.3333 55.4166C58.3333 56.1901 58.026 56.932 57.4791 57.479C56.9321 58.026 56.1902 58.3332 55.4167 58.3332H14.5833C13.8098 58.3332 13.0679 58.026 12.5209 57.479C11.974 56.932 11.6667 56.1901 11.6667 55.4166V34.9999H58.3333V55.4166ZM58.3333 29.1666H11.6667V20.4166C11.6667 19.643 11.974 18.9012 12.5209 18.3542C13.0679 17.8072 13.8098 17.4999 14.5833 17.4999H20.4167V20.4166C20.4167 21.1901 20.724 21.932 21.2709 22.479C21.8179 23.026 22.5598 23.3333 23.3333 23.3333C24.1069 23.3333 24.8487 23.026 25.3957 22.479C25.9427 21.932 26.25 21.1901 26.25 20.4166V17.4999H43.75V20.4166C43.75 21.1901 44.0573 21.932 44.6043 22.479C45.1512 23.026 45.8931 23.3333 46.6667 23.3333C47.4402 23.3333 48.1821 23.026 48.7291 22.479C49.276 21.932 49.5833 21.1901 49.5833 20.4166V17.4999H55.4167C56.1902 17.4999 56.9321 17.8072 57.4791 18.3542C58.026 18.9012 58.3333 19.643 58.3333 20.4166V29.1666Z'
                // fill=' #8179a6'
              />
            </g>
          </svg>
          <div className={styles.title}>{fbEvent.name}</div>
          <p>{fbEvent.place ? fbEvent.place.name : ''}</p>
          <p>{fbEvent.start_time ? formateDate(fbEvent.start_time) : ''}</p>
        </div>
      );
    });
  }

  return (
    <div id='events' className={styles.eventsPage}>
      <hr />
      <h3>Aktivitäten</h3>
      <div className={styles.contentContainer}>{eventsDisplay}</div>

      <hr />
    </div>
  );
};

export default FacebookEvents;
