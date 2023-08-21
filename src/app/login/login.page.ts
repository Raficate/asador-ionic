import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoneService } from '../services/firestone.service';
import {  } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  arrayUsers: any = [{
    name: "",
    pass: ""
  }];

  constructor(private route: ActivatedRoute, private router:Router, private firestoneService: FirestoneService) { }

  ngOnInit() {
  }

  submitForm() {
    // this.consultarUsers();
    this.router.navigate(['/home']);
  }

  consultarUsers(){
    this.firestoneService.consultar("users").subscribe((resultado: any) => {
      this.arrayUsers = [];
      resultado.forEach((element: any) => {
        this.arrayUsers.push({
          name: element.payload.name,
          pass: element.payload.pass
        })
        
      });
    })
    // console.log(this.arrayUsers)
  }
}
