import { Component, OnInit } from '@angular/core';
import { DataService } from  '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-contact',
  templateUrl: './single-contact.component.html',
  styleUrls: ['./single-contact.component.css']
})
export class SingleContactComponent implements OnInit {

  constructor(
    private data: DataService,
    private route: ActivatedRoute
  ) { }

  user: Object;
  response: String;
  messageError: Boolean = false;

  ngOnInit() {

    const isLogged = this.data.isLogged();
    const id = this.getId();

    this.data.getSingleContact(id).subscribe(data => {
      this.user = data[0];
    });
    

  }
  
  getId(){

    return this.route.snapshot.paramMap.get('id');

  }

  unsetContact(id){

    this.data.unsetSingleContact(id).subscribe(data => {
      this.response = data[0];

      if(this.response.toString() == 'deleted'){

        this.messageError = true;
        const obj = this;

        setTimeout(function(){

          obj.data.contactRedirection();

        }, 1000);

      }
    });
    
  }

}
