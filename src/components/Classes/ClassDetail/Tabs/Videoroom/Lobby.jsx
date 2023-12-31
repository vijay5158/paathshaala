import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCreateMediaStream } from '../../../../../hooks/useCreateMediaStream';
import { useAccessToken } from '../../../../../redux/reducers/authReducer';
import { useUser } from '../../../../../redux/reducers/userReducer';
import RemoteVideo from './RemoteVideo';
import { useDispatch } from 'react-redux';

const Lobby = () => {
    const { slug } = useParams();
    const localVideoRef = useRef();
    const userMediaStream = useCreateMediaStream(localVideoRef);
    // const [userMediaStream, setUserMediaStream] = useState(null);
    const dispatch = useDispatch();
    const userData = useUser();
    const accessToken = useAccessToken();
    const webSocket = useRef()
    // const peerVideoConnection = useMemo(() => new PeerConnectionSession(webSocket.current, userData?.userId, userMediaStream, slug, userData.email), []);
    const [connectedUsers, setConnectedUsers] = useState([]);
    const [peers, setPeers] = useState({});
    const [roomJoined, setRoomJoined] = useState(false);
    const [remoteStream, setRemoteStream] = useState({});


    const removePeer = (peerId) => {
        setPeers((prevPeers) => {
          const newPeers = { ...prevPeers };
          delete newPeers[peerId];
          return newPeers;
        });
        setConnectedUsers((prevUsers)=> prevUsers.filter((id)=> id!=peerId));
      };
      
      // Function to handle ICE connection state change
      const handleIceConnectionStateChange = (event, peerId) => {
        const { iceConnectionState } = event.target;
      
        console.log(`ICE Connection State Change for peer ${peerId}: ${iceConnectionState}`);
      
        if (iceConnectionState === 'failed' || iceConnectionState === 'closed') {
          // Handle the failure or closed state
          console.error(`Peer connection failed or closed for peer ${peerId}`);
          removePeer(peerId);
        }
      };
      
      // Function to handle connection state change
      const handleConnectionStateChange = (event, peerId) => {
        const { connectionState } = event.target;
      
        console.log(`Connection State Change for peer ${peerId}: ${connectionState}`);
      
        if (connectionState === 'failed' || connectionState === 'closed') {
          // Handle the failure or closed state
          console.error(`Peer connection failed or closed for peer ${peerId}`);
          removePeer(peerId);
        }
      };
      

    const handleRemoteStream = (event, peerId) => {
        setRemoteStream(prevStreams => ({
            ...prevStreams,
            [peerId]: event.streams[0]
        }));
        const remoteVideoTag  = document.getElementById(`user_${peerId}`);
        if (remoteVideoTag){
            remoteVideoTag.srcObject = event.streams[0];
            remoteVideoTag.autoplay = true;
            remoteVideoTag.playsinline = true;
      }
    };

    // Function to handle the received ICE candidate from the server
async function handleICECandidate(event, peerId) {
    if (event.candidate && peerId) {
        // Send the ICE candidate to the server via WebSocket
       await sendSDP('ice_candidate', event.candidate, peerId);
    }
    };

    // Function to send the SDP to the server via WebSocket
async function sendSDP(type, sdp, peerId) {
    const message = {
        class_name:slug,
        email:userData.email,
        type,
        sdp,
        for_user: peerId
    };
// console.log(message);
    // Send the message to the server via WebSocket
    await webSocket.current.send(JSON.stringify(message));
    };


  async function sendRoomAllow(data){
    if (webSocket.current && data?.id!=userData.userId){
        await webSocket.current.send(JSON.stringify({
          type: "join_room_allow",
          class_name: slug,
          for_user: data?.id
        }));
      }
  }

  async function receiveRoomAllow(data){
    if(data?.for_user==userData.userId){
        const peerConnection = new RTCPeerConnection();  

        peerConnection.addEventListener('iceconnectionstatechange', (event) => handleIceConnectionStateChange(event, data.id));
        peerConnection.addEventListener('connectionstatechange', (event) => handleConnectionStateChange(event, data.id));
  
        setPeers(prevPeers => ({...prevPeers, [data.id]:peerConnection}));
        setConnectedUsers(prevUsers => [...prevUsers, data.id]);
      }
  }

  async function receiveOffer(data) {
    const for_user = data.for_user;
    if (for_user && for_user == userData.userId && data?.id) {
      const peerConnection = new RTCPeerConnection();
      peerConnection.addEventListener('iceconnectionstatechange', (event) => handleIceConnectionStateChange(event, data.id));
      peerConnection.addEventListener('connectionstatechange', (event) => handleConnectionStateChange(event, data.id));
        
      const sdp = new RTCSessionDescription({ type: data.type, sdp: data.sdp });
      
      await peerConnection.setRemoteDescription(sdp);
  
      handleLocalStream(peerConnection);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      await sendSDP('answer', answer.sdp, data.id);
      console.log('local answer added for ', data.id);
  
      peerConnection.ontrack = (event) => handleRemoteStream(event, data?.id);
      peerConnection.onicecandidate = (event) => handleICECandidate(event, data?.id);
  
  
      setPeers((prevPeers) => ({
        ...prevPeers,
        [data.id]: peerConnection,
      }));
  
      setConnectedUsers((prevUsers) => [...prevUsers, data.id]);
      // Send the answer SDP to the server via WebSocket
    }
  }
  
  async function receiveAnswer(data){
    const for_user = data.for_user;
    if (for_user && for_user == userData.userId && data?.id){
      setPeers((prevPeers) => {
        const peerConnection = prevPeers[data?.id];
        if (peerConnection) {
            const sdp = new RTCSessionDescription({ type: data.type, sdp: data.sdp });
            peerConnection.setRemoteDescription(sdp).then(()=>{
        console.log("ans added for ",data?.id);
            }).catch((error)=> console.log("Error adding remote answer", error));
          return {
            ...prevPeers,
            [data?.id]: peerConnection,
          };
        } else {
          console.log(prevPeers);
          return prevPeers;
        }
      });
    }      
}

async function receiveIceCandidates(data) {
    const for_user = data.for_user;
  
    if (for_user && for_user == userData.userId && data?.id) {
      setPeers((prevPeers) => {
        const peerConnection = prevPeers[data?.id];
        if (peerConnection) {
          const iceCandidate = new RTCIceCandidate(data?.candidate);
  
          // Add the ICE candidate to the PeerConnection
          peerConnection.addIceCandidate(iceCandidate)
            .then(() => {
              console.log("ICE candidate added successfully for", data?.id);
            })
            .catch((error) => {
              console.error("Error adding ICE candidate:", error);
            });
  
          return {
            ...prevPeers,
            [data?.id]: peerConnection,
          };
        } else {
          return prevPeers;
        }
      });
    }
  }
  

  async function createOffer (peerConnection, peerId) {
    try {
      // Capture video stream from the webcam
      // const videoStream = webcamRef.current.video.srcObject;
      handleLocalStream(peerConnection);

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      console.log('local offer added');

      // Send the offer SDP to the server via WebSocket
      await sendSDP('offer', offer.sdp,peerId);
      return peerConnection
    } catch (error) {
      console.error('Error creating and sending offer SDP:', error);
      return null;
    }

  }

async function handleJoinLobby () {


  for (const peerId in peers) {
    if (peers.hasOwnProperty(peerId)){
    const peerConnection = peers[peerId];
    await createOffer(peerConnection, peerId);
    peerConnection.onicecandidate = (event) => handleICECandidate(event, peerId);
    peerConnection.ontrack = (event) => handleRemoteStream(event, peerId);
    // peerConnection.addEventListener('icecandidate', (event) =>
    //   handleICECandidate(event, peerId)
    // );

    }
  }
  setRoomJoined(true);
};




async function handleLocalStream(peerConnection){
if (userMediaStream) {
    userMediaStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, userMediaStream);
    });
}
else{
    alert("no media stream");
}
};


  function clearConnections() {
    if (webSocket.current) {
        webSocket.current.close();
    }
    setPeers(prevPeers => {
        // Use the callback form of setState to ensure you are working with the latest state
        const updatedPeers = { ...prevPeers };
    
        // Close each peer connection
        Object.keys(updatedPeers).forEach(peerId => {
          const peerConnection = updatedPeers[peerId];
          if (peerConnection) {
            peerConnection.close();
            // Remove the peer from the state
            delete updatedPeers[peerId];
          }
        });
    
        return updatedPeers;
      });
    }

    const webSocketOnMessage = (data)=>{
        
        if(data?.type=="join_room_ack"){
             sendRoomAllow(data, slug);
        }
        else if(data?.type=="join_room_allow"){
             receiveRoomAllow(data)
        }
        else if (data.type == 'offer') {
            // Handle SDP and ICE candidate messages
             receiveOffer(data)
        }
        else if (data.type == 'answer'){
             receiveAnswer(data);
        }
        else if(data.type == 'ice_candidate'){
             receiveIceCandidates(data);
        }
    
    }


    const createWebSocketConnection = ()=>{
        const path = `wss://api.paathshaala.me/ws/video/${slug}/?token=${accessToken}`;
        const localPath = `ws://localhost:8000/ws/video/${slug}/?token=${accessToken}`;
    
      webSocket.current = new WebSocket(localPath);
    //   peerVideoConnection.startWebSocket(webSocket.current);
      webSocket.current.onmessage = async (e) => {
        const data = JSON.parse(e.data);
      webSocketOnMessage(data);
      };
      webSocket.current.onopen = () => {
        webSocket.current.send(JSON.stringify({
          type: "join_room_ack",
          class_name: slug
        }));
      };
      webSocket.current.onerror = e => {
        console.log(e);
      };
      webSocket.current.onclose = () => {
      };
    
    }

    
    useEffect(() => {
        //   navigator.mediaDevices.getUserMedia({ 
        //     video: {
        //         width: { min: 640, ideal: 1920 },
        //         height: { min: 400, ideal: 1080 },
        //         aspectRatio: { ideal: 1.7777777778 },
        //       },
        //     audio: true })
        //   .then((stream) => {
        //     localVideoRef.current.srcObject = stream;
        //     setUserMediaStream(stream)
          if (userMediaStream){
          createWebSocketConnection();
          }
        // })
        // .catch((error) => {
        //   console.error('Error accessing media devices:', error);
        // });
              return () => {
                clearConnections();      
              };
            }, [slug, userMediaStream]);

     const muteVideo = () => {
        const stream = document.getElementById("localVideo").srcObject;
        if (!stream.getVideoTracks()[0]) return;
        stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
        this.setState({
          isVideoMuted: !stream.getVideoTracks()[0].enabled,
        });
      };
    const muteAudio = () => {
        const stream = document.getElementById("localVideo").srcObject;
        if (!stream.getAudioTracks()[0]) return;
        stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
        this.setState({
          isAudioMuted: !stream.getAudioTracks()[0].enabled,
        });
      };
      const handleJoinRoom = async (e)=>{
        e.preventDefault();
        await handleJoinLobby();
      }
    return (
        <>
            <div className={roomJoined ? 'flex w-full flex-wrap gap-3 mt-4 sm:p-4 p-2': 'mt-8 w-3/4 m-auto flex items-center justify-center gap-4 flex-col'}>
                <video id='localVideo' ref={localVideoRef} autoPlay muted playsInline className='w-full max-w-[500px] rounded-[2rem] shadow-md border-2 border-[#1b30c7]' />
                {roomJoined ?                 
                <>
                {connectedUsers.map((user,index)=>(
                    <video key={index} autoPlay className='w-full max-w-[500px] rounded-[2rem] shadow-md border-2 border-[#1b30c7]' id={`user_${user}`} />
                ))}
                </>
                :
            <button onClick={handleJoinRoom} disabled={!localVideoRef.current} className='btn'>Join Video Room</button>
                }
            </div>
    </>
    );
};

export default Lobby;