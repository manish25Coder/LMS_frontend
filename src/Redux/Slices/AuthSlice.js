import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  {toast } from 'react-hot-toast';
import axioInstance from '../../Helpers/axiosInstance'
const initialState = {
    isLoggedIn : localStorage.getItem('isLoggedIn') || false,
    role : localStorage.getItem('role') || "",
    data : localStorage.getItem('data') || {}
};

export const craeteAccont  = createAsyncThunk('/auth/sign',async(data)=>{
    try {
        const res = axioInstance.post('user/register',data);
        toast.promise(res,{
            loading : "Wait! creating your account",
            success : (data) =>{
                return data?.data?.message; 
            },

            error : 'Failed to create account  '
        });
      

        return(await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})


export const login  = createAsyncThunk('/auth/login',async(data)=>{
    try {
        const res = axioInstance.post('user/login',data);
        toast.promise(res,{
            loading : "Wait! authentication in progress...",
            success : (data) =>{
                return data?.data?.message; 
            },

            error : 'Failed login  '
        });
      

        return(await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const logout = createAsyncThunk ('/auth/logout', async() =>{
    try {
        const res = axioInstance.post('user/logout');
        toast.promise(res,{
            loading : "Wait! logout in progress...",
            success : (data) =>{
                return data?.data?.message; 
            },

            error : 'Failed logout  '
        });
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(login.fulfilled,(state,action)=>{
            localStorage.setItem('data',JSON.stringify(action?.payload?.user));
            localStorage.setItem('isLogged' ,true);
            localStorage.setItem('role',action?.payload?.user?.role);
            state.isLoggedIn = true ;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
        .addCase(logout.fulfilled,(state) => {
            localStorage.clear();
            state.data ={};
            state.isLoggedIn = false;
            state.role = "";
        })
    }

});



// export const {}= authSlice.actions;
export default authSlice.reducer;