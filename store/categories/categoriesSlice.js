import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    categories:[],
    category:null
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCatgories: (state, action) => {
      state.categories = action.payload
    },
    setCategory: (state, action) => {
        state.category = action.payload
    }
  }
})

export const { setCatgories, setCategory } = categoriesSlice.actions

export default categoriesSlice.reducer