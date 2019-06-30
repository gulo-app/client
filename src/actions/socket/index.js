export const SUBSCRIBE_SOCKET       =     'SUBSCRIBE_SOCKET'

export function subscribeSocket(socket, user){
  //console.log(`socket: ${socket.id} connected`);
  socket.emit('subscribe', user);
  return{
    type: SUBSCRIBE_SOCKET,
    payload: socket
  };
}
