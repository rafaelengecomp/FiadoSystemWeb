import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesRegisterService } from '../../Shared/services/sales-register.service';
import { CustomerService } from '../../Shared/services/customer.service';
import { ProductService } from '../../Shared/services/product.service';
import { UserService } from '../../Shared/services/user.service';

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

  operationTypes: any[] = [];
  selectedOperationValue: string = '';

  customers: any[] = [];
  selectedClientValue: string = '';

  products: any[] = [];
  selectedProductValue: string = '';

  users: any[] = [];
  selectedUserValue: string = '';

  constructor(private salesRegisterService: SalesRegisterService, private customerService: CustomerService, 
              private  productService: ProductService, private userService: UserService) { } 

  ngOnInit() {
    
    this.get();
    this.getCustomers();
    this.getProducts(); 
    this.getUsers();   

    this.operationTypes = [
      { id: 1, name: 'Compra de Produto' },
      { id: 2, name: 'Compra de Serviço' },
      { id: 3, name: 'Compra de Produto não cadastrado' },
      { id: 4, name: 'Pagamento' },
    ];
  } 

  get() {
    this.salesRegisterService.get().subscribe((data: Object) => {
      this.sales = data as any[];
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
    }  
    
  post() {
   
    let selectedClientValue =  this.selectedClientValue.split(' - ');
    this.sale.IdCustomer = selectedClientValue[0];
    this.sale.Customer = selectedClientValue[1];

    let selectedProductValue = this.selectedProductValue.split(' - ');
    this.sale.IdProduct = selectedProductValue[0];
    this.sale.Product = selectedProductValue[1];

    let selectedUserValue = this.selectedUserValue.split(' - ');
    this.sale.IdUser =  selectedUserValue[0];
    this.sale.User =  selectedUserValue[1];

    // let selectedOperationValue = this.selectedOperationValue.split(' - ');
    // this.sale.IdOperation =  selectedOperationValue[0];
    this.sale.Operation =  this.selectedOperationValue;



    console.log(this.sale);

    this.salesRegisterService.post(this.sale).subscribe(data => {
      
      if (data) {
        alert('Produto cadastrado com sucesso');
        this.get();
        this.sale = {};
      } else {
        alert('Erro ao cadastrar produto');
      }
    }, error => {
      console.log(error);
      alert('erro interno do sistema');
    });
  }

  put() {


    let selectedClientValue =  this.selectedClientValue.split(' - ');
    this.sale.IdCustomer = selectedClientValue[0];
    this.sale.Customer = selectedClientValue[1];

    let selectedProductValue = this.selectedProductValue.split(' - ');
    this.sale.IdProduct = selectedProductValue[0];
    this.sale.Product = selectedProductValue[1];

    let selectedUserValue = this.selectedUserValue.split(' - ');
    this.sale.IdUser =  selectedUserValue[0];
    this.sale.User =  selectedUserValue[1];

    let selectedOperationValue = this.selectedOperationValue.split(' - ');
    this.sale.IdOperation =  selectedOperationValue[0];
    this.sale.Operation =  selectedOperationValue[1];


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

  getOperationText(operation: number): string {
    switch(operation) {
      case 1: return 'Compra de produto';
      case 2: return 'Compra de serviço';
      case 3: return 'Compra de produto não cadastrado';
      case 4: return 'Pagamento';
      default: return 'Operação desconhecida';
    }
  }


}
