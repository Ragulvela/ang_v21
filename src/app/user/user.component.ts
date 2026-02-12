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
      firstName: 'New User',
      email: 'new@mail.com',
      lastName: '',
      maidenName: '',
      age: 0,
      gender: '',
      phone: undefined,
      username: '',
      password: '',
      birthDate: undefined,
      image: undefined,
      bloodGroup: '',
      height: undefined,
      weight: undefined,
      eyeColor: '',
      hair: {
        color: '',
        type: ''
      },
      ip: undefined,
      address: {
        address: undefined,
        city: '',
        state: '',
        stateCode: '',
        postalCode: undefined,
        coordinates: {
          lat: 0,
          lng: 0
        },
        country: ''
      },
      macAddress: '',
      university: '',
      bank: {
        cardExpire: '',
        cardNumber: '',
        cardType: '',
        currency: '',
        iban: ''
      },
      company: {
        department: '',
        name: '',
        title: '',
        address: {
          address: '',
          city: '',
          state: '',
          stateCode: '',
          postalCode: '',
          coordinates: {
            lat: 0,
            lng: 0
          },
          country: ''
        }
      },
      ein: '',
      ssn: '',
      userAgent: '',
      crypto: {
        coin: '',
        wallet: '',
        network: ''
      },
      role: ''
    };
    this.usersService.addUser(user);
  }

  delete(id: number) {
    this.usersService.deleteUser(id);
  }
}
