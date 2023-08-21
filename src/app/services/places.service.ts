import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore'
import { Pedido } from '../interfaces/pedido';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private firestore: Firestore) { }

  addPedido(pedido: Pedido) {
    const pedidoRef = collection(this.firestore, 'pedidos');
    return addDoc(pedidoRef, pedido)
  }
}
