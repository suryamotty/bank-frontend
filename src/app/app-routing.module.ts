import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { TransHistoryComponent } from './trans-history/trans-history.component';

const routes: Routes = [
  //login-path: https://localhost:4200
 { 
  path:'', component :LoginComponent
},

 //register- https://localhost:4200/register
 {
  path:'register',component:RegisterComponent
},
 //dashboard- https://localhost:4200/dashboard
 {
  path:'dashboard',component:DashboardComponent
},
//transaction history
{
  path:'transHistory',component:TransHistoryComponent
},
//page not found
{
  path:'**',component:PageNotFoundComponent
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
