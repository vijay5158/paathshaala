import React, { useState, useEffect, useRef } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from 'react-redux';
import { useAccessToken } from '../../redux/reducers/authReducer';
import { updateUserData, useUser } from '../../redux/reducers/userReducer';
import { AiFillEdit } from 'react-icons/ai';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Button, CircularProgress } from '@mui/material';


const ProfilePictureUpload = () => {
    const authData = useUser();
    const authToken = useAccessToken()
    const dispatch = useDispatch();
    const [cropperRef, setCropperRef] = useState(null)

    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
//   const [croppedImage, setCroppedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
};

const handleCloseclass = () => {
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
};
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };


  const handleCropImage = async () => {
    try {
        setLoading(true);
      if (typeof cropperRef.getCroppedCanvas() === 'undefined') {
        return;
      }

        const croppedImageBlob = await getCroppedImageBlob();
        // croppedImageBlob.lastModifiedDate = new Date();
        const extns = selectedFile?.name?.split(".");
        const extn = extns[extns.length - 1];
        let filenameExtn = "jpg";

        const fileName = "user_avatar_"+authData?.userId +"."+ extn||filenameExtn;
        const avatar = new File([croppedImageBlob], fileName, {
        lastModified: new Date().getTime()
        });
      const updatedData = new FormData();

      updatedData.append('avatar', avatar);

      dispatch(updateUserData(updatedData, authData?.userId, authToken, handleCloseclass));
    //   const formData = new FormData();
    //   formData.append('profileImage', croppedImageBlob, 'profile.jpg');

    //   // Add any additional form data or headers required for your backend request

    //   const response = await axios.post('/api/upload', formData);

    //   console.log('Upload response:', response.data);

      // Handle the response from the backend as needed
    } catch (error) {
      alert('Upload error:', error);
      setLoading(false);

    }
  };

  const getCroppedImageBlob = () => {
    return new Promise((resolve, reject) => {
      const canvas = cropperRef.getCroppedCanvas();
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to crop image.'));
          return;
        }
        resolve(blob);
      }, 'image/jpeg');
    });
  };
  return (
    <>
     <div className="flex relative" >
        <img src={(authData?.profile_img) ? authData?.profile_img : "https://bootdey.com/img/Content/avatar/avatar7.png"} alt="Admin"
            className="rounded-circle" style={{ width: '9rem', height: '9rem', borderRadius: '50%' }} />
            <span className="cursor-pointer absolute right-[14px] bg-[white] p-[5px] rounded-full bottom-[14px] flex items-end" htmlFor="profile_img" onClick={handleClickOpen}>
            <AiFillEdit />
            </span> 
            {/* <input type="file" className="hidden" id="profile_img"
                accept="image/*"
                onChange={handleChangeProfile} name="profile_img" /> */}
            

    </div>
    <Dialog open={open} onClose={handleCloseclass} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Create Your Face ID</DialogTitle>
    <DialogContent  className=''>
    <div className="flex flex-col items-center mt-4 sm:px-4 py-4 px-2">

      {!selectedFile && (
        <div className="mt-4">
          <label htmlFor="profilePicture" className="cursor-pointer">
            <span className="px-4 py-2 btn shadow-md text-white rounded-lg">
              Select Image
            </span>
          </label>
          <input
            type="file"
            id="profilePicture"
            className="hidden"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileSelect}
            />
        </div>
      )}
        {selectedFile && (
        <div className="mt-4">
          <Cropper
            src={URL.createObjectURL(selectedFile)}
            guides={false}
            // ref={cropperRef}
            style={{ height: "80%", maxHeight:"50vh", width: "auto" }}
            // zoomTo={0.5}
            aspectRatio={1}
            // preview=".img-preview"
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onInitialized={(instance) => {
            setCropperRef(instance);
            }}
          />
        </div>
      )}
    </div>         
    </DialogContent>
        {selectedFile &&
                <DialogActions>
                    <Button onClick={handleCloseclass} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCropImage}
                        disabled={loading}
                        color='primary'
                        // className="px-4 py-2 mt-4 bg-green-500 text-white rounded-md"
                    >
                        Save
                        {loading && <CircularProgress size={24} color="inherit" />}
                    </Button>
                    </DialogActions>
                    }
                </Dialog>
    
            </>
  );
};

export default ProfilePictureUpload;
