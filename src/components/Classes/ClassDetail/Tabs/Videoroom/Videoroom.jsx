import React, { useEffect, useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { useUser } from '../../../../../redux/reducers/userReducer';

const YourComponent = ({ slug }) => {
  const [localStream, setLocalStream] = useState(null);
  const userData = useUser();
  const webSocket = useRef(null);
  const peersRef = useRef([]);
  const [peers, setPeers] = useState([]);
  const myVideo = useRef();
  // const remoteVideo = useRef();
  // const webcamRef = useRef(null);
  useEffect(() => {
    // Initialize the peer connection and set up event handlers
    const configuration = {
        iceServers: [{ urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }],
      };
    peerConnection.current = new RTCPeerConnection();
    peerConnection.current.addEventListener('icecandidate', handleICECandidate);
    peerConnection.current.addEventListener('track', handleRemoteStream);
      console.log('created peer');
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        myVideo.current.srcObject = stream;
        console.log(stream);
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });
    // Join the room
    // webSocket.current.send(JSON.stringify({ type: 'join', class_name: 'your_class_name' }));

    return () => {
      // Clean up the peer connection on component unmount
      setLocalStream(null);
      setRemoteStream(null);
      peerConnection.current.close();
      console.log('peer closed!');
    };
  }, []);

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

  // Function to handle messages received via WebSocket
  const handleWebSocketMessage = (event) => {
    const message = JSON.parse(event.data);
    // console.log(message);
    if(message.email && message.email!==userData?.email){
    if (message.type === 'offer' || message.type === 'answer') {
      // Handle SDP and ICE candidate messages
      handleSDP(message);
    }
    else if(message.type === 'ice_candidate'){
      handleNewIceCandidate(message);
    }
  }
  };


  useEffect(() => {
    // Set up WebSocket message handler when the component mounts
    webSocket.current.addEventListener('message', handleWebSocketMessage);

    return () => {
      // Clean up WebSocket message handler when the component unmounts
      webSocket.current.removeEventListener('message', handleWebSocketMessage);
    };
  }, []);

  return (
    <div className='flex flex-col gap-4 items-center justify-start my-6 w-full px-4 py-4 max-h-[80vh]'>
       {localStream && <video ref={myVideo} autoPlay muted playsInline className='w-full max-w-[500px] rounded-[2rem] shadow-md border-2 border-[#1b30c7]' />}

      {/* Local video */}
      {/* {localStream && (
        <video autoPlay muted ref={(video) => (video.srcObject = localStream)} />
      )} */}

      {/* Remote video */}
      {remoteStream && (
        <video autoPlay ref={remoteVideo} />
      )}

      {/* Button to initiate the video call */}
      <button className='btn' onClick={createOffer}>Enter Class</button>
    </div>
  );
};

export default YourComponent;
