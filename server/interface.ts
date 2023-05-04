export interface IMessagesList {
  id: number;
  socketID: string;
  roomI: object;
  text: string;
  name: string;
}
export interface IRoomList {
  id: number;
  roomId: string;
  background: string;
}
export interface IUserList {
  id: number;
  user: string;
  socketId: string;
  room: string;
}
