import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isEmpresa = false;
  userName = '';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.isEmpresa = user?.role === 'empresa';
      this.userName = user?.nombre || '';
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}