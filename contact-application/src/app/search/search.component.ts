import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;
  search = '';
  
  contacts: Object;
  groups: Object;

  constructor(
    private formBuilder: FormBuilder,
    private data: DataService,
  ) { }

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

  getInput(event: any){
    this.search = event.target.value;
    
    this.data.searchContact(this.search).subscribe( data => {

      this.contacts = data;

    })

    this.data.searchGroup(this.search).subscribe( data => {

      this.groups = data;
    
    })
  }

}