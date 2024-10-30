import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './posts/post.component';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { PostCategoryComponent } from './post-categories/post-category.component';
import { SeriesComponent } from './series/series.component';
import { Title } from 'chart.js';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full',
  },
  {
    path: 'posts',
    component: PostComponent,
    data: {
      title: 'Posts',
      requiredPolicy: 'Permissions.Posts.View',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'post-categories',
    component: PostCategoryComponent,
    data: {
      title: 'Danh mục',
      requiredPolicy: 'Permissions.PostCategories.View',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'series',
    component: SeriesComponent,
    canActivate: [AuthGuard],
    data: {
      requiredPolicy: 'Permissions.Series.View',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
})
export class ContentRoutingModule {}
