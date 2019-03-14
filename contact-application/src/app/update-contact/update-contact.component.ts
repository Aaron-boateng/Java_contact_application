import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit {

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

    this.data.getSingleContact(id).subscribe(data => {
      const contact = data[0];
      
      this.messageForm = this.formBuilder.group({
        firstname: [contact.firstname, Validators.required],
        name: [contact.name],
        number: [contact.number],
        email: [contact.email],
        picture: []
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

      const firstname = this.messageForm.controls.firstname.value;
      const name  = this.messageForm.controls.name.value;
      const number = this.messageForm.controls.number.value;
      const email = this.messageForm.controls.email.value;

      this.data.updateContact(id , name, firstname, email ,number).subscribe(data => {

        this.response = data; 

        if(this.response.toString() == 'updated'){

          this.messageError = true;
          const obj = this;
          
          setTimeout(function(){
  
            obj.data.contactRedirection();
  
          }, 1000);
  
        }
         
      })
    }
  }

}