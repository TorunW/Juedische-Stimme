import React, {useEffect } from 'react'
import dateTimeHelper from 'helpers/dateTimeHelper'
import axios from 'axios'
import renderToString from 'helpers/renderToString';

import { setEvents  } from 'store/fbdata/fbDataSlice'
import { useDispatch, useSelector } from 'react-redux'

const FacebookEvents = (props) => {

    const dispatch = useDispatch();
    const token = useSelector(state => state.fbData.token)
    const events = useSelector(state => state.fbData.events);

    useEffect(() => {
        if (token) initFacebookEvents()
    }, [token])
    
    async function initFacebookEvents(){
        if (!events){
            fetchFacebookEvents()
        } else {
            const fbEventsUpdatedMonth = parseInt(events.date_updated.split('-')[1]);
            const fbEventsUpdatedDay = parseInt(events.date_updated.split('-')[2])
            const today = new Date();
            const month = today.getMonth() + 1;
            const day = today.getDate();
            if (day !== fbEventsUpdatedDay || month !== fbEventsUpdatedMonth) fetchFacebookEvents()
        }
    }

    async function fetchFacebookEvents(){
        const res  = await fetch(`https://graph.facebook.com/998665673528998/events?limit=3&access_token=${token}`)
        const fetchedEvents = await res.json()
        // remove all the weird characters from the content to avoid mySql errors
        if (fetchedEvents.data && fetchedEvents.data.length > 0){
            const renderedEvents = renderToString(fetchedEvents.data)
            axios({
                method: 'post',
                url: `/api/fbfeed`,
                data: {
                    content:renderedEvents,
                    date_updated:dateTimeHelper(new Date()),
                    type:'events'
                }
            }).then((response) => {
                console.log(fetchedEvents, " FETCHED EVENTS")
                dispatch(setEvents(fetchedEvents.data))
                // setEvents(fetchedEvents.data)
                console.log(response,"response on create fb feed record");
                // window.location.href = "/admin/posts/page/1" // BETTER FETCH THE POSTS THEN REFRESH PAGE
            }, (error) => {
                console.log(error, "ERROR on create fb feed record");
                // console.log('NOW NEEDS TO DISPLAY ERRORS!')
            });
        }
    }

    let eventsDisplay;
    if (events && events.content && events.content.length > 0){
        const eventsArray = JSON.parse(events.content);
        console.log(eventsArray, " EVENTS ARRAY ")
        eventsDisplay = eventsArray.map((fbEvent, index) => {
            if (index <= 2){
                return (
                    <div key={index} style={{width: "33%", float: "left",padding:"5px"}}>
                        <h2>{fbEvent.name}</h2>
                        <p>{fbEvent.description}</p>
                    </div>
                )
            }
        })
    }

    return (
        <div style={{overflow:"auto", backgroundColor: "#efefef"}}>
            <h1>FACEBOOK EVENTS</h1>
            <div>{eventsDisplay}</div>
        </div>
    )
}

export default FacebookEvents