import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/Material/form-field";
import { HttpClientModule } from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {DatePipe} from '@angular/common';

import { AppComponent } from "./app.component";
import { RoomCreateComponent } from "./rooms/room-create/room-create.component";

import { RoomListComponent } from "./rooms/room-list/room-list.component";

@NgModule({
  
  declarations: [
    AppComponent,
    RoomCreateComponent,
    RoomListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  providers: [DatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule {}
