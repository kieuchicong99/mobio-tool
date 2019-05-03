import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialRoutingModule } from './social.routing.module';
import { SocialComponent } from './social.component';
import { ConfigComponent } from './config/config.component';
import { TagPostComponent } from './config/tag-post/tag-post.component';
import { PageComponent } from './config/tag-post/page/page.component';
import { GroupComponent } from './config/tag-post/group/group.component';
import { RequestSocialService } from '../common/service/module-request/social.service';
import { TagPostService } from './config/service/tag-post.service';

@NgModule({
  imports: [
    CommonModule,
    SocialRoutingModule
  ],
  declarations: [
    SocialComponent,
    ConfigComponent,
    TagPostComponent,
    PageComponent,
    GroupComponent
  ],
  providers: [
    RequestSocialService,
    TagPostService
  ]
})
export class SocialModule { }
