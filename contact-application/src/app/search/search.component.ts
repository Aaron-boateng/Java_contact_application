import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      search: [''],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
        return;
    }

    this.success = true;
    
  }

  search(){
    console.log('search');
  }

}