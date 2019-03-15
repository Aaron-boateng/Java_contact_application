import { Component, OnInit } from '@angular/core';
import  { DataService } from '../data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private data: DataService,
  ) { }
  
  user = false;

  ngOnInit() {
    this.user = this.data.isUser();
  }

  logout(){
      const obj = this;
      localStorage.removeItem('connected')

      setTimeout(function(){
        obj.data.groupRedirection();
        window.location.reload();
      }, 1000);
  }

}
