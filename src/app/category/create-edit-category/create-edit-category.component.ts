import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonList,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { OverlayEventDetail } from '@ionic/core/components';
import { FirestoreService } from 'src/app/common/services/firestore';
import { Category } from 'src/app/models/category.model';
import { TaskToDo } from 'src/app/models/task.model';

@Component({
  selector: 'app-create-edit-category',
  imports: [
    FormsModule,
    IonButton,
    IonButtons,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonModal,
    IonTitle,
    IonToolbar,
  ],
  templateUrl: './create-edit-category.component.html',
  styleUrls: ['./create-edit-category.component.scss'],
})
export class CreateEditCategoryComponent implements OnInit {
  @Output() sendNewCategory = new EventEmitter<Category>();
  @ViewChild(IonModal) modal!: IonModal;

  @Input() updateCategory!: Category;
  tasks: TaskToDo[] = [];
  name!: string;
  description!: string;
  status: string = 'POR HACER';
  createdDate: string = '10/10/2922';
  @Input() isOpen = false;

  updsateCategory: TaskToDo = {
    description: '0',
    id: 'c42431f5-91d8-4ab0-8683-4b2e9199d608',
    name: '90',
    status: 'POR HACER',
  };

  constructor(private fireservice: FirestoreService) {}
  ngOnInit(): void {
    this.fireservice.getTasks<TaskToDo>().subscribe((data) => {
      this.tasks = data;
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.isOpen = false;
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.clearData();
    this.sendNewCategory.emit(this.updateCategory);
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
    }
  }
  clearData() {
    this.name = '';
  }

  handleChange(event: Event) {
    const target = event.target as HTMLIonSelectElement;
    this.updateCategory.tasks = target.value;
    console.log(target.value);
  }
}
