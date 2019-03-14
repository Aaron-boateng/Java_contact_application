import { Component, OnInit } from '@angular/core';
import { DataService } from  '../data.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
      private data: DataService,
      private router: Router,
    ) { }

  users: Object;

  ngOnInit() {

    const isLogged = this.data.isLogged();
    
    this.data.getUsers().subscribe(data => {
      this.users = data;
    });
    
  }
}