import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/angular/standalone';
import { IonButton, IonText, IonIcon } from '@ionic/angular/standalone';
import { TaskToDo } from '../models/task.model';
import { ModalcreatetaskComponent } from '../modalcreatetask/modalcreatetask.component';
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';
import { IonCol, IonGrid, IonInput, IonRow } from '@ionic/angular/standalone';
import { FirestoreService } from '../common/services/firestore';
import { IonSelect, IonSelectOption } from '@ionic/angular/standalone';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  imports: [
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption,
    IonCol,
    IonGrid,
    IonRow,
    IonContent,
    IonItem,
    IonLabel,
    IonList,
    IonText,
    IonButton,
    IonIcon,
    IonListHeader,
    ModalcreatetaskComponent,
  ],
})
export class TodolistComponent implements OnInit {
  tasks: TaskToDo[] = [];

  constructor(private fireservice: FirestoreService) {
    addIcons({ closeCircleOutline });
  }

  ngOnInit() {
    this.fireservice.getTasks<TaskToDo>().subscribe((data) => {
      this.tasks = data;
    });
  }

  createNewTask(task: TaskToDo) {
    this.fireservice.createTask(task);
  }

  deleteTask(id: string) {
    this.fireservice.deleteTask(id);
  }

  handleChange(event: Event, updateTask: TaskToDo) {
    const target = event.target as HTMLIonSelectElement;
    updateTask.status = target.value;
    this.fireservice.updateTask(updateTask);
  }
}
