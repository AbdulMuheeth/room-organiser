import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { Room } from "./room.model";

@Injectable({ providedIn: "root" })

export class RoomsService {
  private rooms: Room[] = [];
  private roomsUpdated = new Subject<Room[]>();

  constructor(private http: HttpClient) {}

  getRooms() {
    this.http
      .get<{ message: string; rooms: any }>(
        "http://localhost:3000/api/rooms"
      )
      .pipe(map((roomData) => {
        return roomData.rooms.map((room:any) => {
          return {
            roomtype:room.roomtype,
            from:room.from,
            to:room.to,
            breakfast:room.breakfast,
            airconditioner:room.airconditioner,
            wakeupservice:room.wakeupservice,
            id:room._id
          };
        });
      }))
      .subscribe(transformedRooms => {
        this.rooms = transformedRooms;
        this.roomsUpdated.next([...this.rooms]);
      });
  }

  getRoomUpdateListener() {
    return this.roomsUpdated.asObservable();
  }

  addRoom(roomtype: string, from: Date,to:Date,breakfast:Boolean,airconditioner:Boolean,wakeupservice:Boolean) {
    const room: Room = { id: "", roomtype: roomtype, from: from, to:to, breakfast:breakfast, airconditioner:airconditioner, wakeupservice:wakeupservice };
    console.log("inside the serv "+room)
    this.http
      .post<{ message: string, roomId: string }>("http://localhost:3000/api/rooms", room)
      .subscribe(responseData => {
        const id = responseData.roomId;
        room.id = id;
        this.rooms.push(room);
        this.roomsUpdated.next([...this.rooms]);
      });
  }

  deleteRoom(roomId: string) {
    this.http.delete("http://localhost:3000/api/rooms/" + roomId)
      .subscribe(() => {
        const updatedRooms = this.rooms.filter(room => room.id !== roomId);
        this.rooms = updatedRooms;
        this.roomsUpdated.next([...this.rooms]);
      });
  }

  editRoom(roomId:string)
  {
    
  }
}
