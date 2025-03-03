import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "https://jsonplaceholder.typicode.com/users";
  private http = inject(HttpClient);
  
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }

  updateUser(user:User):Observable<User>{
    return this.http.put<User>(`${this.apiUrl}/${user.id}`,user);
  }

  addUser(user:Omit<User,'id'>):Observable<User>{
    return this.http.post<User>(this.apiUrl,user)
  }
}
