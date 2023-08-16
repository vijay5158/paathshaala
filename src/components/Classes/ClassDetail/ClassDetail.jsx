import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
import './cardStyle.css';
import { createAnmntSuccess, getAnnouncements, getClasses, getCurrentClass, getCurrentClassSuccess, useClassLoading } from "../../../redux/reducers/classReducer";
import { createCommentSuccess, createPost, createPostSuccess, getPost, usePosts } from "../../../redux/reducers/postReducer";
import { useAccessToken } from "../../../redux/reducers/authReducer";
import { useUser } from "../../../redux/reducers/userReducer";
import Navbar from "../../Navbar/ClassNavbar";
import Liveroom from './Tabs/Liveroom';
import RoomLobby from './Tabs/Videoroom/RoomLobby';
import Settings from './Tabs/ClassSettings/Settings';
// import Attendance from './Tabs/Attendance';
// import Announcements from './Tabs/Announcements/Announcements';
// import Assignment from './Tabs/Assignment';
// import Videoroom from './Tabs/Videoroom/Videoroom';
// import RoomLobby from './Tabs/Videoroom/RoomLobby';




function ClassDetail(props) {
  const accessToken = useAccessToken();
  // const classSlug = useclassSlug();
  const dispatch = useDispatch();
  const navigate = useNavigate();

    // const Classes = props.classes;
    const { slug } = useParams();
    const [content, setContent] = useState("liveroom");

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getCurrentClassSuccess(accessToken,slug, navigate));
    }, [])


   
    if (props.loading) {
            return (<Loader />)
        }
    else {
            return (
                <>
                <Navbar content={content} setContent={setContent} />
                    {/* <SideBar slug={slug} isStudent={userData?.is_student} /> */}
                  {
                    content==="videoroom" ?
                    <RoomLobby /> :
                    content==="settings" ?
                    <Settings /> :
                    <Liveroom /> 
                  }
                </>
            )
        }
    
}


export default ClassDetail;