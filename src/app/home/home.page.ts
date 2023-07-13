import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { environment } from '../../environments/environment';

import { FirestoneService } from '../services/firestone.service'
import { Pedido } from '../interfaces/pedido';
import { Pat } from '../interfaces/pat';
import { Patpim } from '../interfaces/patpim';
import { Pim } from '../interfaces/pim';
import { Croq } from '../interfaces/croq';


// import * as data from '../../assets/pollos.json';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [DatePipe]
})
export class HomePage {

  data: any;
  jsondata: any;
  pedidoEditando: Pedido;
  pat : Pat;
  patpim : Patpim;
  pim : Pim;
  croq : Croq;


  constructor(public formBuilder: FormBuilder, private datePipe: DatePipe, private httpClient: HttpClient, private firestoneService: FirestoneService) {
    this.pedidoEditando = {} as Pedido;
    this.pedidoEditando.nombre = "";
    this.pedidoEditando.pollo = 0;
    this.pedidoEditando.medio = false;
    this.pedidoEditando.muslo = 0;
    this.pedidoEditando.pagado = false;
    this.pedidoEditando.total = 0;
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

  ngOnInit() {
    // this.getPedidos()
  }

  clicBotonInsertar() {
    this.pedidoEditando.pat = this.pat;
    this.pedidoEditando.patpim = this.patpim;
    this.pedidoEditando.pim = this.pim;
    this.pedidoEditando.croq = this.croq;
    this.pedidoEditando = this.comprobarNuevoPedido(this.pedidoEditando);

    this.firestoneService.insertar("pedidos", this.pedidoEditando).then(() => {
      this.pedidoEditando= {} as Pedido;
    }, (error: any) => {
      console.error(error);
    });
  }
  comprobarNuevoPedido(pedido: Pedido): Pedido {
    if (!pedido.fecha){
      let fecha = this.datePipe.transform(Date.now(), 'yyyy-MM-dd') + "";
      
      pedido.fecha = fecha}
      
    if (!pedido.hora){pedido.hora = "14:00"} 
    // if (!pedido.pollo){pedido.pollo = 0} 
    // // if (!pedido.medio){pedido.medio = false}
    // if (!pedido.muslo){pedido.muslo = 0} 
    // if (!pedido.pat.gr){pedido.pat.gr = 0} 
    // if (!pedido.pat.md){pedido.pat.md = 0}
    // if (!pedido.pat.pq){pedido.pat.pq = 0}
    // if (!pedido.patpim.gr){pedido.patpim.gr = 0}
    // if (!pedido.patpim.md){pedido.patpim.md = 0}
    // if (!pedido.patpim.pq){pedido.patpim.pq = 0}
    // if (!pedido.pim.gr){pedido.pim.gr = 0}
    // if (!pedido.pim.md){pedido.pim.md = 0} 
    // if (!pedido.croq.jamon){pedido.croq.jamon = 0}
    // if (!pedido.croq.pollo){pedido.croq.pollo = 0}
    // if (!pedido.croq.cocido){pedido.croq.cocido = 0}
    // if (!pedido.croq.bacalao){pedido.croq.bacalao = 0}
    // if (!pedido.pagado){pedido.pagado = false}
    // if (!pedido.total){pedido.total = 0.00}
    
    return pedido;
  }

  anadirPollo(){
    this.pedidoEditando.pollo = this.pedidoEditando.pollo + 1
    this.pedidoEditando.total = this.pedidoEditando.total + environment.precios.pollo
  }

  quitarMedioPollo(){
    this.pedidoEditando.total = this.pedidoEditando.total - environment.precios.medio
    this.pedidoEditando.pollo = this.pedidoEditando.pollo - 0.5
    this.pedidoEditando.medio = false
    this.anadirPollo()
  }


  anadirMedioPollo(){
    if(this.pedidoEditando.medio){
      this.quitarMedioPollo()
    } else {
      this.pedidoEditando.medio = true
      this.pedidoEditando.pollo = this.pedidoEditando.pollo + 0.5
      this.pedidoEditando.total = this.pedidoEditando.total + environment.precios.medio
    }
    
  }

  anadirMuslo(){
    this.pedidoEditando.muslo = this.pedidoEditando.muslo + 1
    this.pedidoEditando.total = this.pedidoEditando.total + environment.precios.muslo
  }

  anadir5Muslos(){
    this.pedidoEditando.muslo = this.pedidoEditando.muslo + 5
    this.pedidoEditando.total = this.pedidoEditando.total + (environment.precios.muslo * 5)
  }

  borrarSeleccionPollos(){
    if(this.pedidoEditando.medio){
      this.pedidoEditando.total = this.pedidoEditando.total - environment.precios.medio;
      this.pedidoEditando.pollo = this.pedidoEditando.pollo - 0.5
    }
    this.pedidoEditando.total = this.pedidoEditando.total - (this.pedidoEditando.muslo * environment.precios.muslo) - (this.pedidoEditando.pollo * environment.precios.pollo) 
    this.pedidoEditando.muslo = 0
    this.pedidoEditando.pollo = 0
  }

  anadirPatGr(){
    this.pat.gr = this.pat.gr + 1
    this.pedidoEditando.total = this.pedidoEditando.total + environment.precios.patgr
  }

  anadirPatMd(){
    this.pat.md = this.pat.md + 1
    this.pedidoEditando.total = this.pedidoEditando.total + environment.precios.patmd
  }

  anadirPatPq(){
    this.pat.pq = this.pat.pq + 1
    this.pedidoEditando.total = this.pedidoEditando.total + environment.precios.patpq
  }
  
  anadirPatPimGr(){
    this.patpim.gr = this.patpim.gr + 1
    this.pedidoEditando.total = this.pedidoEditando.total + environment.precios.patgr
  }

  anadirPatPimMd(){
    this.patpim.md = this.patpim.md + 1
    this.pedidoEditando.total = this.pedidoEditando.total + environment.precios.patmd
  }

  anadirPatPimPq(){
    this.patpim.pq = this.patpim.pq + 1
    this.pedidoEditando.total = this.pedidoEditando.total + environment.precios.patpq
  }

  borrarSeleccionPatPim(){
    this.pedidoEditando.total = this.pedidoEditando.total - (this.pat.gr * environment.precios.patgr) - (this.patpim.gr * environment.precios.patgr) - (this.pat.md * environment.precios.patmd)
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
    this.pedidoEditando.total = this.pedidoEditando.total + environment.precios.croq
    this.pedidoEditando.total = Math.round(this.pedidoEditando.total*10) / 10
    console.log(this.pedidoEditando.total)
  }

  anadir5CroqJamon(){
    this.croq.jamon = this.croq.jamon + 5
    this.pedidoEditando.total = this.pedidoEditando.total + (environment.precios.croq*5)
    this.pedidoEditando.total = Math.round(this.pedidoEditando.total*10) / 10
    console.log(this.pedidoEditando.total)
  }

  anadirCroqPollo(){
    this.croq.pollo = this.croq.pollo + 1
    this.pedidoEditando.total = this.pedidoEditando.total + environment.precios.croq
    this.pedidoEditando.total = Math.round(this.pedidoEditando.total*10) / 10
    console.log(this.pedidoEditando.total)
  }

  anadir5CroqPollo(){
    this.croq.pollo = this.croq.pollo + 5
    this.pedidoEditando.total = this.pedidoEditando.total + (environment.precios.croq*5)
    this.pedidoEditando.total = Math.round(this.pedidoEditando.total*10) / 10
    console.log(this.pedidoEditando.total)
  }

  anadirCroqCocido(){
    this.croq.cocido = this.croq.cocido + 1
    this.pedidoEditando.total = this.pedidoEditando.total + environment.precios.croq
    this.pedidoEditando.total = Math.round(this.pedidoEditando.total*10) / 10
    console.log(this.pedidoEditando.total)
  }

  anadir5CroqCocido(){
    this.croq.cocido = this.croq.cocido + 5
    this.pedidoEditando.total = this.pedidoEditando.total + (environment.precios.croq*5)
    this.pedidoEditando.total = Math.round(this.pedidoEditando.total*10) / 10
    console.log(this.pedidoEditando.total)
  }

  anadirCroqBacalao(){
    this.croq.bacalao = this.croq.bacalao + 1
    this.pedidoEditando.total = this.pedidoEditando.total + environment.precios.croq
    this.pedidoEditando.total = Math.round(this.pedidoEditando.total*10) / 10
    console.log(this.pedidoEditando.total)
  }

  anadir5CroqBacalao(){
    this.croq.bacalao = this.croq.bacalao + 5
    this.pedidoEditando.total = this.pedidoEditando.total + (environment.precios.croq*5)
    this.pedidoEditando.total = Math.round(this.pedidoEditando.total*10) / 10
    console.log(this.pedidoEditando.total)
  }

  borrarSeleccionCroq(){
    console.log(this.pedidoEditando.total)
    this.pedidoEditando.total = this.pedidoEditando.total - ((this.croq.jamon + this.croq.pollo + this.croq.cocido + this.croq.bacalao)*environment.precios.croq)
    this.pedidoEditando.total = Math.round(this.pedidoEditando.total*10) / 10
    this.croq.jamon = 0;
    this.croq.pollo = 0;
    this.croq.cocido = 0;
    this.croq.bacalao = 0;
  }

  anadirPimPq(){
    this.pim.md = this.pim.md +1;
    this.pedidoEditando.total = this.pedidoEditando.total + environment.precios.pim
  }

  anadirPimGr(){
    this.pim.gr = this.pim.gr +1;
    this.pedidoEditando.total = this.pedidoEditando.total + environment.precios.pimband
  }

  borrarSeleccionPim(){
    this.pedidoEditando.total = this.pedidoEditando.total - (this.pim.gr * environment.precios.pimband) - (this.pim.md * environment.precios.pim)
    this.pim.md = 0;
    this.pim.gr = 0;
  }

  submitForm() {
    // console.log(this.ionicForm.value)
  }
  // getPedidos(): void {
  //   this.httpClient.get("assets/pollos.json").subscribe(data =>{
  //     this.data = data;
  //     this.jsondata = JSON.parse(JSON.stringify(this.data));
  //     console.log(this.jsondata);      
  //   })
  // }

  recogerPedido() {}

}
