import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    aboutInfo:null,
    gallery:null,
    headerImage:{
      img:null,
      svg:[],
      uri:null,
      isLoaded: false
    }
}

const aboutInfoSlice = createSlice({
  name: 'aboutInfo',
  initialState,
  reducers: {
    setAboutInfo: (state, action) => {
      state.aboutInfo = action.payload.aboutInfo;
      state.gallery = action.payload.gallery;
      state.headerImage = {
        ...state.headerImage,
        ...action.payload.headerImage
      }
    },
    setHeaderImageLoaded: (state,action) => {
      state.headerImage = {
        ...state.headerImage,
        isLoaded:true
      }
    }
  }
})

export const { setAboutInfo, setHeaderImageLoaded } = aboutInfoSlice.actions

export default aboutInfoSlice.reducer