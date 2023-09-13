import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  //current user : which is currently logged in
  public getCurrentUser()
  {
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token

  public generateToken(loginData : any)
  {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  //login user : set token to local storage
  public loginUser(token: string)
  {
    localStorage.setItem("token", token);
    return true;
  }

  //isloign : user is login or not
  public isLoggedIn()
  {
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  //logout : remove token from local storage
  public logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //getToken
  public getToken()
  {
    return localStorage.getItem('token');
  }

  //set userdetials
  public setUser(user: any)
  {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //getUser
  public getUser(): any
  {
    let userStr = localStorage.getItem('user');
    if(userStr!=null)
    {
      return JSON.parse(userStr);
    } 
    else
    {
      this.logout();
      return null;
    }
  }

  //get user role
  public getUserRole() : any
  {
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
