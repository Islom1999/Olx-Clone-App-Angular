import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterModule, Routes } from '@angular/router';
import { IconsProviderModule } from '../icons-provider.module';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'poster',
        loadChildren: () => import('../modules/poster/poster.module').then((m) => m.PosterModule),
      },
    ],
  },
];

@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
  ]
})
export class LayoutModule { }
