import { Button, CircularProgress, Input } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    BsSendPlusFill
} from "react-icons/bs";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import postbg from '../../images/postbg.jpg';
import Comment from "./Comment";
import PostData from "./PostData";
import './poststyle.css';
import { useAccessToken } from "../../redux/reducers/authReducer";
import { createComment } from "../../redux/reducers/postReducer";


const useStyles1 = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: '1 0 auto',
        borderRadius: '10px',
        boxShadow: '0 1px 3px 0 rgb(23 23 23 / 30%), 0 4px 8px 3px rgb(10 10 10 / 15%)'
    },
    cover: {
        width: 101,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

        marginTop: '1.5rem',

    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        // maxWidth: '60vw',
        boxShadow: 'box-shadow: 0 1px 3px 0 rgb(23 23 23 / 30%), 0 4px 8px 3px rgb(10 10 10 / 15%)',
        backgroundImage: `url(${postbg})`
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));



function Post({postData}) {
    const [newComment, setNewComment] = useState('');
    const [showComment, setShowComment] = useState(false);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const accessToken = useAccessToken();
    const comments = postData?.comments;
    const commentKeys = Object.keys(comments);
    const classes = useStyles()
    const handleCreateComment = (e) => {
        e.preventDefault();
      if (newComment !== '') {
        setLoading(true);

        const newCommentData = {
          text: newComment,
          post: postData.id,
        };
        dispatch(createComment(accessToken, newCommentData, setNewComment, handleLoading));
      }
    };
    const handleLoading = ()=>{
        setLoading(false);
    }
      return (
        <>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid >
                        <Grid item>
                            <div style={{ display: 'flex' }}>
                                <Avatar src={postData?.user?.profile_img} alt='user' />
                                <Typography style={{ marginLeft: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} gutterBottom variant="subtitle1">
                                    <span style={{ fontSize: '1rem' }}>{postData?.user?.name}</span>
                                    <span style={{ fontSize: '0.7rem', color: 'gray' }}>{new Date(postData.created_at).toLocaleString()}</span>
                                </Typography>

                            </div>
                        </Grid>
                        <Grid item>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '1rem' }}>
                                <Typography gutterBottom variant="subtitle1" style={{ marginLeft: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width:'100%' }} >
                                    <span style={{ fontSize: '0.8rem', marginBottom: '0.8rem', color: 'dimgray' }}>{postData?.text}</span>
                                    {/*<object data={props.file} width="300" height="200" type="">*/}
                                    {(postData.file) ?
                                        <PostData fileName={postData.file_name} file={postData?.file} />
                                        : null}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item>
                            <form className="comment-div" onSubmit={handleCreateComment} style={{ margin: '1rem', display: 'flex', flexDirection: 'row' }}>
                                <Input value={newComment} id={"text" + postData.id} name="text" onChange={(e)=>setNewComment(e.target.value.trim())} fullWidth={true} placeholder="post a comment" />
                                <Button type='submit' disabled={loading}>
                                    
                                    {loading ? <CircularProgress size={14} color="light" /> : <BsSendPlusFill style={{ color: '#f74754' }} />}

                                </Button>
                            </form>
                            <br />
                            {commentKeys?.length > 0 &&
                            <div className="comment-count">
                                <p>Comments</p>
                                {(showComment) ?
                                    <Button onClick={()=> setShowComment(!showComment)} style={{
                                        boxShadow: '0 1px 3px 0 rgb(23 23 23 / 30%), 0 4px 8px 3px rgb(10 10 10 / 15%)',
                                        padding: '0.3rem',
                                        borderRadius: '0.3rem'
                                    }}><span style={{ fontSize: '0.8rem' }}
                                        className='projName'> Hide Comments</span></Button>
                                    : <Button onClick={()=> setShowComment(!showComment)} style={{
                                        boxShadow: '0 1px 3px 0 rgb(23 23 23 / 30%), 0 4px 8px 3px rgb(10 10 10 / 15%)',
                                        padding: '0.3rem',
                                        borderRadius: '0.3rem'
                                    }}><span style={{ fontSize: '0.8rem' }}
                                        className='projName'> Show Comments</span></Button>
                                }
                            </div>}
                            {/*<br/>*/}
                            <p style={{ margin: '1rem', textAlign: 'start' }}>{commentKeys?.length} comments</p>
                            <hr />
                            {(showComment) ? <div style={{ marginTop: '2rem' }}>

                                <div className="show-comments">
                                    {commentKeys.map((commentKey, index) => <Comment key={index} userImg={comments[commentKey].User.profile_img} name={comments[commentKey]?.User?.name} text={comments[commentKey]?.text} time={comments[commentKey]?.created_at && new Date(comments[commentKey]?.created_at).toLocaleString()} />)}
                                </div> </div> : null}
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </>
    );
}

// const mapStateToProps = state => {
//     return {
//         loading: state.postReducer.loading,
//         token: state.authReducer.token,
//         comments: state.postReducer.comments,


//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {

//         createComment: (token, comment) => dispatch(createComment(token, comment)),
//         getComment: (token, slug) => dispatch(getComment(token, slug))
//     };
// };

// export default withRouter(connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Post));


export default Post;