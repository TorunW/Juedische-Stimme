import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    users:[],
    user:null,
    loggedUser:null
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
    },
    setLoggedUser: (state,action) => {
      state.loggedUser = action.payload
    }
  }
})

export const { setUsers, setUser, setLoggedUser } = usersSlice.actions

export default usersSlice.reducer