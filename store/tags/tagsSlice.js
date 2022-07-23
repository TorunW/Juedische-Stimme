import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    tags:[],
    tag:null
}

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (state, action) => {
        state.tags = action.payload
    },
    setTag: (state, action) => {
        state.tag = action.payload
    }
  }
})

export const { setTags, setTag } = tagsSlice.actions

export default tagsSlice.reducer