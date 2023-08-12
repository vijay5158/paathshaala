import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import AxiosInstance from "../../AxiosInstance";




const initialState = {
    assignments: [],
    currentAssignment: {title:"loading"},
    submissions: [],
    error: null,
    loading: false,
    next: null,
    count: 0
};

export const assignmentSlice = createSlice({
  name: "assignmentReducer",
  initialState,
  reducers: {
    //Actions
    assignmentError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getAssignmentsSuccess: (state,action) => {
        state.assignments = action.payload
        // state.next = action.payload.next
        // state.count = action.payload.count
    },
    getSubmissionsSuccess: (state,action) => {
        state.submissions = action.payload;
    },
    // createAnmntSuccess: (state,action) => {
    //     state.announcements = [action.payload,...state.announcements]
    // },
    addAssignmentSuccess: (state,action) => {
        state.assignments = [action.payload, ...state.assignments]
    },
    // deleteCLSSuccess: (state,action) => {
    //     const index = state.assignmentes.indexOf(state.assignmentes.filter(cls=> cls.id===action.payload)[0])
    //     state.assignmentes.splice(index,1);
    // },
    setCurrentassignment: (state,action) => {
        state.currentAssignment=action.payload
    },
   
   
  },
});

export const { assignmentError, setCurrentAssignment, getAssignmentsSuccess, getSubmissionsSuccess, addAssignmentSuccess} = assignmentSlice.actions;


export const getAllAssignments = () => {
    return useSelector((root) => root.assignmentReducer.assignments);
  };

export const getCurrentAssignment = () => {
    return useSelector((root) => root.assignmentReducer.currentAssignment);
  };

export const getAllSubmissions = () => {
    return useSelector((root) => root.assignmentReducer.submissions);
  };
export const useAssignmentLoading = () => {
    return useSelector((root) => root.assignmentReducer.loading);
  };


export default assignmentSlice.reducer;

export const getAssignments = (token, slug) => {
    return dispatch => {
        AxiosInstance.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };
        AxiosInstance
            .get(`get-assignments/${slug}/`)
            .then(res => {
                const data = res.data;
                dispatch(getAssignmentsSuccess(data.data));
            })
            .catch(err => {
                alert(err?.response?.data?.message);
            });
    };
};

export const getAssignmentSubmissions = (token, slug,data) => {
  return dispatch => {
      AxiosInstance.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      };
      AxiosInstance
          .post(`get-assignment-submission/${slug}/`,data)
          .then(res => {
              const data = res.data;
              dispatch(getSubmissionsSuccess(data.data));
          })
          .catch(err => {
              alert(err?.response?.data?.message);
          });
  };
};

export const createAssignment = (token, slug,data, setLoading, handleDone) => {
  return dispatch => {
    try {
        setLoading(true);
        AxiosInstance.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };
        AxiosInstance
            .post(`create-assignment/${slug}/`,data)
            .then(res => {
                const data = res.data;
                console.log(data);
                // dispatch(getSubmissionsSuccess(data.data));
                handleDone()
            })
            .catch(err => {
                alert(err?.response?.data?.message);
            })
            .finally(()=> setLoading(false));
    
    } catch (error) {
        console.log(error);
        setLoading(false);
    }

  };
};
