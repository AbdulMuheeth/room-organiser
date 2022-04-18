import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common'
import { VERSION, ComponentFactoryResolver, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Room } from "../room.model";
import { RoomsService } from "../rooms.service";

@Component({
    selector: "app-room-list",
    templateUrl: "./room-list.component.html",
    styleUrls: ["./room-list.component.css"]
})
export class RoomListComponent implements OnInit, OnDestroy {
  
  rooms: Room[] = [];
  public roomsSub!: Subscription;
  private viewRef!: ViewContainerRef;
  
  constructor(public roomsService: RoomsService, public datepipe: DatePipe) {
    
  }

  

  convert_date(date:Date){
    let latest_date =this.datepipe.transform(date, 'yyyy-MM-dd');
    return latest_date
  }

  ngOnInit() {
    this.roomsService.getRooms();
    this.roomsSub = this.roomsService.getRoomUpdateListener()
      .subscribe((rooms: Room[]) => {
        this.rooms = rooms;
      });
  }

  onDelete(roomId: string) {
    this.roomsService.deleteRoom(roomId);
  }
  

  onEdit(roomId:string)
  {}

  ngOnDestroy() {
    this.roomsSub.unsubscribe();
  }
}
