import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IListCountry {
    code: string;
    country: string;
}

interface ICodeCountryState {
    listCountry: IListCountry[]
}

const initialState: ICodeCountryState = {
    listCountry: [
        { code: '7', country: '+7 Russia' },
        { code: '1', country: '+1 USA' },
        { code: '86', country: '+86 Chine' },
    ]
}

export const CodeCountrySlice = createSlice({
    name: 'code-country',
    initialState,
    reducers: {
        addCounty: (state, action: PayloadAction<IListCountry[]>) => {
            state.listCountry = [...state.listCountry, ...action.payload];
        }
    },
})

export const { addCounty } = CodeCountrySlice.actions;

export default CodeCountrySlice.reducer;