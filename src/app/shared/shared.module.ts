import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule, NgbAccordionModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

// Counter
import { CountUpModule } from 'ngx-countup';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ScrollspyDirective } from './scrollspy.directive';

// Job Landing 
import { LandingScrollspyDirective } from './landingscrollspy.directive';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    ScrollspyDirective,
    LandingScrollspyDirective
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbDropdownModule,
    SlickCarouselModule,
    CountUpModule
  ],
  exports: [BreadcrumbsComponent,
    ScrollspyDirective,
    LandingScrollspyDirective,
    RouterModule
  ]
})
export class SharedModule { }
