import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user1 = {
    'username' : '',
    'userid' : '',
    'phone' : '',
    'role' : '',
    'status' : ''
  };
  
  constructor(private login:LoginService) {}

  ngOnInit(): void
  {
    let user = this.login.getCurrentUser().subscribe(
      (data : any)=>
      {
        this.user1.username = data.username;
        this.user1.userid = `EXAM${data.id}`;
        this.user1.phone = data.phone;
        this.user1.role = data.authorities[0].authority;
        this.user1.status = data.enabled;
      }
    );
  }

}
