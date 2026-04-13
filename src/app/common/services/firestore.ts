import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Firestore,
  collectionData, collection,
  doc, docData, getDoc, setDoc, updateDoc, deleteDoc,
  DocumentReference
} from '@angular/fire/firestore';
import {v4 as uuidv4} from "uuid";
import { TaskToDo } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
    private firestore: Firestore = inject(Firestore); // inject Cloud Firestore

    constructor() {
  
    }


    getTasks<tipo>(){
       const userProfileCollection = collection(this.firestore,'tasks');
      return collectionData(userProfileCollection) as Observable<tipo[]>;
    }

      createTask(data: TaskToDo) {
    const document = doc(this.firestore, `tasks/${data.id}`);
    return setDoc(document, data);
  }
    
  deleteTask( idTask: string) {
    const document = doc(this.firestore, `tasks/${idTask}`);
    return deleteDoc(document);
  }


    async updateTask(data: any) {
     const document = doc(this.firestore, `tasks/${data.id}`);
    return updateDoc(document, data)
  }



  getDocument<tipo>(enlace: string) {
    const document = doc(this.firestore, enlace) as DocumentReference<tipo, any>;
    return getDoc<tipo, any>(document)
  }

  getDocumentChanges<tipo>(enlace: string) {
    console.log('getDocumentChanges -> ', enlace);
    const document = doc(this.firestore, enlace);
    return docData(document) as Observable<tipo>;
  }

  getCollectionChanges<tipo>(path: string) {
    const itemCollection = collection(this.firestore, path);
    return collectionData(itemCollection) as Observable<tipo[]>;
  }

  createDocument(data: any, enlace: string) {
    const document = doc(this.firestore, enlace);
    return setDoc(document, data);
  }

  createDocumentID(data: any, enlace: string, idDoc: string) {
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return setDoc(document, data);
  }


  async updateDocumentID(data: any, enlace: string, idDoc: string) {
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return updateDoc(document, data)
  }

  async updateDocument(data: any, enlace: string) {
    const document = doc(this.firestore, enlace);
    return updateDoc(document, data)
  }

  deleteDocumentID(enlace: string, idDoc: string) {
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return deleteDoc(document);
  }

  deleteDocFromRef(ref: any) {
    return deleteDoc(ref)
  }

  createIdDoc() {
    return uuidv4()
  }


  }
