import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type { Image } from 'types/Image.type';
import type { Gallery } from 'types/Gallery.type';

export interface GalleriesState {
  headerGallery: Gallery;
  gallery: Gallery;
  galleries: Gallery[];
}

let initialState: GalleriesState = {
    headerGallery:null,
    gallery:null,
    galleries:[]
}

type SetGalleryPayloadAction = {
  payload: {
    gallery: Gallery;
    images: Image[];
  }
}

const galleriesSlice = createSlice({
  name: 'galleries',
  initialState,
  reducers: {
    setGalleries: (state, action) => {
      state.galleries = action.payload
    },
    setGallery: (state , action) => {
        state.gallery = { 
            ...action.payload.gallery, 
            images: action.payload.images
        }
    },
    setHeaderGallery: (state, action ) => {
        state.headerGallery = action.payload
    }
  }
})

export const { setGalleries, setGallery, setHeaderGallery } = galleriesSlice.actions

export default galleriesSlice.reducer