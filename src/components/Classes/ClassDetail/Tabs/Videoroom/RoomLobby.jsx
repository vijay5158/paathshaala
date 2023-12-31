import React from 'react';
import { useUser } from '../../../../../redux/reducers/userReducer';
import { useRef } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useAccessToken } from '../../../../../redux/reducers/authReducer';
import RemoteVideo from './RemoteVideo';

const RoomLobby = () => {
    const { slug } = useParams();
    const userData = useUser();
    const webSocket = useRef(null);
    const accessToken = useAccessToken();
    const [localStream, setLocalStream] = useState(null);
    const [isVideoRoomAccessible, setIsVideoRoomAccessible] = useState(false);
    const peersRef = useRef([]);
    const [peers, setPeers] = useState({});
    const [enteredRoom, setEnteredRoom] = useState(false);
    const [peerIds, setPeerIds] = useState([]);
    const myVideo = useRef();
    const disconnect = useCallback(() => {
        webSocket?.current?.close();
    }, [webSocket]);

    const createOffer = async (peerConnection, peerId) => {
      try {
        // Capture video stream from the webcam
        // const videoStream = webcamRef.current.video.srcObject;
        handleLocalStream(peerConnection);
  
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        console.log('local offer added');
  
        // Send the offer SDP to the server via WebSocket
        sendSDP('offer', offer.sdp,peerId);
        return peerConnection
      } catch (error) {
        console.error('Error creating and sending offer SDP:', error);
        return null;
      }
  
    }
    const handleJoinLobby = async (e) => {
      console.log(peers);
      e.preventDefault();
      const connections = {};
      const configuration = {
        iceServers: [
          { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] },
        ],
      };
    
      for (const peerId in peerIds) {
        if (peers.hasOwnProperty(peerId)){
        const peerConnection = peers[peerId];
        peerConnection.addEventListener('icecandidate', (event) =>
          handleICECandidate(event, peerId)
        );
    
        await createOffer(peerConnection, peerId);
        // if (newPeerConnection) {
        //   const peerObj = {
        //     ...peers,
        //     [peerId]: newPeerConnection,
        //   };
        //   // setPeers((prevPeers) => ({
          //   ...prevPeers,
          //   [peerId]: newPeerConnection,
          // }));
          // peersRef.current.push(newPeerConnection);
        }
      }
      
      console.log(peers);
      setEnteredRoom(true);
    };
    
  const createWebSocketConnection = ()=>{
    const path = `wss://api.paathshaala.me/ws/video/${slug}/?token=${accessToken}`;
    const localPath = `ws://localhost:8000/ws/video/${slug}/?token=${accessToken}`;

  webSocket.current = new WebSocket(localPath);
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
      if (webSocket.current && data?.id!=userData?.userId){
        webSocket.current.send(JSON.stringify({
          type: "join_room_allow",
          class_name: slug,
          for_user: data?.id
        }));
      }
    }
    else if(data?.type==="join_room_allow"){
      if(data?.for_user==userData?.userId){
        const peerConnection = new RTCPeerConnection();
        setPeers({
          ...peers,
          [data.id]: peerConnection
        })
        console.log("new peer added", peerConnection, data?.id);
      }

    }
    else if (data.type === 'offer') {
      // Handle SDP and ICE candidate messages
      handleOffer(data);
    }
    else if (data.type === 'answer'){
      handleAnswer(data);
    }
    else if(data.type === 'ice_candidate'){
      handleNewIceCandidate(data);
    }

}

const handleOffer = async (data)=>{
  const for_user = data.for_user;
  if (for_user && for_user == userData?.userId && data?.id){
  const peerConnection = new RTCPeerConnection();
  peerConnection.addEventListener('icecandidate', (event) => handleICECandidate(event, data?.id));
  handleLocalStream(peerConnection);
  const sdp = new RTCSessionDescription({ type: data.type, sdp: data.sdp });
  await peerConnection.setRemoteDescription(sdp);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  console.log('local ans added for ', data.id);

  // Send the answer SDP to the server via WebSocket
  sendSDP('answer', answer.sdp,data.id);

  // Configure the peer connection as needed
  setPeers({
    ...peers,
    [data.id]: peerConnection
  });
  peersRef.current.push(peerConnection);
}
}
const handleAnswer = async (data)=>{
  const for_user = data.for_user;
  
  if (for_user && for_user == userData?.userId && data?.id){
    const peerConnection = peers[data?.id];
    if (peerConnection){
      const sdp = new RTCSessionDescription({ type: data.type, sdp: data.sdp });
      await peerConnection.setRemoteDescription(sdp);
      console.log("ans added for ",data?.id);
    }
  }
}


useEffect(() => {

  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then((stream) => {
    setLocalStream(stream);
    myVideo.current.srcObject = stream;
    console.log(stream);
    if (stream){
    createWebSocketConnection();
    }
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
  
    // Function to handle the local stream
    const handleLocalStream = (peerConnection) => {
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, localStream);
        });
      } else {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            setLocalStream(stream);
            stream.getTracks().forEach((track) => {
              peerConnection.addTrack(track, stream);
            });
          })
          .catch((error) => {
            console.error('Error accessing media devices:', error);
          });
      }
    };
    
    
    // Function to create and send the offer SDP to the server
    // const createOffers = async () => {
    //   try {
    //     // Capture video stream from the webcam
    //     // const videoStream = webcamRef.current.video.srcObject;
    //     handleLocalStream();
    //     const peerConnection = new RTCPeerConnection();
    //     const offer = await peerConnection.createOffer();
    //     await peerConnection.setLocalDescription(offer);
    //     console.log('local offer added');
  
    //     // Send the offer SDP to the server via WebSocket
    //     sendSDP('offer', offer.sdp);
    //   } catch (error) {
    //     console.error('Error creating and sending offer SDP:', error);
    //   }
    // };
  
  
  
    // Function to handle the received ICE candidate from the server
    const handleICECandidate = (event, peerId) => {
      if (event.candidate && peerId) {
        // Send the ICE candidate to the server via WebSocket
        sendSDP('ice_candidate', event.candidate, peerId);
      }
    };
  
  
    // Function to send the SDP to the server via WebSocket
    const sendSDP = (type, sdp, peerId) => {
      const message = {
        class_name:slug,
        email:userData?.email,
        type,
        sdp,
        for_user: peerId
      };
  // console.log(message);
      // Send the message to the server via WebSocket
      webSocket.current.send(JSON.stringify(message));
    };
  async function handleNewIceCandidate(data) {
      // Create a new RTCIceCandidate object
      const for_user = data.for_user;
  
      if (for_user && for_user == userData?.userId && data?.id){
        console.log("got ice", peers, data.id, peersRef);
        const peerConnection = peers[data?.id];
        if (peerConnection){
          console.log('got peer in ice');
          const iceCandidate = new RTCIceCandidate(data?.candidate);
    
          // Add the ICE candidate to the PeerConnection
          peerConnection.addIceCandidate(iceCandidate)
            .then(() => {
              console.log("ICE candidate added successfully. for ", data?.id);
            })
            .catch((error) => {
              console.error("Error adding ICE candidate:", error);
            });
              
        }
      }
    

    }
  
    return (
   <>
    {!enteredRoom &&
    <div className='flex flex-col gap-4 items-center justify-start my-6 w-full px-4 py-4 max-h-[80vh]'>
      <video ref={myVideo} autoPlay muted playsInline className='w-full max-w-[500px] rounded-[2rem] shadow-md border-2 border-[#1b30c7]' />

     {/* Button to initiate the video call */}
     <button className='btn' onClick={handleJoinLobby}>Enter Class</button>
    </div>
    }
    {enteredRoom &&
    <div className='w-full grid grid-cols-1 px-2 sm:px-5 md:px-10 lg:px-15 py-4 gap-y-8 gap-x-4  
    md:grid-cols-2 xl:grid-cols-3'>
{localStream && <video ref={myVideo} autoPlay muted playsInline className='w-full max-w-[300px] rounded-[2rem] shadow-md border-2 border-[#1b30c7]' />}
    {Object.keys(peers).map((peerId, index)=>(
      <RemoteVideo key={index} peerConnection={peers[peerId]} />
    ))}
    </div>
    }
   </>
    );
};

export default RoomLobby;