import { Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { adminGuard, customerGuard } from './auth/services/guards/auth.guard';

export const routes: Routes = [
    { path: "register", component: SignupComponent },
    { path: "login", component: LoginComponent },
    { path: "admin", loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule), canActivate: [adminGuard] },
    { path: "customer", loadChildren: () => import("./modules/customer/customer.module").then(m => m.CustomerModule), canActivate: [customerGuard] },
];
