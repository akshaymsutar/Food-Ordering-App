import {configureStore} from '@reduxjs/toolkit';
import itemsSlice from './items'
const store = configureStore({
    reducer:{
        items:itemsSlice.reducer
    }
})
export const itemsActions = itemsSlice.actions;
export default store;