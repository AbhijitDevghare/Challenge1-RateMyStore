import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from "../redux/slices/AuthSlice"
import storeSlice from "./slices/storeSlice"
import ratingSlice from "./slices/ratingSlice"

const store = configureStore({
    reducer:{
        auth:AuthReducer,
        store:storeSlice,
        rating:ratingSlice
    },
    devTools:true
})


export default store