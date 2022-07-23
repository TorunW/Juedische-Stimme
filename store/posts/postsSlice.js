import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    posts:[],
    post:null
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload
    },
    setPost: (state, action) => {
        state.post = action.payload
    }
  }
})

export const { setPosts, setPost } = postsSlice.actions

export default postsSlice.reducer