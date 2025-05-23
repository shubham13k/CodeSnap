import React,{useState,useEffect, useRef} from "react";
import toast from 'react-hot-toast';
import ACTIONS from '../Actions';
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import {useLocation, useNavigate, Navigate, useParams} from 'react-router-dom';

const EditorPage = () =>{
    const socketRef = useRef(null);
    const codeRef =useRef(null);
    const location =useLocation();
    const {roomId}= useParams();
    const reactNavigator = useNavigate();
    const [clients,setClients] = useState([]);

    useEffect(()=>{
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }


            socketRef.current.emit(ACTIONS.JOIN,{
                roomId,
                userName: location.state?.userName,
            });
            
            // listening for joined events

            socketRef.current.on(ACTIONS.JOINED, 
                ({clients, userName, socketId})=>{
                    if(userName !== location.state?.username){
                        toast.success(`${userName} joined room`);
                        setClients(clients);
                    }
                socketRef.current.emit(ACTIONS.SYNC_CODE,{ 
                    code:codeRef.current,
                    socketId,
                })
            });
            socketRef.current.on(ACTIONS.DISCONNECTED, ({socketId, userName})=>{
                toast.success(`${userName} left the room.`);
                setClients((prev)=>{
                    return prev.filter(client =>client.socketId !== socketId
                    );
                })
            });
        };
        init();
        
    },[]);
    
    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }

    function leaveRoom(){
        reactNavigator('/');
    }

    if(!location.state){
        return <Navigate to="/" />;
    }
    

    return <div className="mainWrap">
    <div className="aside">
        <div className="asideInner">
            <div className="logo">
                <img className="logoImg" src="/code-snap.png" alt="logo"></img>
            </div>

            <h3 style={{ display: 'flex', justifyContent: 'center' }}>Connected</h3>
            <div className="clientList">
            {
                clients.map((client) => (
                    <Client key={client.socketId} userName={client.userName}/>
                    ))
            }
            </div>
        </div>
        <button className="btn copyBtn" onClick={copyRoomId}>Copy ROOM ID</button>
        <button className="btn leaveBtn" onClick={leaveRoom}>Leave</button>
    </div>
    <div className="editorWrap">
    <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code) =>{
        codeRef.current=code;
    }} ></Editor>
    </div>
    </div>
}

export default EditorPage