import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewsComponent } from './news/news.component';


const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  },
  {
    path:'dashboard',
    component: DashboardComponent,
  },
  {
    path:'insight',
    component: NewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
