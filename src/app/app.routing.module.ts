import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './guest/login/login.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthGuardService } from './common/service/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'social',
        pathMatch: 'full',
      },
      {
        path: 'social',
        loadChildren:'app/social/social.module#SocialModule'
      }
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }