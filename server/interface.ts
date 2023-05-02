export interface IArrMessages {
  id: number;
  socketID: string;
  roomI: object;
  text: string;
  name: string;
}
export interface IArrRoom {
  id: number;
  roomId: string;
  background: string;
}
export interface IUser {
  user: string;
  socketId: string;
  room: string;
}
