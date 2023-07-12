import React, {useState} from "react";
import {v4 } from 'uuid'; 
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom';


const Home = () =>{

    const [roomId,setRoomId] =useState('');
    const [userName,setUserName] =useState('');
    const navigate= useNavigate();

    const createNewRoom =(e) =>{
        e.preventDefault();
        const id = v4();
        setRoomId(id);
        toast.success('Create new room');
    }

    const joinRoom = () =>{
        if(!roomId || !userName){
            toast.error("RoomId and username is required");
        }
        else{
        navigate(`/editor/${roomId}`, {
            state: {
                userName,
            },
        })}
    }

    const handleInputEnter = (e) =>{
        if(e.code === 'Enter'){
            joinRoom();
        }
    }

    return <div className="homePageWrapper">
        <div className="formWrapper">
        <div className="imgDiv"><img className="homePageLogo" src="/code-snap.png"></img></div>
        <h4 className="mainlabel"> Paste invitation ROOM ID</h4>
        <div className="inputGroup">
            <input 
            type="text"  
            className="inputBox" 
            placeholder="Room ID" 
            onChange={(e) => setRoomId(e.target.value)} 
            value={roomId}
            onKeyUp={handleInputEnter}
            ></input>
            <input 
            type="text"  
            className="inputBox" 
            placeholder="USERNAME" 
            onChange={(e) => setUserName(e.target.value)} 
            value={userName}
            onKeyUp={handleInputEnter}
            ></input>
            <button className="btn joinBtn" onClick={joinRoom}>JOIN</button>
            <span className="createInfo">
                If you don't have an invite then create &nbsp;
                <a onClick={createNewRoom} href="" className="createNewBtn">New Room </a>
            </span>
        </div>
        </div>
        <footer>
            <h4>
                Build with 💜 by &nbsp;<a href="https://github.com/shubham13k" target="_blank">Shubham</a> :)
            </h4>
        </footer>
    </div>
}

export default Home