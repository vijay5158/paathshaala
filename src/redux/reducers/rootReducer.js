import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import classReducer from './classReducer';
import postReducer from './postReducer';
import assignmentReducer from './assignmentReducer';
import peerReducer from './peerReducer';



export default combineReducers(
    { 
        authReducer: authReducer, 
        userReducer:  userReducer,
        classReducer: classReducer,
        postReducer: postReducer,
        assignmentReducer: assignmentReducer,
        peerReducer: peerReducer
    });