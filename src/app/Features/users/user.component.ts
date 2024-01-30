import { Component } from '@angular/core';
import { UserService } from '../../Shared/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private userService: UserService) { } 

  ngOnInit() {
    this.get();
  } 

  get() {
    this.userService.get().subscribe((data: Object) => {
      this.users = data as any[];
      this.showList = true;
    }, (error) => {
      console.log(error);
      alert('Erro interno do sistema');
    });
  }

  save() {
    if (this.user.id) {
      this.put();
    } else {
      this.post();
    }    
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
    }, error => {
      console.log(error);
      alert('erro interno do sistema');
    });
  }

  put() {
    this.userService.put(this.user).subscribe(data => {
      if (data) {
        
        alert('Usuário atualizado com sucesso');
        this.get();
        this.user = {};
      } else {
        alert('Erro ao atualizar usuário');
      }
    }, error => {
      console.log(error);
      alert('erro interno do sistema');
    })
  }

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

}