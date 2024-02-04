import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../Shared/services/product.service';

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

  constructor(private productService: ProductService) { } 

  ngOnInit() {
    this.get();
  } 

  get() {
    this.productService.get().subscribe((data: Object) => {
      this.products = data as any[];
      this.showList = true;
    }, (error) => {
      console.log(error);
      alert('Erro interno do sistema');
    });
  }

  post() {
    this.productService.post(this.product).subscribe(data => {
      if (data) {
        alert('Produto cadastrado com sucesso');
        this.get();
        this.product = {};
      } else {
        alert('Erro ao cadastrar produto');
      }
    }, error => {
      console.log(error);
      alert('erro interno do sistema');
    });
  }

  put() {
    this.productService.put(this.product).subscribe(data => {
      if (data) {
        alert('Produto atualizado com sucesso');
        this.get();
        this.product = {};
      } else {
        alert('Erro ao atualizar produto');
      }
    }, error => {
      console.log(error);
      alert('erro interno do sistema');
    })
  }


  delete(product: any){

    this.productService.delete(product.id).subscribe(data => {
      console.log(data);
        if (data) {
          alert('Produto excluído com sucesso');
          this.get();
          this.product = {};
        } else {
          alert('Erro ao excluir produto');
        }
      }, error => {
        console.log(error);
        alert('erro interno do sistema');
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
    }  

}
