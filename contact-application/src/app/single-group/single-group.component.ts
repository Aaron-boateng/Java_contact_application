import { Component, OnInit } from '@angular/core';
import { DataService } from  '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './single-group.component.html',
  styleUrls: ['./single-group.component.css']
})
export class SingleGroupComponent implements OnInit {

  constructor(
      private data: DataService,
      private route: ActivatedRoute
    ) { }

  group: Object;
  response: String;
  messageError: Boolean = false;

  ngOnInit() {
    
    const isLogged = this.data.isLogged();
    const id = this.getId();

    this.data.getSingleGroup(id).subscribe(data => {
      this.group = data[0]
    });

  }
  
  getId(){

    return this.route.snapshot.paramMap.get('id');

  }

  unsetGroup(id){

    this.data.unsetSingleGroup(id).subscribe(data => {
      this.response = data[0];
      if(this.response.toString() == 'deleted'){

        this.messageError = true;
        const obj = this;

        setTimeout(function(){

          obj.data.groupRedirection();

        }, 1000);

      }
    });
    
  }

  unsetContactGroup(user_id, group_id){

    this.data.unsetGroupContact(user_id, group_id).subscribe(data => {
      this.response = data[0];
      if(this.response.toString() == 'deleted'){

        this.messageError = true;
        const obj = this;

        setTimeout(function(){

          obj.data.groupRedirection();

        }, 1000);

      }
    });
    
  }

}