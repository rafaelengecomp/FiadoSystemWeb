import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesRegisterService } from '../../Shared/services/sales-register.service';
import { CustomerService } from '../../Shared/services/customer.service';
import { ProductService } from '../../Shared/services/product.service';
import { UserService } from '../../Shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinner, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sales-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatPaginatorModule, NgxSpinnerModule],
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

  constructor(private salesRegisterService: SalesRegisterService, private customerService: CustomerService, 
              private  productService: ProductService, private userService: UserService, private toastr: ToastrService, 
              private spinner: NgxSpinnerService) { } 

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

  get() {
    this.spinner.show();
    this.salesRegisterService.get().subscribe((data: Object) => {
      this.sales = data as any[];
      this.filterByName();
      this.showList = true;
      this.spinner.hide();
    }, (error: HttpErrorResponse) => {
      console.error('Error status:', error.status);
      console.error('Error message:', error.error);

      this.errorMessage = 'Erro: ' + error.error;
      this.spinner.hide();
    });
  };

  delete(sale: any){
    this.spinner.show();
    this.salesRegisterService.delete(sale.id).subscribe(data => {
      console.log(data);
        if (data) {
          this.toastr.success('Registro excluído com sucesso', 'Sucesso!');
          this.get();
          this.sale = {};
          this.spinner.hide();
        } else {
          this.toastr.error('Erro ao excluir registro', 'Erro!');
          this.spinner.hide();
        }
      }, error => {
        console.log(error);
        this.toastr.error('Erro ao excluir registro', 'Erro!');
        this.spinner.hide();
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
    this.spinner.show();
    this.FillComboValues();

    if (this.sale.operationValue == null || this.sale.operationValue == undefined || this.sale.operationValue == "") {
        this.sale.operationValue = 0
    }

    console.log(this.sale);

    this.salesRegisterService.post(this.sale).subscribe(data => {
      
      if (data) {
        this.toastr.success('Registro cadastrado com sucesso', 'Sucesso!');
        this.get();
        this.sale = {};
        this.spinner.hide();
      } else {
        this.toastr.error('Erro ao registrar', 'Erro!');
        this.spinner.hide();
      }
    }, 
    (error: HttpErrorResponse) => {
      console.error('Error status:', error.status);
      console.error('Error message:', error.error);

      this.errorMessage = 'Erro: ' + error.error;
      this.spinner.hide();
    });
  };

  put() {
    this.spinner.show();
    this.FillComboValues();

    this.salesRegisterService.put(this.sale).subscribe(data => {
      if (data) {
        
        this.toastr.success('Registro atualizado com sucesso', 'Sucesso!');
        this.get();
        this.sale = {};
        this.spinner.hide();
      } else {
        
        this.toastr.error('Erro ao atualizar registro', 'Erro!');
        this.spinner.hide();
      }
    }, (error: HttpErrorResponse) => {
      console.error('Error status:', error.status);
      console.error('Error message:', error.error);

      this.errorMessage = 'Erro: ' + error.error;
      this.spinner.hide();
    });
  };

  getCustomers() {
    this.customerService.get().subscribe((data: Object) => {
      this.customers = data as any[];
      this.showList = true;
    }, (error) => {
      console.log(error);
      this.toastr.error('Erro interno do sistema', 'Erro!');
    });
  }

  getProducts() {
    this.productService.get().subscribe((data: Object) => {
      this.products = data as any[];
      this.showList = true;
    }, (error) => {
      console.log(error);
      this.toastr.error('Erro interno do sistema', 'Erro!');
    });
  }

  getUsers() {
    this.userService.get().subscribe((data: Object) => {
      this.users = data as any[];
      this.showList = true;
    }, (error) => {
      console.log(error);
      this.toastr.error('Erro interno do sistema', 'Erro!');
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

    if (this.selectedClientValue) {
      let selectedClientValue =  this.selectedClientValue.split(' - ');
      this.sale.IdCustomer = selectedClientValue[0];
      this.sale.Customer = selectedClientValue[1];
 
     }
 
     if (this.selectedProductValue) {
      let selectedProductValue = this.selectedProductValue.split(' - ');
      this.sale.IdProduct = selectedProductValue[0];
      this.sale.Product = selectedProductValue[1];
     }
 
     if (this.selectedUserValue) {
      let selectedUserValue = this.selectedUserValue.split(' - ');
      this.sale.IdUser =  selectedUserValue[0];
      this.sale.User =  selectedUserValue[1];
     }

if  (this.selectedOperation) {
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