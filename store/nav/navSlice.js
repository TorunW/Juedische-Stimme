import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    items:[]
}

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setMenuItems:(state, action)=>{
        state.items = action.payload
    }
  }
})

export const { setMenuItems } = navSlice.actions

export default navSlice.reducer