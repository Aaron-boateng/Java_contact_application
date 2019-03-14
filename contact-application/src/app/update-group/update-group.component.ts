import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.css']
})
export class UpdateGroupComponent implements OnInit {

  messageForm: FormGroup;
  contact : Object;
  submitted = false;
  success = false;
  messageError = false;
  response = null;

  constructor(
      private formBuilder: FormBuilder,
      private data: DataService,
      private route: ActivatedRoute
    ) { }

  ngOnInit() {

    const id = this.getId();

    this.data.getSingleGroup(id).subscribe(data => {
      const contact = data[0];
      
      this.messageForm = this.formBuilder.group({
        name: [contact.name],
      });

    })

  }
  
  getId() {

    return this.route.snapshot.paramMap.get('id');

  }

  onSubmit() {
    const id = this.getId();
    this.submitted = true;

    if (this.messageForm.invalid) {
        return;
    }

    this.success = true;

    if(this.success === true && this.submitted == true){

      const name  = this.messageForm.controls.name.value;

      this.data.updateGroup(id , name).subscribe(data => {

        this.response = data; 

        if(this.response.toString() == 'updated'){

          this.messageError = true;
          const obj = this;
          
          setTimeout(function(){
  
            obj.data.groupRedirection();
  
          }, 1000);
  
        }
         
      })
    }
  }

}