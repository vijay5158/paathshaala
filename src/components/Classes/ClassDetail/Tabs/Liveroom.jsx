import React, { useEffect } from 'react';
import { getPost, usePosts } from '../../../../redux/reducers/postReducer';
import { makeStyles } from '@material-ui/core';
import Posts from "../../../Post/Posts";
import CopyButton from "../CopyButton";
import Attendance from "../Attendance";
import { Card, CardActions, Container, Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Cardbg from '../../../../images/classcardbg.jpg';
import { getClasses, getCurrentClass, getCurrentClassSuccess, useClassLoading } from '../../../../redux/reducers/classReducer';
import { useUser } from '../../../../redux/reducers/userReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAccessToken } from '../../../../redux/reducers/authReducer';

const useStyles = makeStyles((theme) => (
    {
        root: {
            minWidth: 275,
            backgroundImage: `url(${Cardbg})`,
            width: '100%'
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
            margin: theme.spacing(1, 1.5),
        },
        cardHeader: {
            backgroundColor:
                theme.palette.type === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[700],
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
            marginBottom: theme.spacing(2),
        }
    }));
const Liveroom = () => {
    const userData = useUser();
    const loading = useClassLoading()
    const currentClass = getCurrentClass();

    const classes = useStyles();
    classes.cardContent = undefined;
    classes.card = undefined;
    const refresh = () => {
        // dispatch(getPost(accessToken, slug));
        // dispatch(getComment(userData?.token, slug));
    }
   

    return (
        <>
  <div className='card-div sm:w-[70vw] w-[95vw]'>
                        <Card className={classes.root}>

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
                        </Card>
                    </div>
                    <div className="post-div sm:w-[70vw] w-[95vw]">
                        {/* <Container maxWidth="md" id='postContainer' component="main">
                            {(!userData?.is_student) ?

                                <div className="add-post">

                                    <form action="" encType="multipart/form-data" className="add-form">
                                        <div className="input-form">

                                            <Input placeholder={(expand) ? "Enter Text" : "Click to add post."} autoFocus={(expand)} onChange={handleChange} onClick={() => setExpand(true)} name="text" fullWidth={true} multiline={(expand) ? true : false} rows={2} />
                                            {(expand) ?
                                                <Button style={{ marginTop: '1rem' }}>
                                                    <Input type="file" multiple id="file"
                                                        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
                                                        onChange={handleChangeFile} disableUnderline={true} name="file" /> </Button> : null}
                                        </div>
                                        {(expand) ?
                                            <div className="button-form">
                                                <Button type="reset" onClick={handleSubmit} >
                                                    <SendIcon style={{ color: '#f74754' }} />
                                                </Button>
                                                <Button onClick={() => setExpand(false)}>
                                                    <CloseIcon style={{ color: '#f74754' }} />
                                                </Button>
                                            </div>
                                            : null}
                                    </form>
                                </div> : null}
                            {posts.map((post, index) => <Post key={index} firstName={post.user.first_name} slug={slug} lastName={post.user.last_name} profile_img={post.user.profile_img} text={post.text} file_name={post.file_name} file={post.file} user={post.user} date={post.date} time={post.time} post_id={post.id} />)}
                        </Container> */}
                        <Posts />
                    </div>
        </>
    );
};

export default Liveroom;