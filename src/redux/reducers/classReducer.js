import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { setPostSuccess } from "./postReducer";

import AxiosInstance from "../../AxiosInstance";




const initialState = {
    classes: [],
    currentClass: {class_name:"loading", standard:"loading", subject:"loading"},
    announcements: [],
    error: null,
    loading: false,
    next: null,
    count: 0
};

export const classSlice = createSlice({
  name: "classReducer",
  initialState,
  reducers: {
    //Actions
    classError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getCLSListSuccess: (state,action) => {
        state.classes = action.payload.results
        state.next = action.payload.next
        state.count = action.payload.count
    },
    getAnmntListSuccess: (state,action) => {
        state.announcements = action.payload.results?.reverse();
    },
    createAnmntSuccess: (state,action) => {
        state.announcements = [action.payload,...state.announcements]
    },
    addCLSSuccess: (state,action) => {
        state.classes = [...state.classes,action.payload]
    },
    deleteCLSSuccess: (state,action) => {
        const index = state.classes.indexOf(state.classes.filter(cls=> cls.id===action.payload)[0])
        state.classes.splice(index,1);
    },
    setCurrentClass: (state,action) => {
        state.currentClass=action.payload
    },
   
   
  },
});

export const { classError, setCurrentClass, getCLSListSuccess, getAnmntListSuccess, createAnmntSuccess, addCLSSuccess, deleteCLSSuccess } = classSlice.actions;


export const getAllClasses = () => {
    return useSelector((root) => root.classReducer.classes);
  };

export const getCurrentClass = () => {
    return useSelector((root) => root.classReducer.currentClass);
  };

export const getAllAnnouncements = () => {
    return useSelector((root) => root.classReducer.announcements);
  };
export const useClassLoading = () => {
    return useSelector((root) => root.classReducer.loading);
  };


export const getClasses = token => {
    return dispatch => {
        AxiosInstance.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };
        AxiosInstance
            .get("classes/?limit=10")
            .then(res => {
                const data = res.data;
                dispatch(getCLSListSuccess(data));
            })
            .catch(err => {
                alert(err?.message);
            });
    };
};

export const getAnnouncements = (token,slug) => {
    return dispatch => {
        AxiosInstance.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };
        AxiosInstance
            .get(`announcement/${slug}/?limit=20`)
            .then(res => {
                const announcements = res.data;
                dispatch(getAnmntListSuccess(announcements));
            })
            .catch(err => {
                alert(err?.message);
            });
    };
};


export const createAnnouncement = (token, Anmnt,handleLoading) => {
    return dispatch => {
        try {
            AxiosInstance.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            };
            AxiosInstance.post(`announcement/`, Anmnt)
                .then(res => {
    
                    // const announcement = res.data
                    // dispatch(createAnmntSuccess(announcement));
                })
                .catch(err => {
                    alert(err?.message)
                })
                .finally(()=> handleLoading());
                
        } catch (error) {
            handleLoading();
            alert('Try again!')
        }
    };
};

export const createCLS = (token, cls,setModalVisible,setLoading) => {
    return dispatch => {
        AxiosInstance.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };
        AxiosInstance.post(`classes/`, cls)
            .then(res => {
                
                dispatch(addCLSSuccess(res.data));
            })
            .catch(err => {
                alert(err?.message);
            })
            .finally(()=> {
                setModalVisible(false);
                setLoading(false);
            });
    };
};


export const joinCLS = (token, data,setModalVisible,setLoading) => {
    const slug = data['slug'];
    const student = {"students" : [data['student_id']]}
    return dispatch => {
        // dispatch(joinCLSStart());
        AxiosInstance.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };
        AxiosInstance.patch(`classes/${slug}/`,student)
            .then(res => {
                // const Class = [res.data]
                dispatch(addCLSSuccess(res.data));
            })
            .catch(err => {
                alert(err?.message);
            })
            .finally(()=> {
                setModalVisible(false);
                setLoading(false);
            })
    };
};

export const deleteCLS = (token, data) => {
    const slug = data['slug'];
    const id = data['id']
    return dispatch => {
        AxiosInstance.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };
        AxiosInstance.delete(`classes/${slug}/`)
            .then(res => {
                dispatch(deleteCLSSuccess(id))
                alert("Class deleted");
            })
            .catch(err => {
                alert(err?.message);

            });
    };
};



export const getCurrentClassSuccess = (token, slug, navigate) => {
    return dispatch => {
        dispatch(setCurrentClass({class_name:"loading", standard:"loading", subject:"loading"}));
        // dispatch(setPostSuccess([]));
        AxiosInstance.defaults.headers = {
            Authorization: `Bearer ${token}`
        };
        const url = `class/${slug}/`
        AxiosInstance
            .get(url)
            .then(res => {
                const classData = res.data;
                // dispatch(setPostSuccess(classData?.posts));
                dispatch(setCurrentClass(classData))
// console.log(classData);
            })
            .catch(err => {
                alert(err?.message);
                navigate("/classes")
            });

    };
};

export const MarkAttendance = (token, formData, setLoading) => {
    return dispatch => {
        try {
            AxiosInstance.defaults.headers = {
                Authorization: `Bearer ${token}`
            };
            const url = `mark-attendance/`
            AxiosInstance
                .post(url,formData)
                .then(res => {
                    const data = res.data;
                    if(data.success){
                        alert(data.msg);
                    }
                    else{
                        alert(data.msg);
                    }
                })
                .catch(err => {
                    alert(err?.message);
                })
                .finally(()=>{
                    setLoading(false);
                })
                
        } catch (error) {
            setLoading(false);
        }

    };
};



export default classSlice.reducer;
