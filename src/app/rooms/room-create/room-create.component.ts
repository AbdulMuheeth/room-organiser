import { Component } from "@angular/core";
import { RoomsService } from "../rooms.service";
import { NgForm } from "@angular/forms";
import {FormControl, Validators} from '@angular/forms';
import { ContentObserver } from "@angular/cdk/observers";

interface RoomType {
    value: string;
    viewValue: string;
}


@Component({

    selector:"app-room-create",
    templateUrl:"./room-create.component.html",
    styleUrls: ["./room-create.component.css"]
})

export class RoomCreateComponent{
    
    enteredRoomType = "";
    enteredFrom = "";
    enteredTo = "";
    enteredbreakfast=false;
    enteredairconditioner=false;
    enteredwakeupsservice=false;

    rControl = new FormControl('', Validators.required);
    selectFormControl = new FormControl('', Validators.required);

    rtypes: RoomType[] = [
        {value: 'single', viewValue: 'Single'},
        {value: 'double', viewValue: 'Double'},
        {value: 'triple', viewValue: 'Triple'},
    ];

    

    constructor(public roomsService: RoomsService) {}

    onAddPost(form: NgForm) {
        if (form.invalid) {
        return;
        }
        console.log(form.value);
        if (form.value.breakfast !== "false")
        {
            this.enteredbreakfast = true;
        }
        
        if (form.value.airconditioner!="" && form.value.airconditioner && form.value.airconditioner!=null)
        {
            this.enteredairconditioner = true
        }
        if (form.value.wakeupservice !== "" && form.value.wakeupservice && form.value.wakeupservice!=null)
        {
            this.enteredwakeupsservice = true
        }
        // console.dir(form);
        // console.log("this mat select val "+this.enteredRoomType)
        // console.log("this mat from val "+ new Date(this.enteredFrom))
        // console.log("this mat from val "+new Date(this.enteredTo))
        // console.log("ac"+this.enteredairconditioner)
        // console.log("wk"+this.enteredwakeupsservice)
        // console.log("bf"+this.enteredbreakfast)
        this.roomsService.addRoom(this.enteredRoomType, new Date(this.enteredFrom),new Date(this.enteredTo),this.enteredbreakfast,this.enteredairconditioner,this.enteredwakeupsservice);
        form.resetForm();
    }
}