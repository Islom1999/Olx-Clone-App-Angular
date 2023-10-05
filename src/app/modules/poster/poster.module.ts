import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosterComponent } from './poster.component';
import { RouterModule, Routes } from '@angular/router';
import { NzPageHeaderModule, } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';



const routes: Routes = [
  {
    path: '',
    component: PosterComponent,
    children: [
      {
        path: 'poster',
        loadChildren: () => import('./poster.component').then((m) => m.PosterComponent),
      },
    ],
  },
];

@NgModule({
  declarations: [
    PosterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    NzPageHeaderModule,
    NzSpaceModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzDrawerModule,
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
  ]
})
export class PosterModule { }
