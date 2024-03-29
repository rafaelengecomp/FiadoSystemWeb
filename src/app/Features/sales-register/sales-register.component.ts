import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesRegisterService } from '../../Shared/services/sales-register.service';
import { CustomerService } from '../../Shared/services/customer.service';
import { ProductService } from '../../Shared/services/product.service';
import { UserService } from '../../Shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-sales-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatPaginatorModule],
  templateUrl: './sales-register.component.html',
  styleUrl: './sales-register.component.css'
})
export class SalesRegisterComponent {

  sales: any[] = [];
  sale: any = {};
  showList: boolean = true;

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

  userLogged: any = {};

  isAuthenticated: boolean = false;

  errorMessage: string = '';

  //totalSales = 100; // replace with your actual total sales count
 
 // pageEvent: PageEvent = new PageEvent();

 totalSales = 100; // replace with your actual total sales count
 salesPerPage = 10; // initial page size
 currentPage = 1; // initial page index

  constructor(private salesRegisterService: SalesRegisterService, private customerService: CustomerService, 
              private  productService: ProductService, private userService: UserService) { } 

  ngOnInit() {
    
    this.ClickButtonVendas()

    this.getUserData();
    if (this.isAuthenticated) {
      this.get();
      this.getCustomers();
      this.getProducts(); 
      this.getUsers();   

    }

    this.operationTypes = [
      { id: 0, name: 'Compra de Produto' },
      { id: 1, name: 'Compra de Serviço' },
      { id: 2, name: 'Compra de Produto não cadastrado' },
      { id: 3, name: 'Pagamento' },
    ];
  } 

  pageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.salesPerPage = event.pageSize;
  }


  get() {
    this.salesRegisterService.get().subscribe((data: Object) => {
      this.sales = data as any[];
      this.filterByName();
      this.showList = true;
    }, (error: HttpErrorResponse) => {
      console.error('Error status:', error.status);
      console.error('Error message:', error.error);

      this.errorMessage = 'Erro: ' + error.error;
    });
  };

  delete(sale: any){
    this.salesRegisterService.delete(sale.id).subscribe(data => {
      console.log(data);
        if (data) {
          alert('Registro excluída com sucesso');
          this.get();
          this.sale = {};
        } else {
          alert('Erro ao excluir registro');
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
      this.selectedOperation = this.GetOperationID(sale).toString();

      this.sale = sale;

       console.log(sale);
       console.log(this.selectedClientValue);
       console.log(this.selectedProductValue);
       console.log(this.selectedUserValue);
       console.log(this.selectedOperation);
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
        alert('Registro cadastrado com sucesso');
        this.get();
        this.sale = {};
      } else {
        alert('Erro ao registro produto');
      }
    }, 
    (error: HttpErrorResponse) => {
      console.error('Error status:', error.status);
      console.error('Error message:', error.error);

      this.errorMessage = 'Erro: ' + error.error;
      
    });
  };

  put() {

    this.FillComboValues();

    this.salesRegisterService.put(this.sale).subscribe(data => {
      if (data) {
        alert('Registro atualizado com sucesso');
        this.get();
        this.sale = {};
      } else {
        alert('Erro ao atualizar registro');
      }
    }, (error: HttpErrorResponse) => {
      console.error('Error status:', error.status);
      console.error('Error message:', error.error);

      this.errorMessage = 'Erro: ' + error.error;
    });
  };

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

downloadPdfByClient(userId: string) {
  this.salesRegisterService.generatePdfDashboardByClient(userId).subscribe(blob => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'documento.pdf';
    link.click();
    URL.revokeObjectURL(link.href);
  });
}

getUserData() {
  this.userLogged = JSON.parse(localStorage.getItem('user_logged') as string);
  this.isAuthenticated = this.userLogged != null;
}

GetOperationID(sale: any){

  if (sale.operation == 'PurchaseProduct')
    return 0;

  if (sale.operation == 'PurchaseService')
    return 1;

  if (sale.operation == 'PurchaseProductNotInStock')
    return 2;

    if (sale.operation == 'Payment'){
      return 3;
    }

    return 4;

  }
}