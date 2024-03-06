import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesRegisterService } from '../../Shared/services/sales-register.service';
import { CustomerService } from '../../Shared/services/customer.service';
import { ProductService } from '../../Shared/services/product.service';
import { UserService } from '../../Shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sales-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sales-register.component.html',
  styleUrl: './sales-register.component.css'
})
export class SalesRegisterComponent {

  sales: any[] = [];
  sale: any = {};
  showList: boolean = true;
  //userId: any;
  filterValue: string = '';

  operationTypes: any[] = [];
  selectedOperation: string = '';

  customers: any[] = [];
  selectedClientValue: string = '';

  products: any[] = [];
  selectedProductValue: string = '';

  users: any[] = [];
  selectedUserValue: string = '';

  filteredSales: any[] = [];

  errorMessage: string = '';

  constructor(private salesRegisterService: SalesRegisterService, private customerService: CustomerService, 
              private  productService: ProductService, private userService: UserService) { } 

  ngOnInit() {
    
    this.ClickButtonVendas()

    this.get();
    this.getCustomers();
    this.getProducts(); 
    this.getUsers();   

    this.operationTypes = [
      { id: 0, name: 'Compra de Produto' },
      { id: 1, name: 'Compra de Serviço' },
      { id: 2, name: 'Compra de Produto não cadastrado' },
      { id: 3, name: 'Pagamento' },
    ];
  } 

  get() {
    this.salesRegisterService.get().subscribe((data: Object) => {
      this.sales = data as any[];
      this.filterByName();
      this.showList = true;
    }, (error) => {
      console.log(error);
      alert('Erro interno do sistema');
    });
  }

  delete(sale: any){
    this.salesRegisterService.delete(sale.id).subscribe(data => {
      console.log(data);
        if (data) {
          alert('Venda excluída com sucesso');
          this.get();
          this.sale = {};
        } else {
          alert('Erro ao excluir venda');
        }
      }, error => {
        console.log(error);
        alert('erro interno do sistema');
      })
    }

    openDetails(sale: any) {
      
      this.showList = false;

      this.selectedClientValue = sale.idCustomer + ' - ' + sale.customer;
      this.selectedProductValue = sale.idProduct + ' - ' + sale.product;
      this.selectedUserValue = sale.idUser + ' - ' + sale.user;

      this.sale = sale;

       console.log(sale);
       console.log(this.selectedClientValue);
       console.log(this.selectedProductValue);
       console.log(this.selectedUserValue);
    }

    save() {
      if (this.sale.id) {
        this.put();
      } else {
        this.post();
      } 
      this.errorMessage = '';
    }  
    
  post() {
    this.FillComboValues();

    console.log(this.sale);

    this.salesRegisterService.post(this.sale).subscribe(data => {
      
      if (data) {
        alert('Produto cadastrado com sucesso');
        this.get();
        this.sale = {};
      } else {
        alert('Erro ao cadastrar produto');
      }
    }, 
    (error: HttpErrorResponse) => {
      console.error('Error status:', error.status);
      console.error('Error message:', error.error);

      this.errorMessage = 'Erro interno do sistema: ' + error.error;
      //alert('Erro interno do sistema: ' + error.error);
    });
  };

  put() {

    // let selectedClientValue =  this.selectedClientValue.split(' - ');
    // this.sale.IdCustomer = selectedClientValue[0];
    // this.sale.Customer = selectedClientValue[1];

    // let selectedProductValue = this.selectedProductValue.split(' - ');
    // this.sale.IdProduct = selectedProductValue[0];
    // this.sale.Product = selectedProductValue[1];

    // let selectedUserValue = this.selectedUserValue.split(' - ');
    // this.sale.IdUser =  selectedUserValue[0];
    // this.sale.User =  selectedUserValue[1];

    // let selectedOperationValue = this.selectedOperation.split(' - ');
    // // this.sale.IdOperation =  selectedOperationValue[0];
    // this.sale.Operation =  selectedOperationValue[0];

    this.FillComboValues();

    this.salesRegisterService.put(this.sale).subscribe(data => {
      if (data) {
        alert('Produto atualizado com sucesso');
        this.get();
        this.sale = {};
      } else {
        alert('Erro ao atualizar produto');
      }
    }, error => {
      console.log(error);
      alert('erro interno do sistema');
    })
  }

  getCustomers() {
    this.customerService.get().subscribe((data: Object) => {
      this.customers = data as any[];
      this.showList = true;
    }, (error) => {
      console.log(error);
      alert('Erro interno do sistema');
    });
  }

  getProducts() {
    this.productService.get().subscribe((data: Object) => {
      this.products = data as any[];
      this.showList = true;
    }, (error) => {
      console.log(error);
      alert('Erro interno do sistema');
    });
  }

  getUsers() {
    this.userService.get().subscribe((data: Object) => {
      this.users = data as any[];
      this.showList = true;
    }, (error) => {
      console.log(error);
      alert('Erro interno do sistema');
    });
  }

  getOperationText(operation: string): string {
    switch(operation) {
      case "PurchaseProduct": return 'Compra de produto';
      case "PurchaseService": return 'Compra de serviço';
      case "PurchaseProductNotInStock": return 'Compra de produto não cadastrado';
      case "Payment": return 'Pagamento';
      default: return 'Operação desconhecida';
    }
  }

  FillComboValues() {

    if (this.selectedClientValue){
      let selectedClientValue =  this.selectedClientValue.split(' - ');
      this.sale.IdCustomer = selectedClientValue[0];
      this.sale.Customer = selectedClientValue[1];
 
     }
 
     if (this.selectedProductValue){
      let selectedProductValue = this.selectedProductValue.split(' - ');
      this.sale.IdProduct = selectedProductValue[0];
      this.sale.Product = selectedProductValue[1];
     }
 
     if (this.selectedUserValue){
      let selectedUserValue = this.selectedUserValue.split(' - ');
      this.sale.IdUser =  selectedUserValue[0];
      this.sale.User =  selectedUserValue[1];
     }

if  (this.selectedOperation){
     this.sale.Operation =  this.selectedOperation;
  }

}

ClickButtonVendas() {
  
  this.showList = !this.showList
  
  this.sale.id = '';
  this.selectedClientValue = '';
  this.selectedOperation = '';
  this.sale.description = '';
  this.selectedProductValue = '';
  this.sale.operationValue = '';
  this.selectedUserValue = '';
  this.errorMessage = '';
}

filterByName() {
  if (this.filterValue) {
    this.filteredSales = this.sales.filter(sale => sale.customer.includes(this.filterValue));
  } else {
    this.filteredSales = this.sales;
  }
}

}