import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../helpers/axiosInstance"

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') && localStorage.getItem('data') !== 'undefined' ? JSON.parse(localStorage.getItem('data')) : {}
};

export const createAccount = createAsyncThunk("/auth/register", async ({data,endpoint}) => {
    try {
        console.log(data)
        const res = axiosInstance.post(`auth/register/${endpoint}`, data);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                console.log("RETURN DATA : ",data)
                return data?.data?.message;     // first data is basically a response
            },
            error: "Failed to create account"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})


export const getUser = createAsyncThunk("/getUser", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("/user/getuser", {
      withCredentials: true,
      redirect: "follow"
    });

    return response.data;
  } catch (error) {
    console.error("getUser failed", error);
  }
});


export const login = createAsyncThunk("/auth/login", async ({identifier, password, endpoint}) => {
    try {
        const res = axiosInstance.post(`/auth/login/${endpoint}`, {identifier, password});
        toast.promise(res, {
            loading: "Wait! authentication in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log in"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});



export const adminLogin = createAsyncThunk("/auth/adminLogin", async (data) => {
    try {
        const res = axiosInstance.post("/admin/auth/login", data);
        toast.promise(res, {
            loading: "Wait! authentication in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log in"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const res = axiosInstance.get("/auth/logout");
        toast.promise(res, {
            error: "Failed to logged out"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }   
});


export const updateProfile = createAsyncThunk("/updateProfile", async (data) => {
    try {
        console.log(data)   
        const res = axiosInstance.put("/user/profile", data);
        toast.promise(res, {    
            loading: "Wait... Updating the profile",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to Update Profile"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});



// Forget Password
export const forgetPassword = createAsyncThunk("/auth/forgetPassword", async (email) => {
    try {
        const res = axiosInstance.post("/user/auth/password/forgot/verifyEmail", { email });
        toast.promise(res, {
            loading: "Sending password reset email...",
            success: (data) => data?.data?.message,
            error: "Failed to send reset email"
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

// Reset Password
export const resetPassword = createAsyncThunk("/auth/resetPassword", async ({ resetToken, password }) => {
    try {
        const res = axiosInstance.put(`/user/auth/password/reset/${resetToken}`, { password });
        toast.promise(res, {
            loading: "Resetting password...",
            success: (data) => data?.data?.message,
            error: "Failed to reset password"
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

// Send OTP
export const sendOtp = createAsyncThunk("/auth/sendOtp", async (data) => {
    try {
        const res = axiosInstance.post("/user/auth/password/forgot/send-otp", data);
        toast.promise(res, {
            loading: "Sending OTP...",
            success: (data) => data?.data?.message,
            error: "Failed to send OTP"
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});



// Verify OTP
export const verifyOtp = createAsyncThunk("/auth/verifyOtp", async (data) => {
    try {
        const res = axiosInstance.post("/user/auth/password/reset/verify-otp", data);
        console.log(res)
        toast.promise(res, {
            loading: "Verifying OTP...",
            success: "Otp verification Successful",
            error: "Failed to verify OTP"
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});




const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createAccount.fulfilled, (state, action) => {
            console.log(action)
            if(!action?.payload?.user)
                return
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role
        })
        .addCase(login.fulfilled, (state, action) => {
            console.log(action)
            if(!action?.payload?.user)
                return
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role
        })
        .addCase(adminLogin.fulfilled,(state,action)=>{
            if(!action?.payload?.user)
                return
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
            
            console.log(action)
            if(action?.payload?.success)
            {
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                state.data = action?.payload?.user;
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));

            }
            // console.log(JSON.stringify(action))
        })
        .addCase(logout.fulfilled, (state, action) => {
            console.log(action)
            if(action?.payload?.success)
            {
                localStorage.setItem("data", "");
                localStorage.setItem("isLoggedIn", false);
                localStorage.setItem("role", "");
                state.isLoggedIn = false;
                state.data = "";
                state.role = ""
            }
            // console.log(JSON.stringify(action))
        })
        
    }
});

// export const {} = authSlice.actions;
export default authSlice.reducer;