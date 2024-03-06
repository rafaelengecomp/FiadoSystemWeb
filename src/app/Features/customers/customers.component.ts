import { Component } from '@angular/core';
import { CustomerService } from '../../Shared/services/customer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

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
  errorMessage: string = '';


  states = [
    'AC - Acre', 'AL - Alagoas', 'AP - Amapá', 'AM - Amazonas',
    'BA - Bahia', 'CE - Ceará', 'DF - Distrito Federal', 'ES - Espírito Santo',
    'GO - Goiás', 'MA - Maranhão', 'MT - Mato Grosso', 'MS - Mato Grosso do Sul',
    'MG - Minas Gerais', 'PA - Pará', 'PB - Paraíba', 'PR - Paraná',
    'PE - Pernambuco', 'PI - Piauí', 'RJ - Rio de Janeiro', 'RN - Rio Grande do Norte',
    'RS - Rio Grande do Sul', 'RO - Rondônia', 'RR - Roraima', 'SC - Santa Catarina',
    'SP - São Paulo', 'SE - Sergipe', 'TO - Tocantins'
]

  constructor(private customerService: CustomerService) { } 

  ngOnInit() {
    this.CleanFields();
    this.get();
  } 

  get() {
    this.customerService.get().subscribe((data: Object) => {
      this.customers = data as any[];
      this.showList = true;
    }, (error: HttpErrorResponse) => {
      console.error('Error status:', error.status);
      console.error('Error message:', error.error);

      this.errorMessage = 'Erro: ' + error.error;
    });
  };
 
  save() {
    if (this.customer.id) {
      this.put();
    } else {
      this.post();
    } 
    this.errorMessage = '';
  }  

  post() {
    this.treatStateField();

    this.customerService.post(this.customer).subscribe(data => {
      if (data) {
        alert('Usuário cadastrado com sucesso');
        this.get();
        this.customer = {};
      } else {
        alert('Erro ao cadastrar usuário');
      }
    }, (error: HttpErrorResponse) => {
      console.error('Error status:', error.status);
      console.error('Error message:', error.error);

      this.errorMessage = 'Erro: ' + error.error;
    });
  };

  put() {

    this.treatStateField();

    this.customerService.put(this.customer).subscribe(data => {
      if (data) {
        alert('Usuário atualizado com sucesso');
        this.get();
        this.customer = {};
      } else {
        alert('Erro ao atualizar usuário');
      }
    }, (error: HttpErrorResponse) => {
      console.error('Error status:', error.status);
      console.error('Error message:', error.error);

      this.errorMessage = 'Erro: ' + error.error;
    });
  };

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

treatStateField() {
  if (this.customer.state){
    this.customer.state = this.customer.state.substring(0, 2);
  }
}

CleanFields() {

  this.showList = !this.showList;
  this.errorMessage = '';
}

}
