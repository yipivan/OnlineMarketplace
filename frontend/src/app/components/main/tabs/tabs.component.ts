import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  isLoggedIn: boolean ;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedInNow().subscribe(loggedIn =>{
      this.isLoggedIn = loggedIn;
    });
   }

  ngOnInit() {

  }

}
