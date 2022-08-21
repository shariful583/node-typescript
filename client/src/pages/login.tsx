import React, { useState } from "react";
import {submitLogin, PayloadType} from "../features/profile/profileSlice";
import { useDispatch,  } from "react-redux";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Avatar, Typography, Box} from '@mui/material';
import Layout from "../layout/layout";
import Input from "../components/input";
import Button from "../components/button";
import { AppDispatch } from "../app/store";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payLoad = {
            email,
            password
        }
        console.log({
            email,
            password,
        });

        const dispatch = useDispatch<AppDispatch>();
        // dispatch(submitLogin(payLoad)).then(() => {}).catch(() => {});
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    return (
        <Layout>
             <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Input type="email" label="Email" name="email" value={email} onChange={handleChange}/>
            <Input type="password" label="Password" name="password" value={password} onChange={handleChange} />
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Button
                buttonName="submit"
              />
            </Box>
        </Layout>
    );
}