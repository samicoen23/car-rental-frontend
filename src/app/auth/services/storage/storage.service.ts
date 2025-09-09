import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const USER = "user";
const TOKEN = "token";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  static loggedInSubject$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getUser() {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  static getToken() {
    return window.localStorage.getItem(TOKEN);
  }

  static getUserId(): string {
    const user = this.getUser();
    if (user == null) { return ''; }
    return user.id;
  }

  static getUserRole(): string {
    const user = this.getUser();
    if (user == null) return "";
    return user.role;
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken() == null) return false;
    const role: string = this.getUserRole();
    return role == "ADMIN";
  }

  static isCustomerLoggedIn(): boolean {
    if (this.getToken() == null) return false;
    const role: string = this.getUserRole();
    return role == "CUSTOMER";
  }

  static logout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
