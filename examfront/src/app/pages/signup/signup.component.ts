import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  constructor(private userService : UserService, private snack : MatSnackBar) {}//used for import module

  public user = {
    username : '',
    password : '',
    firstName : '',
    lastName : '',
    email : '',
    phone : ''
  };

  ngOnInit(): void{};

  formSubmit()
  {
    console.log(this.user);
    if(this.user.username == "" || this.user.username == null)
    {
      //alert("Please provide the username");
      //this.snack.open("Username is required",'ok'); // here, ok is a button or action.
      this.snack.open("Username is required"," ",{
        duration : 3000,
      }); //here that pop will only remians for 3sec
      return ;
    }

    this.userService.addUser(this.user).subscribe(
      (data : any)  => {
      console.log(data);
      //alert("success");
      Swal.fire('Successfully Done !!','User is registered with user id : '+data.id, 'success');
    },
     (error) => {
        console.log(error);
        alert("something went wrong");
      }
    );
    
  }

}
