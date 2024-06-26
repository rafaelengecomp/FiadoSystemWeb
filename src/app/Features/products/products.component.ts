import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../Shared/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products: any[] = [];
  product: any = {};
  showList: boolean = true;
  userLogged: any = {};
  isAuthenticated: boolean = false;
  errorMessage: string = '';


  constructor(private productService: ProductService, private toastr: ToastrService) { } 

  ngOnInit() {
    this.getUserData();
    this.get();

  } 

  get() {
    this.productService.get().subscribe((data: Object) => {
      this.products = data as any[];
      this.showList = true;
    }, (error: HttpErrorResponse) => {
      console.error('Error status:', error.status);
      console.error('Error message:', error.error);

      this.errorMessage = 'Erro: ' + error.error;
    });
  };

  post() {
    this.productService.post(this.product).subscribe(data => {
      if (data) {
        //alert('Produto cadastrado com sucesso');
        this.toastr.success('Produto cadastrado', 'Sucesso!');
        this.get();
        this.product = {};
      } else {
        //alert('Erro ao cadastrar produto');
        this.toastr.error('Erro ao cadastrar Produto', 'Erro!');
      }
    }, (error: HttpErrorResponse) => {
      console.error('Error status:', error.status);
      console.error('Error message:', error.error);

      this.errorMessage = 'Erro: ' + error.error;
    });
  };

  put() {
    this.productService.put(this.product).subscribe(data => {
      if (data) {
       // alert('Produto atualizado com sucesso');
        this.toastr.success('Produto atualizado', 'Sucesso!');
        this.get();
        this.product = {};
      } else {
       // alert('Erro ao atualizar produto');
        this.toastr.error('Erro ao atualizar Produto', 'Erro!');
      }
    }, (error: HttpErrorResponse) => {
      console.error('Error status:', error.status);
      console.error('Error message:', error.error);

      this.errorMessage = 'Erro: ' + error.error;
    });
  };


  delete(product: any){

    this.productService.delete(product.id).subscribe(data => {
      console.log(data);
        if (data) {
          //alert('Produto excluído com sucesso');
          this.toastr.success('Produto excluído', 'Sucesso!');
          this.get();
          this.product = {};
        } else {
         // alert('Erro ao excluir produto');
          this.toastr.error('Erro ao excluir Produto', 'Erro!');
        }
      }, error => {
        console.log(error);
       // alert('erro interno do sistema');
        this.toastr.error('erro interno do sistema', 'Erro!');
      })
    }

    openDetails(product: any) {
      this.showList = false;
      this.product = product;
    }

    save() {
      if (this.product.id) {
        this.put();
      } else {
        this.post();
      } 
      this.errorMessage = '';
    }  

    CleanFields() {

      this.showList = !this.showList;
      this.errorMessage = '';
    }

    getUserData() {
      this.userLogged = JSON.parse(localStorage.getItem('user_logged') as string);
      this.isAuthenticated = this.userLogged != null;
    }

}
