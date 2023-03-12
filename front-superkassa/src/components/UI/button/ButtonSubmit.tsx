import React, { FC, memo } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import cl from './ButtonSubmit.module.css';

interface IButtonSubmitProps {
    type: 'submit';
}

export const ButtonSubmit: FC<IButtonSubmitProps> = memo(({ type }) => {
    return (
        <Stack spacing={2} direction="row">
            <Button type={type} className={cl['button']} variant="outlined">Submit</Button>
        </Stack>
    );
});