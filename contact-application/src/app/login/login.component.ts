import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
      
      this.data.logUser(this.email, this.password).subscribe(data => {


        if (data == true) {
          const obj = this;
          localStorage.setItem('connected', 'true')

          setTimeout(function(){
  
            obj.data.contactRedirection();
            window.location.reload();
          }, 1000);
        }

      });
    }
  }
}
