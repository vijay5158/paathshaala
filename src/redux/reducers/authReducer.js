import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { setUserInfo, unSetUserInfo } from "./userReducer";
import AxiosInstance from '../../AxiosInstance';
import Cookies from "js-cookie";

const token= Cookies.get('token')
const refreshToken= Cookies.get('refresh_token')

const initialState = {
  isAuthenticated: false,
  accessToken: token,
  refreshToken: refreshToken,
  errors: {},
  loading:false,
};


export const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    //Actions
    processStart: (state,action) => {
      state.loading=true;
    },
    processEnd: (state,action) => {
      state.loading=false;
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload?.access;
      state.refreshToken = action.payload?.refresh;
      state.errors = null;
      state.loading = false;
    },
    setAccessTokenSuccess: (state, action) => {
      state.accessToken=action.payload;
      state.isAuthenticated = true;
      state.errors = null;
      state.loading=false;
    },
    setRefreshTokenSuccess: (state,action) => {
      state.refreshToken = action.payload;
      state.loading = false;
    },
    authError: (state, action) => {
      state.errors = action.payload;
      state.loading=false;
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.errors = null;
      state.loading=false;
    }
  },
});

export const { login, authError, logout,setAccessTokenSuccess,setRefreshTokenSuccess,processStart,processEnd } = authSlice.actions;

export const useAuthentication = () => {
  return useSelector((root) => root.authReducer.isAuthenticated);
};

export const useAccessToken = () => {
    return useSelector((root) => root.authReducer.accessToken);
  };
export const useRefreshToken = () => {
    return useSelector((root) => root.authReducer.refreshToken);
  };
  export const useLoading = () => {
    return useSelector((root) => root.authReducer.loading);
  };

  export const authLogout = (accessToken, refreshToken) => {
    return async dispatch => {
try {
  AxiosInstance.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
};
  AxiosInstance.post('logout/', {
    refresh_token:refreshToken
  }).then((res)=>{
    dispatch(logout());
    dispatch(unSetUserInfo());
    Cookies.remove('token');
    Cookies.remove('refresh_token');
    AxiosInstance.defaults.headers['Authorization'] = null;

  })
  .catch((e)=>{
    alert("Error occured, Try again!");
  })

} catch (error) {
  alert("Error occured, Try again!");
}      
      
    }
  }
  
// export const checkAuthTimeout = expirationTime => {
//   return dispatch => {
//     setTimeout(() => {
//     dispatch(authLogout)
//     }, expirationTime * 1000);
//   };
// };

export const authLogin = (email, password, processDone, processFail) => {
  return async dispatch => {
   
try {
  await AxiosInstance.post('login/', {
    email: email,
    password: password,
  }).then((res) => {
    if(res.data.success){
    const data = res.data?.user;
    const tokens = res.data?.tokens;
    const user = {
      profile_img: data?.profile_img,
      name: data?.name,
      mobile: data?.mobile,
      email: data?.email,
      expirationDate: new Date().getTime() + 36000 * 1000,
      is_student: data?.is_student,
      is_teacher: data?.is_teacher,
      userId: data?.id
    };
    dispatch(login(tokens))
    dispatch(setUserInfo(user));
    // dispatch(checkAuthTimeout(36000));
    Cookies.set('token', tokens?.access, { expires: 7 });
    Cookies.set('refresh_token', tokens?.refresh, { expires: 7 });
    processDone();
  }
  else{
    alert(res.data?.message);
    dispatch(authError({login:res.data?.message}));
    processFail();
  }})
  .catch(err => {
    alert(err.message)
    dispatch(authError(err.message));
    processFail();
  })

} catch (error) {
alert('Error, Try again!');
processFail();
}
  };
};


export const authSignup = (userData, processDone, processFail) => {
  return async dispatch => {
  try {
    await AxiosInstance.post('register/', userData).then((res) => {
      const data = res.data?.user;
      const tokens = res.data?.tokens;
      const user = {
        profile_img: data?.profile_img,
        name: data?.name,
        mobile: data?.mobile,
        email: data?.email,
        expirationDate: new Date().getTime() + 36000 * 1000,
        is_student: data?.is_student,
        is_teacher: data?.is_teacher,
        userId: data?.id
      };
      dispatch(login(tokens))
      dispatch(setUserInfo(user));
      // dispatch(checkAuthTimeout(36000));
      Cookies.set('token', tokens?.access, { expires: 7 });
      Cookies.set('refresh_token', tokens?.refresh,  { expires: 7 });
      processDone()
    })
    .catch(err => {
      alert(err?.message)
      dispatch(authError(err?.message));
      processFail();
    })
      
  } catch (error) {
    processFail();
    alert('Some Error occured!')
  }
  };
};

export default authSlice.reducer;