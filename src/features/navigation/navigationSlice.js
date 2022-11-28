import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentTabState: 0,
  currentAdminNestedTabState: 0,
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTabState = action.payload
    },
    setCurrentAdminNestedTab: (state, action) => {
      state.currentAdminNestedTabState = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentTab, setCurrentAdminNestedTab } = navigationSlice.actions


export default navigationSlice.reducer