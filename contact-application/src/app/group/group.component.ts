import { Component, OnInit } from '@angular/core';
import { DataService } from  '../data.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(private data: DataService) { }

  users: Object;

  ngOnInit() {

    this.data.getUsers().subscribe(data => {
      this.users = data
      console.log(this.users);
    });

  }
}