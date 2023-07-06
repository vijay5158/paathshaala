import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Navbar = ({content,setContent}) => {
    const navigate = useNavigate();
    const handleGoBack = ()=>{
        navigate(-1);
    }
    return (
        <>
        <div className="w-full bg-white">
        
<div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 p-0 mt-4">
    <ul className="flex flex-wrap relative -mb-px items-center justify-center">
        <span className="absolute left-[5px] cursor-pointer text-black-200 text-3xl" onClick={handleGoBack}><MdArrowBack /></span>
        
        <li className="mr-2">
            <span onClick={()=> setContent("liveroom")} className={
                content==="liveroom"?
                "inline-block p-4 cursor-pointer text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                :
                "inline-block p-4 cursor-pointer border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }>
                Live Room
            </span>
        </li>
        {/* <li className="mr-2">
            <span onClick={()=> setContent("announcements")} className={
                                content==="announcements"?
                                "inline-block p-4 cursor-pointer text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                                :
                                "inline-block p-4 cursor-pointer border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                            }>
                Announcements</span>
        </li> */}
        {/* <li className="mr-2">
            <span onClick={()=> setContent("assignment")} className={
                                content==="assignment"?
                                "inline-block p-4 cursor-pointer text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                                :
                                "inline-block p-4 cursor-pointer border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                            }>
                Assignment</span>
        </li>
        <li className="mr-2">
            <span onClick={()=> setContent("attendance")} className={
                                content==="attendance"?
                                "inline-block p-4 cursor-pointer text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                                :
                                "inline-block p-4 cursor-pointer border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                            }>
                Attendance</span>
        </li> */}
        <li>
            <span onClick={()=> setContent("videoroom")} className={
                                content==="videoroom"?
                                "inline-block p-4 cursor-pointer text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                                :
                                "inline-block p-4 cursor-pointer border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                            }>
                Video Room</span>
        </li>
    </ul>
</div>
    
        </div>  
        </>
    );
};

export default Navbar;