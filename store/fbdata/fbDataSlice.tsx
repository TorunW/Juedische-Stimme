import { createSlice } from '@reduxjs/toolkit';

export type FeedType = {
  date_updated: string;
  content: string;
};

export type EventType = {
  date_updated: string;
  content: string;
};

interface FbFeedState {
  token: any;
  feed: FeedType;
  events: EventType;
}

let initialState: FbFeedState = {
  token: null,
  feed: null,
  events: null,
};

const fbDataSlice = createSlice({
  name: 'fbData',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setFeed: (state, action) => {
      state.feed = action.payload;
    },
  },
});

export const { setEvents, setFeed, setToken } = fbDataSlice.actions;

export default fbDataSlice.reducer;
