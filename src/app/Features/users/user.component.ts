import { Component } from '@angular/core';
import { UserService } from '../../Shared/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  users: any[] = [];
  user: any = {};
  showList: boolean = true;
  userId: any;
  errorMessage: string = '';

  constructor(private userService: UserService) { } 

  ngOnInit() {
    this.get();
  } 

  get() {
    this.userService.get().subscribe((data: Object) => {
      this.users = data as any[];
      this.showList = true;
    }, (error: HttpErrorResponse) => {
      console.error('Error status:', error.status);
      console.error('Error message:', error.error);

      this.errorMessage = 'Erro: ' + error.error;
    });
  };

  save() {
    if (this.user.id) {
      this.put();
    } else {
      this.post();
    }    
    this.errorMessage = '';
  }

  post() {
    this.userService.post(this.user).subscribe(data => {
      if (data) {
        alert('Usuário cadastrado com sucesso');
        this.get();
        this.user = {};
      } else {
        alert('Erro ao cadastrar usuário');
      }
    },(error: HttpErrorResponse) => {
      console.error('Error status:', error.status);
      console.error('Error message:', error.error);

      this.errorMessage = 'Erro: ' + error.error;
    });
  };

  put() {
    this.userService.put(this.user).subscribe(data => {
      if (data) {
        
        alert('Usuário atualizado com sucesso');
        this.get();
        this.user = {};
      } else {
        alert('Erro ao atualizar usuário');
      }
    }, (error: HttpErrorResponse) => {
      console.error('Error status:', error.status);
      console.error('Error message:', error.error);

      this.errorMessage = 'Erro: ' + error.error;
    });
  };

delete(user: any){

  this.userService.delete(user.id).subscribe(data => {
    console.log(data);
      if (data) {
        alert('Usuário excluído com sucesso');
        this.get();
        this.user = {};
      } else {
        alert('Erro ao excluir usuário');
      }
    }, error => {
      console.log(error);
      alert('erro interno do sistema');
    })
  }

  openDetails(user: any) {
    this.showList = false;
    this.user = user;
  }

  CleanFields() {

    this.showList = !this.showList;
    this.errorMessage = '';
  }
  

}