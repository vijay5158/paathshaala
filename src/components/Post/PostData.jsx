import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React from 'react';
import DocIcon from '../../images/doc.png';
import FileIcon from '../../images/file.png';
import ImageIcon from '../../images/image.jpeg';
import Mp3Icon from '../../images/mp3.png';
import Mp4Icon from '../../images/mp4.png';
import PdfIcon from '../../images/pdf.png';
import PptIcon from '../../images/ppt.png';
import ZipIcon from '../../images/zip.jpg';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { Box } from '@mui/material';

const useStyles = () => ({
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
        width: "100%",
        margin: '0.7rem'
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: "8px",
        paddingBottom: "8px",
    },
});
const fileExtension = (file_name) => {
    return file_name.split('.').pop();
}
function PostData(props) {
    const classes = useStyles();
    const fileExtn = fileExtension(props.fileName)


    return (
        <Card sx={classes.root}>
            <CardMedia
                sx={classes.cover}
                image={(fileExtn === 'jpg' || fileExtn === 'jpeg' || fileExtn === 'png') ? ImageIcon :
                    (fileExtn === 'pdf') ? PdfIcon :
                        (fileExtn === 'doc' || fileExtn === 'docx' || fileExtn === 'odp') ? DocIcon :
                            (fileExtn === 'pptx' || fileExtn === 'ppt') ? PptIcon :
                                (fileExtn === 'mp4' || fileExtn === 'mkv') ? Mp4Icon :
                                    (fileExtn === 'mp3') ? Mp3Icon :
                                        (fileExtn === 'zip') ? ZipIcon :
                                            FileIcon}
                title="File"
            />

            <Box sx={classes.details}>
                <CardContent sx={classes.content}>
                    <Typography variant="subtitle1" color="textSecondary">
                        {props.fileName}
                    </Typography>
                </CardContent>
                <Box sx={classes.controls}>
                    <IconButton>

                        <a target='_blank' style={{ textDecoration: 'none' }} href={props.file}>
                            <AiOutlineCloudDownload className='text-lg text-[#f74754]' />
                        </a>
                    </IconButton>
                </Box>
            </Box>

        </Card>
    );
}
export default PostData;