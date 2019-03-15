import { Component, OnInit } from '@angular/core';
import { DataService } from  '../data.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(private data: DataService) { }

  groups: Object;

  ngOnInit() {

    const isLogged = this.data.isLogged();
        
    this.data.getGroup().subscribe(data => {
      this.groups = data;
    });

  }
}