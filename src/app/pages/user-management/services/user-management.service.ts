import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${sessionStorage.getItem('token')}` })
};

@Injectable({
  providedIn: 'root'
})


export class UserManagementService {

  private API_URL = 'https://localhost:44381/api/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    var headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
    return this.http.get(this.API_URL + "User", { headers: headerToken });
  }

  saveUser(user: any): Observable<any> {
    var headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
    return this.http.post(this.API_URL + "User", user, { headers: headerToken });
  }

  updateUser(user: any): Observable<any> {
    var headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
    return this.http.put(this.API_URL + "User", user, { headers: headerToken });
  }

  deleteUser(userId: any): Observable<any> {
    var headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
    return this.http.delete(this.API_URL + "User" + '/' + userId, { headers: headerToken });
  }

  getUserById(userId: any): Observable<any> {
    var headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
    return this.http.get(this.API_URL + "User" + '/' + userId, { headers: headerToken });
  }

  saveRolesByUser(roles: any): Observable<any> {
    var headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
    return this.http.post(this.API_URL + "User/add-role", roles, { headers: headerToken });
  }

  

  getRoles(): Observable<any> {
    var headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
    return this.http.get(this.API_URL + "Role", { headers: headerToken });
  }

  saveRole(Role: any): Observable<any> {
    var headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
    return this.http.post(this.API_URL + "Role", Role, { headers: headerToken });
  }

  updateRole(Role: any): Observable<any> {
    var headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
    return this.http.put(this.API_URL + "Role", Role, { headers: headerToken });
  }

  deleteRole(RoleId: any): Observable<any> {
    var headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
    return this.http.delete(this.API_URL + "Role" + '/' + RoleId, { headers: headerToken });
  }

  getRoleById(RoleId: any): Observable<any> {
    var headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
    return this.http.get(this.API_URL + "Role" + '/' + RoleId, { headers: headerToken });
  }

  saveResourcesByRole(resources: any): Observable<any> {
    var headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
    return this.http.post(this.API_URL + "Role/add-role", resources, { headers: headerToken });
  }

  getAllResources(): Observable<any> {
    var headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
    return this.http.get(this.API_URL + "Resource", { headers: headerToken });
  }
}
