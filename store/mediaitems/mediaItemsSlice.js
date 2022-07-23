import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    mediaItems:[]
}

const mediaItemsSlice = createSlice({
  name: 'mediaItems',
  initialState,
  reducers: {
    setMediaItems: (state, action) => {
        state.mediaItems = action.payload
    }
  }
})

export const { setMediaItems } = mediaItemsSlice.actions

export default mediaItemsSlice.reducer