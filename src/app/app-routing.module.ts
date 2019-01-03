import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './ui/login/login.component';
import { HomeComponent } from './ui/home/home.component';
import { RegisterComponent } from './ui/register/register.component';
import { AdminPanelComponent } from './ui/admin-panel/admin-panel.component';
import { UserPanelComponent } from './ui/user-panel/user-panel.component';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { UserinfoComponent } from './ui/userinfo/userinfo.component';
import { UserProfileDisplayComponent } from './ui/user-profile-display/user-profile-display.component';
import { RouteGuardService } from './core/guards/route-guard.service';
import { UserProfileEditComponent } from './ui/user-profile-edit/user-profile-edit.component';
import { AddtrackComponent } from './ui/addtrack/addtrack.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:id', component: UserProfileDisplayComponent, canActivate: [RouteGuardService] },
  { path: 'myprofile', component: UserProfileEditComponent, canActivate: [RouteGuardService] },
  { path: 'add', component: AddtrackComponent, canActivate: [RouteGuardService] },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuardService],  data: { role: 'admin' } },
  { path: 'admin/users', component: UserinfoComponent, canActivate: [AuthGuardService],  data: { role: 'admin' } },
  { path: 'user', component: UserPanelComponent, canActivate: [AuthGuardService], data: { role: 'user' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
