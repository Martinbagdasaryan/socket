import { Socket } from "socket.io-client";

export interface IMessage {
  message: IArrMessages[];
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
  id: number;
  user: string;
  socketId: string;
  room: string;
}
export interface IRoom {
  id: number;
  roomId: string;
  background: string;
}
export interface IUserMessage {
  id: number;
  user: string;
  socketId: string;
  room: string;
}
export interface IProps {
  setRoom: (value: { id: number; roomId: string; background: string }) => void;
  socket: Socket;
}
export interface IArrMessages {
  id: number;
  socketID: string;
  roomI: IRoom;
  text: string;
  name: string;
  data: string;
}
