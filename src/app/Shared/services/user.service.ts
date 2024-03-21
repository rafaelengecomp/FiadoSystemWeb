import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class UserService {

   module: string = 'users';
   userId: string = '';

  constructor(private http: HttpClient){
  }

  get(){

      var header = this.getHeaders();
      return this.http.get(`api/${this.module}`, { headers: header });
  }

  post(data: any){
    return this.http.post(`api/${this.module}`, data);
  }

  put(data: any){
    return this.http.put(`api/${this.module}`, data);
  }

  delete(Id: string){

    var header = this.getHeaders();
    return this.http.delete(`api/${this.module}/`+ Id, { headers: header });
  }

  authenticate(data: any) {
    return this.http.post(`api/${this.module}/authenticate`, data);
  }

 getHeaders() {

    var user = localStorage.getItem('user_logged');
    var headers = new HttpHeaders();

    if (user) {
      const parsedUser = JSON.parse(user);
      headers = new HttpHeaders({
        'Authorization': `Bearer ${parsedUser?.token}`
      });
    }

    return headers;
  }
}
