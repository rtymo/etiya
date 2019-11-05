import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isLogin: boolean;
  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
   }

  ngOnInit() {
  }

}
