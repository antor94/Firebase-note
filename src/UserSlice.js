import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'counter',
  initialState: {
    value: JSON.parse(localStorage.getItem('userInfo')) || null,
  },
  reducers: {
UserInfo: (state, action) => {
      state.value = action.payload
    },
  },
})


export const {  UserInfo } = UserSlice.actions

export default UserSlice.reducer