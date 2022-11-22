import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userState: {
    role: "Student"
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.userState = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentUser } = userSlice.actions


export default userSlice.reducer