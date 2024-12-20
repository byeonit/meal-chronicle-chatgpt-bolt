import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { slideDownUp } from 'src/app/shared/animations';
import { IconMenuFontIconsComponent } from 'src/app/shared/icon/menu/icon-menu-font-icons';
import { IconModule } from "../../shared/icon/icon.module";

@Component({
  selector: 'app-knowledge-base',
  standalone: true,
  animations: [

    slideDownUp],
  templateUrl: './knowledge-base.component.html',
  styleUrl: './knowledge-base.component.css',
  imports: [
        CommonModule,
    FormsModule,
    IconModule]
})
export class KnowledgeBaseComponent {
  constructor() {}
  activeTab: any = 'general';
  active1: any = 1;
  active2: any = 1;
  modal = false;
  items = [
      {
          src: '/assets/images/knowledge/image-5.jpg',
          title: 'Excessive sugar is harmful',
      },
      {
          src: '/assets/images/knowledge/image-6.jpg',
          title: 'Creative Photography',
      },
      {
          src: '/assets/images/knowledge/image-7.jpg',
          title: 'Plan your next trip',
      },
      {
          src: '/assets/images/knowledge/image-8.jpg',
          title: 'My latest Vlog',
      },
  ];
}
