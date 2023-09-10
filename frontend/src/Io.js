import Io from 'socket.io-client'

const CCN_PORT = 'localhost:4046/';

let socket;
export default socket =Io(CCN_PORT)