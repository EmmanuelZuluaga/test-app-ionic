import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';
import { TaskToDo } from '../models/task.model';
import { FirestoreService } from '../common/services/firestore';
@Component({
  selector: 'app-modalcreatetask',
  templateUrl: './modalcreatetask.component.html',
  imports: [
    FormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonModal,
    IonTitle,
    IonToolbar,
  ],
  styleUrls: ['./modalcreatetask.component.scss'],
})
export class ModalcreatetaskComponent {
  @Output() sendNewTask = new EventEmitter<TaskToDo>();
  @ViewChild(IonModal) modal!: IonModal;

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';

  newTask: TaskToDo | undefined;
  name!: string;
  description!: string;
  status: string = 'POR HACER';
  createdDate: string = '10/10/2922';

  constructor(private fireservice: FirestoreService){

  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.newTask = {
      id: this.fireservice.createIdDoc(),
      name: this.name,
      status: 'POR HACER',
      description: this.description
    };
    this.clearData();
    this.sendNewTask.emit(this.newTask);
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`;
    }
  }
  clearData() {
    this.name = '';
    this.description = '';
  }
}
