import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonCard,
  IonButtons,
  IonSpinner,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonListHeader,
} from '@ionic/angular/standalone';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { TaskToDo } from '../models/task.model';
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';
import {  IonInput } from '@ionic/angular/standalone';
import { FirestoreService } from '../common/services/firestore';
import { IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { IoniconsModule } from '../common/modules/ionicons.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todolist',
   standalone: true,
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  imports: [
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption,
    IonContent,
    IonItem,
    IonLabel,
    IonList,
    IonButton,
    IonButtons,
    IonIcon,
    IonListHeader,
    IonList,
    IonLabel,
    IonHeader,
    FormsModule,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonList,
    IonItem,
    IonIcon,
    IonButton,
    IonListHeader,
    IonCard,
    IonSpinner,
    IoniconsModule,
  ],
})
export class TodolistComponent implements OnInit {
  name: string = '';
  description: string = '';
  tasks: TaskToDo[] = [];
  newTask!: TaskToDo;
  cargando: boolean = true;
  constructor(private fireservice: FirestoreService, private router: Router) {
    addIcons({ closeCircleOutline });
  }

  ngOnInit() {
    this.fireservice.getTasks<TaskToDo>().subscribe((data) => {
      this.tasks = data;
      this.cargando = false;
    });
  }

  createNewTask() {

        this.newTask = {
      id: this.fireservice.createIdDoc(),
      name: this.name,
      status: 'POR HACER',
      description: this.description
    };
    this.clearData();
    this.fireservice.createTask(this.newTask);
  }

  deleteTask(id: string) {
    this.fireservice.deleteTask(id);
  }

  handleChange(event: Event, updateTask: TaskToDo) {
    const target = event.target as HTMLIonSelectElement;
    updateTask.status = target.value;
    this.fireservice.updateTask(updateTask);
  }

  navigate() {
    this.router.navigate(['/gestion-categorias']);
  }
    clearData() {
    this.name = '';
    this.description = '';
  }
}
