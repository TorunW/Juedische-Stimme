import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    users:[],
    user:null
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },
    setUser: (state, action) => {
        state.user = action.payload
    }
  }
})

export const { setUsers, setUser } = usersSlice.actions

export default usersSlice.reducer