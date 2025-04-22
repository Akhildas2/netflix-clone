declare var google: any;
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BG_iMG_URL, LOGO_URL } from '../../constants/config';
import { AuthService } from '../../shared/services/auth.service';
import { googleAuth } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  private router = inject(Router)// Injects Router for navigation
  logUrl = LOGO_URL;
  bgUrl = BG_iMG_URL;
  // Declaration of the email & password
  email!: string;
  password!: string;
  loginService = inject(AuthService)// Injects AuthService for authentication

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    // Initializes Google OAuth with client ID and callback
    google.accounts.id.initialize({
      client_id: googleAuth.googleClientId,
      callback: (resp: any) => {
        this.handleLogin(resp)
      }
    });

    // Renders Google Sign-In button
    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: "large",
      shape: 'rectangle',
      width: 300

    })

  }

  private decodeToken(token: string) {
    // Decodes token payload
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any) {
    if (response) {
      //decode the token
      const payLoad = this.decodeToken(response.credential);
      //store in session
      sessionStorage.setItem("loggedInUser", JSON.stringify(payLoad));
      this.toastr.success('Logged in successfully!', 'Success');
      //navigate to home page
      this.router.navigate(['browse'])
    } else {
      this.toastr.error('Login failed', 'Error');
    }
  }

  // Method to handle form submission
  onSubmit() {
    if (!this.email || !this.password) {
      this.toastr.warning('Please provide email and password', 'Warning');
      return;
    }
    // Call AuthService to handle email/password login
    this.loginService.login(this.email, this.password);
    this.toastr.success('Logged in successfully!', 'Success');
    // Navigate to the browse page
    this.router.navigate(['browse']);
  }

}
