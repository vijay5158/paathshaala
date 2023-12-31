import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import AxiosInstance from "../../AxiosInstance";




const initialState = {
    peers: [],
    error: null,
    loading: false,
};

export const peerSlice = createSlice({
  name: "peerReducer",
  initialState,
  reducers: {
    //Actions
    peerError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addPeer: (state,action) => {
        state.peers = [...state.peers,action.payload]
    },
    deletePeer: (state,action) => {
        const index = state.peers.indexOf(state.peers.filter(peer=> peer.id===action.payload)[0])
        state.peers.splice(index,1);
    },
  },
});

export const { peerError, addPeer, deletePeer } = peerSlice.actions;

export const getPeers = () => {
    return useSelector((root) => root.peerReducer.peers);
  };

export default peerSlice.reducer;