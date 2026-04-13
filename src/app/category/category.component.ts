import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonList,
  IonItem,
  IonCard,
  IonListHeader,
  IonInput,
  IonSpinner,
  IonButtons,
  IonButton,
  IonIcon,
  IonImg,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { IoniconsModule } from '../common/modules/ionicons.module';
import { FirestoreService } from '../common/services/firestore';
import { TaskToDo } from '../models/task.model';
import { Category } from '../models/category.model';
import { CreateEditCategoryComponent } from './create-edit-category/create-edit-category.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  standalone: true,
  imports: [
    IonList,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonIcon,
    IonButton,
    IonListHeader,
    IonButtons,
    IonSpinner,
    IonInput,
    IonCard,
    FormsModule,
    CreateEditCategoryComponent,
    IoniconsModule,
  ],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  newCategory: Category | undefined;
  updateCategory!: Category;
  name: string = '';
  cargando: boolean = true;
  isModalOpen = false;

  tasksOfCategory: TaskToDo[]=[];

  constructor(private fireservice: FirestoreService, private router: Router) {}
  ngOnInit(): void {
    this.fireservice.getCategories<Category>().subscribe((data) => {
      this.categories = data;
      this.cargando= false;
    });
  }

  selectCategoryEdit(categorySelect: Category) {
    this.updateCategory = categorySelect;
    this.isModalOpen = true;
  }

  createNewCategory() {
    this.newCategory = {
      id: this.fireservice.createIdDoc(),
      name: this.name,
      tasks: [],
    };
    this.name = '';
    this.fireservice.createCategory(this.newCategory);
  }

  deleteCategory(id: string) {
    this.fireservice.deleteCategory(id);
    this.tasksOfCategory=[];
  }
    selectListTask(tasks: TaskToDo[], category: Category) {
    this.tasksOfCategory=tasks;
    this.updateCategory= category;
  }


    editNewCategory(category: Category) {
    this.fireservice.updateCategory(category);
    this.tasksOfCategory=category.tasks;
  }

   navigate(){
    this.router.navigate(['/gestion-tareas'])
  }

}
