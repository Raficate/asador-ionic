import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { environment } from '../../environments/environment';

import { OrdersService } from '../services/orders.service'

import { Order } from '../interfaces/order';
import { Pat } from '../interfaces/pat';
import { Patpim } from '../interfaces/patpim';
import { Pim } from '../interfaces/pim';
import { Croq } from '../interfaces/croq';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
  providers: [DatePipe, OrdersService]
})
export class NewOrderPage implements OnInit {

  data: any;
  jsondata: any;
  editingOrder: Order;
  pat : Pat;
  patpim : Patpim;
  pim : Pim;
  croq : Croq;
  orders: Order[];

  constructor(
    public formBuilder: FormBuilder, 
    private datePipe: DatePipe, 
    private httpClient: HttpClient, 
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.initializeOrder();
  }

  initializeOrder() {
    this.editingOrder = {} as Order;
    this.editingOrder.nombre = "";
    this.editingOrder.pollo = 0;
    this.editingOrder.medio = false;
    this.editingOrder.muslo = 0;
    this.editingOrder.pagado = false;
    this.editingOrder.total = 0;
    this.pat = {} as Pat;
    this.patpim = {} as Patpim;
    this.pim = {} as Pim;
    this.croq = {} as Croq;
    this.pat.gr = 0;
    this.pat.md = 0;
    this.pat.pq = 0;
    this.patpim.gr = 0;
    this.patpim.md = 0;
    this.patpim.pq = 0;
    this.croq.jamon = 0;
    this.croq.pollo = 0;
    this.croq.cocido = 0;
    this.croq.bacalao = 0;
    this.pim.md = 0;
    this.pim.gr = 0;
  }

  async clicBotonInsertar() {
    this.editingOrder.pat = this.pat;
    this.editingOrder.patpim = this.patpim;
    this.editingOrder.pim = this.pim;
    this.editingOrder.croq = this.croq;
    
    this.editingOrder = this.comprobarNuevoPedido(this.editingOrder);

    const response = await this.ordersService.addOrder(this.editingOrder);
  }

  comprobarNuevoPedido(pedido: Order): Order {
    if (!pedido.fecha){
      let fecha = this.datePipe.transform(Date.now(), 'yyyy-MM-dd') + "";
      pedido.fecha = fecha
    }
      
    if (!pedido.hora){pedido.hora = "14:00"}     
    return pedido;
  }

  getOrders(){
    this.ordersService.getOrders().subscribe(orders => {
      this.orders = orders;
    })
  }

  async deleteOrder(order: Order){
    const response = await this.ordersService.deleteOrder(order);
  }

  anadirPollo(){
    this.editingOrder.pollo = this.editingOrder.pollo + 1
    this.editingOrder.total = this.editingOrder.total + environment.precios.pollo
  }

  quitarMedioPollo(){
    this.editingOrder.total = this.editingOrder.total - environment.precios.medio
    this.editingOrder.pollo = this.editingOrder.pollo - 0.5
    this.editingOrder.medio = false
    this.anadirPollo()
  }

  anadirMedioPollo(){
    if(this.editingOrder.medio){
      this.quitarMedioPollo()
    } else {
      this.editingOrder.medio = true
      this.editingOrder.pollo = this.editingOrder.pollo + 0.5
      this.editingOrder.total = this.editingOrder.total + environment.precios.medio
    }
  }

  anadirMuslo(){
    this.editingOrder.muslo = this.editingOrder.muslo + 1
    this.editingOrder.total = this.editingOrder.total + environment.precios.muslo
  }

  anadir5Muslos(){
    this.editingOrder.muslo = this.editingOrder.muslo + 5
    this.editingOrder.total = this.editingOrder.total + (environment.precios.muslo * 5)
  }

  borrarSeleccionPollos(){
    if(this.editingOrder.medio){
      this.editingOrder.total = this.editingOrder.total - environment.precios.medio;
      this.editingOrder.pollo = this.editingOrder.pollo - 0.5
    }
    this.editingOrder.total = this.editingOrder.total - (this.editingOrder.muslo * environment.precios.muslo) - (this.editingOrder.pollo * environment.precios.pollo) 
    this.editingOrder.muslo = 0
    this.editingOrder.pollo = 0
  }

  anadirPatGr(){
    this.pat.gr = this.pat.gr + 1
    this.editingOrder.total = this.editingOrder.total + environment.precios.patgr
  }

  anadirPatMd(){
    this.pat.md = this.pat.md + 1
    this.editingOrder.total = this.editingOrder.total + environment.precios.patmd
  }

  anadirPatPq(){
    this.pat.pq = this.pat.pq + 1
    this.editingOrder.total = this.editingOrder.total + environment.precios.patpq
  }
  
  anadirPatPimGr(){
    this.patpim.gr = this.patpim.gr + 1
    this.editingOrder.total = this.editingOrder.total + environment.precios.patgr
  }

  anadirPatPimMd(){
    this.patpim.md = this.patpim.md + 1
    this.editingOrder.total = this.editingOrder.total + environment.precios.patmd
  }

  anadirPatPimPq(){
    this.patpim.pq = this.patpim.pq + 1
    this.editingOrder.total = this.editingOrder.total + environment.precios.patpq
  }

  borrarSeleccionPatPim(){
    this.editingOrder.total = this.editingOrder.total - (this.pat.gr * environment.precios.patgr) - (this.patpim.gr * environment.precios.patgr) - (this.pat.md * environment.precios.patmd)
      - (this.patpim.md * environment.precios.patmd) - (this.pat.pq * environment.precios.patpq) - (this.patpim.pq * environment.precios.patpq)
    this.pat.gr = 0;
    this.pat.md = 0;
    this.pat.pq = 0;
    this.patpim.gr = 0;
    this.patpim.md = 0;
    this.patpim.pq = 0; 
  }

  anadirCroqJamon(){
    this.croq.jamon = this.croq.jamon + 1
    this.editingOrder.total = this.editingOrder.total + environment.precios.croq
    this.editingOrder.total = Math.round(this.editingOrder.total*10) / 10
  }

  anadir5CroqJamon(){
    this.croq.jamon = this.croq.jamon + 5
    this.editingOrder.total = this.editingOrder.total + (environment.precios.croq*5)
    this.editingOrder.total = Math.round(this.editingOrder.total*10) / 10
  }

  anadirCroqPollo(){
    this.croq.pollo = this.croq.pollo + 1
    this.editingOrder.total = this.editingOrder.total + environment.precios.croq
    this.editingOrder.total = Math.round(this.editingOrder.total*10) / 10
  }

  anadir5CroqPollo(){
    this.croq.pollo = this.croq.pollo + 5
    this.editingOrder.total = this.editingOrder.total + (environment.precios.croq*5)
    this.editingOrder.total = Math.round(this.editingOrder.total*10) / 10
  }

  anadirCroqCocido(){
    this.croq.cocido = this.croq.cocido + 1
    this.editingOrder.total = this.editingOrder.total + environment.precios.croq
    this.editingOrder.total = Math.round(this.editingOrder.total*10) / 10
  }

  anadir5CroqCocido(){
    this.croq.cocido = this.croq.cocido + 5
    this.editingOrder.total = this.editingOrder.total + (environment.precios.croq*5)
    this.editingOrder.total = Math.round(this.editingOrder.total*10) / 10
  }

  anadirCroqBacalao(){
    this.croq.bacalao = this.croq.bacalao + 1
    this.editingOrder.total = this.editingOrder.total + environment.precios.croq
    this.editingOrder.total = Math.round(this.editingOrder.total*10) / 10
  }

  anadir5CroqBacalao(){
    this.croq.bacalao = this.croq.bacalao + 5
    this.editingOrder.total = this.editingOrder.total + (environment.precios.croq*5)
    this.editingOrder.total = Math.round(this.editingOrder.total*10) / 10
  }

  borrarSeleccionCroq(){
    this.editingOrder.total = this.editingOrder.total - ((this.croq.jamon + this.croq.pollo + this.croq.cocido + this.croq.bacalao)*environment.precios.croq)
    this.editingOrder.total = Math.round(this.editingOrder.total*10) / 10
    this.croq.jamon = 0;
    this.croq.pollo = 0;
    this.croq.cocido = 0;
    this.croq.bacalao = 0;
  }

  anadirPimPq(){
    this.pim.md = this.pim.md +1;
    this.editingOrder.total = this.editingOrder.total + environment.precios.pim
  }

  anadirPimGr(){
    this.pim.gr = this.pim.gr +1;
    this.editingOrder.total = this.editingOrder.total + environment.precios.pimband
  }

  borrarSeleccionPim(){
    this.editingOrder.total = this.editingOrder.total - (this.pim.gr * environment.precios.pimband) - (this.pim.md * environment.precios.pim)
    this.pim.md = 0;
    this.pim.gr = 0;
  }

  submitForm() {
  }




  

}
