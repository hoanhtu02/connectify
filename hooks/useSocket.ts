"use client"
import { setSocketStatus } from '@/lib/features/chat/chatSlice';
import { RootState } from '@/lib/store';
import { Store } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

export const socket = io();
const useSocket = (store: Store<RootState>) => {
    useEffect(() => {
        socket.on("connect", () => {            store.dispatch(setSocketStatus("connected"));
        });
        socket.on("disconnect", () => {
            store.dispatch(setSocketStatus("disconnected"));
        });
        return () => {
            socket.disconnect();
            socket.off("connect");
            socket.off("disconnect");
            store.dispatch(setSocketStatus("disconnected"));
        };
    }, []);
};

export default useSocket;
