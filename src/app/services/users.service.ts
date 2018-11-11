import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(environment.base_URL + '/users');
  }

  getUserByEmail(email) {
    return this.http.get(environment.base_URL + '/users?email=' + email);
  }

  postNewUser(user) {
    return this.http.post(environment.base_URL + '/users', user);
  }
}
