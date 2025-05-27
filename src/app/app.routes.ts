import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [adminGuard] },
];
