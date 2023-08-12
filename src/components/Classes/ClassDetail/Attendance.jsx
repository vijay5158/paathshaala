import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { MarkAttendance } from '../../../redux/reducers/classReducer';
import { useDispatch } from 'react-redux';
import { useAccessToken } from '../../../redux/reducers/authReducer';

const Attendance = ({classId}) => {
    const webcamRef = useRef(null);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const accessToken = useAccessToken();
    const [loading, setLoading] = useState(false);

    const captureImage = async () => {
        try {
            setLoading(true);
            const imageSrc = webcamRef.current.getScreenshot();
            const response = await fetch(imageSrc);
            const blob = await response.blob();
            const fileObj = new File([blob], 'image.jpg', { type: 'image/jpeg' });
            const formData = new FormData();
            formData.append('avatar', fileObj);
            formData.append('class', classId);
            dispatch(MarkAttendance(accessToken, formData, setLoading));
                
        } catch (error) {
            setLoading(false);
            alert('Try again!')
        }
  
      };  
      const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseclass = () => {
        setOpen(false);
    };
    return (
        <>
        <button
            className="flex items-center justify-center px-4 py-2 bg-blue-100 text-black rounded hover:bg-blue-200"
            onClick={handleClickOpen}
        >
            Mark Attendance
        </button>
        <Dialog open={open} onClose={handleCloseclass} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Mark your attendance</DialogTitle>
                <div >
                    <DialogContent>
                    <div className='flex flex-col items-center gap-2'>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                    />
                    <button 
                        className="flex items-center justify-center px-4 py-2 bg-blue-100 text-black rounded hover:bg-blue-200"
                        onClick={captureImage} disabled={loading}>
                            Mark Attendance
                            {loading &&  <CircularProgress size={14} color='inherit' />}
                    </button>
                    {/* {capturedImage && <img src={capturedImage} alt="Captured" />} */}
                    </div>                     
                </DialogContent>
                </div>
                </Dialog>
          
        </>
    );
};

export default Attendance;