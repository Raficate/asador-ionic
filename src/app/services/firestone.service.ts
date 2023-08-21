import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoneService {

  constructor(private angularFirestore: AngularFirestore) { }

  public insertar(coleccion: any, datos: any) {
    return this.angularFirestore.collection(coleccion).add(datos);
  } 

  public consultar(coleccion: any) {
    console.log(this.angularFirestore.collection(coleccion).snapshotChanges() )
    return this.angularFirestore.collection(coleccion).snapshotChanges();
  }

}

