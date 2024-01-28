import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class UserService {

   module: string = 'users';
   userId: string = '';

  constructor(private http: HttpClient){
  }

  get(){
      return this.http.get(`api/${this.module}`);
  }

  post(data: any){
    return this.http.post(`api/${this.module}`, data);
  }

  put(data: any){
    return this.http.put(`api/${this.module}`, data);
  }

  delete(Id: string){
    return this.http.delete(`api/${this.module}/`+ Id);
  }
}
