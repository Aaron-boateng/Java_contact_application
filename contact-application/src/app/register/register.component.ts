import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;
  email = '';
  password = '';

  constructor(
    private formBuilder: FormBuilder,
    private data: DataService,
  ) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.data.loggedRedirection()
    
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }

    this.success = true;

    if (this.success){

      this.email = this.messageForm.controls.email.value;
      this.password= this.messageForm.controls.password.value;
      const obj = this;

      this.data.setUser(this.email, this.password).subscribe(data => {
        if(data == "saved"){
          setTimeout(function(){
            obj.data.loginRedirection();
          }, 1000)
            
        }
        else if(data == "exist"){
          alert("exist");
        }
      });
      
    }
  }

}