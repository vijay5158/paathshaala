import React, { useEffect } from 'react';
import { createCommentSuccess, createPostSuccess, getPost, usePosts } from '../../../../redux/reducers/postReducer';
import Posts from "../../../Post/Posts";
import CopyButton from "../CopyButton";
import Attendance from "../Attendance";
import { Card, CardActions, Container, Input } from "@mui/material";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Cardbg from '../../../../images/classcardbg.jpg';
import { createAnmntSuccess, getClasses, getCurrentClass, getCurrentClassSuccess, useClassLoading } from '../../../../redux/reducers/classReducer';
import { useUser } from '../../../../redux/reducers/userReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAccessToken } from '../../../../redux/reducers/authReducer';
import { useRef } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import Announcements from './Announcements/Announcements';
import { addAssignmentSuccess, createAssignment } from '../../../../redux/reducers/assignmentReducer';
import Assignments from './Assignments/Assignments';

const useStyles = () => (
    {
        root: {
            minWidth: 275,
            // backgroundImage: `url(${Cardbg})`,
            width: '100%',
            // backgroundSize: 'cover', // Adjust background size as needed
            // backgroundPosition: 'center',
            // backgroundRepeat: 'no-repeat'
            background: 'linear-gradient(180deg, #58418b24 0%, #FFFFFF 30.21%)'
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        cardMedia: {
            paddingTop: '56.25%', // 16:9
        },
        link: {
            margin: "10px",
        },
        cardHeader: {
            // backgroundColor:
            //     theme.palette.type === 'light'
            //         ? theme.palette.grey[200]
            //         : theme.palette.grey[700],
        },
        postTitle: {
            fontSize: '16px',
            textAlign: 'left',
        },
        postText: {
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'baseline',
            fontSize: '12px',
            textAlign: 'left',
            marginBottom: "10px",
        }
    });
const Liveroom = () => {
    const userData = useUser();
    const loading = useClassLoading()
    const currentClass = getCurrentClass();
    const webSocket = useRef(null);
    const { slug } = useParams();
    const [content, setContent] = useState("posts");
    const accessToken = useAccessToken();
    const dispatch = useDispatch();
    const classes = useStyles();
    classes.cardContent = undefined;
    classes.card = undefined;
    const refresh = () => {
        dispatch(getPost(accessToken, slug));
        // dispatch(getComment(userData?.token, slug));
    }
    useEffect(()=>{
        dispatch(getPost(accessToken,slug));
        
    },[])
    
    const disconnect = useCallback(() => {
          webSocket?.current?.close();
      }, [webSocket]);
  
   const createWebSocketConnection = ()=>{
    const path = `wss://api.paathshaala.me/ws/class/${slug}/?token=${accessToken}`;
    const localPath = `ws://localhost:8000/ws/class/${slug}/?token=${accessToken}`;
  
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
      else if(data.assignment){
        dispatch(addAssignmentSuccess(data.assignment));
      }
    };
    webSocket.current.onerror = e => {
      console.log(e);
    };
    webSocket.current.onclose = () => {
    };
  
  }
      useEffect(() => {
  
        createWebSocketConnection();
          return () => {
            disconnect();
          };
        }, [slug]);
    
    const checkAndReopenWebSocket = ()=>{
      if (!webSocket.current || webSocket?.current?.readyState === WebSocket.CLOSED){
        console.log('checkAndReopenWebSocketClosed');
        createWebSocketConnection();
      }
    }
  

    return (
        <>
  <div className='card-div sm:w-[70vw] w-[95vw]'>
                        <Card sx={classes.root}>
                        <CardActions>
                                <div className="w-full flex justify-between items-center">
                                <Button size="small" onClick={refresh}>Refresh</Button>
                                {(!userData?.is_student) ? <p style={{ color: 'gray', fontSize: '0.8rem' }}>
                                    {/* Class code: {currentClass.slug} */}
                                    <CopyButton text={currentClass?.slug} />
                                </p> : 
                                // <p style={{ color: 'gray', fontSize: '0.8rem' }}>
                                //     Class Teacher: {currentClass?.teacher?.name}
                                // </p>
                                <Attendance classId={currentClass?.id} />
                                }
                                </div>
                            </CardActions>
                            <CardContent>

                                <h4 style={{ color: '#58418b', fontSize: '1rem' }}>
                                    {currentClass.class_name + " " + currentClass.standard}
                                </h4>
                                <h2 className="projName" style={{ color: '#58418b', fontSize: '2rem' }}>
                                    {currentClass.subject}
                                </h2>

                                {/*    <Typography variant="body2" component="p">*/}
                                {/*        well meaning and kindly.*/}
                                {/*        <br />*/}
                                {/*        {'"a benevolent smile"'}*/}
                                {/*    </Typography>*/}
                            </CardContent>
                            <ul className="flex flex-wrap relative gap-2 items-center justify-center">
        
                            <li className="">
                                <span onClick={()=> setContent("posts")} className={
                                                    content==="posts"?
                                                    "inline-block p-4 text-xs md:text-base sm:text-sm cursor-pointer text-blue-600 border-b-2 border-blue-600 bg-[rgba(0,0,255,0.1)] rounded-t-lg active "
                                                    :
                                                    "inline-block p-4 text-xs md:text-base sm:text-sm cursor-pointer border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                                }>
                                    Posts</span>
                            </li>
                        <li className="">
                                <span onClick={()=> setContent("assignment")} className={
                                                    content==="assignment"?
                                                    "inline-block p-4 text-xs md:text-base sm:text-sm cursor-pointer text-blue-600 border-b-2 border-blue-600 bg-[rgba(0,0,255,0.1)] rounded-t-lg active "
                                                    :
                                                    "inline-block p-4 text-xs md:text-base sm:text-sm cursor-pointer border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                                }>
                                    Assignment</span>
                            </li>
                            {/* <li className="mr-2">
                                <span onClick={()=> setContent("attendance")} className={
                                                    content==="attendance"?
                                                    "inline-block p-4 text-xs md:text-base sm:text-sm cursor-pointer text-blue-600 border-b-2 border-blue-600 bg-[rgba(0,0,255,0.1)] rounded-t-lg active "
                                                    :
                                                    "inline-block p-4 text-xs md:text-base sm:text-sm cursor-pointer border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                                }>
                                    Attendance</span>
                            </li> */}
                            <li className="">
                                <span onClick={()=> setContent("announcements")} className={
                                                    content==="announcements"?
                                                    "inline-block p-4 text-xs md:text-base sm:text-sm cursor-pointer text-blue-600 border-b-2 border-blue-600 bg-[rgba(0,0,255,0.1)] rounded-t-lg active "
                                                    :
                                                    "inline-block p-4 text-xs md:text-base sm:text-sm cursor-pointer border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                                }>
                                    Announcements</span>
                            </li>

                        </ul>
                        </Card>
                    </div>
                    <div className="post-div sm:w-[70vw] w-[95vw]">
                        {content==="announcements" ? 
                        <Announcements />
                        :
                        content==="assignment" ? 
                        <Assignments />
                        :
                        <Posts checkAndReopenWebSocket={checkAndReopenWebSocket} />
                        }
                    </div>
        </>
    );
};

export default Liveroom;