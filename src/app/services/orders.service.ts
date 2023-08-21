import { Injectable } from '@angular/core';
import { getFirestore, Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore'
import { Order } from '../interfaces/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private firestore: Firestore) { }

  addOrder(order: Order) {
    const orderRef = collection(this.firestore, 'orders');
    return addDoc(orderRef, order)
  }

  getOrders(): Observable<Order[]>{
    const orderRef = collection(this.firestore, 'orders');
    return collectionData(orderRef, { idField: 'id'}) as Observable<Order[]>;
  }

  deleteOrder(order: Order) {
    const orderDocRef = doc(this.firestore, `orders/${order.id}`);
    return deleteDoc(orderDocRef);
  }

  updateOrder(order: Order) {
    const orderDocRef = doc(this.firestore, `orders/${order.id}`);
    deleteDoc(orderDocRef);
    const orderRef = collection(this.firestore, 'orders');
    return addDoc(orderRef, order)
  }
}
