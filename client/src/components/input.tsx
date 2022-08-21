import React from 'react';
import TextField from '@mui/material/TextField';


export default function Input({type, label, name, onChange}: any) {
    return (
        <TextField
                margin="normal"
                required
                fullWidth
                id={name}
                label={label}
                name={name}
                autoComplete="email"
                autoFocus
                type={type}
                onChange={onChange}
              />
    );
}