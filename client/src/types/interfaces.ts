import { Socket } from "socket.io-client";

export interface IMessage {
  message: IArrMessages[];
  roomID: IRoom | undefined;
}

export interface ISocketAndRoomAndUser {
  socket: Socket;
  room: IRoom | undefined;
  userOnline: IUser[];
  roomID: IRoom | undefined;
  user: IUserMessage[];
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

export interface ISocketAndRoom {
  socket: Socket;
  room: IRoom | undefined;
  roomID: IRoom | undefined;
}

export interface IChat {
  socket: Socket;
  room: IRoom | undefined;
}

export interface IInvateUser {
  id: number;
  user: string;
  socketId: string;
  room: string;
  IUser: string;
  IRoom: string;
}

export interface ISocketAndUser {
  socket: Socket;
  userOnline: IUser[];
  user: IUserMessage[];
}

export interface IInvite {
  socket: Socket;
  getInvate: IInvateUser[];
  deletUserOnline: Function;
  setSocketInvite: Function;
  socketInvite: IInvateUser[];
}

export interface IModal {
  socket: Socket;
  userElement: IUser;
  index: number;
}
