import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  { DataService } from '../data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {

  messageForm: FormGroup;
  contact : Object;
  submitted = false;
  success = false;
  messageError = false;
  response = null;

  constructor(
      private formBuilder: FormBuilder,
      private data: DataService,
    ) { }

  ngOnInit() {

    this.messageForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      name: [''],
      number: [''],
      email: [''],
      picture: ['']
    });

  }

  onSubmit() {
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

      this.data.setContact(name, firstname, email ,number).subscribe(data => {

        this.response = data;
        
        console.log(data)
        if(this.response.toString() == 'saved'){

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
