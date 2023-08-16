import React from 'react';
import { AiFillEdit } from 'react-icons/ai';
import defaultClassBg from '../../../../../images/coa.jpg';
import { getCurrentClass } from '../../../../../redux/reducers/classReducer';
import { Card, Paper } from '@mui/material';
import { useState } from 'react';

const useStyles = (bg) => ({
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover', // Adjust background size as needed
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
        // boxShadow: '0 1px 3px 0 rgb(23 23 23 / 30%), 0 4px 8px 3px rgb(10 10 10 / 15%)',
})

const Settings = () => {
    const currentClass = getCurrentClass();
    const [isClassSave, setIsClassSave] = useState(false);
    const [classData, setClassData] = useState({
        class_name: currentClass?.class_name,
        subject: currentClass?.subject,
        standard: currentClass?.standard,
    })
    const handleClassDataChange = (e) => {
        if (!isClassSave) setIsClassSave(true);
        setClassData({
            ...classData,
            [e.target.name]: e.target.value
        })
    }

    const cancelClassDataSave = (e)=>{
        e.preventDefault();
        setIsClassSave(false);
        setClassData({
            class_name: currentClass?.class_name,
            subject: currentClass?.subject,
            standard: currentClass?.standard,
        })
    }

    const handleClassDataSave = (e) =>{
        e.preventDefault();
        if(classData?.class_name && classData?.class_name!=="" && classData?.subject && classData?.subject!=="" && classData?.standard && classData?.standard!==""){
            console.log(classData);
        }
        else{
            alert("Fields can't be empty !")
        }
    }
    return (
        <main className='flex flex-col gap-6'>
            <div className={`w-full h-[150px] sm:h-[200px] bg-[gray] relative`} style={currentClass?.poster ? useStyles(currentClass?.poster) : useStyles(defaultClassBg)}>
            <span className="text-2xl cursor-pointer absolute right-[1rem] bg-[white] p-[8px] rounded-full bottom-[14px] flex items-end" htmlFor="profile_img">
            <AiFillEdit />
            </span> 
            </div>
            <Paper className='flex flex-col gap-4 w-full w-[95%] sm:w-3/4 m-auto px-2 sm:px-4 py-4' sx={{borderRadius: "0rem"}}>
                <h5 className='text-start text-2xl font-semibold text-[#58418b] mb-4'>Class Details</h5>
                <div className="class-update-div w-full flex flex-col gap-4">
                    <input name="class_name" value={classData.class_name} onChange={handleClassDataChange} placeholder='Class Name' type="text" className="w-full px-3 py-2 focus:border-[2px] text-base border-0 border-[#3a30b7] outline-none bg-gray-100" />
                    <input name="subject" value={classData.subject} onChange={handleClassDataChange} placeholder='Subject' type="text" className="w-full px-3 py-2 focus:border-[2px] text-base border-0 border-[#3a30b7] outline-none bg-gray-100" />
                    <input name="standard" value={classData.standard} onChange={handleClassDataChange} placeholder='Standard' type="text" className="w-full px-3 py-2 focus:border-[2px] text-base border-0 border-[#3a30b7] outline-none bg-gray-100" />
                </div>
                <div className="flex justify-between w-full items-center">
                    <button onClick={cancelClassDataSave} disabled={!isClassSave} className={isClassSave ?"px-4 py-2 border-0 outline-none bg-gray-500 text-white text-sm":"px-4 py-2 border-0 outline-none bg-gray-500 text-white text-sm opacity-50"}>Cancel</button>
                    <button onClick={handleClassDataSave} className={isClassSave ? "px-4 py-2 border-0 outline-none bg-[#58418b] text-white text-sm": "text-white text-sm px-4 py-2 border-0 outline-none bg-[#58418b] opacity-50"} disabled={!isClassSave}>Save</button>
                </div>
            </Paper>
        </main>
    );
};

export default Settings;