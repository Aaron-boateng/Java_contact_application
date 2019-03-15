import { Component, OnInit } from '@angular/core';
import { DataService } from  '../data.service';
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {

  constructor(
      private data: DataService,
      private router: Router,
      private route: ActivatedRoute
      
    ) { }

  users: Object;
  response = null ;
  id = null;

  ngOnInit() {

    const isLogged = this.data.isLogged();
    
    this.data.getUsers().subscribe(data => {
      this.users = data;
    });
    
    this.id = this.getId();
  }
  
  getId(){

    return this.route.snapshot.paramMap.get('id');

  }

  addContactGroup(user_id, group_id){
    console.log(user_id, group_id)
    this.data.addGroupContact(user_id, group_id).subscribe(
      data => {
        this.response = data[0];

        console.log(this.response);

        if(this.response.toString() == 'saved'){
  
          const obj = this;
  
          setTimeout(function(){
  
            obj.data.groupRedirection();
  
          }, 1000);
  
        }
      }
    )

  }
}