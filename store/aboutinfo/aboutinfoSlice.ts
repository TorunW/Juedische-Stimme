import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    aboutInfo:null,
    gallery:null
}

const aboutInfoSlice = createSlice({
  name: 'aboutInfo',
  initialState,
  reducers: {
    setAboutInfo: (state, action) => {
      state.aboutInfo = action.payload.aboutInfo;
      state.gallery = action.payload.gallery;
    },
  }
})

export const { setAboutInfo } = aboutInfoSlice.actions

export default aboutInfoSlice.reducer