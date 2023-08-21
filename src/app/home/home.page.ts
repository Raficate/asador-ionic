import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';


import { OrdersService } from '../services/orders.service'
import { Order } from '../interfaces/order';


// import * as data from '../../assets/pollos.json';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [OrdersService]
})
export class HomePage {

  data: any;
  jsondata: any;
  orders: Order[];


  constructor(
    private ordersService: OrdersService
    ) {
    
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    this.ordersService.getOrders().subscribe(orders => {
      this.orders = orders;
    })
  }

  async onClickDelete(order: Order){
    const response = await this.ordersService.deleteOrder(order);
  }
}
