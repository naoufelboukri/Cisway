import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { env } from 'src/environments/environment';
import { User } from '../Models/User';

const validator = require('validator');

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = env.API_URL;

  constructor(
    private http: HttpClient,
  ) { }

  me() {
    return this.http.get<User>(`${this.API_URL}/me`)
  }

  update(id: number, object: object) {
    return this.http.put(`${this.API_URL}/user/${id}`, object);
  }

  getUsers() {
    return this.http.get<User[]>(`${this.API_URL}/users`);
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.API_URL}/user/${id}`);
  }

  getRandomPicture(color: string): string {
    return `/assets/profile-pictures/pp-${color}.png`;
  }


  getThemeColor(): string {
    const colors = ['green', 'red', 'blue', 'yellow'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  setRoleText(roleId: number): string {
    if (roleId === 0)
      return 'Admin';
    else 
      return 'Guest';
  }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  

  usernameIsValid(username: string): boolean {
    if (username.length < 4 || username.length >= 255) {
      return true;
    }
    return false;
  }

  emailIsValid(email: string): boolean {
    if (!validator.isEmail(email)) {
      return true;
    }
    return false;
  }

  addressIsValid(address: string): boolean {
    if (address.length < 5 || address.length >= 255) {
      return true;
    }
    return false;
  }

   passwordIsValid(password1: string, password2: string): string {
    if (!validator.isStrongPassword(password1)) {
      return 'Le mot de passe doit contenir un chiffre, un symbole, une lettre majuscule et minuscule et doit être supérieur à 8 caractères.';
    }

    if (password1 !== password2) {
      return 'Les mots de passe ne correspondent pas.';
    }
    return '';
  }
}
