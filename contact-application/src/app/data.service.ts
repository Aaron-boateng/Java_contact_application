import { Injectable } from '@angular/core';
import  { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
      private http: HttpClient,
      private router: Router,
    ) { }
    
  // Get list of contact
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

  // Create contact
  setContact(name, firstname, email, number) {
    return this.http.get('http://localhost:8080/contact/add/contact/?name=' + name + "&firstname=" + firstname + "&email=" + email + "&number=" + number,
      {
        headers:{
          'content':"application/json",
          'content-type':"application/x-www-form-urlencoded"
        }
      }
    )
  }

  // Create contact
  updateContact(id, name, firstname, email, number) {
    return this.http.get('http://localhost:8080/contact/update/contact/' + id + "/?name=" + name + "&firstname=" + firstname + "&email=" + email + "&number=" + number,
      {
        headers:{
          'content':"application/json",
          'content-type':"application/x-www-form-urlencoded"
        }
      }
    )
  }
  
    // Create contact
    updateGroup(id, name) {
      return this.http.get('http://localhost:8080/contact/update/group/' + id + "/?name=" + name,
        {
          headers:{
            'content':"application/json",
            'content-type':"application/x-www-form-urlencoded"
          }
        }
      )
    }


  // Get contact card
  getSingleContact(id) {
    return this.http.get('http://localhost:8080/contact/read/contact/' + id,
      {
        headers:{
          'content':"application/json",
          'content-type':"application/x-www-form-urlencoded"
        }
      }
    )
  }

  // Delete contact
  unsetSingleContact(id) {
    return this.http.get('http://localhost:8080/contact/delete/contact/' + id,
      {
        headers:{
          'content':"application/json",
          'content-type':"application/x-www-form-urlencoded"
        }
      }
    )
  }

  getSingleGroup(id) {
    return this.http.get('http://localhost:8080/contact/read/group/' + id,
      {
        headers:{
          'content':"application/json",
          'content-type':"application/x-www-form-urlencoded"
        }
      }
    )
  }


  getGroup() {
    return this.http.get('http://localhost:8080/contact/group/',
      {
        headers:{
          'content':"application/json",
          'content-type':"application/x-www-form-urlencoded"
        }
      }
    )
  }


  // Create group
  setGroup(name) {
    return this.http.get('http://localhost:8080/contact/add/group/?name=' + name ,
      {
        headers:{
          'content':"application/json",
          'content-type':"application/x-www-form-urlencoded"
        }
      }
    )
  }


  logUser(email, password) {
    return this.http.get('http://localhost:8080/contact/login/?email='+ email + '&password='+ password,
      {
        headers:{
          'content':"application/json",
          'content-type':"application/x-www-form-urlencoded"
        }
      }
    )
  }

  setUser(email, password) {
    return this.http.get('http://localhost:8080/contact/register/?email='+ email + '&password='+ password,
      {
        headers:{
          'content':"application/json",
          'content-type':"application/x-www-form-urlencoded"
        }
      }
    )
  }

  isLogged(){

    const isLogged =  localStorage.getItem('connected');

    if(isLogged != "true"){
      this.router.navigate(['']);
    }

  }
  
  isUser(){

    const isLogged =  localStorage.getItem('connected');

    if(isLogged != "true"){
      return false;
    }
    else{
      return true;
    }

  }
  
  contactRedirection(){

      this.router.navigate(['/contact']);
      
  }

  loginRedirection(){

    this.router.navigate(['']);
    
  }
  

  groupRedirection(){

    this.router.navigate(['/group']);
    
  }

  loggedRedirection(){

    const isLogged =  localStorage.getItem('connected');

    if(isLogged == "true"){
      this.router.navigate(['/contact']);
    }

  }


    // Delete contact
  unsetSingleGroup(id) {
    return this.http.get('http://localhost:8080/contact/delete/group/' + id,
      {
        headers:{
          'content':"application/json",
          'content-type':"application/x-www-form-urlencoded"
        }
      }
    )
  }

  searchContact(input) {
    return this.http.get('http://localhost:8080/contact/search/contact/' + input,
      {
        headers:{
          'content':"application/json",
          'content-type':"application/x-www-form-urlencoded"
        }
      }
    )
  }

  searchGroup(input) {
    return this.http.get('http://localhost:8080/contact/search/group/' + input,
      {
        headers:{
          'content':"application/json",
          'content-type':"application/x-www-form-urlencoded"
        }
      }
    )
  }
  
}