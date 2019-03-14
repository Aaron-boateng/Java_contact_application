import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  { DataService } from '../data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {

  messageForm: FormGroup;
  group : Object;
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
      name: ['', Validators.required],
    });

  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
        return;
    }

    this.success = true;

    if(this.success === true && this.submitted == true){

      const name  = this.messageForm.controls.name.value;

      this.data.setGroup(name).subscribe(data => {

        this.response = data;
        
        if(this.response.toString() == 'saved'){

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