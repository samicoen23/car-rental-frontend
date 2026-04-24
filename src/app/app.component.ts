import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
//NG ZORRO IMPORTS
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';
import { StorageService } from './auth/services/storage/storage.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NzLayoutModule, NzInputModule, NzButtonModule, NzFormModule, NzSpinModule, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;
  isCustomerLoggedIn: boolean = false;
  private loginStatusSubscription!: Subscription;

  constructor(private router: Router) { }

  ngOnInit() {
    // Initialize login state
    this.updateLoginState();

    // Subscribe to login status updates
    this.loginStatusSubscription = StorageService.loggedInSubject$.subscribe(() => {
      this.updateLoginState();
    });

    // Ensure correct navbar after navigation
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateLoginState();
      }
    });
  }

  updateLoginState() {
    this.isLoggedIn = !!StorageService.getToken();
    this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
  }

  logout() {
    StorageService.logout();
    StorageService.loggedInSubject$.next(false);
    this.router.navigateByUrl("/");
  }

  getUserName(): string {
    const user = StorageService.getUser();
    return user.name || 'User'; // Fallback to 'User' if name isn't found
  }

}


