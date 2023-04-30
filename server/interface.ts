export interface IArrMessages {
  id: string;
  socketID: string;
  roomI: object;
  text: string;
  name: string;
}

export interface IArrRoom {
  id: string;
  background: string;
}

export interface IUser {
  user: string;
  socketId: string;
  room: string;
}
