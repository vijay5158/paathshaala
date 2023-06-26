import { Container, Input } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import makeStyles from '@material-ui/core/styles/makeStyles';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import FormData from 'form-data';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Post from "./Post";
import './poststyle.css';
import { useUser } from '../../redux/reducers/userReducer';
import { useAccessToken } from '../../redux/reducers/authReducer';
import { useRef } from 'react';
import { getCurrentClass } from '../../redux/reducers/classReducer';
import { createPost, usePosts } from '../../redux/reducers/postReducer';
import { Spinner } from 'react-bootstrap';



const useStyles = makeStyles((theme) => ({
    cardMedia: {
        paddingTop: '56.25%',
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
    },
}));

const Posts = (props) => {
    const classData = getCurrentClass();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const accessToken = useAccessToken();
    const posts = usePosts();
    const postIds = Object.keys(posts);
    const userData = useUser();
    const [expand, setExpand] = useState(false);
    const initialFormData = Object.freeze({
        text: '',
        classroom: classData?.id
    });
    const [postData, updatePostData] = useState(initialFormData);
    const [postImage, setPostImage] = useState(null);

    const handleChangeFile = (event) => {
        setPostImage({
            file: event.target.files,
            file_name: event.target.value.slice(12)
        });
    }

    const handleChange = (event) => {
        updatePostData({
            ...postData,
            [event.target.name]: event.target.value.trim(),
        });
    };
    const handleSubmit = (event) => {
        if (postData.text !=="" && postImage){
            setLoading(true);
        let post = new FormData();
        post.append('text', postData.text);
        post.append('classroom', postData.classroom);
        post.append('file', postImage.file[0]);
        post.append('file_name', postImage.file_name);

        dispatch(createPost(accessToken, post,setLoading));

        setExpand(false)
    }
}
    const classes = useStyles();
    classes.cardContent = undefined;
    classes.card = undefined;
    return (
        <>
            <Container maxWidth="md" component="main">
                {(!userData?.is_student) ?

                    <div className="add-post">

                        <form action="" encType="multipart/form-data" className="add-form">
                            <div className="input-form">

                                <Input placeholder={(expand) ? "Enter Text" : "Click to add post."} autoFocus={(expand)} onChange={handleChange} onClick={() => setExpand(true)} name="text" fullWidth={true} multiline={(expand) ? true : false} rows={2} />
                                {(expand) ?
                                    <Button style={{ marginTop: '1rem' }}>
                                        <Input type="file" id="file"
                                            accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
                                            onChange={handleChangeFile} disableUnderline={true} name="file" /> </Button> : null}
                            </div>
                            {(expand) ?
                                <div className="button-form">
                                    <Button type="reset" disabled={loading} onClick={handleSubmit} >
                                        <SendIcon style={{ color: '#f74754' }} />
                                    {loading && <Spinner />}
                                    </Button>
                                    <Button onClick={() => setExpand(false)}>
                                        <CloseIcon style={{ color: '#f74754' }} />
                                    </Button>
                                </div>
                                : null}
                        </form>
                    </div> : null}
                    {postIds.map((postId, index) => <Post key={index} slug={classData?.slug} postData={posts[postId]} />)}
            </Container>
        </>
    );
}


// const mapStateToProps = state => {
//     return {
//         is_student: state.authReducer.is_student,
//         loading: state.postReducer.loading,
//         token: state.authReducer.token,
//         posts: state.postReducer.posts,


//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         getPost: (token, slug) => dispatch(getPost(token, slug)),
//         createPost: (token, post) => dispatch(createPost(token, post)),
//         getComment: (token, slug) => dispatch(getComment(token, slug)),

//     };
// };

// export default withRouter(connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Posts));

export default Posts;