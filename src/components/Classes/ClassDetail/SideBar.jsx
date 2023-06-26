import React from 'react';
import './SideBarStyle.css';
import HomeIcon from "@material-ui/icons/Home";
import { Drawer, ListItem, ListItemIcon, ListItemText, useTheme } from "@material-ui/core";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import {
    AnnouncementRounded,
    AssessmentRounded,
    AssignmentOutlined,
    AssignmentRounded, PeopleRounded,
    SettingsBackupRestoreOutlined, SettingsRounded
} from "@material-ui/icons";
import { Link } from "react-router-dom";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    primary: {
        fontFamily: 'Ubuntu'
    },
}));

function SideBar(props) {
    const classes = useStyles();
    const theme = useTheme();
    const open = true;
    return (
        <>
            <nav className="main-menu">


                <div className="scrollbar" id="style-1">

                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, classes.drawerOpen)}
                        classes={{
                            paper: clsx(classes.drawerOpen),
                        }}
                    >
                        <div className={classes.toolbar}>
                            <IconButton>
                                <Link to='/'><HomeIcon style={{ color: '#f74754' }} /></Link>
                            </IconButton>
                        </div>
                        <Divider />
                        <List  >
                            <ListItem button>
                                <Link to={`/announcements/${props.slug}/`}><ListItemIcon><AnnouncementRounded style={{ color: '#f74754' }} /></ListItemIcon></Link>
                                <ListItemText primary='Announcements' style={{ color: '#d14467' }} />

                            </ListItem>
                            <ListItem button>
                                <ListItemIcon><AssignmentRounded style={{ color: '#d14467' }} /></ListItemIcon>
                                <ListItemText primary='Assignment' style={{ color: '#d14467' }} />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon><AssessmentRounded style={{ color: '#944688' }} /></ListItemIcon>
                                <ListItemText className={classes.primary} primary='Assessment' style={{ color: '#944688' }} />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon><PeopleRounded style={{ color: '#58418b' }} /></ListItemIcon>
                                <ListItemText primary='Students' style={{ color: '#58418b' }} />
                            </ListItem>
                            {(!props.isStudent) ? <ListItem button>
                                <ListItemIcon><SettingsRounded style={{ color: '#4454b5' }} /></ListItemIcon>
                                <ListItemText primary='Settings' style={{ color: '#4454b5' }} />
                            </ListItem> : null}

                        </List>
                        <Divider />
                    </Drawer>
                </div>





            </nav>


        </>
    );
}

export default SideBar;
