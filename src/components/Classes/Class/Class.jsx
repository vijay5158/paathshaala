import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import { MdExpandMore } from "react-icons/md";
import { AiOutlineStar, AiOutlineShareAlt } from 'react-icons/ai';
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import Cardbg from '../../../images/classcardbg.jpg';
import Coa from "../../../images/coa.jpg";
import './class.css';
import { useDispatch } from "react-redux";
import { setCurrentClass } from "../../../redux/reducers/classReducer";

const useStyles = () => ({
    root: {
        fontFamily: 'Audiowide',
        // maxWidth: 345,
        // backgroundImage: `url(${Cardbg})`,
        boxShadow: '0 1px 3px 0 rgb(23 23 23 / 30%), 0 4px 8px 3px rgb(10 10 10 / 15%)',
        margin: 'auto',
        backgroundSize: 'cover', // Adjust background size as needed
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '0rem'
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        fontFamily: 'Audiowide'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        // transition: theme.transitions.create('transform', {
        //     duration: theme.transitions.duration.shortest,
        // }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        background: "linear-gradient(45deg,#FF2C4F,#0B31D0)",
    },
});

function Class({classData}) {
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleToClass = ()=>{
        dispatch(setCurrentClass(classData));
    }
    return (
        <>

            <Box>

                <Box className="hover:bg-[linear-gradient(45deg,#FF2C4F,#0B31D0)] p-[2px] rounded-[0rem]">
                        <Card sx={classes.root}>
                        <Link id='card-link' onClick={handleToClass} style={{ textDecoration: 'none', fontFamily: 'Audiowide' }} to={classData.slug}  >
                            <CardHeader
                                sx={{ width: '300px', marginTop: '1rem', height: '60px', fontFamily: 'Audiowide, cursive' }}
                                avatar={
                                    <Avatar aria-label="recipe" sx={classes.avatar}>
                                        {classData.subject.charAt(0)}
                                    </Avatar>
                                }
                                title={<p className='projName' style={{ fontSize: '1rem' }}>{classData.subject?.toUpperCase()}</p>}
                                subheader={<p>{classData.class_name + " " + classData.standard}</p>}
                            />
                            </Link>
                            <CardMedia
                                sx={classes.media}
                                image={classData?.poster || Coa}
                                title={classData.subject}
                            />
                            <CardContent>
                                <p>      Teacher : {classData.teacher}</p>

                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <AiOutlineStar />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <AiOutlineShareAlt />
                                </IconButton>
                                <IconButton
                                    sx={classes.expand}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <MdExpandMore />
                                </IconButton>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <p>{"Teacher - " + classData.teacher}</p>

                                </CardContent>
                            </Collapse>
                        </Card>
                    </Box>
            

            </Box>

        </>

    );
}

export default Class;
