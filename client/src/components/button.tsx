import React from 'react';
import Button from '@mui/material/Button';


export default function Input({buttonName}: any) {
    return (
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {buttonName}
        </Button>
    );
}