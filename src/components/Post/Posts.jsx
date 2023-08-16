import { CircularProgress, Container, Input, Paper } from '@mui/material';
import Button from "@mui/material/Button";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Post from "./Post";
import './poststyle.css';
import { useUser } from '../../redux/reducers/userReducer';
import { useAccessToken } from '../../redux/reducers/authReducer';
import { getCurrentClass } from '../../redux/reducers/classReducer';
import { createPost, usePosts } from '../../redux/reducers/postReducer';
import { MdClose } from 'react-icons/md';
import { AiOutlineSend } from 'react-icons/ai';



const useStyles = (() => ({
    cardMedia: {
        paddingTop: '56.25%',
    },
    link: {
        margin: "8px",
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
        event.preventDefault()
        if (postData.text !==""){
            props.checkAndReopenWebSocket();
            setLoading(true);
          let post = new FormData();
        post.append('text', postData.text);
        post.append('classroom', classData.id);
        if(postImage && postImage?.file?.length>0){
        post.append('file', postImage.file[0]);
        post.append('file_name', postImage.file_name);
        }
        dispatch(createPost(accessToken, post,handleLoading));

    }
    else{
        alert('Please fill text!');
    }
}
const handleLoading = ()=>{
    setLoading(false);
    setExpand(false)
}

    return (
        <>
            <main className='w-full'>
                {(!userData?.is_student) ?

                    <Paper className="add-post">

                        <form action="" encType="multipart/form-data"  onSubmit={handleSubmit} className="add-form">
                            <div className="input-form">

                                <Input placeholder={(expand) ? "Enter Text" : "Click to add post."} autoFocus={(expand)} onChange={handleChange} onClick={() => setExpand(true)} name="text" fullWidth={true} multiline={(expand) ? true : false} rows={2} />
                                {(expand) ?
                                    <Button style={{ marginTop: '1rem' }}>
                                        <Input type="file" id="file"
                                            accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
                                            onChange={handleChangeFile} disableUnderline={true} name="file" /> </Button> : null}
                            </div>
                            {(expand) ?
                                <div className="button-form flex flex-col gap-4">
                                    <Button type="submit" disabled={loading} >
                                        
                                    {loading ? <CircularProgress size={14} color="inherit" /> : <AiOutlineSend className='text-[#0B31D0] text-xl' />}
                                    </Button>
                                    <Button onClick={() => setExpand(false)}>
                                        <MdClose className='text-[#f74754] text-xl' />
                                    </Button>
                                </div>
                                : null}
                        </form>
                    </Paper> : null}
                    {postIds.map((postId, index) => <Post key={index} checkAndReopenWebSocket={props.checkAndReopenWebSocket} slug={classData?.slug} postData={posts[postId]} />)}
            </main>
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