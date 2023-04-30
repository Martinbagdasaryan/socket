import { Socket } from "socket.io-client";

export interface IMessage { 
  message: IArrMessages[]
}
export interface IBackground {
  id: string;
  background: string | undefined;
}
export interface ISocketAndRoom {
  socket: Socket;
  room: IRoom;
}

export interface IUser {
  user: string;
  socketId: string;
  room: string;
}

export interface IRoom  {
  id: string;
  background: string
}

export interface IUserMessage{
  user: string; socketId: string; room: string 
}

export interface IProps {
  setRoom: (value: { id: string; background: string }) => void;
  socket: Socket;
}

export interface IArrMessages{
  id:string;
  socketID:string;
  roomI:IRoom;
  text:string;
  name:string
  data:string
}
