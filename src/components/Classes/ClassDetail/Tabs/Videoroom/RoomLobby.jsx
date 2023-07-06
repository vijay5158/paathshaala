import React from 'react';
import { useUser } from '../../../../../redux/reducers/userReducer';
import { useRef } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useAccessToken } from '../../../../../redux/reducers/authReducer';

const RoomLobby = () => {
    const { slug } = useParams();
    const userData = useUser();
    const webSocket = useRef(null);
    const accessToken = useAccessToken();
    const [localStream, setLocalStream] = useState(null);

    const peersRef = useRef([]);
    const [peers, setPeers] = useState([]);
    const [enteredRoom, setEnteredRoom] = useState(false);
    const [peerIds, setPeerIds] = useState([]);
    const myVideo = useRef();
    const disconnect = useCallback(() => {
        webSocket?.current?.close();
    }, [webSocket]);

 const createWebSocketConnection = ()=>{
  const path = `ws://localhost:8000/ws/video/${slug}/?token=${accessToken}`;

  webSocket.current = new WebSocket(path);
  webSocket.current.onopen = () => {
    webSocket.current.send(JSON.stringify({
      type: "join_room_ack",
      class_name: slug
    }));
  };
  webSocket.current.onmessage = e => {
    const data = JSON.parse(e.data);
  webSocketOnMessage(data)
  };
  webSocket.current.onerror = e => {
    console.log(e);
  };
  webSocket.current.onclose = () => {
  };

}
const webSocketOnMessage =  (data)=>{
    if(data?.type==="join_room_ack"){
      if (webSocket.current && data?.id!==userData?.userId){
        webSocket.current.send(JSON.stringify({
          type: "join_room_allow",
          class_name: slug,
          for_user: data?.id
        }));
      }
    }
    else if(data?.type==="join_room_allow"){
      if(data?.for_user===userData?.userId && data?.id!==userData?.userId){
        setPeerIds([
          ...peerIds,
          data?.id
        ])
      }

    }
    else if (data.type === 'offer' || data.type === 'answer') {
      // Handle SDP and ICE candidate messages
      handleSDP(data);
    }
    else if(data.type === 'ice_candidate'){
      handleNewIceCandidate(data);
    }

}
    useEffect(() => {

      createWebSocketConnection();
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        myVideo.current.srcObject = stream;
        // console.log(stream);
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });

        return () => {
          disconnect();
          setLocalStream(null);

        };
      }, [slug]);
  
  const checkAndReopenWebSocket = ()=>{
    if (!webSocket.current || webSocket?.current?.readyState === WebSocket.CLOSED){
      console.log('checkAndReopenWebSocketClosed');
      createWebSocketConnection();
    }
  }
  const createOffers = ()=>{
    console.log(peerIds);
  }
    // Function to handle the local stream
    const handleLocalStream = () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, localStream);
        });
      } else {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            setLocalStream(stream);
            stream.getTracks().forEach((track) => {
              peerConnection.current.addTrack(track, stream);
            });
          })
          .catch((error) => {
            console.error('Error accessing media devices:', error);
          });
      }
    };
    
    
    // Function to create and send the offer SDP to the server
    const createOffer = async () => {
      try {
        // Capture video stream from the webcam
        // const videoStream = webcamRef.current.video.srcObject;
        handleLocalStream();
  
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        console.log('local offer added');
  
        // Send the offer SDP to the server via WebSocket
        sendSDP('offer', offer.sdp);
      } catch (error) {
        console.error('Error creating and sending offer SDP:', error);
      }
    };
  
    // Function to handle the received SDP from the server
    const handleSDP = async (message) => {
      try {
        console.log(message);
        const sdp = new RTCSessionDescription({ type: message.type, sdp: message.sdp });
        await peerConnection.current.setRemoteDescription(sdp);
        console.log('remote added',message);
        if (sdp.type === 'offer') {
          // Create and send the answer SDP to the server
          createAnswer();
        }
        else if(sdp.type==='answer'){
  
        }
      } catch (error) {
        console.error('Error handling SDP:', error);
      }
    };
  
    // Function to create and send the answer SDP to the server
    const createAnswer = async () => {
      try {
        handleLocalStream();
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        console.log('local ans added');
  
        // Send the answer SDP to the server via WebSocket
        sendSDP('answer', answer.sdp);
      } catch (error) {
        console.error('Error creating and sending answer SDP:', error);
      }
    };
  
    // Function to handle the received ICE candidate from the server
    const handleICECandidate = (event) => {
      if (event.candidate) {
        // Send the ICE candidate to the server via WebSocket
        sendSDP('ice_candidate', event.candidate);
      }
    };
  
    // Function to handle the received remote stream from the server
    const handleRemoteStream = (event) => {
      console.log(event);
      setRemoteStream(event.streams[0]);
      remoteVideo.current.srcObject = event.streams[0]
    };
  
    // Function to send the SDP to the server via WebSocket
    const sendSDP = (type, sdp) => {
      const message = {
        class_name:slug,
        email:userData?.email,
        type,
        sdp,
      };
  // console.log(message);
      // Send the message to the server via WebSocket
      webSocket.current.send(JSON.stringify(message));
    };
    function handleNewIceCandidate(message) {
      // Create a new RTCIceCandidate object
      const iceCandidate = new RTCIceCandidate(message?.candidate);
    
      // Add the ICE candidate to the PeerConnection
      peerConnection.current.addIceCandidate(iceCandidate)
        .then(() => {
          console.log("ICE candidate added successfully.");
        })
        .catch((error) => {
          console.error("Error adding ICE candidate:", error);
        });
    }
  
    return (
    <>
    {!enteredRoom &&
    <div className='flex flex-col gap-4 items-center justify-start my-6 w-full px-4 py-4 max-h-[80vh]'>
      {localStream && <video ref={myVideo} autoPlay muted playsInline className='w-full max-w-[500px] rounded-[2rem] shadow-md border-2 border-[#1b30c7]' />}

     {/* Button to initiate the video call */}
     <button className='btn' onClick={createOffers}>Enter Class</button>
    </div>
    }
    {enteredRoom &&
    <>
    
    </>
    }
   </>
    );
};

export default RoomLobby;