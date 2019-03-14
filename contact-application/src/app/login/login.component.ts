import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  { DataService } from '../data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;

  constructor(
      private formBuilder: FormBuilder,
      private data: DataService,
    ) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      message: ['', Validators.required]
    });
    

    this.data.logUser().subscribe(data => {

      if(data == true ){
          localStorage.setItem('connected', 'true')
      }

    });

  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
        return;
    }

    this.success = true;
  }

}
