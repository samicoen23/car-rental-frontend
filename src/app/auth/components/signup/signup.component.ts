import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
//NG ZORRO IMPORTS
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, NzLayoutModule, NzInputModule, NzButtonModule, NzFormModule, NzSpinModule, CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  isSpinning: boolean = false;
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private message: NzMessageService, private router: Router) {

  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidate]]
    })
  }

  confirmationValidate = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  register() {
    console.log(this.signupForm.value);
    this.authService.register(this.signupForm.value).subscribe({
      next: (res) => {
        if (res.id != null) {
          this.message.success("Signup successful", { nzDuration: 5000 });
          this.router.navigateByUrl("/login")
        } else {
          this.message.error("Something went wrong", { nzDuration: 5000 });
        }
      },
      error: (err) => {
        if (err.status === 400) {
          this.message.error("This email is already registered.");
        } else {
          this.message.error("An unexpected error occurred.");
        }
      }
    });
    // this.authService.register(this.signupForm.value).subscribe((res) => {
    //   console.log(res);
    //   if(res.id !=null){
    //     this.message.success("Signup successful", {nzDuration: 5000 });
    //     this.router.navigateByUrl("/login")
    //   } else{
    //     this.message.error("Something went wrong", {nzDuration: 5000 });
    //   }
    // });
  }
}
