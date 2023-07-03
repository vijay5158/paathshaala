import FormData from 'form-data';
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
import Attendance from './Tabs/Attendance';
import Announcements from './Tabs/Announcements/Announcements';
import Assignment from './Tabs/Assignment';
import Videoroom from './Tabs/Videoroom';




function ClassDetail(props) {
  const webSocket = useRef(null);
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
        dispatch(getPost(accessToken,slug));
        dispatch(getAnnouncements(accessToken,slug));
        // dispatch(getPost(userData?.token, slug));
        // dispatch(getComment(userData?.token, slug));
        // dispatch(getAnmnt(userData?.token, slug));
        // if (localStorage.getItem('classConnections') != null) {

        //     const connections = JSON.parse(localStorage.getItem('classConnections'))
        //     if (!connections['slugs'].includes(slug)) {
        //         connect(slug);
        //     }
        // }

        // else {
        //     connect(slug);
        // }
    }, [])

    useEffect(() => {

        const path = `wss://api.paathshaala.me/ws/class/${slug}/`;

          webSocket.current = new WebSocket(path);
          webSocket.current.onopen = () => {
            webSocket.current.send(JSON.stringify({
              type: "auth",
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }));
          };
          webSocket.current.onmessage = e => {
            const data = JSON.parse(e.data);
            if (data.comment != null) {
              dispatch(createCommentSuccess(data.comment))
            }
            if (data.post != null) {
              dispatch(createPostSuccess(data.post));
            }
            else if(data.announcement){
                dispatch(createAnmntSuccess(data.announcement));
            }
          };
          webSocket.current.onerror = e => {
            console.log(e);
          };
          webSocket.current.onclose = () => {
          };
    
        return () => {
          webSocket?.current?.close();
        };
      }, [slug]);
    // const disconnect = useCallback(() => {
    //     webSocket.close();
    // }, [webSocket]);



   
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
                    <Videoroom /> :
                    content==="announcements" ?
                    <Announcements /> :
                    content==="assignment" ?
                    <Assignment /> :
                    content==="attendance" ?
                    <Attendance /> :
                    <Liveroom /> 
                  }
                </>
            )
        }
    
}


export default ClassDetail;