import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/user/userSlice'
import navigationSlice from '../features/navigation/navigationSlice'

export const store = configureStore({
  reducer: {
    userSlice,
    navigationSlice,
  },
})