import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
//NG ZORRO IMPORTS
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, NzLayoutModule, NzInputModule, NzButtonModule, NzFormModule, NzSpinModule, CommonModule, ReactiveFormsModule, NzIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isSpinning: boolean = false;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private message: NzMessageService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  async login() {
    try {
      const res = await firstValueFrom(this.authService.login(this.loginForm.value));

      console.log(res);

      if (res.userId != null) {
        const user = {
          id: res.userId,
          role: res.userRole,
        };

        StorageService.saveToken(res.jwt);
        StorageService.saveUser(user);

        if (StorageService.isAdminLoggedIn()) {
          StorageService.loggedInSubject$.next(true);
          this.router.navigateByUrl("/admin/dashboard");
        } else {
          StorageService.loggedInSubject$.next(true);
          this.router.navigateByUrl("/customer/dashboard");
        }
      } else {
        this.message.error("Bad credentials", { nzDuration: 5000 });
      }
    } catch (error) {
      console.error("Login failed", error);
      this.message.error("An error occurred during login", { nzDuration: 5000 });
    }
  }

  // login(){
  //   this.authService.login(this.loginForm.value).subscribe((res) => {
  //     console.log(res);
  //     if (res.userId != null) {
  //       const user = {
  //         id: res.userId,
  //         role: res.userRole
  //       }
  //       StorageService.saveToken(res.jwt);
  //       StorageService.saveUser(user);
  //       if (StorageService.isAdminLoggedIn())
  //         this.router.navigateByUrl("/admin/dashboard");
  //       else
  //         this.router.navigateByUrl("/customer/dashboard");
  //     } else {
  //       this.message.error("Bad credentials", { nzDuration: 5000 })
  //     }
  //   })
  // }
}
