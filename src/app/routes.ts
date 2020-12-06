import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: LoginComponent }]
    },
    {
        path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuardService]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];
