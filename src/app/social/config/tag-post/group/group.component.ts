import { Component, OnInit } from '@angular/core';
import { TagPostService } from '../../service/tag-post.service';

@Component({
  selector: 'app-social-config-tag_post-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  private groups: any;
  cities: any;

  cities2: any;

  selectedCity1: any;

  constructor(private tagpostService: TagPostService) { }

  async ngOnInit() {
    this.cities = [
      { label: 'Select City', value: null },
      { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
      { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
      { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
      { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
      { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
    ];
    this.groups = await this.tagpostService.Group;
    console.log(this.groups);
  }

}
