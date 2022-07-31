import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    posts:[],
    newsletter:[],
    post:null
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload
    },
    setNewsletter: (state, action) => {
      state.newsletter = action.payload
    },
    setPost: (state, action) => {
        state.post = action.payload
    }
  }
})

export const { setPosts, setPost, setNewsletter } = postsSlice.actions

export default postsSlice.reducer