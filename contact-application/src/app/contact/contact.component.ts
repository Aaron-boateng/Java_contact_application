import { Component, OnInit } from '@angular/core';
import { DataService } from  '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private data: DataService) { }

  users: Object;

  ngOnInit() {

    this.data.getUsers().subscribe(data => {
      this.users = data
      console.log(this.users);
    });

  }
}