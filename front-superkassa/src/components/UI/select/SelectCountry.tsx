import React, { FC, memo } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setCode } from '../../../store/reducers/phoneNumberSlice';

export const SelectCountry: FC = memo(() => {

    const dispatch = useAppDispatch();
    const code = useAppSelector(state => state.phoneNumber.code);
    const codeList = useAppSelector(state => state.codeCountry.listCountry);

    const handleChange = (event: SelectChangeEvent) => {
        dispatch(setCode(event.target.value));
    };

    return (
        <Box sx={{ minWidth: 100 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Code</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={code}
                    label="Code"
                    onChange={handleChange}
                >
                    {codeList.map(item =>
                        <MenuItem key={item.code} value={item.code}>{item.country}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    );
});