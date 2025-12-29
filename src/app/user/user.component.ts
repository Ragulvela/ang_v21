import { Component, OnInit } from '@angular/core';
import { UsersService } from './user.service';
import { User } from './user.model';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-users',
  imports :[CommonModule, HttpClientModule ],
  standalone:true,
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  constructor(public usersService: UsersService) {}

  ngOnInit() {
    this.usersService.loadUsers();
  }

  add() {
    const user: User = {
      id: Date.now(),
      name: 'New User',
      email: 'new@mail.com'
    };
    this.usersService.addUser(user);
  }

  delete(id: number) {
    this.usersService.deleteUser(id);
  }
}
