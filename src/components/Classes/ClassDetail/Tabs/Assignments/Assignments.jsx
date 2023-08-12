import React, { useEffect } from 'react';
import { getAllAssignments, getAssignments } from '../../../../../redux/reducers/assignmentReducer';
import { useAccessToken } from '../../../../../redux/reducers/authReducer';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './Header';
import AssignmentCard from './AssignmentCard';

const Assignment = () => {
    const assignments = getAllAssignments();
    const { slug } = useParams();
    const accessToken = useAccessToken();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        window.scrollTo(0, 0)
        dispatch(getAssignments(accessToken,slug));
    },[])

    return (
        <main className='w-full flex flex-col gap-4 py-4'>
            <Header />
            <hr />
            <div className="flex flex-col gap-2 sm:gap-3 w-full">
            {assignments.map((assignment, index)=> <AssignmentCard key={index} data={assignment} />)}
            <AssignmentCard />
            </div>
        </main>
    );
};

export default Assignment;