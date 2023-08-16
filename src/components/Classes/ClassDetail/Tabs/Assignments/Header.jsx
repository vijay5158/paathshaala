import { FormControl, InputLabel, MenuItem, Select, Box, CircularProgress } from '@mui/material';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { useAccessToken } from '../../../../../redux/reducers/authReducer';
import { useParams } from 'react-router-dom';
import { createAssignment } from '../../../../../redux/reducers/assignmentReducer';

const Header = () => {
    const [sort, setSort] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [document, setDocument] = React.useState(null);
    const [assignmentData, setAssignmentData] = React.useState({
      title: "",
      end_date: "",
      assignment_text: ""
    });
    const { slug } = useParams();
    const accessToken = useAccessToken();
    const dispatch = useDispatch();

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleChange = (event) => {
      setSort(event.target.value);
    };
    const handleDataChange = (event) => {
      setAssignmentData({
        ...assignmentData,
        [event.target.name]: event.target.value
      })
    };

    const handleFileChange = (event)=> {
      const files = event.target.files;
      if(files && files.length>0){
        setDocument(files[0]);
      };
    };
    const handleDone = () => {
      setAssignmentData({
        title: "",
        end_date: "",
        assignment_text: ""
      });
      setDocument(null);
      handleClose();    
    }
    const handleSubmit = () => {
      if (assignmentData.title === ""){
        alert("Fill assignment title !");
        return
      }
      else if (assignmentData.assignment_text === ""){
        alert("Fill assignment details !");
        return
      }
      else if (assignmentData.end_date === ""){
        alert("Fill assignment end date !");
        return
      }
      else{
        const formData = new FormData();
        formData.append("title", assignmentData.title);
        formData.append("end_date", assignmentData.end_date);
        formData.append("assignment_text", assignmentData.assignment_text);
        if(document) formData.append("file", document);
        dispatch(createAssignment(accessToken, slug, formData, setLoading, handleDone));
        
      }
    }

    return (
        <>
        <header className="flex justify-between items-center w-full py-2 sm:py-3 md:py-4 px-2 sm:px-3">
        <button className="flex items-center gap-2 py-2 px-4 rounded-[2rem] text-white btn" onClick={handleClickOpen}>
            <span className="">
                <AiOutlinePlus />
            </span>
            <span>
                Create
            </span>
        </button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Assignment</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{marginBottom: "10px"}}
            >
            To create assignment, please enter details.
          </DialogContentText>
          <TextField
            sx={{marginBottom: "10px"}}
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={assignmentData.title}
            onChange={handleDataChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            sx={{marginBottom: "10px"}}
            margin="dense"
            id="file"
            name="file"
            label="Document"
            type="file"
            fullWidth
            // value={document}

            variant="outlined"
            onChange={handleFileChange}
            
            helperText="*Optional"
            InputLabelProps={{
              shrink: true,
            }}
          />
        <TextField
            sx={{marginBottom: "10px"}}
            margin="dense"
            id="end_date"
            name="end_date"
            label="End Date"
            type="datetime-local"
            fullWidth
            value={assignmentData.end_date}
            onChange={handleDataChange}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        <TextField
            sx={{marginBottom: "10px"}}
            margin="dense"
            id="assignment_text"
            name="assignment_text"
            label="Details"
            value={assignmentData.assignment_text}
            type="text"
            multiline
            fullWidth
            onChange={handleDataChange}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            Create
            {loading && <CircularProgress size={10} />}
            </Button>
        </DialogActions>
      </Dialog>

        <FormControl variant="outlined" className='min-w-[60px]'>
        <InputLabel id="demo-simple-select-standard-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={sort}
          onChange={handleChange}
          label="Sort"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"newer"}>Newer</MenuItem>
          <MenuItem value={"older"}>Older</MenuItem>
        </Select>
      </FormControl>
        </header>   
        </>
    );
};

export default Header;