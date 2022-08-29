import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    posts:[],
    newsletter:[],
    post:null,
    postsCount:null,
    postsPerPage:null
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload
    },
    setPostsPagination: (state, action) => {
      state.postsCount = action.payload.postsCount
      state.postsPerPage = action.payload.postsPerPage
    },
    setNewsletter: (state, action) => {
      state.newsletter = action.payload
    },
    setPost: (state, action) => {
        state.post = action.payload
    }
  }
})

export const { setPosts, setPost, setNewsletter, setPostsPagination } = postsSlice.actions

export default postsSlice.reducer