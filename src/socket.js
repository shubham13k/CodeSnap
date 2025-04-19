import {io} from 'socket.io-client';

export const initSocket = async () =>{
    const options ={
        'force new conection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };

    return io("http://localhost:5500",options);
 };