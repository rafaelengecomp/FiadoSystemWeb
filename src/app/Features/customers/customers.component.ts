import { Component } from '@angular/core';
import { CustomerService } from '../../Shared/services/customer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

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
  userLogged: any = {};
  isAuthenticated: boolean = false;


  states = [
    'AC - Acre', 'AL - Alagoas', 'AP - Amapá', 'AM - Amazonas',
    'BA - Bahia', 'CE - Ceará', 'DF - Distrito Federal', 'ES - Espírito Santo',
    'GO - Goiás', 'MA - Maranhão', 'MT - Mato Grosso', 'MS - Mato Grosso do Sul',
    'MG - Minas Gerais', 'PA - Pará', 'PB - Paraíba', 'PR - Paraná',
    'PE - Pernambuco', 'PI - Piauí', 'RJ - Rio de Janeiro', 'RN - Rio Grande do Norte',
    'RS - Rio Grande do Sul', 'RO - Rondônia', 'RR - Roraima', 'SC - Santa Catarina',
    'SP - São Paulo', 'SE - Sergipe', 'TO - Tocantins'
]

  constructor(private customerService: CustomerService, private toastr: ToastrService) { } 

  ngOnInit() {
    this.CleanFields();
    this.getUserData();
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
        //alert('Cliente cadastrado com sucesso');
        this.toastr.success('Cliente cadastrado', 'Sucesso!');
        this.get();
        this.customer = {};
      } else {
        //alert('Erro ao cadastrar Cliente');
        this.toastr.error('Erro ao cadastrar Cliente', 'Erro!');
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
       // alert('Cliente atualizado com sucesso');
        this.toastr.success('Cliente atualizado', 'Sucesso!');
        this.get();
        this.customer = {};
      } else {
        //alert('Erro ao atualizar Cliente');
        this.toastr.error('Erro ao atualizar Cliente', 'Erro!');
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
        //alert('Cliente excluído com sucesso');
        this.toastr.success('Cliente excluído com sucesso', 'Sucesso!');
        this.get();
        this.customer = {};
      } else {
        //alert('Erro ao excluir Cliente');
        this.toastr.error('Erro ao excluir Cliente', 'Erro!');
      }
    }, error => {
      console.log(error);
      //alert('erro interno do sistema');
      this.toastr.error('erro interno do sistema', 'Erro!');
    })
  }

openDetails(customer: any) {
    this.showList = false;
    this.customer = customer;

    this.customer.state = this.customer.state.substring(0, 2) +' - '+ this.getStateName(this.customer.state.substring(0, 2));
    this.customer.birthDate = this.customer.birthDate

    console.log(this.customer);
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

getUserData() {
  this.userLogged = JSON.parse(localStorage.getItem('user_logged') as string);
  this.isAuthenticated = this.userLogged != null;
}

getStateName(abbreviation: string): string {
 
  const states: {[key: string]: string} = {
    'AC': 'Acre', 'AL': 'Alagoas', 'AP': 'Amapá', 'AM': 'Amazonas',
    'BA': 'Bahia', 'CE': 'Ceará', 'DF': 'Distrito Federal', 'ES': 'Espírito Santo',
    'GO': 'Goiás', 'MA': 'Maranhão', 'MT': 'Mato Grosso', 'MS': 'Mato Grosso do Sul',
    'MG': 'Minas Gerais', 'PA': 'Pará', 'PB': 'Paraíba', 'PR': 'Paraná',
    'PE': 'Pernambuco', 'PI': 'Piauí', 'RJ': 'Rio de Janeiro', 'RN': 'Rio Grande do Norte',
    'RS': 'Rio Grande do Sul', 'RO': 'Rondônia', 'RR': 'Roraima', 'SC': 'Santa Catarina',
    'SP': 'São Paulo', 'SE': 'Sergipe', 'TO': 'Tocantins'
  };

  return states[abbreviation] || 'State not found';
}


}
