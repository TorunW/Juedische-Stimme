import {createSlice} from '@reduxjs/toolkit'

let initialState = {
  token: null,
  feed:[],
  events:[]
}

const fbDataSlice = createSlice({
  name: 'fbData',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setEvents: (state, action) => {
      state.events = action.payload
    },
    setFeed: (state,action) => {
      state.feed = action.payload
    }
  }
})

export const { setFbData, setEvents, setFeed, setToken } = fbDataSlice.actions

export default fbDataSlice.reducer