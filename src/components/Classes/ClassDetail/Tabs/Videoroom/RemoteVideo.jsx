import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const remoteVideo = ({peerConnection}) => {
  const remoteVideo = useRef();
  const [remoteStream, setRemoteStream] = useState(null);
  const handleRemoteStream = (event) => {
    console.log(event);
    setRemoteStream(event.streams[0]);
    remoteVideo.current.srcObject = event.streams[0]
  };
    useEffect(()=>{
    peerConnection.addEventListener('track', handleRemoteStream);

    })

    return (
        <>
         {/* {remoteStream && ( */}
        <video autoPlay ref={remoteVideo} />
      {/* )} */}
        </>
    );
};

export default remoteVideo;