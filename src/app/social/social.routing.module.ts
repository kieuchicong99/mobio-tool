import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TagPostComponent } from './config/tag-post/tag-post.component';

const appRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'config-tag-post',
        pathMatch: 'full',
      },
      {
        path: 'config-tag-post',
        component: TagPostComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class SocialRoutingModule { }