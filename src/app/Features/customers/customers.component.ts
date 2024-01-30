import { Component } from '@angular/core';
import { CustomerService } from '../../Shared/services/customer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

  customers: any[] = [];
  customer: any = {};
  showList: boolean = true;
  userId: any;

  constructor(private customerService: CustomerService) { } 

  ngOnInit() {
    this.get();
  } 

  get() {
    this.customerService.get().subscribe((data: Object) => {
      this.customers = data as any[];
      this.showList = true;
    }, (error) => {
      console.log(error);
      alert('Erro interno do sistema');
    });
  }
 
  save() {
    if (this.customer.id) {
      this.put();
    } else {
      this.post();
    } 
  }  

  post() {
    this.customerService.post(this.customer).subscribe(data => {
      if (data) {
        alert('Usuário cadastrado com sucesso');
        this.get();
        this.customer = {};
      } else {
        alert('Erro ao cadastrar usuário');
      }
    }, error => {
      console.log(error);
      alert('erro interno do sistema');
    });
  }

  put() {
    this.customerService.put(this.customer).subscribe(data => {
      if (data) {
        alert('Usuário atualizado com sucesso');
        this.get();
        this.customer = {};
      } else {
        alert('Erro ao atualizar usuário');
      }
    }, error => {
      console.log(error);
      alert('erro interno do sistema');
    })
  }

delete(customer: any){

  this.customerService.delete(customer.id).subscribe(data => {
    console.log(data);
      if (data) {
        alert('Usuário excluído com sucesso');
        this.get();
        this.customer = {};
      } else {
        alert('Erro ao excluir usuário');
      }
    }, error => {
      console.log(error);
      alert('erro interno do sistema');
    })
  }

  openDetails(customer: any) {
    this.showList = false;
    this.customer = customer;
  }


}
