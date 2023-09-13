import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ROUTER_CONFIGURATION } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    username :'',
    password : '',
  };

  constructor(private snack : MatSnackBar, private login : LoginService) {}

  formSubmit()
  {
    console.log("login btn clicked");

    if(this.loginData.username.trim() == '' || this.loginData.username == null)
    {
       this.snack.open('Username is required','',{
        duration : 3000
       });
       return;
    }

    if(this.loginData.password.trim() == '' || this.loginData.password == null)
    {
       this.snack.open('Password is required','',{
        duration : 3000
       });
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data : any) => {
        console.log("success");
        console.log(data);

        //login...
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user : any) => {

            this.login.setUser(user);
            console.log(user);

            if(this.login.getUserRole()=="ADMIN")
            {
              //admin dashboard
              window.location.href='/admin';
            }
            else if(this.login.getUserRole()=="NORMAL")
            {
              //Normal dashboard
              window.location.href = '/user-dashboard/0';
            }
            else
            {
              this.login.logout();
            }
          });
      },
      (error : any) => {
        console.log("error");
        console.log(error);
      }
    );
  }

}
