import { configureStore } from "@reduxjs/toolkit";
import phoneNumberReducer from "./reducers/phoneNumberSlice";
import codeCountryReducer from "./reducers/codeCountrySlice";


export const store = configureStore({
    reducer: {
        phoneNumber: phoneNumberReducer,
        codeCountry: codeCountryReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;