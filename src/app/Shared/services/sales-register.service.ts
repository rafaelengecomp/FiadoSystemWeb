import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesRegisterService {

  constructor(private http: HttpClient) { }

  module: string = 'salesRegister';
  //userId: string = '';

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

 generatePdfDashboardByClient(idCustomer: string): Observable<Blob> {
  return this.http.get(`api/${this.module}/PdfDashboardByClient/` + idCustomer, {
    responseType: 'blob'
  });
}


}
