import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PhoneNumberState {
    code: string;
    phone: string;
}

const initialState: PhoneNumberState = {
    code: '7',
    phone: ''
}

export const PhoneNumberSlice = createSlice({
    name: 'phone-number',
    initialState,
    reducers: {
        setCode: (state, action: PayloadAction<string>) => {
            state.code = action.payload;
        },
        setPhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
    },
})

export const { setCode, setPhone } = PhoneNumberSlice.actions;

export default PhoneNumberSlice.reducer;