import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { GetAppSharp } from "@material-ui/icons";
import React from 'react';
import DocIcon from '../../images/doc.png';
import FileIcon from '../../images/file.png';
import ImageIcon from '../../images/image.jpeg';
import Mp3Icon from '../../images/mp3.png';
import Mp4Icon from '../../images/mp4.png';
import PdfIcon from '../../images/pdf.png';
import PptIcon from '../../images/ppt.png';
import ZipIcon from '../../images/zip.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width:'100%'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 100,
        margin: '0.7rem'
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));
const fileExtension = (file_name) => {
    return file_name.split('.').pop();
}
function PostData(props) {
    const classes = useStyles();
    const theme = useTheme();
    const fileExtn = fileExtension(props.fileName)


    return (
        <Card className={classes.root}>
            <CardMedia

                className={classes.cover}
                image={(fileExtn === 'jpg' || fileExtn === 'jpeg' || fileExtn === 'png') ? ImageIcon :
                    (fileExtn === 'pdf') ? PdfIcon :
                        (fileExtn === 'doc' || fileExtn === 'docx' || fileExtn === 'odp') ? DocIcon :
                            (fileExtn === 'pptx' || fileExtn === 'ppt') ? PptIcon :
                                (fileExtn === 'mp4' || fileExtn === 'mkv') ? Mp4Icon :
                                    (fileExtn === 'jpg' || fileExtn === 'jpeg' || fileExtn === 'mp3') ? Mp3Icon :
                                        (fileExtn === 'zip') ? ZipIcon :

                                            FileIcon}
                title="File"
            />

            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="subtitle1" color="textSecondary">
                        {props.fileName}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <IconButton>

                        <a target='_blank' style={{ textDecoration: 'none' }} href={props.file}>
                            <GetAppSharp fontSize='large' style={{ color: '#f74754' }} />

                        </a>
                    </IconButton>
                </div>
            </div>

        </Card>
    );
}
export default PostData;