
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Admin } from '../models/admin';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-login-adm',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login-adm.component.html',
  styleUrl: './login-adm.component.scss'
})
export class LoginAdmComponent {
  admin = new Admin('', '');

  constructor(private adminService: AdminService, private router: Router) { }

  login(): void {
    this.adminService.login(this.admin).subscribe(
      () => this.router.navigate(['/default']),
      () => console.log('Invalid credentials')
    );
  }
}
