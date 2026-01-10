import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axioInstance from "../../Helpers/axiosInstance";

/* ================= INITIAL STATE ================= */
const getParsedData = () => {
  try {
    const raw = localStorage.getItem("data");
    if (!raw || raw === "undefined") return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "",
  data: getParsedData(),
};

/* ================= REGISTER ================= */
export const craeteAccont = createAsyncThunk(
  "/auth/sign",
  async (data) => {
    try {
      const res = axioInstance.post("user/register", data);

      toast.promise(res, {
        loading: "Wait! creating your account",
        success: (data) => data?.data?.message,
        error: "Failed to create account",
      });

      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

/* ================= LOGIN ================= */
export const login = createAsyncThunk(
  "/auth/login",
  async (data) => {
    try {
      const res = axioInstance.post("user/login", data);

      toast.promise(res, {
        loading: "Wait! authentication in progress...",
        success: (data) => data?.data?.message,
        error: "Failed login",
      });

      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

/* ================= LOGOUT ================= */
export const logout = createAsyncThunk(
  "/auth/logout",
  async () => {
    try {
      const res = axioInstance.post("user/logout");

      toast.promise(res, {
        loading: "Wait! logout in progress...",
        success: (data) => data?.data?.message,
        error: "Failed logout",
      });

      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

/* ================= USER DETAILS ================= */
export const getUserData = createAsyncThunk(
  "/user/details",
  async () => {
    try {
      const res = axioInstance.get("user/me");
      return (await res).data;
    } catch (error) {
      toast.error(error.message);
    }
  }
);


export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axioInstance.put(
        `user/update/${id}`,
        data
      );

      toast.success(res?.data?.message || "Profile updated");
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);



/* ================= SLICE ================= */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* ===== LOGIN ===== */
    builder.addCase(login.fulfilled, (state, action) => {
      const user =
        action.payload?.user ||
        action.payload?.data ||
        {};

      localStorage.setItem("data", JSON.stringify(user));
      localStorage.setItem("role", user?.role || "USER");
      localStorage.setItem("isLoggedIn", "true");

      state.isLoggedIn = true;
      state.data = user;
      state.role = user?.role || "USER";
    });

    /* ===== LOGOUT ===== */
    builder.addCase(logout.fulfilled, (state) => {
      localStorage.clear();
      state.isLoggedIn = false;
      state.role = "";
      state.data = {};
    });

    /* ===== FETCH USER ===== */
    builder.addCase(getUserData.fulfilled, (state, action) => {
      if (!action?.payload?.user && !action?.payload?.data) return;

      const user =
        action.payload?.user ||
        action.payload?.data;

      localStorage.setItem("data", JSON.stringify(user));
      localStorage.setItem("role", user?.role || "USER");
      localStorage.setItem("isLoggedIn", "true");

      state.isLoggedIn = true;
      state.data = user;
      state.role = user?.role || "USER";
    });
  },
});

export default authSlice.reducer;
