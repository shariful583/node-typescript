import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosInstance } from 'axios'
import { setupInterceptorsTo } from '../../interceptor/axios'

const axiosIns: AxiosInstance = setupInterceptorsTo(axios)


export interface ProfileState {
    token: string,
    loading: boolean,
}

export interface PayloadType {
    email: string,
    password: boolean,
}

const initialState: ProfileState = {
    loading: false,
    token: ''
}

export const submitLogin  = createAsyncThunk('profile/submitLogin', async (payload: PayloadType) => {
    const { email, password } = payload
    const response = await axiosIns.post('/login', { email, password })
    console.log(response);
    return response.data.token
    
})

export const profileSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(submitLogin.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(submitLogin.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(submitLogin.rejected, (state, action) => {
            state.loading = false
        })
    }
})

// Action creators are generated for each case reducer function
export const { addToken } = profileSlice.actions

export default profileSlice.reducer