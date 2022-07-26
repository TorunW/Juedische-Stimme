import {createSlice } from '@reduxjs/toolkit'
import type { Gallery } from 'types/Gallery.type';

export interface GalleriesState {
  gallery: Gallery;
  galleries: Gallery[];
}

let initialState: GalleriesState = {
    gallery:null,
    galleries:[]
}

const galleriesSlice = createSlice({
  name: 'galleries',
  initialState,
  reducers: {
    setGalleries: (state, action) => {
      state.galleries = action.payload
    },
    setGallery: (state , action) => {
      console.log(action.payload, " ACTION PAYLOAD ")
      state.gallery = { 
          ...action.payload.gallery, 
          images: action.payload.images
      }
    }
  }
})

export const { setGalleries, setGallery } = galleriesSlice.actions

export default galleriesSlice.reducer