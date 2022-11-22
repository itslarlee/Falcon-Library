import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentTabState: 0,
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTabState = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentTab } = navigationSlice.actions


export default navigationSlice.reducer