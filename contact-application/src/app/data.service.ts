import { Injectable } from '@angular/core';
import  { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('http://localhost:8080/contact/',
      {
        headers:{
          'content':"application/json",
          'content-type':"application/x-www-form-urlencoded"
        }
      }
    )
  }

}