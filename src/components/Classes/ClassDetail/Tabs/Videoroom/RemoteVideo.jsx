import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const RemoteVideo = ({peerConnection}) => {
  const remoteVideo = useRef();
  const [remoteStream, setRemoteStream] = useState(null);
  const handleRemoteStream = (event) => {
    console.log(event);
    setRemoteStream(event.streams[0]);
    remoteVideo.current.srcObject = event.streams[0]
    console.log(peerConnection);
  };
    useEffect(()=>{
      peerConnection.ontrack = handleRemoteStream;
    }, [peerConnection])

    return (
        <>
         {/* {remoteStream && ( */}
        <video autoPlay className='w-full max-w-[500px] rounded-[2rem] shadow-md border-2 border-[#1b30c7]' ref={remoteVideo} />
      {/* )} */}
        </>
    );
};

export default RemoteVideo;