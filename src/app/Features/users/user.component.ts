import { Component } from '@angular/core';
import { UserService } from '../../Shared/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  userLogin: any = {};
  userLogged: any = {};
  showList: boolean = true;
  userId: any;
  errorMessage: string = '';
  isAuthenticated: boolean = false;
  showPassword = false;

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { } 

  ngOnInit() {
     this.getUserData();

     if (this.isAuthenticated) {
         this.get();
       }
  } 

  get() {
    this.userService.get().subscribe((data: Object) => {
      this.users = data as any[];
      this.showList = true;
    }, (error: HttpErrorResponse) => {
      
    if(error.status == 401){
      
      this.errorMessage = '';
      this.logoff();
    }
    else {
        
        console.error('Error status:', error.status);
        console.error('Error message:', error.error);
        this.errorMessage = 'Erro: ' + error.error;
    }
   
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
        this.toastr.success('Usuário cadastrado', 'Sucesso!');
        this.get();
        this.user = {};
      } else {
        this.toastr.error('Erro ao cadastrar Usuário', 'Erro!');
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
        this.toastr.success('Usuário atualizado', 'Sucesso!');
        this.get();
        this.user = {};
      } else {
        this.toastr.error('Erro ao atualizar Usuário', 'Erro!');
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
        this.toastr.success('Usuário excluído', 'Sucesso!');
        this.get();
        this.user = {};
      } else {
        this.toastr.error('Erro ao excluir Usuário', 'Erro!');
      }
    }, error => {
      console.log(error);
      this.toastr.error('Erro ao excluir Usuário', 'Erro!');
    })
  }

  authenticate() {
    this.userService.authenticate(this.userLogin).subscribe((data:any) => {
      if (data.user) {
        localStorage.setItem('user_logged', JSON.stringify(data));
        this.getUserData();

        this.router.navigate(['/sales']);
      } else {
        this.toastr.error('Usuário inválido', 'Erro!');
      }      
    }, error => {
      console.log(error);
        this.toastr.error('Usuário inválido', 'Erro!');
    })
  }

  getUserData() {
    this.userLogged = JSON.parse(localStorage.getItem('user_logged') as string);
    this.isAuthenticated = this.userLogged != null;
  }


  openDetails(user: any) {
    this.showList = false;
    this.user = user;
  }

  CleanFields() {

    this.showList = !this.showList;
    this.errorMessage = '';
  }
  
  logoff() {
    localStorage.removeItem('user_logged');
    this.router.navigate(['/']); 
  }

}